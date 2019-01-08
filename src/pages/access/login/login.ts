import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { HomePage } from '../../home/home';
import { HandlerFactoryProvider } from '../../../providers/handler-factory';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from '../../../models/user.model';
import { RegisterPersonalDataPage } from '../register/personal-data/register.personal-data';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from '../../../providers/user.provider';
import { InteractionProvider } from '../../../providers/interaction.provider';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup
  registerPage = RegisterPersonalDataPage

  constructor(
    public navCtrl: NavController,
    public handFac: HandlerFactoryProvider,
    public menu: MenuController,
    public afDataBase: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public formBuilder: FormBuilder,
    public userProv: UserProvider,
    public intProv: InteractionProvider,
  ) {
    menu.enable(false)
    this.loginForm = formBuilder.group({
      email: [
        this.userProv.instance.email,
        Validators.required
      ], password: [
        this.userProv.instance.password,
        Validators.required
      ],
    });
  }

  login() {
    let user = this.loginForm.value as User
    const auth = this.afAuth.auth
    console.log(user.email, user.password)
    if (user.email && user.email != '' && user.password && user.password != '') {
      auth.signInWithEmailAndPassword(user.email, user.password).then(
        data => {
          this.navCtrl.setRoot(HomePage)
        }, err => {
          console.error(err)
        }
      )
    } else {
      this.intProv.genericAlert(
        'DADOS INVÁLIDOS',
        `Por favor, informe um e-mail e uma senha para efetuar o login.`
      )
    }
  }

}
