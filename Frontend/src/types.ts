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
export type groupTicket = {
  name: string;
  price: number;
  total: number;
  availability: number;
};
export type Event = {
  title: string;
  description: string;
  venueId: number;
  time: string;
  city: string;
  region: string;
  date: string;
  id: number;
  tickets: groupTicket[];
};

export type EventResult = {
  title: string;
  description: string;
  venueId: number;
  time: string;
  city: string;
  region: string;
  date: string;
  id: number;
};
