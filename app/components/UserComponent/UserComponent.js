export class UserComponent{
  constructor(id, name, email){
    this.id = id;
    this.name = name;
    this.email = email;

  }

  getID(){
    return this.id;
  }

  getName(){
    return this.name;
  }

  getEmail(){
    return this.email;
  }

  setID(id){
    this.id = id;
  }

  setName(name){
    this.name = name;
  }

  setEmail(email){
    this.email = email;
  }
}
