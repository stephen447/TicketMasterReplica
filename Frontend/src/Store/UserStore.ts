import { makeAutoObservable } from "mobx";
import axiosInstance from "../axiosInstance";

class UserStore {
  user = {
    id: "" as string,
    firstName: "" as string,
    lastName: "" as string,
    email: "" as string,
  };
  constructor() {
    makeAutoObservable(this);
    this.checkUser();
  }

  async checkUser() {
    try {
      const res = await axiosInstance.get("/users/");
      this.setUserData({
        id: res.data.id,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        email: res.data.email,
      });
    } catch (error) {
      console.error("Error checking user", error);
    }
  }

  setUserData(data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }) {
    this.user = { ...data };
  }

  async updateUserData(data: {
    firstName: string;
    lastName: string;
    email: string;
  }) {
    this.setUserData({ ...this.user, ...data }); // Keep existing user data, only update provided fields

    try {
      const response = await axiosInstance.put("/users/", data);
    } catch (error) {
      console.error("Error updating user", error);
    }
  }

  clearUserData() {
    this.user = {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
    };
  }

  get fullName() {
    return `${this.user.firstName} ${this.user.lastName}`;
  }
}

export const userStore = new UserStore();
