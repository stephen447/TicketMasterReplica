// types.ts
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  eventTitle: string;
  addedAt: Date;
}

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
}
