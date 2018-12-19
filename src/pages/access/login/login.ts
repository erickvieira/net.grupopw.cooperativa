import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { HomePage } from '../../home/home';
import { HandlerFactoryProvider } from '../../../providers/handler-factory';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  handler = {};

  constructor(
    public navCtrl: NavController,
    public handFac: HandlerFactoryProvider,
    public menu: MenuController,
  ) {
    menu.enable(false);
    this.handler = this.handFac.make({
      user: '',
      pass: '',
    })
    Object.freeze(this.handler)
  }

  showAlert() {
    alert('alkdjasdj')
  }

  login(user: string, pass: string) {
    console.log(user, pass);
    if (user && user != '' && pass && pass != '') {
      this.navCtrl.setRoot(HomePage)
    }
  }

}
