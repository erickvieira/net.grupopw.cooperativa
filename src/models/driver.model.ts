import { Coords } from "./user.model";

export class Driver {
  public availabel: boolean
  public last_loc: Coords
  public id: string
};


export class Car {
  id: string
  color: string
  model: string
  carrier_size: 'large' | 'small'
}
