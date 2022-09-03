export class RamDatabase{
  constructor(){
    this.db = {};
  }

  getItem(key){
    return this.db[key];
  }

  setItem(key,value){
    this.db[key] = value;
  }

  isExists(key){
    return Boolean(key in this.db);
  }

  removeItem(key){
    delete this.db[key];
  }
}