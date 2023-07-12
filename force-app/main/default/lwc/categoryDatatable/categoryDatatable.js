import LightningDatatable from "lightning/datatable";
import { loadStyle } from "lightning/platformResourceLoader";
import CustomDatatableResource from "@salesforce/resourceUrl/CustomDatatable";

export default class CategoryDatatable extends LightningDatatable {
  hasLoadedStyle = false;

  renderedCallback() {
    if (LightningDatatable.prototype.renderedCallback) {
      // Run this check to bypass lwc jest error
      LightningDatatable.prototype.renderedCallback.call(this);
    }
    if (!this.hasLoadedStyle) {
      this.hasLoadedStyle = true;
      Promise.all([loadStyle(this, CustomDatatableResource)]).then(() => {});
    }
  }
}
