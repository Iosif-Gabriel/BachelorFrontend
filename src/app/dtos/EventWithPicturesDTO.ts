export class EventWithPicturesDTO{

    id!:string;
    eventName!:string;
    description!:string;
    startTime!:string;
    endTime!:string;
    idLocation!:string;
    idEventType!:string;
    idUser!:string;
    price!:number;
    pictureUrls!: { [key: string]: string };
    favEventId!:number;
    fav!:boolean;
    organizerName!:string;
    nrGuests!:number
}