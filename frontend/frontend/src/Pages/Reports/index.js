import { Flex, Progress, Slider, Typography, Calendar, theme, Col, Divider, Row, Card } from 'antd';
import React from 'react' 

const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
};
  
function Reports() {
  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const style = {
    background: '#f0f2f5',
    padding: '8px 0',
    textAlign: 'center',
    borderRadius: '4px',
    marginBottom: '8px'
  };

  const [stepsCount, setStepsCount] = React.useState(5);
  const [stepsGap, setStepsGap] = React.useState(7);

  return (
    <>
      <div>
        <Typography.Title level={3}>Reports & Analysis</Typography.Title>
        <Divider>Core Genres</Divider>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <div style={style}>Fiction</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>Non-Fiction</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>Science & Technology</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>History & Politics</div>
          </Col>
          
          <Col className="gutter-row" span={6}>
            <div style={style}>Arts & Literature</div>
          </Col>
          
          <Col className="gutter-row" span={6}>
            <div style={style}>Business & Economics</div>
          </Col>
          
          <Col className="gutter-row" span={6}>
            <div style={style}>Education & References</div>
          </Col>

          
          <Col className="gutter-row" span={6}>
            <div style={style}>Health & Medicine</div>
          </Col>

          
          <Col className="gutter-row" span={6}>
            <div style={style}>Religion & Philosophy</div>
          </Col>

    
        </Row>
      </div>

      <Row gutter={16}>
      <div style={wrapperStyle}>
          <Calendar fullscreen={false} onPanelChange={onPanelChange} />
        <Col span={8}>
          </Col>
          
        
        </div>
        
        <Col span={8}>
          <Card title="Available vs Borrowed books." variant="borderless" span={6}>

          <Typography.Title level={ 5}>Visual Optimization</Typography.Title>
      <Typography.Title level={5}>Custom count:</Typography.Title>
      <Slider min={2} max={10} value={stepsCount} onChange={setStepsCount} />
      <Typography.Title level={5}>Custom gap:</Typography.Title>
      <Slider step={4} min={0} max={40} value={stepsGap} onChange={setStepsGap} />
      <Flex wrap gap="middle" style={{ marginTop: 16 }}>
        <Progress
          type="dashboard"
          steps={8}
          percent={50}
          trailColor="rgba(0, 0, 0, 0.06)"
          strokeWidth={20}
        />
        <Progress
          type="circle"
          percent={100}
          steps={{ count: stepsCount, gap: stepsGap }}
          trailColor="rgba(0, 0, 0, 0.06)"
          strokeWidth={20}
        />
      </Flex>
    
          

        </Card>
        
          </Col> 
        
          

      <div>
          <Col span={25}>
        <Card title="Active Members" variant="borderless">
              <Flex gap="small" wrap>
                <Progress type="circle" percent={75} />
                <Progress type="circle" percent={70} status="exception" />
                <Progress type="circle" percent={100} />
                
              </Flex>
              <span style={{ marginLeft: '8px', marginTop:'8px' }}>
                <Typography.Title level={5}>Active, inactive and Expired members</Typography.Title>
              </span>
      </Card>
    </Col>
        


      </div>  

        

      </Row>

      
    </>
  );
};

export default Reports;
