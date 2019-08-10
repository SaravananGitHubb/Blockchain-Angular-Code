export class Cattle {
  id: number;
  type:string;
  age:number;
  date: any;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}