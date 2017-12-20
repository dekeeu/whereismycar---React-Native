export class CarComponent{
  constructor(id, brand, model, color, licensePlateNumber, owner, usageNumber){
    this.Id = id;
    this.Brand = brand;
    this.Model = model;
    this.Color = color;
    this.LicensePlateNumber = licensePlateNumber;
    this.Owner = owner;
    this.UsageNumber = usageNumber;
  }

  getID(){
    return this.Id;
  }

  getBrand(){
    return this.Brand;
  }

  getModel(){
    return this.Model;
  }

  getColor(){
    return this.Color;
  }

  getLicensePlateNumber(){
    return this.LicensePlateNumber;
  }

  getUsageNumber(){
    return this.UsageNumber;
  }

  getOwner(){
    return this.Owner;
  }

  setID(id){
    this.Id = id;
  }

  setBrand(brand){
    this.Brand = brand;
  }

  setModel(model){
    this.Model = model;
  }

  setColor(color){
    this.Color = color;
  }

  setUsageNumber(no){
    this.UsageNumber = no;
  }

  setLicensePlateNumber(no){
    this.LicensePlateNumber = no;
  }
}
