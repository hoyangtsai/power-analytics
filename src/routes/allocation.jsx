import { useEffect, useRef, useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import * as echarts from 'echarts/core';
import { SankeyChart, PieChart, BarChart, MapChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import {
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
  GridComponent,
  VisualMapComponent,
  GeoComponent,
} from 'echarts/components';

import { Row, Col, Card, Dropdown, Select, Tooltip, DatePicker, Button, Tag } from 'antd';
import { InfoCircleOutlined, ArrowsAltOutlined, EllipsisOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import clsx from 'clsx';

echarts.use([
  SankeyChart,
  CanvasRenderer,
  TooltipComponent,
  LegendComponent,
  PieChart,
  BarChart,
  DatasetComponent,
  GridComponent,
  VisualMapComponent,
  GeoComponent,
  MapChart,
]);

const { RangePicker } = DatePicker;

import useWindowSize from '../hooks/useWindowSize';
import usePrevious from '../hooks/usePrevious';
import assetWorldJson from '../assets/geo/world.json';
import styles from '../styles/allocation.module.scss';
import monthlyConversionPower from '../data/monthlyConversionPower';
import remainingPowerRate from '../data/remainingPowerRate';
import totalRE from '../data/totalRE';
import greenPower from '../data/greenPower';
import worldGreenPower from '../data/worldGreenPower';
import { SiderContext } from './root';

const summary = [
  {
    label: '平均月轉供電量',
    amount: 11019,
    unit: 'kWh',
    rate: 5.9,
    modifier: '<',
    pastAmount: 118105,
  },
  {
    label: '平均月用電量',
    amount: 105468,
    unit: 'kWh',
    rate: 0.5,
    modifier: '<',
    pastAmount: 110241,
  },
  {
    label: '總轉供電量',
    amount: 666117,
    unit: 'kWh',
    rate: 1.2,
    modifier: '>',
    pastAmount: 97697,
  },
  {
    label: '總用電量',
    amount: 880554,
    unit: 'kWh',
    rate: 2,
    modifier: '<',
    pastAmount: 146759,
  }
];

const dropdownActions = [
  {
    key: '1',
    label: 'Action 1',
  },
  {
    key: '2',
    label: 'Action 2',
  },
];

export async function loader() {
  const response = await fetch(assetWorldJson);
  const worldJson = await response.json();
  return { worldJson };
}

export default function Allocation() {
  const monthlyConversionPowerRef = useRef(null);
  const monthlyConversionPowerChart = useRef(null);
  const remainingPowerRateRef = useRef(null);
  const remainingPowerRateChart = useRef(null);
  const totalRERef = useRef(null);
  const totalREChart = useRef(null);
  const greenPowerRef = useRef(null);
  const greenPowerChart = useRef(null);
  const worldMapRef = useRef(null);
  const worldMap = useRef(null);
  const [width, height] = useWindowSize();
  const prevWidth = usePrevious(width);
  const prevHeight = usePrevious(height);
  const { worldJson } = useLoaderData();
  const sider = useContext(SiderContext);
  const { type: siderType } = sider;

  const renderChart = async () => {
    if (monthlyConversionPowerRef.current && !monthlyConversionPowerChart.current) {
      monthlyConversionPowerChart.current = await echarts.init(monthlyConversionPowerRef.current);
      monthlyConversionPowerChart.current.setOption(monthlyConversionPower);
    }

    if (remainingPowerRateRef.current && !remainingPowerRateChart.current) {
      remainingPowerRateChart.current = await echarts.init(remainingPowerRateRef.current);
      remainingPowerRateChart.current.setOption(remainingPowerRate);
    }

    if (totalRERef.current && !totalREChart.current) {
      totalREChart.current = await echarts.init(totalRERef.current);
      totalREChart.current.setOption(totalRE);
    }

    if (greenPowerRef.current && !greenPowerChart.current) {
      greenPowerChart.current = await echarts.init(greenPowerRef.current);
      greenPowerChart.current.setOption(greenPower);
    }
  }

  const renderMap = async () => {
    if (worldMapRef.current && worldJson && !worldMap.current) {
      worldMap.current = await echarts.init(worldMapRef.current);
      echarts.registerMap('world', worldJson);
      worldMap.current.setOption(worldGreenPower);
    }
  }

  const resizeCharts = () => {
    if (monthlyConversionPowerChart.current) {
      setTimeout(() => monthlyConversionPowerChart.current.resize(), 200);
    }

    if (remainingPowerRateChart.current) {
      setTimeout(() => remainingPowerRateChart.current.resize(), 200);
    }
    if (totalREChart.current) {
      setTimeout(() => totalREChart.current.resize(), 200);
    }

    if (greenPowerChart.current) {
      setTimeout(() => greenPowerChart.current.resize(), 200);
    }

    if (worldMap.current) {
      setTimeout(() => worldMap.current.resize(), 200);
    }
  }

  if (prevWidth !== width || prevHeight !== height) {
    resizeCharts();
  }

  if (siderType === 'clickTrigger') {
    resizeCharts();
  }

  useEffect(() => {
    setTimeout(() => renderChart(), 500);
    setTimeout(() => renderMap(), 500);
  }, []);

  return (
    <div className="allocation-container">
      <div className={styles.actionRow}>
        <RangePicker
          className={styles.datePicker}
          defaultValue={[dayjs('2022/01/01'), dayjs('2022/12/31')]}
          format={'MMM D'}
          inputReadOnly={true}
        />
        <Button className={styles.button} type="primary">Export</Button>
      </div>
      <Row className={styles.summaryRow}>
        {
          summary.map((item, key) => {
            return (
              <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6} className={styles.items} key={key}>
                <div className={styles.item}>
                  <div className={styles.itemHeader}>
                    <div className={styles.itemLabel}>{item.label}</div>
                    <ArrowsAltOutlined />
                  </div>
                  <div className={styles.itemFigure}>
                    <span className={styles.itemAmount}>{item.unit} {(item.amount).toLocaleString('en')}</span>
                    <Tag className={styles.itemRate} color={item.modifier == '<' ? 'error' : 'success'}>{item.modifier == '<' ? '↓' : '↑'} {item.rate}%</Tag>
                  </div>
                  <div className={styles.itemPast}>過去一個月 {item.pastAmount}</div>
                </div>
              </Col>
            )
          })
        }
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={10} xl={12} xxl={12}>
          <Card
            className={clsx(styles.allocationCard, styles.sankeyCard)}
            title={
              <div className={styles.titleCol}>
                <span className={styles.titleText}>月結轉供電量</span>
                <Tooltip className={styles.titleTooltip} title="說明文字說明文字">
                  <InfoCircleOutlined />
                </Tooltip>
              </div>
            }
            extra={
              <Select
                placeholder="百分比"
                options={[
                  {
                    value: 20,
                    label: '20%',
                  },
                  {
                    value: 30,
                    label: '30%',
                  },
                  {
                    value: 50,
                    label: '50%',
                  },
                ]}
              />
            }
          >
            <div className={styles.sankeyChart} ref={monthlyConversionPowerRef}></div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={7} xl={6} xxl={6}>
          <Card
            className={clsx(styles.allocationCard, styles.donutCard)}
            title={
              <div className={styles.titleCol}>
                <span className={styles.titleText}>總餘電率 %</span>
                <Tooltip className={styles.titleTooltip} title="說明文字說明文字">
                  <InfoCircleOutlined />
                </Tooltip>
              </div>
            }
            extra={
              <Select
                placeholder="月"
                style={{ width: 60 }}
                options={
                  Array.from(Array(12).keys()).reduce((prev, curr) => [...prev, { value: curr, label: `${curr + 1}月` }], [])
                }
              />
            }
          >
            <div className={styles.donutChart} ref={remainingPowerRateRef}></div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={7} xl={6} xxl={6}>
          <Card
            className={clsx(styles.allocationCard, styles.donutCard)}
            title={
              <div className={styles.titleCol}>
                <span className={styles.titleText}>總 RE %</span>
                <Tooltip className={styles.titleTooltip} title="說明文字說明文字">
                  <InfoCircleOutlined />
                </Tooltip>
              </div>
            }
            extra={
              <Select
                placeholder="月"
                style={{ width: 60 }}
                options={
                  Array.from(Array(12).keys()).reduce((prev, curr) => [...prev, { value: curr, label: `${curr + 1}月` }], [])
                }
              />
            }
          >
            <div className={styles.donutChart} ref={totalRERef}></div>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={12} xl={10} xxl={10}>
          <Card
            className={clsx(styles.allocationCard, styles.greenPowerCard)}
            title={
              <div className={styles.titleCol}>
                <span className={styles.titleText}>綠電分析</span>
                <Tooltip className={styles.titleTooltip} title="說明文字說明文字">
                  <InfoCircleOutlined />
                </Tooltip>
              </div>
            }
            extra={
              <Dropdown
                menu={{ items: dropdownActions }}
                trigger={['click']}
              >
                <Button
                  className={styles.moreButton}
                  type="text"
                  icon={<EllipsisOutlined />}
                />
              </Dropdown>
            }
          >
            <div className={styles.greenPowerChart}>
              <div className={styles.greenPowerChartWrap} ref={greenPowerRef}></div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={14} xxl={14}>
          <Card
            className={clsx(styles.allocationCard, styles.worldMapCard)}
            title={
              <div className={styles.titleCol}>
                <span className={styles.titleText}>全球綠電</span>
                <Tooltip className={styles.titleTooltip} title="說明文字說明文字">
                  <InfoCircleOutlined />
                </Tooltip>
              </div>
            }
            extra={
              <Dropdown
                menu={{ items: dropdownActions }}
                trigger={['click']}
              >
                <Button
                  className={styles.moreButton}
                  type="text"
                  icon={<EllipsisOutlined />}
                />
              </Dropdown>
            }
          >
            <div className={styles.worldMapChart}>
              <div className={styles.worldMapChartWrap} ref={worldMapRef}></div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}