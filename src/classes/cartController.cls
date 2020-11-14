public with sharing class cartController {

	@AuraEnabled(cacheable=true)
	public static String cartProducts(String[] inProductIds) {
		Map<Id, Integer> result = new Map<Id, Integer>{};
		for (Product__c product : [SELECT Id, Name FROM Product__c	WHERE Id in :inProductIds]) {
			Integer counter = 0;
            String i = product.Id;
			for (String id : inProductIds) {
				if (id.equals(i))
                    counter++;
			}
			result.put(i, counter);
		}
		return JSON.serialize(result);
	}
}