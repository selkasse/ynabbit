import { LightningElement, wire, api } from "lwc";
import getPayees from "@salesforce/apex/PreRecordedTransactionController.getPayees";
import getCategoryGroups from "@salesforce/apex/PreRecordedTransactionController.getCategoryGroups";
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
  amount = 0;
  payees;
  selectedPayeeId;
  selectedPayeeName;
  @api selectedCategoryId;
  @api selectedCategoryName;
  categoryGroups;
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

    const categoryGroupsResult = await getCategoryGroups();
    this.categoryGroups = categoryGroupsResult;

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

  handleCategoryClick() {
    this.dispatchEvent(
      new CustomEvent("categoryclick", { detail: this.categoryGroups })
    );
  }

  handleCategorySelect(event) {
    console.log(
      `received category selection in preRecordedTransactionEntry: ${JSON.stringify(
        event.detail
      )}`
    );
  }

  handlePayeeMessage(message) {
    this.selectedPayeeId = message.payeeId;
    this.selectedPayeeName = message.payeeName;
  }
}
