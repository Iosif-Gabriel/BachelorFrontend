import { Component } from '@angular/core';
import { EventService } from 'src/app/service/event/event.service';

@Component({
  selector: 'app-events-chart',
  templateUrl: './events-chart.component.html',
  styleUrls: ['./events-chart.component.css']
})
export class EventsChartComponent {

  data = [];
  showLegend = true;
  gradient = false;
  colorScheme = 'cool'

  constructor(private eventService:EventService){
    this.eventService.getMonthlyStats().subscribe(stats => {
      this.data = stats.map((item: any) => ({
        name: item.month,
        value: Math.round(item.count)
      }));
    });
  }

}
