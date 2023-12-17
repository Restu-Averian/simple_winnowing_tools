import { Col, Row, Typography } from "antd";

const TitlePage = () => {
  return (
    <Row>
      <Col span={24} style={{ textAlign: "center" }}>
        <Typography.Title>Winnowing Tools</Typography.Title>
      </Col>
      <Col span={24} style={{ textAlign: "center" }}>
        <Typography.Paragraph>
          Winnowing serves as a tool for spotting plagiarism.
        </Typography.Paragraph>
      </Col>
    </Row>
  );
};
export default TitlePage;
