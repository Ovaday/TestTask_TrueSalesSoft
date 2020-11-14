@IsTest
public class cartControllerTest {
	@testSetup
	static void createProducts() {
		List<Product__c> products = new List<Product__c>();
		products.add(new Product__c(
			Name = 'Product 1 test',
            Type__c = 'Type_2',
			Family__c = 'Family 1'
			)
		);
		products.add(new Product__c(
			Name = 'Product 2 test',
            Type__c = 'Type_3',
			Family__c = 'Family 2'
			)
		);
		insert products;
	}
	
	@isTest
	static void testCartProducts() {
		List<Id> testProducts = new List<Id>();
		List<Product__c> products = [SELECT Id from Product__c];
		testProducts.add(products[0].Id);
		testProducts.add(products[1].Id);
		testProducts.add(products[1].Id);
		String result = cartController.cartProducts(testProducts);
		System.assertEquals('{"' + products[1].Id + '":2,"' + products[0].Id + '":1}', result);
	}
}