import { LightningElement, api, wire } from "lwc";

import { publish, MessageContext } from "lightning/messageService";
import YNABBITMessageChannel from "@salesforce/messageChannel/YNABBITMessageChannel__c";
import EmailPreferencesStayInTouchReminder from "@salesforce/schema/User.EmailPreferencesStayInTouchReminder";

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

  handleRowSelection(event) {
    console.log(`you selected ${JSON.stringify(event.detail.selectedRows)}`);
    // TODO: if event.detail.selectedRows is NOT empty, fire an event to add this category to the array in categoryPicker
    // TODO: if event.detail.selectedRows is an empty Array, fire an event to remove this category from the array in categoryPicker
  }
}
