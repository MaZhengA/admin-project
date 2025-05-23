import React, { useEffect, useState } from 'react'
import { Line } from '@ant-design/charts';
import api from '@/services/api'
import { Card } from 'antd';

// CVR Conversion Rate 转换率
function CVR() {
  
  const [cvrData, setCvrData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/analysis/cvr');
        setCvrData(res.data?.data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [])

  const config = {
    height: 400,
    data: cvrData,
    forceFit: true,
    xField: 'time',
    yField: 'value',
    seriesField: 'type',
    padding: 30, // 调整内边距
    colorField: 'type', // 颜色有区分就能出来legend
    axis: {
      y: {
        tickLength: 5,
      }
    }
  }

  return (
    <div className='cvr-wrap'>
      <Card title="转化率">
        {cvrData.length && <Line {...config} />}
      </Card>
    </div>
  )
}

export default CVR;