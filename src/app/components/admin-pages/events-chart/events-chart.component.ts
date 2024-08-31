import { Component } from '@angular/core';
import { EventService } from 'src/app/service/event/event.service';

@Component({
  selector: 'app-events-chart',
  templateUrl: './events-chart.component.html',
  styleUrls: ['./events-chart.component.css']
})
export class EventsChartComponent {

  data = [];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Month';
  showYAxisLabel = true;
  yAxisLabel = 'Event numbers';
  colorScheme = 'cool';

  constructor(private eventService:EventService){
    this.eventService.getMonthlyStats().subscribe(stats => {
      console.log(stats);
      this.data = stats.map((item: any) => ({
        name: this.formatMonth(item.month),
        value: Math.round(item.count)
      }));
    });
  }

  formatMonth(item: any): string {
    let parts = item.split(' ');
    return parts[0];
  }

  formatTicks(value: number): string {
    return Math.floor(value) === value ? value.toString() : '';
  }
  

}
