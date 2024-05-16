import { Training } from "./training.model";
import { Command } from "./command.model";

export class OrderItem {
    quantity: number;
    price: number;
    order: Command;
    training: Training;

    constructor(quantity: number, price: number, order: Command, training: Training) {
        this.quantity = quantity;
        this.price = price;
        this.order = order;
        this.training = training;
    }
}