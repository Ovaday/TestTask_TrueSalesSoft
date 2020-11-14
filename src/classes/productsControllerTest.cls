@IsTest
public class productsControllerTest {
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
		products.add(new Product__c(
			Name = 'Product 3 test',
			Type__c = 'Type_1',
            Family__c = 'Family 3'
			)
		);
        products.add(new Product__c(
			Name = 'Product 4 test',
			Type__c = 'Type_3',
            Family__c = 'Family 1'
			)
		);
		insert products;
	}


	@isTest
	static void testFilters() {
		List<Product__c> result = productsController.searchProducts('', '', '');
		System.assertEquals(result.size(), 4);
        
        result = productsController.searchProducts('2', '', 'Family 2');
		System.assertEquals(result.size(), 1);
        
		result = productsController.searchProducts('3', 'type_1', '');
		System.assertEquals(result.size(), 1);
        
        result = productsController.searchProducts('1', 'type_2', 'Family 1');
		System.assertEquals(result.size(), 1);
        
        result = productsController.searchProducts('test', '', '');
		System.assertEquals(result.size(), 4);
	}

	@isTest
	static void testSearch() {
		List<Product__c> result = productsController.getAllProducts();
		System.assertEquals(result.size(), 4);
	}
}