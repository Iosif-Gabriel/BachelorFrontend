export interface EventDTO{
    id:string;
    eventName:string;
    description:string;
    startTime:string;
    endTime:string;
    idLocation:string;
    idEventType:string;
    idUser:string;
    price:number;
    nrGuests:number;
    available:boolean;
}