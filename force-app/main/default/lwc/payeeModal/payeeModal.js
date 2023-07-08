import LightningModal from "lightning/modal";
import { api, wire } from "lwc";

import { publish, MessageContext } from "lightning/messageService";
import YNABBITMessageChannel from "@salesforce/messageChannel/YNABBITMessageChannel__c";

export default class PayeeModal extends LightningModal {
  @api content;

  @wire(MessageContext)
  messageContext;

  selectedPayeeId;
  selectedPayeeName;

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

  handleChange(event) {
    const selectedPayee = this.content.find(
      (option) => option.Id === event.detail.value
    );
    console.log(`selectedPayee: ${JSON.stringify(selectedPayee)}`);
    this.selectedPayeeId = selectedPayee.Id;
    this.selectedPayeeName = selectedPayee.Name;
  }

  handleOkay() {
    this.close(`okay`);
    if (this.selectedPayeeId) {
      const payload = {
        payeeId: this.selectedPayeeId,
        payeeName: this.selectedPayeeName
      };
      publish(this.messageContext, YNABBITMessageChannel, payload);
    }
  }
}
