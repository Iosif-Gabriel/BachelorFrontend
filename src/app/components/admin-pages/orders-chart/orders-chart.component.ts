import { Component } from '@angular/core';
import { OrderService } from 'src/app/service/order/order.service';

@Component({
  selector: 'app-orders-chart',
  templateUrl: './orders-chart.component.html',
  styleUrls: ['./orders-chart.component.css']
})
export class OrdersChartComponent {

  data = [];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Month';
  showYAxisLabel = true;
  yAxisLabel = 'Order numbers';
  colorScheme = 'cool';

  constructor(private orderService:OrderService){
    this.orderService.getOrdersMonthlyStats().subscribe(stats=>{
      console.log(stats);
      this.data=stats.map((stat:any)=>({
        name:this.formatMonth(stat.month),
        value:Math.round(stat.count)
      }))
    })
  }

 


  formatMonth(item: any): string {
    let parts = item.split(' ');
    return parts[0]; 
  }

  formatTicks(value: number): string {
    return Math.floor(value) === value ? value.toString() : '';
  }
}
