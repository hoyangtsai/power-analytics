import { useContext } from 'react';
import {
  FilterOutlined,
  UploadOutlined,
  EllipsisOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import {
  Layout,
  Card,
  Space,
  Row,
  Col,
  Button,
  Tabs,
  Table,
  Tag,
  Tooltip,
  Dropdown,
  Select,
} from 'antd';
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { SankeyChart, PieChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';
import {
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import clsx from 'clsx';

import monthlyConversionPowerTable from '../data/monthlyConversionPowerTable';
import remainingPowerRateTable from '../data/remainingPowerRateTable';
import totalRETable from '../data/totalRETable';

echarts.use([
  SankeyChart,
  SVGRenderer,
  TooltipComponent,
  LegendComponent,
  PieChart,
]);

import styles from '../styles/conversion.module.scss';
import '../styles/conversion.scss';
import useWindowSize from '../hooks/useWindowSize';
import usePrevious from '../hooks/usePrevious';
import { SiderContext } from './root';

const { Content } = Layout;
const { Column } = Table;

const contractTableData = [
  {
    key: '1',
    'contract-number': 'SKN1200',
    factory: '桃一廠',
    date: '2023/05/24',
    status: ['計算中'],
    rate: '12.4%',
    re: '96.3%'
  },
  {
    key: '2',
    'contract-number': 'SKN1233',
    factory: '桃二廠',
    date: '2023/05/24',
    status: ['計算中'],
    rate: '12.7%',
    re: '95.7%'
  },
  {
    key: '3',
    'contract-number': 'KBN1243',
    factory: '桃五廠',
    date: '2023/05/24',
    status: ['計算中'],
    rate: '9.5%',
    re: '92.3%'
  },
  {
    key: '4',
    'contract-number': 'APG3456',
    factory: '陽光',
    date: '2023/01/20',
    status: ['完成'],
    rate: '10.7%',
    re: '84.2%'
  },
  {
    key: '5',
    'contract-number': 'SKN2456',
    factory: '平鎮',
    date: '--',
    status: ['未處理'],
    rate: '23.7%',
    re: '86.3%',
    description: '123'
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

const ExpandedRow = () => {
  const monthlyConversionPowerRef = useRef(null);
  const monthlyConversionPowerChart = useRef(null);
  const remainingPowerRateRef = useRef(null);
  const remainingPowerRateChart = useRef(null);
  const totalRERef = useRef(null);
  const totalREChart = useRef(null);

  const [width, height] = useWindowSize();
  const prevWidth = usePrevious(width);
  const prevHeight = usePrevious(height);

  const sider = useContext(SiderContext);
  const { type: siderType } = sider;

  const renderChart = async () => {
    if (monthlyConversionPowerRef.current && !monthlyConversionPowerChart.current) {
      monthlyConversionPowerChart.current = await echarts.init(monthlyConversionPowerRef.current, null, {
        renderer: 'svg'
      });
      setTimeout(() => monthlyConversionPowerChart.current.setOption(monthlyConversionPowerTable), 200);
    }

    if (remainingPowerRateRef.current && !remainingPowerRateChart.current) {
      remainingPowerRateChart.current = await echarts.init(remainingPowerRateRef.current, null, {
        renderer: 'svg'
      });
      setTimeout(() => remainingPowerRateChart.current.setOption(remainingPowerRateTable), 200);
    }

    if (totalRERef.current && !totalREChart.current) {
      totalREChart.current = await echarts.init(totalRERef.current, null, {
        renderer: 'svg'
      });
      setTimeout(() => totalREChart.current.setOption(totalRETable), 200);
    }
  }

  const resizeCharts = () => {
    if (monthlyConversionPowerChart.current) {
      monthlyConversionPowerChart.current.resize();
    }
    if (remainingPowerRateChart.current) {
      remainingPowerRateChart.current.resize();
    }
    if (totalREChart.current) {
      totalREChart.current.resize();
    }
  }

  if (prevWidth !== width || prevHeight !== height) {
    setTimeout(() => resizeCharts(), 200);
  }

  if (siderType === 'clickTrigger') {
    setTimeout(() => resizeCharts(), 200);
  }

  useEffect(() => {
    renderChart();
  }, []);

  return (
    <Card className="conversion-table__charts">
      <Row gutter={[30, 0]}>
        <Col span={10}>
          <div className="conversion-chart">
            <div className="ead-justify-grid conversion-chart__header">
              <div className="ead-justify-grid__col ead-justify-grid__col--left">
                <div className="conversion-chart__headline">
                  <span className="conversion-chart__headline-text">月結轉供電量</span>
                  <Tooltip className="conversion-chart__tooltip" title="說明文字說明文字">
                    <InfoCircleOutlined />
                  </Tooltip>
                </div>
              </div>
              <div className="ead-justify-grid__col ead-justify-grid__col--right">
                <Select
                  size="small"
                  defaultValue="percentage"
                  options={[
                    {
                      value: 'percentage',
                      label: '百分比',
                    }
                  ]}
                />
              </div>
            </div>
            <div className="conversion-chart__body">
              <div className={clsx(styles.monthlyConversionPower)} ref={monthlyConversionPowerRef}></div>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="conversion-chart conversion-chart--secondary">
            <div className="ead-justify-grid conversion-chart__header">
              <div className="ead-justify-grid__col ead-justify-grid__col--left">
                <div className="conversion-chart__headline">
                  <span className="conversion-chart__headline-text">餘電率</span>
                  <Tooltip className="conversion-chart__tooltip" title="說明文字說明文字">
                    <InfoCircleOutlined />
                  </Tooltip>
                </div>
              </div>
              <div className="ead-justify-grid__col ead-justify-grid__col--right">
                <Select
                  size="small"
                  defaultValue="percentage"
                  options={[
                    {
                      value: 'percentage',
                      label: '百分比',
                    }
                  ]}
                />
              </div>
            </div>
            <div className="conversion-chart__body">
              <div className={styles.donutChart} ref={remainingPowerRateRef}></div>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="conversion-chart conversion-chart--secondary">
            <div className="ead-justify-grid conversion-chart__header">
              <div className="ead-justify-grid__col ead-justify-grid__col--left">
                <div className="conversion-chart__headline">
                  <span className="conversion-chart__headline-text">RE</span>
                  <Tooltip className="conversion-chart__tooltip" title="說明文字說明文字">
                    <InfoCircleOutlined />
                  </Tooltip>
                </div>
              </div>
              <div className="ead-justify-grid__col ead-justify-grid__col--right">
                <Select
                  size="small"
                  defaultValue="percentage"
                  options={[
                    {
                      value: 'percentage',
                      label: '百分比',
                    }
                  ]}
                />
              </div>
            </div>
            <div className="conversion-chart__body">
              <div className={styles.donutChart} ref={totalRERef}></div>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  )
}

export default function Conversion() {

  const tabItems = [
    {
      key: 'contract',
      label: '契約',
      children: [
        <Card key="contract">
          <Table
            className="conversion-table conversion-table--expandable"
            expandable={{
              expandedRowClassName: record => 'conversion-table__expanded-item',
              expandedRowRender: (record, index) => <ExpandedRow />,
              expandIcon: ({ expanded, onExpand, record }) =>
                expanded ? (
                  <Button className="conversion-table__expand-button" icon={<i className="icon-square"></i>} type="text" onClick={e => onExpand(record, e)} />
                ) : (
                  <Button className="conversion-table__expand-button" icon={<i className="icon-square-outline"></i>} type="text" onClick={e => onExpand(record, e)} />
                )
            }}
            dataSource={contractTableData}
            rowKey={(record) => record.key}
          >
            <Column title="契約單號" dataIndex="contract-number" key="contract-number" />
            <Column title="案廠名稱" dataIndex="factory" key="factory" />
            <Column title="起算時間" dataIndex="date" key="date" />
            <Column
              title="狀態"
              dataIndex="status"
              key="status"
              render={(_, { status }) => (
                <>
                  {status.map((statusItem) => {
                    let color = ''
                    if (statusItem === '未處理') {
                      color = 'error';
                    }
                    else if (statusItem === '計算中') {
                      color = 'processing';
                    }
                    else if (statusItem === '完成') {
                      color = 'success';
                    }
                    return (
                      <Tag color={color} key={statusItem}>{statusItem}</Tag>
                    );
                  })}
                </>
              )}
            />
            <Column
              title="餘電率"
              dataIndex="rate"
              key="rate"
              render={(rate) => {
                let color = ''
                if (rate.substring(0, rate.length - 1) < 10) {
                  color = 'color-success'
                }
                else if (rate.substring(0, rate.length - 1) > 20) {
                  color = 'color-danger'
                }
                else {
                  color = 'color-warning'
                }

                return (
                  <span className={color}>{rate}</span>
                );
              }}
            />
            <Column
              title="RE"
              dataIndex="re"
              key="re"
              render={(re) => {
                let color = ''
                if (re.substring(0, re.length - 1) > 90) {
                  color = 'color-success'
                }
                else if (re.substring(0, re.length - 1) > 80) {
                  color = 'color-warning'
                }
                else {
                  color = 'color-danger'
                }

                return (
                  <span className={color}>{re}</span>
                );
              }}
            />
            <Column
              className="conversion-table__actions"
              title={
                <EllipsisOutlined />
              }
              width={60}
              dataIndex="more"
              key="more"
              render={() => (
                <Dropdown
                  menu={{ items: dropdownActions }}
                  trigger={['click']}
                >
                  <Button
                    className="conversion-table__more-button"
                    type="text"
                    icon={<EllipsisOutlined />}
                  />
                </Dropdown>
              )}
            />
          </Table>
        </Card>
      ]
    },
    {
      key: 'processing',
      label: '計算中'
    },
    {
      key: 'success',
      label: '完成'
    },
    {
      key: 'pending',
      label: '未處理'
    }
  ];

  const RightOperations = {
    right: (
      <Space>
        <Button icon={<FilterOutlined />}>篩選</Button>
        <Button icon={<UploadOutlined />}>匯出</Button>
      </Space>
    )
  };

  return (
    <>
      <Layout className="conversion">
        <Content className="conversion-container">
          <Tabs items={tabItems} defaultActiveKey="contract" tabBarExtraContent={RightOperations} />
        </Content>
      </Layout>
    </>
  );
}