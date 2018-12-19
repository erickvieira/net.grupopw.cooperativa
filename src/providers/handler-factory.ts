import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class HandlerFactoryProvider {

  private concat = {};

  constructor() {}

  make(..._: object[]) {
    for (let i = 0; i < arguments.length; i++) {
      this.concat = {...this.concat, ...arguments[i]}
    }
    return this.concat
  }

}
