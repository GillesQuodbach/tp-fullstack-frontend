import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { ApiService } from './api.service';
import { jwtDecode } from 'jwt-decode';

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
   * Store the JWT token in local storage.
   * @param token JWT token.
   */
  setToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  /**
   * Retrieve the JWT token from local storage.
   * @returns JWT token or null if not found.
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Decode the JWT token.
   * @returns Decoded token or null if token is not found.
   */
  decodeToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token) as any;
    }
    return null;
  }

  /**
   * Check if the user has the admin role.
   * @returns True if the user is an admin, otherwise false.
   */
  isAdminToken(): boolean {
    const decodedToken = this.decodeToken();
    if (decodedToken) {
      return decodedToken.roles.includes('ADMIN');
    }
    return false;
  }

  /**
   * Check if the user has the user role.
   * @returns True if the user is a regular user, otherwise false.
   */
  isUserToken(): boolean {
    const decodedToken = this.decodeToken();
    if (decodedToken) {
      return decodedToken.roles.includes('USER');
    }
    return false;
  }

  UsernameToken() {
    const decodedToken = this.decodeToken();
    if (decodedToken) {
      return decodedToken.sub;
    }
  }

  /**
   * Check if a user is connected.
   * @returns True if user is connected, otherwise false.
   */
  isConnectedToken(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Disconnect the user.
   */
  disconnectedToken() {
    localStorage.removeItem('authToken');
    this.userConnected = new User('', '', []);
  }
}
