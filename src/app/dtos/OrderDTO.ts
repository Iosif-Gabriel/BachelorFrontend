export interface OrderDTO {
    id:string;
    userId: number;
    eventId: number;
    eventName:string;
    orderedAt: string;
    startDate: string;
    endDate: string;
    nrOfGuests: number;
    totalPrice: number;
    isEditing:boolean;
  }