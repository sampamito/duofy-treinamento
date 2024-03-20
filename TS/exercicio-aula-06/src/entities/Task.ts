import { DefaultEntity } from "./DefaultEntity";
import { User } from "./Product";

export class Task extends DefaultEntity {
  title: string;
  description: string;
  done: boolean;
  user: User

  constructor() {
    super();
    this.title = ""
    this.description = ""
    this.done = false
    this.user = new Product()
  }
}