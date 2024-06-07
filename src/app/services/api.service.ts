import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Training } from '../model/training.model';
import { User } from '../model/user.model';
import { Category } from '../model/category.model';
import { Customer } from '../model/customer.model';
import { Command } from '../model/command.model';
import { OrderItem } from '../model/orderItem.model';

/**
 * Service for making API requests.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  /**
   * Search keyword.
   */
  search: string = '';

  /**
   * Constructor for ApiService.
   * @param http HttpClient instance.
   */
  constructor(private http: HttpClient) {}

  /**
   * Get categories.
   * @returns Observable with array of Category objects.
   */
  public getCategories() {
    return this.http.get<Category[]>(environment.host + '/categories');
  }

  /**
   * Get trainings by category ID.
   * @param id Category ID.
   * @returns Observable with array of Training objects.
   */
  public getTrainingsByCategory(id: number) {
    return this.http.get<Training[]>(
      environment.host + '/trainings/category/' + id
    );
  }

  /**
   * Get all trainings.
   * @returns Observable with array of Training objects.
   */
  public getTrainings() {
    return this.http.get<Training[]>(environment.host + '/trainings');
  }

  public getOrders() {
    return this.http.get<Command[]>(environment.host + '/orders');
  }

  /**
   * Get trainings by name.
   * @param name Name of the training.
   * @returns Observable with array of Training objects.
   */
  public getTrainingsByName(name: string) {
    return this.http.get<Training[]>(
      environment.host + '/trainingsSearch?keyword=' + name
    );
  }

  /**
   * Get a training by ID.
   * @param id Training ID.
   * @returns Observable with Training object.
   */
  public getTraining(id: number) {
    return this.http.get<Training>(environment.host + '/training/' + id);
  }

  /**
   * Get users.
   * @returns Observable with array of User objects.
   */
  public getUsers() {
    return this.http.get<User[]>(environment.login + '/users');
  }

  /**
   * Get a user by email.
   * @param email User's email.
   * @returns Observable with array of User objects.
   */
  public getUserByEmail(email: string) {
    return this.http.get<User[]>(environment.login + '/users?email=' + email);
  }

  /**
   * Add a new training.
   * @param training Training object.
   * @returns Observable with Training object.
   */
  public postTraining(training: any) {
    return this.http.post<Training>(environment.host + '/trainings', training);
  }

  /**
   * Delete a training.
   * @param training Training object to be deleted.
   * @returns Observable with no return type.
   */
  public delTraining(training: Training) {
    return this.http.delete(environment.host + '/trainings/' + training.id);
  }

  /**
   * Update a training.
   * @param training Training object.
   * @returns Observable with Training object.
   */
  public putTraining(training: any) {
    return this.http.put<Training>(
      environment.host + '/trainings/' + training.id,
      training
    );
  }

  /**
   * Add a new customer.
   * @param customer Customer object.
   * @returns Observable with Customer object.
   */
  public postCustomer(customer: any) {
    return this.http.post<Customer>(environment.host + '/customers', customer);
  }

  /**
   * Get a customer by ID.
   * @param id Customer ID.
   * @returns Observable with Customer object.
   */
  public getCustomer(id: number) {
    return this.http.get<Customer>(environment.host + '/customers/' + id);
  }

  /**
   * Add a new command.
   * @param command Command object.
   * @returns Observable with Command object.
   */
  public postCommand(command: any) {
    return this.http.post<Command>(environment.host + '/orders', command);
  }

  /**
   * Add a new order item.
   * @param orderItem OrderItem object.
   * @returns Observable with OrderItem object.
   */
  public postOrderItem(orderItem: any) {
    return this.http.post<OrderItem>(
      environment.host + '/ordersitems',
      orderItem
    );
  }

  /**
   * Get an image by ID.
   * @param id Image ID.
   * @returns Observable with any type.
   */
  public getImg(id: number) {
    return this.http.get<any>(environment.host + '/download/' + id);
  }

  /**
   * Add a new image.
   * @param formData FormData object.
   * @returns Observable with any type.
   */
  public postImg(formData: FormData) {
    return this.http.post<any>(environment.host + '/download', formData);
  }

  /**
   * Update training image.
   * @param formData FormData object.
   * @param id Training ID.
   * @returns Observable with any type.
   */
  public updateImgTraining(formData: FormData, id: number) {
    return this.http.post<any>(environment.host + '/download/' + id, formData);
  }
}
