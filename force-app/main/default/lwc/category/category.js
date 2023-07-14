import { LightningElement, api, wire } from "lwc";

import { publish, MessageContext } from "lightning/messageService";
import YNABBITMessageChannel from "@salesforce/messageChannel/YNABBITMessageChannel__c";

const columns = [
  {
    label: "Name",
    fieldName: "Name"
  },
  {
    label: "Amount",
    fieldName: "Available__c",
    type: "currency",
    initialWidth: 100
  }
];

export default class Category extends LightningElement {
  @api category;
  @api showCheckbox;
  columns = columns;
  data;
  hasData = false;

  @wire(MessageContext)
  messageContext;

  connectedCallback() {
    let data = [];
    data.push(this.category);
    this.data = data;
  }

  renderedCallback() {
    this.hasData = true;
  }
  handleCategoryClick() {
    console.log(
      `you clicked ${this.data[0].Name} with Id of ${this.data[0].Id}`
    );
    const payload = {
      categoryId: this.data[0].Id,
      categoryName: this.data[0].Name
    };
    publish(this.messageContext, YNABBITMessageChannel, payload);
  }
}
