import { useState } from "react";
import { Grid, Modal, Space, Table, Tag, Typography } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";
import TableSidos from "../lib/src/components/TableSidos/TableSidos";
import BtnSidos from "../lib/src/components/BtnSidos";
import { roundUp4 } from "./helpers/winnowing/Winnowing";

const { Column } = Table;

const ModalKGram = ({ visible, onClose, dataKGram, title }) => {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      title={title}
      footer={[
        <BtnSidos onClick={() => onClose()} key="close">
          Close
        </BtnSidos>,
      ]}
    >
      <Space wrap>
        {dataKGram?.map((data, idx) => (
          <Tag key={idx}>{data}</Tag>
        ))}
      </Space>
    </Modal>
  );
};

const TableWinnowing = ({ arrDatas }) => {
  const [modalKGram, setModalKGram] = useState({
    visible: false,
    data: [],
    text: "",
  });

  const { xs } = Grid.useBreakpoint();

  return (
    <>
      <TableSidos pageSize={5} tableLayout="fixed" arrDatas={arrDatas}>
        <Column
          title="Text"
          dataIndex="text"
          render={(text) => (
            <Typography.Paragraph ellipsis={{ rows: 2, tooltip: text }}>
              {text}
            </Typography.Paragraph>
          )}
        />
        <Column
          title="Winnowing"
          dataIndex="result"
          render={(result) => roundUp4(result)}
        />
        <Column
          title="KGram"
          dataIndex="kGram"
          render={(kGram, record) => {
            return (
              <BtnSidos
                {...(xs && {
                  icon: <FileSearchOutlined />,
                  style: {
                    padding: 0,
                  },
                })}
                onClick={() =>
                  setModalKGram((prev) => ({
                    ...prev,
                    visible: true,
                    data: kGram,
                    text: record?.text,
                  }))
                }
              >
                {!xs && "See KGram Data"}
              </BtnSidos>
            );
          }}
        />
      </TableSidos>

      <ModalKGram
        title={modalKGram?.text}
        visible={modalKGram?.visible}
        onClose={() => setModalKGram((prev) => ({ ...prev, visible: false }))}
        dataKGram={modalKGram?.data}
      />
    </>
  );
};
export default TableWinnowing;
