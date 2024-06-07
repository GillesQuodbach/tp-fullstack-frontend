import { Customer } from './customer.model';

export class Command {
  id: number;
  amount: number;
  customer: Customer;
  status: string | null;

  constructor(id: number, amount: number, customer: Customer, status: string) {
    this.id = id;
    this.amount = amount;
    this.customer = customer;
    this.status = status;
  }
}
