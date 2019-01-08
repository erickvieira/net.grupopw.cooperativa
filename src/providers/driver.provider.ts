import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Driver } from '../models/driver.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as PC from '../constants/project-constants';
import { FirebaseDatabaseProvider } from './firebasedatabase.provider';
import { Observable } from 'rxjs';

@Injectable()
export class OnlineDriversProvider extends FirebaseDatabaseProvider<AngularFireList<Driver[]>> {

  public instance: AngularFireList<Driver[]> = undefined

  constructor(
    public afDB: AngularFireDatabase,
  ) {
    super(afDB, 'online_drivers', undefined)
  }

  getAllDrivers(callback?: (drivers) => void) {
    this.searchByField({key: 'available', value: true}).subscribe(drivers => {
      this.instance = drivers
      console.warn('ALL DRIVERS', JSON.stringify(this.instance))
      if (callback) callback(this.instance)
    }, error => console.error('ALL DRIVERS', JSON.stringify(error)))
  }

}
