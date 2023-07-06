// import * as d3Array from 'd3-array';
// import * as d3Geo from 'd3-geo';

// const projection = d3Geo.geoEquirectangular();

const mapData = [
  {
    name: 'Australia',
    value: 60,
    sources: { solar: 38, wind: 22, grey: 40 }
  },
  {
    name: 'China',
    value: 66,
    sources: { solar: 46, wind: 20, grey: 34 }
  },
  {
    name: 'Japan',
    value: 52,
    sources: { solar: 36, wind: 16, grey: 48 }
  },
  {
    name: 'United States',
    value: 77,
    sources: { solar: 34, wind: 43, grey: 23 }
  },
  {
    name: 'Brazil',
    value: 48,
    sources: { solar: 28, wind: 20, grey: 52 }
  },
];

const min = Math.min(...mapData.map(item => item.value));
const max = Math.max(...mapData.map(item => item.value));

const palettes = {
  solar: '#2463EB',
  wind: '#38BDF9',
  grey: '#DCE8FE',
};

export default {
  height: '100%',
  tooltip: {
    trigger: 'item',
    showDelay: 0,
    transitionDuration: 0.2,
    padding: 12,
    borderColor: 'transparent',
    formatter: (params) => {
      const { marker, name, data } = params;
      if (!data) {
        return `<div style="border-radius:8px;font-family:Arial;">
          <div style="font-weight:bolder;font-size:18px;line-height:24px;">${name}&emsp;&emsp;&emsp;&emsp;-</div>
        </div>`;
      }
      const { sources } = data;
      const { solar, wind, grey } = sources;
      return `<div style="border-radius:8px;font-family:Arial;">
        <div style="font-weight:bolder;font-size:18px;line-height:24px;">${name}&emsp;&emsp;&emsp;&emsp;${solar + wind}%<div>
        <div style="margin-top:10px;font-size:14px;line-height:24px;color:rgba(169, 179, 191, 1);">
          <div>${marker.replace(/(?<=background-color:)(.+;)/, palettes['solar'] + ';')} 太陽能: ${solar}%</div>
          <div>${marker.replace(/(?<=background-color:)(.+;)/, palettes['wind'] + ';')} 風能: ${wind}%</div>
          <div>${marker.replace(/(?<=background-color:)(.+;)/, palettes['grey'] + ';')} 灰電: ${grey}%</div>  
        </div>
      </div>`;
    },
  },
  visualMap: {
    show: false,
    // left: 'right',
    min: min,
    max: max,
    inRange: {
      // high value color from bottom-up
      color: [
        '#74CDF4',
        '#56C3F1',
        '#38B8EF',
        '#6692F1',
        '#457AEE',
        '#2463EB',
      ],
    },
    text: ['High', 'Low'],
    calculable: true
  },
  series: [
    {
      name: 'World GreenPower Usage',
      type: 'map',
      map: 'world',
      roam: true,
      selectMode: false,
      emphasis: {
        label: {
          show: false,
        },
        itemStyle: {
          areaColor: '#2463EB',
        }
      },
      itemStyle: {
        areaColor: '#DCE8FE',
        borderColor: '#fff'
      },
      // projection: {
      //   project: function (point) {
      //     return projection(point);
      //   },
      //   unproject: function (point) {
      //     return projection.invert(point);
      //   }
      // },
      data: mapData.map((item) => {
        return {
          name: item.name,
          value: item.value,
          sources: item.sources,
        };
      }),
    }
  ]
};