import { Customer } from "./customer.model";

export class Command {
    static commandCounter = 1;
    commandNumber: number;
    amount: number;
    customer: Customer;

    constructor(amount: number, customer: Customer) {
        this.commandNumber = Command.commandCounter++;
        this.amount = amount;
        this.customer = customer;
    }
}