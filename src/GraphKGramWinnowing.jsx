import { Column } from "@ant-design/charts";
import { Typography } from "antd";
import WrapperComp from "./WrapperComp";

const GraphKGramWinnowing = ({ state }) => {
  const config = {
    data: state?.arrDatas,
    xField: "dosenName",
    yField: "winnowingValue",
    label: {
      appendPadding: 10,
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
  };
  return (
    <WrapperComp>
      <Typography.Text strong>Graph Winnowing</Typography.Text>
      <Column {...config} />
    </WrapperComp>
  );
};
export default GraphKGramWinnowing;
