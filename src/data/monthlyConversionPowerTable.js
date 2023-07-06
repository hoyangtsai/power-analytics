const powerTypes = [
  {
    name: '光',
    value: 40,
    itemStyle: {
      color: 'rgba(32, 135, 252, 1)',
    },
  },
  {
    name: '風',
    value: 35,
    itemStyle: {
      color: 'rgba(0, 171, 71, 1)',
    },
  },
  {
    name: '灰',
    value: 16,
    itemStyle: {
      color: 'rgba(165, 164, 161, 1)',
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
        ${powerTypes.map(item => `<div style="color:${item.itemStyle.color};font-weight:bold;">${item.name}: ${item.value}%</div>`).join('')}
      `;
    },
    backgroundColor: 'rgba(0,0,0,.6)',
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
    labelLayout: {
      height: 50,
    },
    draggable: false,
    layoutIterations: 0,
    data: [
      ...powerTypes,
      {
        name: '儲存',
        itemStyle: {
          color: 'rgba(255, 185, 0, 1)',
        },
      },
    ],
    links: [
      {
        source: '光',
        target: '儲存',
        value: 40,
      },
      {
        source: '風',
        target: '儲存',
        value: 35,
      },
      {
        source: '灰',
        target: '儲存',
        value: 16,
      },
    ],
    lineStyle: {
      color: 'source',
    }
  }
};
