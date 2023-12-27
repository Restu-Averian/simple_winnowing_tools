import { Modal } from "antd";
import DataBanding from "./DataBanding";

const ModalDataBinding = ({ form, onClose, visible }) => {
  return (
    <Modal
      open={visible}
      onOk={onClose}
      onCancel={onClose}
      title="Data Banding"
      width={1200}
      centered
    >
      <DataBanding form={form} inModal />
    </Modal>
  );
};
export default ModalDataBinding;
