import { LightningElement, api } from "lwc";

export default class CategoryPicker extends LightningElement {
  @api categoryGroups;
  isSplit = false;

  handleSplit() {
    this.isSplit = true;
  }
}
