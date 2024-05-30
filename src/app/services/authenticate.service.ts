import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { ApiService } from './api.service';

/**
 * Service for authentication-related operations.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  /**
   * Array of users.
   */
  private users: User[] | undefined;

  /**
   * User currently connected.
   */
  userConnected: User = new User('', '', []);

  /**
   * Constructor for AuthenticateService.
   * @param apiService ApiService instance.
   */
  constructor(private apiService: ApiService) {}

  /**
   * Get the user from local storage if it exists, otherwise return an empty user.
   * @returns User object.
   */
  getUser() {
    let user = localStorage.getItem('user');
    if (user) {
      // If there is already a user in local storage, then the user is connected
      this.userConnected = JSON.parse(atob(user)); // Decryption
    }
    return this.userConnected;
  }

  /**
   * Login a user.
   * @param email User's email.
   * @returns Observable with array of User objects.
   */
  login(email: string) {
    return this.apiService.getUserByEmail(email);
  }

  /**
   * Check if a user is connected.
   * @returns True if user is connected, otherwise false.
   */
  isConnected() {
    return localStorage.getItem('user') != null;
  }

  /**
   * Disconnect the user.
   */
  disconnected() {
    localStorage.removeItem('user');
    this.userConnected = new User('', '', []);
  }

  /**
   * Check if the connected user is an admin.
   * @returns True if user is an admin, otherwise false.
   */
  isAdmin() {
    let user = this.getUser();
    if (user.roles.length > 0) {
      if (user.roles.indexOf('ADMIN') > -1) return true;
    }
    return false;
  }

  /**
   * Check if the connected user is a regular user.
   * @returns True if user is a regular user, otherwise false.
   */
  isUser() {
    let user = this.getUser();
    if (user.roles.length > 0) {
      if (user.roles.indexOf('USER') > -1) return true;
    }
    return false;
  }

  /**
   * Set the connected user.
   * @param user User object.
   */
  setUser(user: User): any {
    this.userConnected = user;
    localStorage.setItem('user', btoa(JSON.stringify(user))); // Encryption of data before storing in local storage
  }
}
