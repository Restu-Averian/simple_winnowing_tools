import { Badge, Space, Typography } from "antd";
import WrapperComp from "./WrapperComp";

const KGramWinnowing = ({ state }) => {
  return (
    <WrapperComp>
      <div style={{ textAlign: "center", padding: "10px 0px" }}>
        <Typography.Text strong style={{ fontSize: 20 }}>
          K-Gram
        </Typography.Text>
      </div>

      <Space size="middle" wrap>
        {state?.arrKGram?.map((data, idx) => (
          <Badge status="default" text={data} key={idx} />
        ))}
      </Space>
    </WrapperComp>
  );
};
export default KGramWinnowing;
