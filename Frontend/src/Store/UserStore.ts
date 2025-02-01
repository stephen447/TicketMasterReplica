import { makeAutoObservable } from "mobx";

class UserStore {
  user = {
    firstName: "" as string,
    lastName: "" as string,
    email: "",
    phone: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  setUserData(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) {
    this.user = { ...data };
  }

  clearUserData() {
    this.user = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };
  }

  get fullName() {
    return `${this.user.firstName} ${this.user.lastName}`;
  }
}

export const userStore = new UserStore();
