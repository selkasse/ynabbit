import { LightningElement, api } from "lwc";

const columns = [
  { label: "Name", fieldName: "Name" },
  { label: "Amount", fieldName: "Available__c", type: "currency" }
];

export default class Category extends LightningElement {
  @api category;
  @api showCheckbox;
  columns = columns;
  data;
  hasData = false;

  connectedCallback() {
    console.log(`this.category: ${JSON.stringify(this.category)}`);
    let data = [];
    data.push(this.category);
    this.data = data;
    console.log(`this.data: ${this.data}`);
  }

  renderedCallback() {
    this.hasData = true;
  }
  handleCategoryClick() {
    console.log(
      `you clicked ${this.data[0].Name} with Id of ${this.data[0].Id}`
    );
  }
}
