@IsTest
private class OrderItemTriggerTest {
    @testSetup
	public static void createOrder() {
		Profile p = [SELECT Id FROM Profile WHERE Name='Standard User']; 
        User u = new User(Alias = 'tests', Email='testesestr@testtesteets.com', 
            EmailEncodingKey='UTF-8', LastName='Testingtest', LanguageLocaleKey='en_US', 
            LocaleSidKey='en_US', ProfileId = p.Id, isManager__c = true, 
            TimeZoneSidKey='America/Los_Angeles', UserName='testesestr@testtesteets.com');
		insert u;

		List<Account> accounts = new List<Account>{
			new Account(
				Name = 'Account to test 123',
				AccountNumber = '123456',
				OwnerId = UserInfo.getUserId()
			)};
		insert accounts;

		List<Product__c> products = new List<Product__c> {
			new Product__c(
				Name = 'Product 1 test',
            	Type__c = 'Type_2',
				Family__c = 'Family 1',
                Price__c = 200
			),
			new Product__c(
				Name = 'Product 2 test',
            	Type__c = 'Type_3',
				Family__c = 'Family 2',
                Price__c = 1000
			),
            new Product__c(
				Name = 'Product 3 test',
				Type__c = 'Type_1',
            	Family__c = 'Family 3',
                Price__c = 2000
			)};
		insert products;

		List<Order__c> orders = new List<Order__c>{
			new Order__c(
				Name = 'Order to test',
				AccountId__c = accounts[0].Id,
				TotalPrice__c = 0,
                TotalProductCount__c = 0
			)};
		insert orders;

		List<OrderItem__c> orderItems = new List<OrderItem__c>{
			new OrderItem__c(
				Name = 'Item to test 123',
				ProductId__c = products[0].Id,
				OrderId__c = orders[0].Id,
				Quantity__c = 3
			),
			new OrderItem__c(
				Name = 'Item to test 321',
				ProductId__c = products[1].Id,
				OrderId__c = orders[0].Id,
				Quantity__c = 2
			),
            new OrderItem__c(
				Name = 'Item to test 567',
				ProductId__c = products[2].Id,
				OrderId__c = orders[0].Id,
				Quantity__c = 10
			)};
		insert orderItems;
	}

	@isTest
	static void testOrderTrigger() {
		Order__c Order = [SELECT TotalPrice__c, TotalProductCount__c from Order__c limit 1];
		System.assertEquals(22600, Order.TotalPrice__c);
		System.assertEquals(15, Order.TotalProductCount__c);
	}
}