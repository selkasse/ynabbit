import LightningModal from "lightning/modal";
import { api } from "lwc";

// const columns = [{ label: "Payee Name", fieldName: "Name" }];
export default class PayeeModal extends LightningModal {
  @api content;
  //   columns = columns;

  value = "";

  get options() {
    let opts = [];
    this.content.forEach((payee) => {
      let option = {};
      option.label = payee.Name;
      option.value = payee.Id;
      opts.push(option);
    });
    return opts;
  }

  handleOkay() {
    this.close(`okay`);
  }
}
