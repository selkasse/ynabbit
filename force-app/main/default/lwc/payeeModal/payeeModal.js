import LightningModal from "lightning/modal";

export default class PayeeModal extends LightningModal {
  handleOkay() {
    this.close(`okay`);
  }
}