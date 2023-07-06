export default {
  width: '95%',
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
    data: ['Load', 'Wind', 'Solar PV']
  },
  grid: {
    left: '2%',
    right: '2%',
    bottom: '6%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: [...Array(13).keys()].map((i) => {
        return `${String(i + 6).padStart(2, 0)}:00`;
      }),
      splitLine: {
        show: true
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      min: 0,
      max: 100,
      interval: 25,
    }
  ],
  series: [
    {
      name: 'Load',
      type: 'line',
      smooth: true,
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [50, 60, 70, 20, 30, 70, 80, 90, 70, 20, 30, 50, 80]
    },
    {
      name: 'Wind',
      type: 'line',
      smooth: true,
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [40, 42, 45, 20, 15, 10, 5, 10, 5, 35, 10, 35, 75]
    },
    {
      name: 'Solar PV',
      type: 'line',
      smooth: true,
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [10, 18, 25, 40, 45, 60, 88, 80, 65, 55, 20, 15, 5]
    },
  ]
}