public class userCheckerLWC {
	@AuraEnabled(cacheable=true)
	public static boolean search(Id inUser) {
		boolean isManager = [SELECT isManager__c FROM User WHERE Id = :inUser][0].isManager__c;
		return isManager;
	}
}