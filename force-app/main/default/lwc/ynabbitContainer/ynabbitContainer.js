import { LightningElement, wire } from "lwc";
import {
  subscribe,
  unsubscribe,
  APPLICATION_SCOPE,
  MessageContext
} from "lightning/messageService";
import YNABBITMessageChannel from "@salesforce/messageChannel/YNABBITMessageChannel__c";

export default class YnabbitContainer extends LightningElement {
  showTransactionEntry = true;
  showCategoryPicker = false;
  categoryGroups;
  selectedCategoryId;
  selectedCategoryName;

  subscription = null;

  @wire(MessageContext)
  messageContext;

  connectedCallback() {
    this.subscribeToMessageChannel();
  }

  disconnectedCallback() {
    this.unsubscribeToMessageChannel();
  }

  subscribeToMessageChannel() {
    if (!this.subscription) {
      this.subscription = subscribe(
        this.messageContext,
        YNABBITMessageChannel,
        (message) => this.handleCategoryMessage(message),
        { scope: APPLICATION_SCOPE }
      );
    }
  }

  unsubscribeToMessageChannel() {
    unsubscribe(this.subscription);
    this.subscription = null;
  }

  handleCategoryMessage(message) {
    console.log(`received ${JSON.stringify(message)} in handleCategoryMessage`);
    this.selectedCategoryId = message.categoryId;
    this.selectedCategoryName = message.categoryName;
    this.showTransactionEntry = true;
    this.showCategoryPicker = false;
  }

  handleCategoryEvent(event) {
    this.showTransactionEntry = false;
    this.showCategoryPicker = true;
    this.categoryGroups = event.detail;
  }

  handleBackPressed() {
    this.showCategoryPicker = false;
    this.showTransactionEntry = true;
  }
}
