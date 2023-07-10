import dayjs from 'dayjs';
export default {
  color: ['#2463EB', '#38BDF9', '#DCE8FE'],
  aria: {
    enabled: true,
  },
  legend: {
    width: '100%',
    left: 'center',
    top: '88%',
    itemGap: 100,
    data: [
      { name: '太陽能', icon: 'circle' },
      { name: '風電', icon: 'circle' },
      { name: '灰電', icon: 'circle' },
    ],
  },
  tooltip: {},
  dataset: {
    dimensions: ['Date', '太陽能', '風電', '灰電'],
    source: [
      { Date: dayjs('2022/06/30').format('MMM D'), 太陽能: 620000, 風電: 720000, 灰電: 400000 },
      { Date: dayjs('2022/07/31').format('MMM D'), 太陽能: 520000, 風電: 910000, 灰電: 510000 },
      { Date: dayjs('2022/08/31').format('MMM D'), 太陽能: 290000, 風電: 550000, 灰電: 690000 },
      { Date: dayjs('2022/09/30').format('MMM D'), 太陽能: 710000, 風電: 1000000, 灰電: 420000 },
      { Date: dayjs('2022/10/31').format('MMM D'), 太陽能: 780000, 風電: 630000, 灰電: 580000 },
      // { Date: dayjs('2022/11/30').format('MMM D'), 太陽能: 620000, 風電: 290000, 灰電: 500000 },
      // { Date: dayjs('2022/12/31').format('MMM D'), 太陽能: 1000000, 風電: 820000, 灰電: 640000 },
    ],
  },
  xAxis: {
    type: 'category',
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    axisLabel: {
      formatter: (value) => {
        if (value >= 1000000) {
          return `${parseFloat(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
          return `${parseFloat(value / 1000).toFixed(0)}K`;
        }
        return value;
      },
    },
    min: 0,
    interval: 200000,
  },
  series: [
    {
      type: 'bar',
      barWidth: 15,
      itemStyle: {
        borderRadius: [6, 6, 0, 0],
      },
    },
    {
      type: 'bar',
      barWidth: 15,
      itemStyle: {
        borderRadius: [6, 6, 0, 0],
      },
    },
    {
      type: 'bar',
      barWidth: 15,
      itemStyle: {
        borderRadius: [6, 6, 0, 0],
      },
    },
  ],
};
