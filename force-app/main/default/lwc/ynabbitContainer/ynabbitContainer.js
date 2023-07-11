import { LightningElement } from "lwc";

export default class YnabbitContainer extends LightningElement {
  showTransactionEntry = true;
  showCategoryPicker = false;
  categoryGroups;

  handleCategoryEvent(event) {
    this.showTransactionEntry = false;
    this.showCategoryPicker = true;
    this.categoryGroups = event.detail;
  }
}
