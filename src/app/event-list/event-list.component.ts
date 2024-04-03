import { Component } from '@angular/core';
import { EventCardComponent } from '../event-card/event-card.component';
import { EventDTO } from '../dtos/EventDTO';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent {

   events: EventDTO[] = [
    {
      eventName: "WorldTour",
      description: "WorldTour with luxury cars",
      startTime: "2023-11-15T08:30:00",
      endTime: "2024-06-15T08:30:00",
      idLocation: "1",
      idOrganizer: "1",
      idEventType: "1"
    },

    {
      eventName: "LALA",
      description: "LALA with luxury cars",
      startTime: "2023-11-15T08:30:00",
      endTime: "2024-06-15T08:30:00",
      idLocation: "1",
      idOrganizer: "1",
      idEventType: "1"
    },
    {
      eventName: "WorldTour",
      description: "WorldTour with luxury cars",
      startTime: "2023-11-15T08:30:00",
      endTime: "2024-06-15T08:30:00",
      idLocation: "1",
      idOrganizer: "1",
      idEventType: "1"
    },

    {
      eventName: "LALA",
      description: "LALA with luxury cars",
      startTime: "2023-11-15T08:30:00",
      endTime: "2024-06-15T08:30:00",
      idLocation: "1",
      idOrganizer: "1",
      idEventType: "1"
    },
   
    {
      eventName: "WorldTour",
      description: "WorldTour with luxury cars",
      startTime: "2023-11-15T08:30:00",
      endTime: "2024-06-15T08:30:00",
      idLocation: "1",
      idOrganizer: "1",
      idEventType: "1"
    },

    {
      eventName: "LALA",
      description: "LALA with luxury cars",
      startTime: "2023-11-15T08:30:00",
      endTime: "2024-06-15T08:30:00",
      idLocation: "1",
      idOrganizer: "1",
      idEventType: "1"
    },
   
    {
      eventName: "WorldTour",
      description: "WorldTour with luxury cars",
      startTime: "2023-11-15T08:30:00",
      endTime: "2024-06-15T08:30:00",
      idLocation: "1",
      idOrganizer: "1",
      idEventType: "1"
    },

    {
      eventName: "LALA",
      description: "LALA with luxury cars",
      startTime: "2023-11-15T08:30:00",
      endTime: "2024-06-15T08:30:00",
      idLocation: "1",
      idOrganizer: "1",
      idEventType: "1"
    },
   
    {
      eventName: "WorldTour",
      description: "WorldTour with luxury cars",
      startTime: "2023-11-15T08:30:00",
      endTime: "2024-06-15T08:30:00",
      idLocation: "1",
      idOrganizer: "1",
      idEventType: "1"
    },

    {
      eventName: "LALA",
      description: "LALA with luxury cars",
      startTime: "2023-11-15T08:30:00",
      endTime: "2024-06-15T08:30:00",
      idLocation: "1",
      idOrganizer: "1",
      idEventType: "1"
    },
   
   
  ];

}
