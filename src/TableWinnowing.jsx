import { Drawer, Modal, Spin, Table, Typography } from "antd";
import { useState } from "react";
import TableSidos from "../lib/src/components/TableSidos/TableSidos";
import { responseSuccess } from "../lib/src/helpers/formatRespons";
import useFetch from "../lib/src/helpers/useFetch";
import KGramWinnowing from "./KGramWinnowing";
import WrapperComp from "./WrapperComp";

const { Column } = Table;
const TableWinnowing = ({
  state,
  stateDsn,
  getWinnowing,
  FormWinnowingInstance,
}) => {
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const fetch = useFetch();

  const [detailPenelitian, setDetailPenelitian] = useState({
    arrKGram: [],
    window: [],
    judul: "",
    winnowing: [],
    loading: false,
  });

  const getWinnowinghandler = async ({ judul }) => {
    setDetailPenelitian((prev) => ({
      ...prev,
      loading: true,
    }));
    await fetch({
      endpoint: "getJudulPenelitian",
      payload: {
        judul,
        kGram: FormWinnowingInstance?.getFieldValue("kGram"),
        window: FormWinnowingInstance?.getFieldValue("window"),
        isGetAllWinnowing: false,
      },
    })
      ?.then((response) => {
        const res = responseSuccess(response);
        if (res?.status === 200) {
          setDetailPenelitian((prev) => ({
            ...prev,
            winnowing: res?.data?.arrWinowing,
            arrKGram: res?.data?.arrKGram,
            window: res?.data?.windowJdlMhs,
            // fingerPrintHandler: res?.data?.fingerPrintHandler,
          }));
        }
      })
      ?.finally(() => {
        setDetailPenelitian((prev) => ({
          ...prev,
          loading: false,
        }));
      });
  };

  return (
    <WrapperComp>
      <TableSidos
        pageSize={5}
        tableLayout="fixed"
        arrDatas={state?.arrDatas}
        onRow={(record) => {
          return {
            onClick: async () => {
              await getWinnowing(record?.nip);

              setOpen(true);
            },
          };
        }}
      >
        <Column title="Nama Dosen" dataIndex="dosenName" />
        <Column title="Nilai Winnowing" dataIndex="winnowingValue" />
      </TableSidos>

      <Modal open={open} onCancel={() => setOpen(false)}>
        <Typography.Text strong>
          {stateDsn?.arrPenelitian?.[0]?.dosenName}
        </Typography.Text>
        <Spin spinning={detailPenelitian?.loading}>
          <TableSidos
            pageSize={5}
            tableLayout="fixed"
            arrDatas={stateDsn?.arrPenelitian?.[0]?.judulPenelitian?.map(
              (data) => ({ penelitian: data })
            )}
            onRow={(record) => {
              return {
                onClick: async () => {
                  setDetailPenelitian((prev) => ({
                    ...prev,
                    judul: record?.penelitian,
                  }));
                  await getWinnowinghandler({
                    judul: record?.penelitian,
                  });
                  setOpenDrawer(true);
                  // setOpen(true);
                },
              };
            }}
          >
            <Column title="Judul Penelitian" dataIndex="penelitian" />
          </TableSidos>
        </Spin>
      </Modal>

      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Typography.Text strong>{detailPenelitian?.judul}</Typography.Text>

        <KGramWinnowing state={detailPenelitian} />
      </Drawer>
    </WrapperComp>
  );
};
export default TableWinnowing;
