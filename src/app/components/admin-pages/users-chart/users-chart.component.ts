import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-users-chart',
  templateUrl: './users-chart.component.html',
  styleUrls: ['./users-chart.component.css']
})
export class UsersChartComponent implements OnInit {

  data:any = [];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Month';
  showYAxisLabel = true;
  yAxisLabel = 'User numbers';
  colorScheme = 'cool';

  constructor(private userService:UserService){}

  ngOnInit(): void {
    this.userService.getUserMonthlyStats().subscribe(stats=>{
      this.data = stats.map((item: any) => ({
        name: this.formatMonth(item.month),
        value: Math.round(item.count)
      }));
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
