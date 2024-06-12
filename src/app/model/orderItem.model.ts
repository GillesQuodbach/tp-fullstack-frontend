import { Training } from "./training.model";
import { Command } from "./command.model";

export class OrderItem {
    id: number;
    quantity: number;
    price: number;
    order: Command;
    training: Training;

    constructor(id:number, quantity: number, price: number, order: Command, training: Training) {
        this.id = id
        this.quantity = quantity;
        this.price = price;
        this.order = order;
        this.training = training;
    }
}