import { Modal, Space, Typography } from "antd";
import { useState } from "react";
import BtnSidos from "../lib/src/components/BtnSidos";
import WrapperComp from "./WrapperComp";

const FingerPrintWinnowing = ({ state }) => {
  const [openSeeMore, setOpenSeeMore] = useState(false);
  return (
    <WrapperComp>
      <div style={{ textAlign: "center", padding: "10px 0px" }}>
        <Typography.Text strong style={{ fontSize: 20 }}>
          FingerPrint
        </Typography.Text>
      </div>

      <Space direction="vertical">
        {state?.fingerPrintHandler?.slice(0, 5)?.map((data) => (
          <>{JSON.stringify(data)}</>
        ))}
      </Space>
      <BtnSidos onClick={() => setOpenSeeMore(true)} position="center">
        See More
      </BtnSidos>

      <Modal
        open={openSeeMore}
        title="FingerPrint"
        onCancel={() => setOpenSeeMore(false)}
        footer={false}
      >
        <Space direction="vertical">
          {state?.fingerPrintHandler?.map((data) => (
            <>{JSON.stringify(data)}</>
          ))}
        </Space>
      </Modal>
    </WrapperComp>
  );
};
export default FingerPrintWinnowing;
