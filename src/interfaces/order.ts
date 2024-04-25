export interface IOrder {
  id: string;
  sender: {
    name: string;
    phone: string;
  };
  recipient: {
    name: string;
    phone: string;
    address: string;
  };
  transactionId: string;
  weight: number;
  description: string;
  shipmentHistory: string[];
  deliveryHistory: string[];
  status: "pending" | "in transit" | "delivered";
}

export interface ICreateOrder {
  sender: {
    name: string;
    phone: string;
  };
  recipient: {
    name: string;
    phone: string;
    address: string;
  };
  transactionId: string;
  weight: number;
  description: string;
  shipmentId: string;
}
