export interface IOrder {
  id?: number;
  userId?: number;
  title: string;
  description?: string;
  amount: number;
  price: number;

  createdDate?: Date;
  updatedDate?: Date;
}
