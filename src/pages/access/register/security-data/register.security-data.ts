import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { HandlerFactoryProvider } from '../../../../providers/handler-factory';
import { User } from '../../../../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as PC from '../../../../constants/project-constants';
import { UserProvider } from '../../../../providers/user.provider';
import { LoginPage } from '../../login/login';
import { InteractionProvider } from '../../../../providers/interaction.provider';
import { HomePage } from '../../../home/home';

@Component({
  selector: 'page-register-security-data',
  templateUrl: 'register.security-data.html',
})
export class RegisterSecurityDataPage {

  registerForm: FormGroup

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public intCtrl: InteractionProvider,
    public userProvider: UserProvider,
    public handFac: HandlerFactoryProvider,
  ) {
    this.registerForm = formBuilder.group({
      email: [
        this.userProvider.instance.email,
        Validators.compose([
          Validators.email,
          Validators.required
        ])
      ], password: [
        this.userProvider.instance.password,
        Validators.compose([
          Validators.pattern(PC.PATTERNS.PASSWORD),
          Validators.required
        ])
      ], confirm: [
        this.userProvider.instance.confirm,
        Validators.compose([
          Validators.pattern(PC.PATTERNS.PASSWORD),
          Validators.required
        ])
      ],
    })
  }

  register() {
    let user = this.registerForm.value as User
    this.intCtrl.presentLoading('Carregando...')
    this.userProvider.createUser(
      user,
      (_) => {
        console.log('RegisterSecurityDataPage', JSON.stringify(this.userProvider.instance))
        this.intCtrl.genericAlert(
          'CADASTRADO',
          `Seja bem-vind${ this.userProvider.instance.gender == 'F' ? 'a' : 'o' },
          ${this.userProvider.instance.name}!`
        )
        this.navCtrl.push(HomePage)
        return
      }, (error) => {
        console.error('RegisterSecurityDataPage', JSON.stringify(error))
        this.userProvider.instance = new User();
        this.intCtrl.genericAlert('CADASTRO NÃO REALIZADO', PC.FIREBASE_ERRORS[error.code])
        this.navCtrl.push(LoginPage)
        return
      }, () => {
        console.log('RegisterSecurityDataPage', 'onInvalidPass')
        this.intCtrl.genericAlert(
          'SENHAS INVÁLIDAS',
          'Por favor, informe senhas idênticas nos dois campos.',
          () => console.error(`${user.password} != ${user.confirm}`)
        )
        this.userProvider.instance.email = user.email;
        this.navCtrl.pop()
        this.navCtrl.push(RegisterSecurityDataPage)
      }
    )
  }
}
