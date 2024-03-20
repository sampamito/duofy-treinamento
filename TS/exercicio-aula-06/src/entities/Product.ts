import { DefaultEntity } from "./DefaultEntity";

export class Product extends DefaultEntity {
  name: string;
  type: string;
  group: string;

  constructor() {
    super();
    this.name = "";
    this.type = ""; 
    this.group = "";
  }
}