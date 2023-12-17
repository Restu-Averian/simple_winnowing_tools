import { Col, Form, Grid, Layout, Row } from "antd";
import FormWinnowing from "./FormWinnowing";
import {
  arrKGramHandler,
  jaccardSimilarityHandler,
  preProcessingText,
  winnowingHandler,
} from "./helpers/winnowing/Winnowing";
import DataBanding from "./components/DataBanding";
import WrapperComp from "./WrapperComp";
import BtnSidos from "../lib/src/components/BtnSidos";
import { Fragment, useState } from "react";
import ModalDataBinding from "./components/ModalDataBinding";
import TableWinnowing from "./TableWinnowing";
import TitlePage from "./components/TitlePage";

function App() {
  const { xs } = Grid.useBreakpoint();

  const [openModal, setOpenModal] = useState(false);
  const [winnowing, setWinnowing] = useState({
    data: [],
    total: 0,
    kGram: [],
  });

  const [FormWinnowingInstance] = Form.useForm();
  const [FormDataBanding] = Form.useForm();

  const valueDataBanding = Form.useWatch("arrBanding", FormDataBanding);

  const calculateWinnowing = () => {
    const { judul, kGram, window } = FormWinnowingInstance.getFieldsValue();

    FormWinnowingInstance?.validateFields()?.then(() => {
      const winnowingResult = winnowingHandler({
        kGramCount: kGram,
        strJudulMhs: judul,
        windowCount: window,
        arrJudulDosen: valueDataBanding?.map((data) => data?.text),
      });

      const eachWinnowing = [];

      valueDataBanding?.forEach((data) => {
        eachWinnowing?.push({
          text: data?.text,
          result: jaccardSimilarityHandler({
            kGramCount: kGram,
            windowCount: window,
            strJudulMhs: preProcessingText(judul),
            strJudulPenelitian: preProcessingText(data?.text),
          }),
          kGram: arrKGramHandler({
            str: preProcessingText(data?.text),
            kGramCount: kGram,
          }),
        });
      });

      setWinnowing((prev) => ({
        ...prev,
        total: winnowingResult,
        data: eachWinnowing,
      }));
    });
  };
  return (
    <Layout>
      <Row
        align="top"
        justify="center"
        gutter={[16, 32]}
        style={{ padding: xs ? 12 : 30 }}
      >
        <WrapperComp style={{ padding: 0, marginBottom: 24 }}>
          <Col span={24}>
            <TitlePage />
          </Col>
        </WrapperComp>
        <Col span={xs ? 24 : 12}>
          <WrapperComp>
            <FormWinnowing
              winnowing={winnowing}
              setWinnowing={setWinnowing}
              FormWinnowingInstance={FormWinnowingInstance}
              totalWinnowing={winnowing?.total}
            />
          </WrapperComp>
        </Col>

        <Col span={xs ? 24 : 12}>
          <WrapperComp title="Data Banding">
            <DataBanding form={FormDataBanding} />
            {valueDataBanding?.length >= 3 && (
              <BtnSidos position="center" onClick={() => setOpenModal(true)}>
                See More
              </BtnSidos>
            )}
            <ModalDataBinding
              form={FormDataBanding}
              visible={openModal}
              onClose={() => setOpenModal(false)}
            />
          </WrapperComp>
        </Col>

        <Col span={24}>
          <WrapperComp>
            <BtnSidos
              position="center"
              onClick={() => {
                FormWinnowingInstance.submit();
                calculateWinnowing();
              }}
              type="primary"
            >
              Check Winnowing
            </BtnSidos>
          </WrapperComp>
        </Col>
        {winnowing?.data?.length > 0 ? (
          <Col span={24}>
            <TableWinnowing arrDatas={winnowing?.data} />
          </Col>
        ) : (
          <Fragment />
        )}
      </Row>
    </Layout>
  );
}

export default App;
