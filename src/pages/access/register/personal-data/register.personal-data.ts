import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { HandlerFactoryProvider } from '../../../../providers/handler-factory';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as PC from '../../../../constants/project-constants';
import { UserProvider } from '../../../../providers/user.provider';
import { RegisterSecurityDataPage } from '../security-data/register.security-data';
import { InteractionProvider } from '../../../../providers/interaction.provider';
import { LoginPage } from '../../login/login';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'page-register-personal-data',
  templateUrl: 'register.personal-data.html',
})
export class RegisterPersonalDataPage {

  registerForm: FormGroup

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afDB: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public userProv: UserProvider,
    public handFac: HandlerFactoryProvider,
    public intCtrl: InteractionProvider,
  ) {
    this.registerForm = formBuilder.group({
      name: [
        this.userProv.instance.name,
        Validators.compose([
          Validators.minLength(3),
          Validators.required
        ])
      ], document: [
        this.userProv.instance.document,
        Validators.compose([
          Validators.minLength(14),
          Validators.required
        ])
      ], gender: [
        this.userProv.instance.gender,
      ], birthday: [
        this.userProv.instance.birthday,
        Validators.required
      ], phone: [
        this.userProv.instance.phone,
        Validators.compose([
          Validators.minLength(15),
          Validators.pattern(PC.PATTERNS.PHONE),
          Validators.required
        ])
      ],
    })
  }

  nextStep() {
    this.userProv.includeDataFromObject(this.registerForm.value)
    this.intCtrl.presentLoading('Carregando...')
    this.userProv.searchUserByDocument(
      this.userProv.instance.document,
      data => {
        console.log(JSON.stringify(data))
        if (data == 0) {
          this.navCtrl.push(RegisterSecurityDataPage)
        } else {
          this.userProv.instance = new User();
          this.intCtrl.genericAlert(
            'CPF INVÁLIDO',
            `O CPF informado já está em uso em outra conta.
            Se você já fez seu cadastro antes nesse App, use seu e-mail
            e senha na tela de login. Caso não seja você, entre em contato
            conosco através do número: ${PC.PHONE_CONTACT}, para resolvermos
            o problema.`
          )
          this.navCtrl.setRoot(LoginPage)
        }
      }, error => {
        this.userProv.instance = new User();
        this.intCtrl.genericAlert(
          'FALHA NA COMUNICAÇÃO',
          `Infelizmente não conseguimos contactar nossos servidores.
          Por favor, tente novamente mais tarde. Caso o problema
          persista, entre em contato através do número:
          ${PC.PHONE_CONTACT}.`
        )
        this.navCtrl.setRoot(LoginPage)
        console.error(JSON.stringify(error))
      }
    )
  }
}
