import LightningModal from "lightning/modal";
import { api, wire } from "lwc";

import { publish, MessageContext } from "lightning/messageService";
import YNABBITMessageChannel from "@salesforce/messageChannel/YNABBITMessageChannel__c";

export default class PayeeModal extends LightningModal {
  @api content;

  @wire(MessageContext)
  messageContext;

  selectedPayee;

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
    this.selectedPayee = this.content.find(
      (option) => option.Id === event.detail.value
    );
  }

  handleOkay() {
    const payload = {
      payeeId: this.selectedPayee.Id,
      payeeName: this.selectedPayee.Name
    };
    publish(this.messageContext, YNABBITMessageChannel, payload);
    this.close(`okay`);
  }
}
