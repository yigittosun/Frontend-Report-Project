import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import data from '../../assets/mock.json';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.page.html',
  styleUrls: ['./charts.page.scss'],
})
export class ChartsPage implements AfterViewInit {

  @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  @ViewChild('lineChart') private chartRef;

  private mock = data;
  ischart = false;

  Chart: any
  lineChart: any;
  doughnutChart: any;
  date: string[] = [];
  impressions: number[] = [];
  clicks: number[] = [];
  installs: number[] = [];
  dau: number[] = [];
  revenue: number[] = [];
  platform: string[] = [];
  app: string[] = [];

  constructor() {
    console.log(this.mock);
  }

  ngAfterViewInit() {
      this.mock.forEach(x => {
      this.date.push(x.date);
      this.impressions.push(x.impressions);
      this.clicks.push(x.clicks);
      this.installs.push(x.installs);
      this.dau.push(x.dau);
      this.revenue.push(x.revenue);
      this.platform.push(x.platform);
      this.app.push(x.app);
    });
    
    this.lineChartMethod();
    
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels:this.platform,
        datasets: [{
          // label: '# of Votes',
          data: this.impressions,
          backgroundColor: [
            'rgba(255, 159, 64, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(229, 0, 255, 0.8)',
            'rgba(0, 255, 127, 0.8)',
            'rgba(255, 233, 0, 0.8)',
            'rgba(0, 182, 255, 0.8)',
  
          ],
          // hoverBackgroundColor: [
          //   '#FFCE56',
          //   '#FF6384',
          //   '#36A2EB',
          //   '#FFCE56',
          //   '#FF6384'
          // ]
        }]
      },
      options: {
        responsive: true,
        aspectRatio: 1,
        maintainaApectRatio: true,
        onResize: function () {
          if (window.innerWidth > 700) {
            this.legend.position = 'right';
            this.legend.aspectRatio = 1.4;
            this.legend.maintainaApectRatio = false;
          } else {
            this.legend.position = 'bottom';
            this.legend.aspectRatio = 1;
            this.legend.maintainaApectRatio = true;
          }
        },
        legend: {
          display: true,
          position: "bottom",
          labels: {
            // fontFamily: "Comic Sans MS",
            // boxWidth: 2,
            // boxHeight: 2
          }
        }
      }
    });

  }
  chart(value: string){
    if(value === 'true'){
      this.ischart = false;
    }else{
      this.ischart = true;
    }
  }



  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.date,
        datasets: [
          {
            label: 'Date Of Impression',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(255,255,255)',
            borderColor: 'rgba(238, 130, 238)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            borderWidth:2,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.impressions,
            spanGaps: false,
          }
        ]
      }
    });
  }

}
