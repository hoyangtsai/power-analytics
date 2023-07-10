const usage = [
  {
    value: 593599,
    name: '總供電量',
    itemStyle: {
      color: '#60A4FA',
    },
  },
  {
    value: 72518,
    name: '餘電',
    itemStyle: {
      color: '#BFDBFE',
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
    textStyle: {
      fontWeight: 'bold',
    },
    data: [
      {
        name: '總供電量',
        icon: 'circle',
        textStyle: {
          color: '#000',
        },
      },
      {
        name: '餘電',
        icon: 'circle',
        textStyle: {
          color: '#69798f',
        },
      },
    ],
  },
  series: [
    {
      type: 'pie',
      radius: ['40%', '60%'],
      avoidLabelOverlap: false,
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
      data: usage,
    },
  ],
};
