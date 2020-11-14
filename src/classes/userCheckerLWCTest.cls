@isTest
public class userCheckerLWCTest {
    public static testMethod void testRunAsTrue() {
        Profile p = [SELECT Id FROM Profile WHERE Name='Standard User']; 
        User u = new User(Alias = 'tests', Email='testesestr@testtesteets.com', 
            EmailEncodingKey='UTF-8', LastName='Testingtest', LanguageLocaleKey='en_US', 
            LocaleSidKey='en_US', ProfileId = p.Id, isManager__c = true, 
            TimeZoneSidKey='America/Los_Angeles', UserName='testesestr@testtesteets.com');
        System.runAs(u) {
            Id profileId = UserInfo.getUserId();
			boolean result = userCheckerLWC.search(profileId);
        	System.assertEquals(true, result);
        }
    }
    public static testMethod void testRunAsFalse() {
        Profile p = [SELECT Id FROM Profile WHERE Name='Standard User']; 
        User u = new User(Alias = 'testts', Email='testesestrt@testtesteets.com', 
            EmailEncodingKey='UTF-8', LastName='Testingtestt', LanguageLocaleKey='en_US', 
            LocaleSidKey='en_US', ProfileId = p.Id, isManager__c = false, 
            TimeZoneSidKey='America/Los_Angeles', UserName='testesestrt@testtesteets.com');
        System.runAs(u) {
            Id profileId = UserInfo.getUserId();
			boolean result = userCheckerLWC.search(profileId);
        	System.assertEquals(false, result);
        }
    }
}