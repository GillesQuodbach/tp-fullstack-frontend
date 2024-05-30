import { Injectable } from '@angular/core';
import { Customer } from '../model/customer.model';
import { Training } from '../model/training.model';
import { Command } from '../model/command.model';

/**
 * Service for managing the shopping cart.
 */
@Injectable({
  providedIn: 'root',
})
export class CartService {
  /**
   * Map to store the items in the cart.
   */
  private cart: Map<number, Training>;

  /**
   * Command associated with the cart.
   */
  private command: Command | null;

  /**
   * Constructor for CartService.
   */
  constructor() {
    this.command = null;
    let cart = localStorage.getItem('cart');
    if (cart) {
      this.cart = new Map(JSON.parse(cart));
    } else {
      this.cart = new Map<number, Training>();
    }
  }

  /**
   * Add a training to the cart.
   * @param training Training object to be added.
   */
  addTraining(training: Training) {
    this.cart.set(training.id, training);
    this.saveCart();
  }

  /**
   * Save customer details to local storage.
   * @param customer Customer object.
   */
  saveCustomer(customer: Customer) {
    localStorage.setItem('customer', JSON.stringify(customer));
  }

  /**
   * Save cart details to local storage.
   */
  saveCart() {
    localStorage.setItem('cart', JSON.stringify([...this.cart]));
  }

  /**
   * Remove a training from the cart.
   * @param training Training object to be removed.
   */
  removeTraining(training: Training) {
    this.cart.delete(training.id);
    this.saveCart();
  }

  /**
   * Get the items in the cart.
   * @returns Array of Training objects in the cart.
   */
  getCart() {
    return Array.from(this.cart.values());
  }

  /**
   * Get the size of the cart.
   * @returns Size of the cart.
   */
  getSize() {
    return this.cart.size;
  }

  /**
   * Get the total amount of the cart.
   * @returns Total amount of the cart.
   */
  getAmount(): number {
    let amount: number = 0;
    this.cart.forEach((training) => {
      amount += training.price * training.quantity;
    });
    return amount;
  }

  /**
   * Get the customer details from local storage.
   * @returns Customer object.
   */
  getCustomer(): Customer {
    let customer = localStorage.getItem('customer');
    if (customer) {
      return JSON.parse(customer);
    }
    return new Customer(0, 'unknown', '', '', '', '');
  }

  /**
   * Clear the cart.
   */
  clear() {
    this.cart.clear();
    localStorage.removeItem('cart');
  }

  /**
   * Set the command associated with the cart.
   * @param command Command object.
   */
  setCommand(command: Command) {
    this.command = command;
  }

  /**
   * Get the command associated with the cart.
   * @returns Command object.
   */
  getCommand() {
    return this.command;
  }

  /**
   * Clear the command associated with the cart.
   */
  clearCommand() {
    this.command = null;
  }
}
