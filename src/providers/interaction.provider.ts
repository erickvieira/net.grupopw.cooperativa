import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';

@Injectable()
export class InteractionProvider {

  private alert: any;
  private alertPresented: boolean

  constructor(
    private alertCtrl: AlertController,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) {
    this.alertPresented = false;
  }


  present(title, subTitle) {
    let vm = this
    if(!vm.alertPresented) {
      vm.alertPresented = true
      vm.alertCtrl.create({
        title: title,
        subTitle: subTitle,
        buttons: [{
          text: 'OK',
          handler: () => {
            vm.alertPresented = false
          }
        }],
      }).present();
    }
  }

  genericToast(message: string, duration?: number) {
    let vm = this
    if(!vm.alertPresented) {
      vm.alertPresented = true
      vm.toastCtrl.create({
        message: message,
        showCloseButton: false,
        position: 'bottom',
        duration: duration ? duration : 5000,
      }).present()
      setTimeout(() => {
        vm.alertPresented = false
      }, duration ? duration : 5000)
    }
  }

  genericSnackbar(message: string, duration?: number) {
    let vm = this
    if(!vm.alertPresented) {
      vm.alertPresented = true
        vm.toastCtrl.create({
        message: message,
        position: 'bottom',
        duration: duration ? duration : 5000,
        showCloseButton: true,
        closeButtonText: "×"
      }).present()
      setTimeout(() => {
        vm.alertPresented = false
      }, duration ? duration : 5000)
    }
  }

  genericAlert(
    title: string,
    message: string,
    callback?: () => void
  ) {
    if (!this.alertPresented) {
      this.alertPresented = true
      this.alert = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: [{
          text: 'OK',
          handler: () => {
            this.alertPresented = false;
          }
        }],
      })
      if (callback) this.alert.onDidDismiss(callback)
      this.alert.present()
    }
  }

  decisionAlert(
    title: string,
    message: string,
    positiveCallback?: () => void,
    negativeCallback?: () => void,
  ) {
    if (!this.alertPresented) {
      this.alertPresented = true
      this.alert = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: [{
          text: 'sim',
          role: 'sim',
          handler: () => {
            console.log('positive')
            this.alertPresented = false
            if (positiveCallback) positiveCallback()
          }
        }, {
          text: 'não',
          handler: () => {
            this.alertPresented = false
          }
        }]
      })
      this.alert.onDidDismiss(negativeCallback ?
        negativeCallback : () => {console.log('negative')})
      this.alert.present()
    }
  }

  presentLoading(content: string) {
    if (this.alertPresented) {
      this.alertPresented = true
      this.alert = this.loadCtrl.create({
        content: content,
        dismissOnPageChange: true,
      })
      this.alert.onDidDismiss(() => {
        this.alertPresented = false
      })
      this.alert.present()
    }
  }

}
