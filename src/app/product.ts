export class Product {

  constructor(
    public id: string,
    public title: string,
    public description: string,
    public parentId : string,
    public imgUrl: string
  ) {}

  generateId() {
    let firstDigit = "B-"

    let lastDigit = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    }
    return firstDigit+lastDigit();
  }
}