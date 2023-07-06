public with sharing class PreRecordedTransactionController {
  @AuraEnabled
  public static List<Payee__c> getPayees() {
    List<Payee__c> payees = new List<Payee__c>();

    try {
      payees = [SELECT Id, Name FROM Payee__c];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }

    return payees;
  }

  @AuraEnabled
  public static List<Category_Group__c> getCategoryGroups() {
    List<Category_Group__c> categoryGroups = new List<Category_Group__c>();
    try {
      categoryGroups = [
        SELECT Id, Name, (SELECT Id, Name, Available__c FROM Categories__r)
        FROM Category_Group__c
      ];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }

    return categoryGroups;
  }
}
