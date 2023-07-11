import { LightningElement, api } from "lwc";

export default class CategoryPicker extends LightningElement {
  @api categoryGroups;

  connectedCallback() {
    console.log(
      `categoryGroups in category picker: ${JSON.stringify(
        this.categoryGroups
      )}`
    );
  }
}
