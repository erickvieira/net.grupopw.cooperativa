import { Car } from "./driver.model";

export class User {
  public id: string;
  public picture?: string;
  public last_loc?: Coords;
  public name = '';
  public document = '';
  public gender = '';
  public birthday: Date = null;
  public phone = '';
  public email = '';
  public password? = '';
  public confirm? = '';
  public created_at: number;
  public updated_at: number;
  public active: boolean = true;
  public car?: Car = undefined;
  public verified: boolean = false;
}

export class Coords {
  lat: number
  lng: number
  checkin?: number
}
