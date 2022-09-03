import fs from "fs";

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

export class FSDatabase extends RamDatabase{
  constructor(){
    super();
  }

  #pushDB(){
    fs.writeFileSync("data.json", JSON.stringify(this.db))
  }

  #pullDB(){
    try {
      let rawData = fs.readFileSync("data.json");
      this.db = JSON.parse(rawData);
    } catch (e) {
      this.#pushDB();
    }
  }

  getItem(key){
    this.#pullDB();
    return super.getItem(key);
  }

  setItem(key, value){
    super.setItem(key, value);
    this.#pushDB();
  }

  isExists(key){
    this.#pullDB();
    super.isExists(key);
  }

  removeItem(key){
    super.removeItem(key);
    this.#pushDB();
  }
}