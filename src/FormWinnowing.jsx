import { Typography } from "antd";
import Field from "../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../lib/src/components/FormSidos/form/FormSidos";
import { Fragment } from "react";

const FormWinnowing = ({
  FormWinnowingInstance,
  totalWinnowing,
  winnowing,
  setWinnowing,
}) => {
  return (
    <Fragment>
      <Typography.Title level={4}>
        Total Winnowing : {totalWinnowing}
      </Typography.Title>
      <FormSidos
        scrollToFirstError={{
          behavior: "smooth",
        }}
        form={FormWinnowingInstance}
        initialValues={{
          window: 11,
          kGram: 3,
        }}
      >
        <Field
          type="textarea"
          name="judul"
          required
          label="Text"
          onChange={() => {
            if (winnowing?.data?.length > 0) {
              setWinnowing((prev) => ({
                ...prev,
                data: [],
              }));
            }
          }}
        />
        <Field
          type="number"
          name="kGram"
          required
          label="K-Gram"
          formItemObj={{
            tooltip:
              "Dividing a text into subsequences based on the specified length k",
          }}
          onChange={() => {
            if (winnowing?.data?.length > 0) {
              setWinnowing((prev) => ({
                ...prev,
                data: [],
              }));
            }
          }}
        />
        <Field
          type="number"
          name="window"
          required
          label="Window"
          formItemObj={{
            tooltip: "Shifting mechanism used to iteratively examine k-grams",
          }}
          onChange={() => {
            if (winnowing?.data?.length > 0) {
              setWinnowing((prev) => ({
                ...prev,
                data: [],
              }));
            }
          }}
        />
      </FormSidos>
    </Fragment>
  );
};
export default FormWinnowing;
