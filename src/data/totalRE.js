const usage = [
  {
    value: 783571,
    name: '綠電',
    itemStyle: {
      color: '#49DE80',
    },
  },
  {
    value: 96983,
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
    textStyle: {
      fontWeight: 'bold',
    },
    data: [
      {
        name: '綠電',
        icon: 'circle',
        textStyle: {
          color: '#000',
        },
      },
      {
        name: '灰電',
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
