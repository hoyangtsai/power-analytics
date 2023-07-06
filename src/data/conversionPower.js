export default {
  color: ['#D7EBFF'],
  grid: {
    left: '10%',
    right: '2%',
    bottom: '6%',
    top: '8%',
  },
  xAxis: {
    type: 'category',
    data: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 10000,
    interval: 2500,
    axisLabel: {
      formatter: (value) => {
        return Math.floor(value / 1000) + 'K';
      }
    }
  },
  series: [
    {
      data: [9800, 4000, 6000, 7800, 4800, 2800, 8300],
      type: 'bar',
      itemStyle: {
        borderRadius: [10, 10, 0, 0]
      },
      emphasis: {
        itemStyle: {
          color: 'rgb(0, 101, 244)'
        }
      },
    }
  ]
}