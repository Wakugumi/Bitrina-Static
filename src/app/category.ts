import { ArrayType } from "@angular/compiler";



export class Category {

  constructor(
    public id: string,
    public title: string,
    public description: string,
    public imgUrl: string
  ) {}


  generateId(currentObj:any[]) {
    var firstDigit = "A-"

    var x = 0;

    let lastDigit = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1)
    }
    Object.keys(currentObj).forEach((val,index,arr) => {
      x++
    })
    return firstDigit+lastDigit()
  }
}
