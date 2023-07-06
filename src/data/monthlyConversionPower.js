const sources = [
  {
    name: '發電廠A',
    value: 32,
    itemStyle: {
      color: '#EA7A6B',
    },
  },
  {
    name: '發電廠B',
    value: 28,
    itemStyle: {
      color: '#4EB46A',
    },
  },
  {
    name: '發電廠C',
    value: 40,
    itemStyle: {
      color: '#FDCC40',
    },
  },
];

export default {
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove',
    formatter: () => {
      return `
        <div style="color:#ffffff;font-size:10px;">轉供比例</div>
        ${sources.map(item => `<div style="color:${item.itemStyle.color};font-weight:bold;">${item.name}: ${item.value}%</div>`).join('')}
      `;
    },
    backgroundColor: 'rgba(0,0,0,.8)',
    extraCssText: 'border-radius:10px;'
  },
  series: {
    type: 'sankey',
    left: 0,
    right: 0,
    height: '90%',
    emphasis: {
      focus: 'adjacent', // 'series' | 'adjacent'
      label: {
        show: true,
      },
    },
    nodeAlign: 'right',
    label: {
      show: false,
    },
    draggable: true,
    layoutIterations: 0,
    data: [
      ...sources,
      {
        name: '場域A',
      },
      {
        name: '場域B',
      },
      {
        name: '場域C',
      },
      {
        name: '場域D',
      },
      {
        name: '場域E',
      },
      {
        name: '場域F',
      },
      {
        name: '場域G',
      },
      {
        name: '場域H',
      },
      {
        name: '場域I',
      },
      {
        name: '場域J',
      },
      {
        name: '場域K',
      },
      {
        name: '場域L',
      },
      {
        name: '場域M',
      },
      {
        name: '場域N',
      },
    ],
    links: [
      {
        source: '發電廠A',
        target: '場域B',
        value: 4,
      },
      {
        source: '發電廠A',
        target: '場域D',
        value: 3,
      },
      {
        source: '發電廠A',
        target: '場域F',
        value: 6,
      },
      {
        source: '發電廠A',
        target: '場域I',
        value: 5,
      },
      {
        source: '發電廠A',
        target: '場域L',
        value: 4,
      },
      {
        source: '發電廠A',
        target: '場域M',
        value: 4,
      },
      {
        source: '發電廠A',
        target: '場域N',
        value: 6,
      },
      {
        source: '發電廠B',
        target: '場域A',
        value: 4,
      },
      {
        source: '發電廠B',
        target: '場域C',
        value: 2,
      },
      {
        source: '發電廠B',
        target: '場域F',
        value: 6,
      },
      {
        source: '發電廠B',
        target: '場域I',
        value: 8,
      },
      {
        source: '發電廠B',
        target: '場域K',
        value: 5,
      },
      {
        source: '發電廠B',
        target: '場域N',
        value: 3,
      },
      {
        source: '發電廠C',
        target: '場域A',
        value: 2,
      },
      {
        source: '發電廠C',
        target: '場域C',
        value: 2,
      },
      {
        source: '發電廠C',
        target: '場域D',
        value: 3,
      },
      {
        source: '發電廠C',
        target: '場域E',
        value: 4,
      },
      {
        source: '發電廠C',
        target: '場域G',
        value: 3,
      },
      {
        source: '發電廠C',
        target: '場域H',
        value: 4,
      },
      {
        source: '發電廠C',
        target: '場域J',
        value: 4,
      },
      {
        source: '發電廠C',
        target: '場域K',
        value: 5,
      },
      {
        source: '發電廠C',
        target: '場域L',
        value: 3,
      },
      {
        source: '發電廠C',
        target: '場域M',
        value: 4,
      },
      {
        source: '發電廠C',
        target: '場域N',
        value: 3,
      },
      {
        source: '發電廠C',
        target: '場域N',
        value: 3,
      },
    ],
    lineStyle: {
      color: 'gradient',
      opacity: 0.4,
    }
  }
};
