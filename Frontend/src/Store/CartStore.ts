import { makeAutoObservable } from "mobx";
import { CartItem } from "../types";

class CartStore {
  cart: CartItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addItem(item: CartItem) {
    this.cart.push(item);
  }

  removeItem(id: number) {
    this.cart = this.cart.filter((item) => item.id !== id);
  }

  updateQuantity(id: number, quantity: number) {
    const item = this.cart.find((item) => item.id === id);
    if (item) {
      item.quantity = quantity;
    }
  }

  get totalAmount() {
    return this.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}

export const cartStore = new CartStore();
