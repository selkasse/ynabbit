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
}
