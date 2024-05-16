import { Customer } from "./customer.model";

export class Command {
    amount: number;
    customer: Customer;

    constructor(amount: number, customer: Customer) {
        this.amount = amount;
        this.customer = customer;
    }
}