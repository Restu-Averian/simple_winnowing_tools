import BtnSidos from "../lib/src/components/BtnSidos";
import Field from "../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../lib/src/components/FormSidos/form/FormSidos";
import WrapperComp from "./WrapperComp";

const FormWinnowing = ({ state, submitHandler, FormWinnowingInstance }) => {
  return (
    <WrapperComp>
      <FormSidos
        form={FormWinnowingInstance}
        initialValues={{
          window: 11,
          kGram: 3,
        }}
      >
        <Field type="textarea" name="judul" required label="Judul" />
        <Field type="number" name="kGram" required label="K-Gram" />
        <Field type="number" name="window" required label="Window" />
        <BtnSidos
          loading={state?.isLoading}
          position="center"
          onClick={() => {
            submitHandler();
          }}
          type="primary"
        >
          Check Winnowing
        </BtnSidos>
      </FormSidos>
    </WrapperComp>
  );
};
export default FormWinnowing;
