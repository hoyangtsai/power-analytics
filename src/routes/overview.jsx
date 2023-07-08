import { useCallback, useEffect, useRef, useState, useContext } from 'react';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { TooltipComponent, LegendComponent } from 'echarts/components';

import dayjs from 'dayjs';
import clsx from 'clsx';

import {
  ShoppingCartOutlined,
  DollarOutlined,
  HistoryOutlined,
  LeftOutlined,
  RightOutlined,
  EllipsisOutlined,
  GoldOutlined,
  FundOutlined,
} from '@ant-design/icons';
import {
  Row,
  Col,
  Card,
  Button,
  DatePicker,
  Dropdown,
  Select,
  Segmented,
  Table,
  Tag,
  Tooltip,
} from 'antd';

echarts.use([LineChart, CanvasRenderer, TooltipComponent, LegendComponent]);

import useWindowSize from '../hooks/useWindowSize';
import usePrevious from '../hooks/usePrevious';
import styles from '../styles/overview.module.scss';
import deltaLogo from '../assets/delta-logo.png';
import linechart from '../assets/demo/linechart.png';

import powerMix from '../data/powerMix';
import conversionPower from '../data/conversionPower';

import { SiderContext } from './root';

const summary = [
  {
    label: '年轉供電量',
    amount: 1332234,
    unit: 'kWh',
    rate: 12,
    modifier: '>',
    icon: (
      <div
        className={styles.itemIcon}
        style={{
          background: '#FFFBE9',
        }}
      >
        <ShoppingCartOutlined
          style={{
            fontSize: 20,
            color: '#FFA200',
          }}
        />
      </div>
    ),
  },
  {
    label: '年總用電量',
    amount: 1761109,
    unit: 'kWh',
    rate: 36,
    modifier: '>',
    icon: (
      <div
        className={styles.itemIcon}
        style={{
          background: '#EDF6FF',
        }}
      >
        <DollarOutlined
          style={{
            fontSize: 20,
            color: '#0064F4',
          }}
        />
      </div>
    ),
  },
  {
    label: '餘電電費',
    amount: 333058,
    unit: '$',
    rate: 5,
    modifier: '<',
    icon: (
      <div
        className={styles.itemIcon}
        style={{
          background: '#FFF2F8',
        }}
      >
        <HistoryOutlined
          style={{
            fontSize: 20,
            color: '#FF46A3',
          }}
        />
      </div>
    ),
  },
  {
    label: '成本',
    amount: 6661170,
    unit: '$',
    rate: 0,
    modifier: '=',
    icon: (
      <div
        className={styles.itemIcon}
        style={{
          background: '#F8FAFD',
        }}
      >
        <DollarOutlined
          style={{
            fontSize: 20,
            color: '#00C0FE',
          }}
        />
      </div>
    ),
  },
];

const industryTableData = [
  {
    key: '1',
    industry: '桃一廠',
    logo: deltaLogo,
    type: 'HV3',
    no: '04-0701234567890',
    kWh: '34,067',
    price: '$4.90',
  },
  {
    key: '2',
    industry: '桃二廠',
    logo: '',
    type: 'HV3',
    no: '04-0901234567890',
    kWh: '11,273',
    price: '$4.90',
  },
  {
    key: '3',
    industry: '桃三廠',
    logo: deltaLogo,
    type: 'HV3',
    no: '04-4101234567890',
    kWh: '32,743',
    price: '$5.80',
  },
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

export default function Overview() {
  const powerMixRef = useRef(null);
  const powerMixChart = useRef(null);
  const [powerMixDefaultDate, setPowerMixDefaultDate] = useState(
    dayjs('2022/01/02')
  );
  const conversionPowerRef = useRef(null);
  const conversionPowerChart = useRef(null);
  const [width, height] = useWindowSize();
  const prevWidth = usePrevious(width);
  const prevHeight = usePrevious(height);

  const sider = useContext(SiderContext);
  const { type: siderType } = sider;

  const renderChart = async () => {
    if (powerMixRef.current && !powerMixChart.current) {
      powerMixChart.current = await echarts.init(powerMixRef.current);
      powerMixChart.current.setOption(powerMix);
    }
    if (conversionPowerRef.current && !conversionPowerChart.current) {
      conversionPowerChart.current = await echarts.init(
        conversionPowerRef.current
      );
      conversionPowerChart.current.setOption(conversionPower);
    }
  };

  const resizeCharts = () => {
    if (powerMixChart.current) {
      setTimeout(() => powerMixChart.current.resize(), 200);
    }
    if (conversionPowerChart.current) {
      setTimeout(() => conversionPowerChart.current.resize(), 200);
    }
  };

  if (prevWidth !== width || prevHeight !== height) {
    resizeCharts();
  }

  if (siderType === 'clickTrigger') {
    resizeCharts();
  }

  useEffect(() => {
    setTimeout(() => renderChart(), 500);
  }, []);

  const handlePowerMixDateShift = useCallback((shiftDay) => {
    setPowerMixDefaultDate((prev) => prev.add(shiftDay, 'day'));
  }, []);

  // 廠區電力資料
  const weekFormat = 'MM/DD';
  const customWeekStartEndFormat = (value) =>
    `${dayjs(value).startOf('week').format(weekFormat)} ~ ${dayjs(value)
      .endOf('week')
      .format(weekFormat)}`;

  const { Column } = Table;

  return (
    <div className="overview-container">
      <Row gutter={[16, 16]} className={styles.summaryRow}>
        {summary.map((item, key) => {
          return (
            <Col xs={24} sm={12} xxl={6} className={styles.item} key={key}>
              <Card className={clsx(styles.overviewCard, styles.itemRow)}>
                {item.icon}
                <div className={styles.itemNumbers}>
                  <div className={styles.itemLabel}>{item.label}</div>
                  <div className={styles.itemFigure}>
                    <span className={styles.itemAmount}>
                      {item.unit} {item.amount.toLocaleString('en')}
                    </span>
                    {item.rate != 0 ? (
                      <Tag
                        className={styles.itemRate}
                        color={item.modifier == '<' ? 'error' : 'success'}
                      >
                        {item.modifier == '<' ? '↓' : '↑'} {item.rate}%
                      </Tag>
                    ) : null}
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={14} xl={16} xxl={18}>
          <Card
            className={clsx(styles.overviewCard, styles.powerMixCard)}
            title="Power Mix (kW)"
            extra={
              <div className={styles.actions}>
                <div className={styles.ranges}>
                  <Segmented
                    className={styles.rangeButton}
                    options={['Day', 'Month', 'Year']}
                  />
                </div>
                <div className={styles.datePicker}>
                  <Button
                    className={styles.prevButton}
                    icon={<LeftOutlined />}
                    onClick={() => handlePowerMixDateShift(-1)}
                  />
                  <DatePicker
                    className={styles.datePickerInput}
                    value={powerMixDefaultDate}
                    suffixIcon={null}
                  />
                  <Button
                    className={styles.nextButton}
                    icon={<RightOutlined />}
                    onClick={() => handlePowerMixDateShift(1)}
                  />
                </div>
              </div>
            }
          >
            <div className={styles.powerMixChart} ref={powerMixRef}></div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={10} xl={8} xxl={6}>
          <Card
            className={styles.conversionPowerCard}
            title={
              <div className={styles.titleCol}>
                <div className={styles.title}>轉供電量</div>
                <div className={styles.amount}>
                  kWh {(3701).toLocaleString('en')}
                  <span className={styles.rate}>-20%</span>
                </div>
              </div>
            }
            extra={
              <Select
                className={styles.selectWeek}
                placeholder="週"
                options={[...Array(52).keys()].reduce(
                  (prev, curr) => [
                    ...prev,
                    { value: curr + 1, label: curr + 1 },
                  ],
                  []
                )}
              />
            }
          >
            <div
              className={styles.conversionPowerChart}
              ref={conversionPowerRef}
            ></div>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={14} xl={16} xxl={18}>
          <Card
            className={styles.overviewCard}
            title="廠區電力資料"
            extra={
              <DatePicker
                defaultValue={dayjs()}
                format={customWeekStartEndFormat}
                picker="week"
              />
            }
          >
            <Table
              className="ead-table"
              dataSource={industryTableData}
              rowSelection={{
                type: 'checkbox',
              }}
              pagination={false}
            >
              <Column
                title="Industry name"
                dataIndex="industry"
                key="industry"
                ellipsis={{ showTitle: false }}
                render={(_, { industry, logo }) => (
                  <div className={styles.industry}>
                    <i
                      className={styles.industryLogo}
                      style={{
                        backgroundImage: logo != '' ? `url(${logo})` : 'none',
                      }}
                    ></i>
                    <span className={styles.industryName}>{industry}</span>
                  </div>
                )}
              />
              <Column
                title="方案類型"
                dataIndex="type"
                key="type"
                ellipsis={{ showTitle: false }}
              />
              <Column
                title="電號"
                dataIndex="no"
                key="no"
                ellipsis={{ showTitle: false }}
                render={(no) => (
                  <Tooltip placement="topLeft" title={no}>
                    {no}
                  </Tooltip>
                )}
              />
              <Column
                title="kWh"
                dataIndex="kWh"
                key="kWh"
                ellipsis={{ showTitle: false }}
              />
              <Column
                title="電價"
                dataIndex="price"
                key="price"
                ellipsis={{ showTitle: false }}
              />
              <Column
                className="ead-table__actions"
                title={<EllipsisOutlined />}
                width={60}
                dataIndex="more"
                key="more"
                render={() => (
                  <Dropdown
                    menu={{ items: dropdownActions }}
                    trigger={['click']}
                  >
                    <Button
                      className="ead-table__more-button"
                      type="text"
                      icon={<EllipsisOutlined />}
                    />
                  </Dropdown>
                )}
              />
            </Table>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={10} xl={8} xxl={6}>
          <Card
            className={clsx(styles.overviewCard, styles.greenPower)}
            title="綠能總結"
            extra={
              <Dropdown menu={{ items: dropdownActions }} trigger={['click']}>
                <Button
                  className={styles.moreButton}
                  type="text"
                  icon={<EllipsisOutlined />}
                />
              </Dropdown>
            }
          >
            <div className={styles.greenPowerWrap}>
              <Row gutter={[16, 16]} className={styles.greenPowerItems}>
                <Col span={8}>
                  <Card
                    className={clsx(styles.greenPowerItem, styles.surplusPower)}
                  >
                    <div className={styles.GPHeader}>
                      <i className={styles.GPIcon}>
                        <GoldOutlined />
                      </i>
                    </div>
                    <div className={styles.GPBody}>
                      <p className={styles.GPTitle}>餘電率</p>
                      <p className={styles.GPNumber}>5%</p>
                    </div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card className={clsx(styles.greenPowerItem, styles.re)}>
                    <div className={styles.GPHeader}>
                      <i className={styles.GPIcon}>
                        <HistoryOutlined />
                      </i>
                    </div>
                    <div className={styles.GPBody}>
                      <p className={styles.GPTitle}>RE</p>
                      <p className={styles.GPNumber}>79.6%</p>
                    </div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    className={clsx(styles.greenPowerItem, styles.grayPower)}
                  >
                    <div className={styles.GPHeader}>
                      <i className={styles.GPIcon}>
                        <FundOutlined />
                      </i>
                    </div>
                    <div className={styles.GPBody}>
                      <p className={styles.GPTitle}>灰電率</p>
                      <p className={styles.GPNumber}>20.4%</p>
                    </div>
                  </Card>
                </Col>
              </Row>
              <div className={styles.greenPowerMetrics}>
                <div className={styles.greenPowerStatic}>
                  <div className={styles.GPStaticTitle}>綠能電費比</div>
                  <div className={styles.GPStaticTitleValues}>
                    <span>83.7%</span>
                    <span>+2.5%</span>
                  </div>
                </div>
                <div className={styles.GPStaticChart}>
                  <img src={linechart} />
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
