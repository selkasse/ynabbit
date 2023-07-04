import { LightningElement } from "lwc";
import payeeModal from "c/payeeModal";

export default class PreRecordedTransactionEntry extends LightningElement {
  size = "large";
  async handlePayeeClick() {
    const payeeClickResult = await payeeModal.open({
      size: this.size
    });
    console.log(payeeClickResult);
  }
}