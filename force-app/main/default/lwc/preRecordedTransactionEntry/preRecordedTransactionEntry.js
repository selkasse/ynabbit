import { LightningElement, wire } from "lwc";
import getPayees from "@salesforce/apex/PreRecordedTransactionController.getPayees";
import payeeModal from "c/payeeModal";

import {
  subscribe,
  unsubscribe,
  APPLICATION_SCOPE,
  MessageContext
} from "lightning/messageService";
import YNABBITMessageChannel from "@salesforce/messageChannel/YNABBITMessageChannel__c";

export default class PreRecordedTransactionEntry extends LightningElement {
  size = "small";
  payees;
  selectedPayeeId;
  selectedPayeeName;
  subscription = null;

  @wire(MessageContext)
  messageContext;

  subscribeToMessageChannel() {
    if (!this.subscription) {
      this.subscription = subscribe(
        this.messageContext,
        YNABBITMessageChannel,
        (message) => this.handlePayeeMessage(message),
        { scope: APPLICATION_SCOPE }
      );
    }
  }

  unsubscribeToMessageChannel() {
    unsubscribe(this.subscription);
    this.subscription = null;
  }

  async connectedCallback() {
    const payeesResult = await getPayees();
    this.payees = payeesResult;
    this.subscribeToMessageChannel();
  }

  disconnectedCallback() {
    this.unsubscribeToMessageChannel();
  }

  async handlePayeeClick() {
    await payeeModal.open({
      size: this.size,
      content: this.payees
    });
  }

  handlePayeeMessage(message) {
    this.selectedPayeeId = message.payeeId;
    this.selectedPayeeName = message.payeeName;
  }
}
