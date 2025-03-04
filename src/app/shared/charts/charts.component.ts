import {Component, OnInit} from '@angular/core';
import {EChartsOption} from 'echarts';

@Component({
  selector: 'charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  isLoading = false;

  options: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['X-1', 'X-2', 'X-3', 'X-4', 'X-5'],
      align: "left",
      icon: "square",
      selectedMode:"single"
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'X-1',
        type: 'line',
        label: {
          show: true,
          position: 'top',
        },
        // stack: 'counts',
        // areaStyle: {},
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'X-2',
        type: 'line',
        label: {
          show: true,
          position: 'top',
        },
        // stack: 'counts',
        // areaStyle: {},
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'X-3',
        type: 'line',
        label: {
          show: true,
          position: 'top',
        },
        // stack: 'counts',
        // areaStyle: {},
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: 'X-4',
        type: 'line',
        label: {
          show: true,
          position: 'top',
        },
        // stack: 'counts',
        // areaStyle: {},
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: 'X-5',
        type: 'line',
        // stack: 'counts',
        label: {
          show: true,
          position: 'top',
        },
        // areaStyle: {},
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  };

  constructor() {
  }

  ngOnInit(): void {

  }
}
