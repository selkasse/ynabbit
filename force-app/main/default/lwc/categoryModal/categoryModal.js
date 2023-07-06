import LightningModal from "lightning/modal";
import { api, wire } from "lwc";

import { publish, MessageContext } from "lightning/messageService";
import YNABBITMessageChannel from "@salesforce/messageChannel/YNABBITMessageChannel__c";

export default class CategoryModal extends LightningModal {
  @api content;
  isSplit = false;

  @wire(MessageContext)
  messageContext;

  connectedCallback() {
    console.log(`this.content: ${JSON.stringify(this.content)}`);
  }
  handleSplit() {
    this.isSplit = true;
  }
}