import { LightningElement, api } from "lwc";

export default class CategoryPicker extends LightningElement {
  @api categoryGroups;
  isSplit = false;
  selectedSplitRows = [];

  get nextDisabled() {
    return this.selectedSplitRows.length ? false : true;
  }

  handleSplit() {
    this.isSplit = true;
  }

  handleBack() {
    this.dispatchEvent(new CustomEvent("backpressed"));
  }
}
