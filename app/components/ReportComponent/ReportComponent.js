export class ReportComponent{
  // ID,Picture,StreetName,StreetNo,PickedCars,Author,isApproved,Date
  constructor(id, picture, street_name, street_no, pickedCars, author, status, date){
    this.Id = id;
    this.Picture = picture;
    this.StreetName = street_name;
    this.StreetNo = street_no;
    this.PickedCars = pickedCars;
    this.Author = author;
    this.Date = date;
    this.Status = status;
  }

  getID(){
    return this.Id;
  }

  getPicture(){
    return this.Picture;
  }

  getStreetName(){
    return this.StreetName;
  }

  getStreetNo(){
    return this.StreetNo;
  }

  getPickedCars(){
    return this.PickedCars;
  }

  getAuthor(){
    return this.Author;
  }

  getStatus(){
    return this.Status;
  }

  getDate(){
    return this.Date;
  }

  setPicture(pic){
    this.Picture = pic;
  }

  setStreetName(streetName){
    this.StreetName = streetName;
  }

  setStreetNo(streetNo){
    this.StreetNo = streetNo;
  }

  setPickedCars(pickedCars){
    this.PickedCars = pickedCars;
  }

  setStatus(status){
    this.Status = status;
  }

  setAuthor(author){
    this.Author = author;
  }

  setDate(date){
    this.Date = date;

  }


}
