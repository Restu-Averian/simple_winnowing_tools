import { Col, Form, Grid, Row, Upload } from "antd";
import {
  InboxOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { read, utils } from "xlsx";
import Field from "../../lib/src/components/FormSidos/fields/Field";
import "../style/dataBanding.css";
import { preProcessingText } from "../helpers/winnowing/Winnowing";
import BtnSidos from "../../lib/src/components/BtnSidos";

const ButtonAddRow = ({ fields, add, remove, name, size, inModal = false }) => {
  const { xs } = Grid.useBreakpoint();

  return (
    <Row gutter={xs ? 16 : 8}>
      {fields?.length !== 1 && (
        <Col span={12}>
          <MinusCircleOutlined
            onClick={() => remove(name)}
            style={{ fontSize: size, marginTop: 20 }}
          />
        </Col>
      )}
      {name + 1 === fields?.length && (fields?.length < 3 || inModal) && (
        <Col span={12}>
          <PlusCircleOutlined
            onClick={() => add({ text: "" })}
            style={{ fontSize: size, marginTop: 20 }}
          />
        </Col>
      )}
    </Row>
  );
};

const DataBanding = ({ form, inModal = false }) => {
  const { xs } = Grid.useBreakpoint();

  const fileContoh = "sample_file.xlsx";

  const excelToJson = ({ file }) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = utils.sheet_to_json(worksheet);

        const dataImported = json.map((data) => ({ text: data?.text }));

        form?.setFieldsValue({ arrBanding: dataImported });
      };
      reader.readAsBinaryString(file);
    }
  };

  return (
    <Form form={form} initialValues={{ arrBanding: [{ text: "" }] }}>
      <Form.Item>
        <Upload.Dragger
          name="files"
          beforeUpload={() => false}
          onChange={excelToJson}
          maxCount={1}
          listType="picture"
        >
          <BtnSidos>Upload</BtnSidos>
        </Upload.Dragger>
        <a href={fileContoh} download>
          Download Example File
        </a>
      </Form.Item>

      <div className="wrapper-data-banding">
        <Form.List name="arrBanding">
          {(fields, { add, remove }) => {
            const dataFields = inModal ? fields : fields?.slice(0, 3);
            return (
              <>
                {dataFields.map(({ key, name }) => (
                  <Row key={key} gutter={16} align="middle">
                    <Col span={xs ? 17 : 20}>
                      <Field
                        type="textarea"
                        name={[name, "text"]}
                        formItemObj={{
                          wrapperCol: { span: 24 },
                        }}
                        rules={[
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              const arrBanding = getFieldValue("arrBanding")
                                ?.map((data) => preProcessingText(data?.text))
                                ?.filter((_, idx) => idx !== name);

                              const isSameData = arrBanding?.includes(
                                preProcessingText(value)
                              );

                              if (isSameData) {
                                return Promise.reject(
                                  new Error("Ga boleh data sama")
                                );
                              }
                              return Promise.resolve();
                            },
                          }),
                        ]}
                      />
                    </Col>
                    <Col span={xs ? 7 : 4}>
                      <ButtonAddRow
                        add={add}
                        fields={fields}
                        name={name}
                        remove={remove}
                        size={30}
                        inModal={inModal}
                      />
                    </Col>
                  </Row>
                ))}
              </>
            );
          }}
        </Form.List>
      </div>
    </Form>
  );
};
export default DataBanding;
