export class Training {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  filePath: any;

  constructor(
    id: number,
    name: string,
    description: string,
    price: number,
    quantity: number,
    filePath: any
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.filePath = filePath;
  }
}
