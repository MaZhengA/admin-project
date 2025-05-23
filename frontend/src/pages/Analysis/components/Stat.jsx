import React, { useState, useEffect } from "react";
import { Row, Col, Card, Tooltip, Progress, Skeleton } from "antd";
import { 
  ExclamationCircleOutlined,
  CaretUpFilled,
  CaretDownFilled 
} from '@ant-design/icons';
import api from "@/services/api"
import { Area, Column } from '@ant-design/charts';
import dayjs from 'dayjs';
import { formatNum } from "@/utils/index";

/**
 * 分析页
 * gmv 销售额
 * stat 统计数据 statistics
 * ROI Return on Investment 投资回报率
 */
function Stat() {
  const [stat, setStat] = useState({});
  const [pvData, setPvData] = useState([])
  const [pv, setPv] = useState(0)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStat();
    fetchPv();
  }, [])

  async function fetchStat() {
    try {
      const res = await api.get('/analysis/statistics');
      setStat(res.data?.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchPv() {
    try {
      const { data } = await api.get('/analysis/pageView');
      const pvDatas  = data?.data.map(item => {
        return {
          Date: item.Date?.split('T')[0],
          pv: item.pv
        }
      })
      setPvData(pvDatas);
      setPv(data.count);
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  }
  function formatAmount(amount) {
    const strAmount = amount?.toString();
    return `¥ ${strAmount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const config = {
    data: pvData,
    xField: 'Date',
    yField: 'pv',
    axis: false,
    padding: 0, // 图表内边距
    margin: 0, // 图表外边距
    smooth: true, // 平滑曲线
    height: 42,
    areaStyle: { fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff' },
  }

  function getCurrDate() {
    const today = dayjs().format('YYYY-MM-DD');
    const currentPv = pvData.find(item => item.Date === today)?.pv;
    return currentPv
  }

  return (
    <div className="stat-wrap">
      <Skeleton loading={loading} active>
        <Row gutter={24}>
          <Col span={6}>
            <Card className="gmv-card">
              <p className="gmv">
                <span>总销售额</span>
                <Tooltip placement="top" title="指标说明">
                  <ExclamationCircleOutlined />
                </Tooltip>
              </p>
              <p className="gmv-amount">{formatAmount(stat.gmv)}</p>
              <div className="compare">
                <p>
                  <span>周同比</span>
                  <span style={{ marginLeft: '8px' }}>{stat.wow}</span>
                  <CaretUpFilled style={{ color: '#f50', marginRight: '16px' }} />
                </p>
                <p>
                  <span>日同比</span>
                  <span style={{ marginLeft: '8px' }}>{stat.dod}</span>
                  <CaretDownFilled style={{ color: '#87d068' }} />
                </p>
              </div>
              <div className="daily-gmv">
                <span>日销售额</span>
                <span style={{ marginLeft: '8px' }}>{formatAmount(stat.d_gmv)}</span>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <p className="gmv">
                <span>访问量</span>
                <Tooltip placement="top" title="指标说明">
                  <ExclamationCircleOutlined />
                </Tooltip>
              </p>
              <p className="gmv-amount">{formatNum(pv)}</p>
              {pvData.length && <Area {...config} />}
              <div className="daily-gmv">
                <span>日访问量</span>
                <span style={{ marginLeft: '8px' }}>{getCurrDate()}</span>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <p className="gmv">
                <span>支付笔数</span>
                <Tooltip placement="top" title="指标说明">
                  <ExclamationCircleOutlined />
                </Tooltip>
              </p>
              <p className="gmv-amount">{formatNum(pv)}</p>
              {pvData.length && <Column {...config} />}
              <div className="daily-gmv">
                <span>转化率</span>
                <span style={{ marginLeft: '8px' }}>60%</span>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <p className="gmv">
                <span>运营活动效果</span>
                <Tooltip placement="top" title="指标说明">
                  <ExclamationCircleOutlined />
                </Tooltip>
              </p>
              <p className="gmv-amount">78%</p>
              <Progress className="custom-progress" percent={78} status="active" strokeColor={{ from: '#108ee9', to: '#87d068' }} />
              <div className="roi daily-gmv">
                <p>
                  <span>周同比</span>
                  <span style={{ marginLeft: '8px' }}>{stat.wow}</span>
                  <CaretUpFilled style={{ color: '#f50', marginRight: '16px' }} />
                </p>
                <p>
                  <span>日同比</span>
                  <span style={{ marginLeft: '8px' }}>{stat.dod}</span>
                  <CaretDownFilled style={{ color: '#87d068' }} />
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </Skeleton>
    </div>
  )
}

export default Stat;