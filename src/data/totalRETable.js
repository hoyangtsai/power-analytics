const usages = [
  {
    value: 1016117,
    name: '總用電量',
    itemStyle: {
      color: '#49DE80',
    },
  },
  {
    value: 161265,
    name: '灰電',
    itemStyle: {
      color: '#CBD5E1',
    },
  },
];

export default {
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
      const item = usages.find((i) => i.name === name);
      return `${name}: ${item.value.toLocaleString('en-US')} kWh`;
    },
    data: [
      { name: '總用電量', icon: 'circle' },
      { name: '灰電', icon: 'circle' },
    ],
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
          return `${params.percent.toFixed(1)}%`;
        },
        fontSize: 18,
        fontWeight: 'bold',
      },
      emphasis: {
        label: {
          show: true,
        },
      },
      data: usages,
    },
  ],
};
