const usages = [
  {
    value: 854852,
    name: '總發電量',
    itemStyle: {
      color: '#60A4FA',
    },
  },
  {
    value: 91518,
    name: '餘電',
    itemStyle: {
      color: '#BFDBFE',
    },
  },
];

export default {
  // top: 0,
  // left: 'center',
  tooltip: {
    trigger: 'item',
    // formatter: '{b}:&nbsp;{d}%',
    // formatter: (params) => {
    //   console.log('params :>> ', params);
    //   return `${(params.value).toLocaleString('en-US')} kWh`;
    // },
  },
  legend: {
    left: 'center',
    bottom: '2%',
    width: '50%',
    formatter: (name) => {
      const item = usages.find(i => i.name === name);
      return `${name}: ${(item.value).toLocaleString('en-US')} kWh`;
    },
    data: [
      { name: '總發電量', icon: 'circle' },
      { name: '餘電', icon: 'circle' },
    ]
  },
  series: [
    {
      type: 'pie',
      radius: ['70%', '100%'],
      top: '5%',
      height: '60%',
      label: {
        show: false,
        position: 'center',
        formatter: (params) => {
          return `${(params.percent).toFixed(1)}%`;
        },
        fontSize: 18,
        fontWeight: 'bold',
      },
      emphasis: {
        label: {
          show: true,
        }
      },
      data: usages,
    }
  ]
};
