import { LightningElement } from "lwc";
import getPayees from "@salesforce/apex/PreRecordedTransactionController.getPayees";
import payeeModal from "c/payeeModal";

export default class PreRecordedTransactionEntry extends LightningElement {
  size = "small";
  payees;

  async connectedCallback() {
    const payeesResult = await getPayees();
    this.payees = payeesResult;
    console.log(`this.payees:`);
    console.log(JSON.stringify(this.payees));
  }
  async handlePayeeClick() {
    const payeeClickResult = await payeeModal.open({
      size: this.size,
      content: this.payees
    });
    console.log(payeeClickResult);
  }
}
