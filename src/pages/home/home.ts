import { Component, AfterViewInit, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core'
import { NavController, MenuController, NavParams, Toast } from 'ionic-angular'
import { UserProvider } from '../../providers/user.provider'
import { InteractionProvider } from '../../providers/interaction.provider'
import { LoginPage } from '../access/login/login'
import * as PC from '../../constants/project-constants'
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { LocationProvider } from '../../providers/location.provider';
import { Geolocation } from '@ionic-native/geolocation';
import { OnlineDriversProvider } from '../../providers/driver.provider';
import { style, animate, transition, trigger } from '@angular/animations';

@Component({
  selector: 'page-home',
  animations: [
    trigger('easyInOutVer', [
      transition(':enter', [
        style({
          bottom: 35,
          opacity: 0
        }),
        animate(150, style({
          bottom: 65,
          opacity: 1
        })),
        animate(100, style({
          bottom: 55,
          opacity: 1
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 1
        }),
        animate(100, style({
          opacity: 0,
          bottom: 45,
        }))
      ]),
    ]), trigger('scaleInOutHor', [
      transition(':enter', [
        style({
          width: 0,
          opacity: 0
        }),
        animate(150, style({
          width: 110,
          opacity: 1
        })),
        animate(100, style({
          width: 105,
          opacity: 1
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 1
        }),
        animate(100, style({
          opacity: 0,
          width: 0,
        }))
      ]),
    ]), trigger('fadeInOut', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate(150, style({
          opacity: 0
        })),
        animate(300, style({
          opacity: 1
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 1
        }),
        animate(100, style({
          opacity: 0
        }))
      ]),
    ])
  ],
  templateUrl: 'home.html',
  providers: [ OnlineDriversProvider, UserProvider, LocationProvider, Geolocation ]
})
export class HomePage implements AfterViewInit, OnInit {

  readonly mapStyles = PC.AGM.styles
  travel = {
    origin: { lat: undefined, lng: undefined },
    destin: { lat: undefined, lng: undefined },
    ready: false,
  }
  mapCenter = PC.AGM.default.coords
  zoomLevel = PC.AGM.default.zoom.unfocused
  locationUpdateCounter = 0
  waiting = false
  wantFastTravel = false
  automaticUpdateLocation = true
  insideTheState = false

  @ViewChild('mapsAutoComplete') searchElementRef: ElementRef
  searchControl: FormControl

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public userProv: UserProvider,
    public drivProv: OnlineDriversProvider,
    public intProv: InteractionProvider,
    public mapsAPILoader: MapsAPILoader,
    public locProv: LocationProvider,
    public geolocation: Geolocation,
    public ngZone: NgZone,
  ) {
    menu.enable(true)
    this.drivProv.getAllDrivers()
    this.setCurrentPosition(PC.AGM.default.coords)
  }

  ngOnInit(): void {
    this.initMapsAutoComplete()
    this.observeDevicePosition()
  }

  ngAfterViewInit(): void {
    this.userProv.checkCredentials(() => {
      this.navCtrl.setRoot(LoginPage)
    });
  }

  _observeDevicePosition(): void {
    console.log('starting location provider')
    this.geolocation.watchPosition({ enableHighAccuracy: true, maximumAge: 1000 }).subscribe((resp) => {
      if (this.automaticUpdateLocation) {
        this.setCurrentPosition(resp.coords && resp.coords.latitude && resp.coords.longitude ? {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude,
        } : PC.AGM.default.coords)
      }
      console.log('location updated', JSON.stringify(this.userProv.instance.last_loc))
    }, (error) => {
      console.log('IMPOSSÍVEL OBTER A LOCALIZAÇÃO DO DISPOSITIVO: ', `${error.code} ${error.message}`)
    });
  }

  observeDevicePosition() {
    setInterval(() => {
      this.getCurrentPosition()
    }, 500)
  }

  getCurrentPosition(): void {
    this.geolocation.getCurrentPosition({ enableHighAccuracy: false }).then(resp => {
      if (this.automaticUpdateLocation && !this.waiting) {
        this.setCurrentPosition(resp.coords && resp.coords.latitude && resp.coords.longitude ? {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude,
        } : PC.AGM.default.coords)
        console.log('location updated', JSON.stringify(this.userProv.instance.last_loc))
      }
    }).catch(err => {
      // if (this.automaticUpdateLocation) this.intProv.genericToast(`${err.code} ${err.message}`)
    })
  }

  initMapsAutoComplete(): void {
    this.searchControl = new FormControl();
    this.autoCompleteListener();
  }

  setCurrentPosition(position?: { lat: number, lng: number }) {
    if (position && position.lat && position.lng) {
      this.userProv.instance.last_loc = {
        ...position,
        checkin: Date.now()
      }
      if (this.locationUpdateCounter < 5) {
        this.mapCenter = position
      }
      if (this.travel.ready) {
        this.travel.origin = position
      }
      this.zoomLevel = PC.AGM.default.zoom.focused
      this.locationUpdateCounter++
    }
  }

  autoCompleteListener() {
    if (this.searchElementRef) {
      this.mapsAPILoader.load().then(() => {
        let autoComplete = new google.maps.places.Autocomplete(
          this.searchElementRef.nativeElement,
          { componentRestrictions: { country: 'br' } },
        );
        autoComplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autoComplete.getPlace();
            if (place.geometry === undefined || place.geometry === null) {
              console.error('No geometry was encontred.')
              return;
            }
            this.insideTheState = PC.AGM.getAddressAttribute(place, 'administrative_area_level_1', 'short_name') == 'GO'
            this.travel.origin = this.userProv.instance.last_loc
            this.travel.destin = place.geometry.location.toJSON() as {lat: number, lng: number}
            this.zoomLevel = PC.AGM.default.zoom.focused
          });
        });
      }).catch(error => {
        throw error
      });
    }
  }

  findADriverForFastTravel() {
    this.intProv.genericAlert(
      'A CAMINHO',
      'O motorista chegará na sua localização em breve!'
    )
    this.wantFastTravel = false
  }

  findADriver(event: any) {
    if (this.insideTheState) {
      this.waiting = false
      this.travel.ready = true
    } else {
      this.travel.destin = undefined
      this.intProv.genericAlert(
        'Destino Inválido',
        `O destino selecionado está fora da nossa área de cobertura.`
      )
    }
  }

  onMapClick(event: any) {
    console.log('map.clickEvent')
  }

  onMarkerDrag(event: any) {
    this.automaticUpdateLocation = false;
    if (event.coords) {
      this.intProv.genericToast(
        'Você alterou o local combinado com o motorista. Agora ele vai te buscar no local onde o marcador foi colocado, e não mais na localização do seu aparelho.'
      )
      this.setCurrentPosition(event.coords)
    }
    console.log('marker.dragEvent', JSON.stringify(event))
  }

  startObservePositionAgain() {
    this.automaticUpdateLocation = true;
    this.intProv.genericToast('O motorista vai chegar até você através da localização do aparelho.', 2000)
  }

}
