import { Component, OnInit, inject } from '@angular/core';
import { TradeService } from './trade.service';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-trade',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './trade.component.html',
  styleUrl: './trade.component.css',
})
export class TradeComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;
  service = inject(TradeService);
  tradeData: any;

  ngOnInit() {
    this.service.getTradeData().subscribe((data: any) => {
      console.log({ sss: data.baseRateInfo });

      console.log({ data });
      const baseDateParts = data.baseRateInfo.dealDate.split('/');
      const baseYear = +baseDateParts[2];
      const baseMonth = +baseDateParts[1] - 1;
      const baseDay = +baseDateParts[0];

      const baseDate = new Date(baseYear, baseMonth, baseDay);
      console.log({ baseDate });
      const tickPositions = [
        new Date(baseYear, baseMonth, baseDay, 10, 0).getTime(),
        new Date(baseYear, baseMonth, baseDay, 12, 0).getTime(),
        new Date(baseYear, baseMonth, baseDay, 14, 0).getTime(),
        new Date(baseYear, baseMonth, baseDay, 16, 0).getTime(),
        new Date(baseYear, baseMonth, baseDay, 18, 0).getTime(),
      ];

      this.chartOptions = {
        chart: {
          type: 'area',
        },
        title: {
          text: 'Daily Stock Trade',
        },
        xAxis: {
          type: 'datetime',
          tickPositions: tickPositions,
          title: {
            text: 'Time',
          },
          labels: {
            format: '{value:%H:%M}',
          },
        },
        yAxis: {
          title: {
            text: 'Rate',
          },
        },
        series: [
          {
            name: 'שער בסיס',
            type: 'line',
            data: tickPositions.map(() => data.baseRateInfo.baseRate),
          },
          {
            name: 'Rate',
            type: 'area',
            data: data.pointsForDailyChart.map((point: any) => [
              new Date(
                baseYear,
                baseMonth,
                baseDay,
                +point.dealTime.split(':')[0],
                +point.dealTime.split(':')[1]
              ).getTime(),
              +point?.lastRate,
            ]),
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
              },
              stops: [
                [0, 'rgba(124, 181, 236, 1)'],
                [1, 'rgba(124, 181, 236, 0.1)'],
              ],
            },
            marker: {
              enabled: false,
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1,
              },
            },
            threshold: null,
          } as Highcharts.SeriesAreaOptions,
        ],
      };

      console.log({ chartOptions: this.chartOptions });
    });
  }
}
