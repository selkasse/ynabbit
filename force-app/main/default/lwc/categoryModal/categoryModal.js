import LightningModal from "lightning/modal";
import { api } from "lwc";

export default class CategoryModal extends LightningModal {
  @api content;
  isSplit = false;

  handleSplit() {
    this.isSplit = true;
  }
}
