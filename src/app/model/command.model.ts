import { Customer } from "./customer.model";

export class Command {
    id : number;
    amount: number;
    customer: Customer;

    constructor(id: number, amount: number, customer: Customer) {
        this.id = id;
        this.amount = amount;
        this.customer = customer;
    }
}