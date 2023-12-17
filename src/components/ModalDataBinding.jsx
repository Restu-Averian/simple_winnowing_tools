import { Modal } from "antd";
import DataBanding from "./DataBanding";

const ModalDataBinding = ({ form, onClose, visible }) => {
  return (
    <Modal open={visible} onCancel={onClose} title="Data Banding" width={1200}>
      <DataBanding form={form} inModal />
    </Modal>
  );
};
export default ModalDataBinding;
