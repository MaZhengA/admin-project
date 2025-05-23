import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Radio, Skeleton } from "antd";
import api from "@/services/api"
import { 
  CaretUpFilled,
  CaretDownFilled 
} from '@ant-design/icons';
import { Pie } from "@ant-design/charts";
import { formatNum } from "@/utils/index";

function Category() {
  const [dataSource, setDataSource] = useState([]) 

  const [pageNum, setPageNum] = useState(1)

  const [total, setTotal] = useState(0)

  const [category, setCategory] = useState([])

  const [currentTab, setCurrentTab] = useState('total_count')
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/analysis/keywords', { params: { pageNum, pageSize: 5 } });
        setDataSource(res.data?.data);
        setTotal(res.data?.total)
      } catch (error) {
        console.error(error);
      } 
    }
    fetchData();
  }, [pageNum])

  useEffect(() => {
    const categoryData = async () => {
      try {
        const res = await api.get('/analysis/category', { params: { channel: currentTab } });
        setCategory(res.data?.data)
        setLoading(false)
      } catch (error) {
        console.error(error);
      }
    }
    categoryData();
  }, [currentTab])

  const columns = [
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: '搜索关键词',
      dataIndex: 'keyword',
      key: 'keyword',
    },
    {
      title: '搜索次数',
      dataIndex: 'count',
      key: 'count',   
      sorter: (a, b) => a.count - b.count,
    },
    {
      title: '周涨幅',
      dataIndex: 'increase',
      key: 'increase',
      sorter: (a, b) => a.increase - b.increase,
      render: (_, {increase, fluctuate}) => (
        <>
          <span style={{ marginRight: '4px' }}>{increase}%</span>
          {fluctuate === 1 ?
           <CaretUpFilled style={{ color: '#f50' }} />
          : <CaretDownFilled style={{ color: '#87d068' }} />}
        </>
      )
    }
  ];

  const changePageNum = (pageNum) => {
    setPageNum(pageNum)
  }

  const config = {
    forceFit: true,
    title: {
      title: '销售额',
      titleFill: '#000',
      titleFillOpacity: 0.88,
      titleFontWeight: 500
    },
    height: 386,
    radius: 0.9,
    innerRadius: 0.6,
    startAngle: -Math.PI,
    endAngle: Math.PI,
    padding: [20, 20, 20, 20], // 图表内边距
    margin: 20, // 图表外边距
    data: category,
    angleField: currentTab,
    colorField: 'category',
    legend: false, // 隐藏图例
    // 添加 label 配置项
    label: {
      text: (data) => `${data.category}: ${formatNum(data[currentTab])}`,
      position: 'spider'
    },
    tooltip: {
       items: [
        (d) => ({
          name: '销售额',
          value: formatNum(d[currentTab]),
        }),
      ],
    }
  }

  return (
    <div className="category-wrap">
      <Skeleton loading={loading} active>
      <Row gutter={24}>
        <Col span={12}>
          <Card title="线上热门搜索">
            <Table rowKey="id" 
              columns={columns} 
              dataSource={dataSource} 
              pagination={{ pageSize: 5, current: pageNum, total, onChange: (pageNum) => changePageNum(pageNum) }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="销售额类别占比" 
            extra={<Radio.Group value={currentTab} onChange={(e) => setCurrentTab(e.target.value)}>
            <Radio.Button value="total_count">全部渠道</Radio.Button>
            <Radio.Button value="online_count">线上</Radio.Button>
            <Radio.Button value="store_count">门店</Radio.Button>
          </Radio.Group>}
          >
            {category.length && <Pie {...config} />}
          </Card>
        </Col>
      </Row>
      </Skeleton>
    </div>
  )
}

export default Category;