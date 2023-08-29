import { Affix, Col, Form, Layout, Row, Space, Spin } from "antd";
import { useState } from "react";
import { responseSuccess } from "../lib/src/helpers/formatRespons";
import useFetch from "../lib/src/helpers/useFetch";
import FingerPrintWinnowing from "./FingerPrintWinnowing";
import FormWinnowing from "./FormWinnowing";
import GraphKGramWinnowing from "./GraphKGramWinnowing";
import KGramWinnowing from "./KGramWinnowing";
import TableWinnowing from "./TableWinnowing";
import WindowWinnowing from "./WindowWinnowing";

function App() {
  const [FormWinnowingInstance] = Form.useForm();
  const [state, setState] = useState({
    arrDatas: [],
    isLoading: false,
    arrKGram: [],
    windowJdlMhs: [],
    fingerPrintHandler: [],
  });

  const [stateDsn, setStateDsn] = useState({
    arrPenelitian: [],
  });

  const fetch = useFetch();

  const getWinnowing = async (nip = "") => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    await fetch({
      endpoint: "getJudulPenelitian",
      payload: {
        judul: FormWinnowingInstance?.getFieldValue("judul"),
        kGram: FormWinnowingInstance?.getFieldValue("kGram"),
        window: FormWinnowingInstance?.getFieldValue("window"),
        ...(nip && {
          nip,
        }),
      },
    })
      ?.then((response) => {
        const res = responseSuccess(response);
        if (res?.status === 200) {
          if (nip) {
            setStateDsn((prev) => ({
              ...prev,
              arrPenelitian: res?.data?.arrPenelitianDosen,
            }));
          } else {
            setState((prev) => ({
              ...prev,
              arrDatas: res?.data?.arrWinowing,
              arrKGram: res?.data?.arrKGram,
              windowJdlMhs: res?.data?.arrWindow,
              fingerPrintHandler: res?.data?.fingerPrintHandler,
            }));
          }
        }
      })
      ?.finally(() => {
        setState((prev) => ({
          ...prev,
          isLoading: false,
        }));
      });
  };

  const submitHandler = () => {
    FormWinnowingInstance?.validateFields()
      ?.then(async () => {
        await getWinnowing();
      })
      ?.catch(() => {
        window.scrollTo({
          top: 10,
          behavior: "smooth",
        });
      });
  };

  return (
    <Layout>
      <Row align="middle" justify="center" gutter={16}>
        <Col span={12}>
          <Affix offsetTop={30} offsetBottom={30}>
            <FormWinnowing
              FormWinnowingInstance={FormWinnowingInstance}
              state={state}
              submitHandler={submitHandler}
            />
          </Affix>
        </Col>
        <Col span={12}>
          <Spin spinning={state?.isLoading}>
            <Row gutter={[16, 32]}>
              <Col span={24}>
                <TableWinnowing
                  state={state}
                  stateDsn={stateDsn}
                  getWinnowing={getWinnowing}
                  FormWinnowingInstance={FormWinnowingInstance}
                />
              </Col>
              <Col span={24}>
                <GraphKGramWinnowing state={state} />
              </Col>
              <Col span={24}>
                <KGramWinnowing state={state} />
              </Col>

              <Col span={24}>
                <WindowWinnowing state={state} />
              </Col>
              <Col span={24}>
                <FingerPrintWinnowing state={state} />
              </Col>
            </Row>
          </Spin>
        </Col>
      </Row>
    </Layout>
  );
}

export default App;
