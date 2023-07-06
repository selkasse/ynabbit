import { LightningElement, api } from "lwc";

export default class Category extends LightningElement {
  @api category;
  @api showCheckbox;
  //   showCheckbox;
  id;
  name;
  available;

  connectedCallback() {
    this.id = this.category.Id;
    this.name = this.category.Name;
    this.available = this.category.Available__c;
  }

  handleCategoryClick() {
    console.log(`you clicked ${this.name} with Id of ${this.id}`);
  }
}
