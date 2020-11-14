import { LightningElement, wire, api, track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import searchProducts from '@salesforce/apex/productsController.searchProducts';
export default class ProductsList extends NavigationMixin(LightningElement) {
	@api searchTerm;
	@api filterFamily;
	@api filterType;
	AccountId;
	AccountName;
	@wire(searchProducts, {searchTerm: '$searchTerm', filterType: '$filterType', filterFamily: '$filterFamily'})
	products;
	productsInCart = [];
	@api showModal;
    @api
	handleSearchTermChange(event) {
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
		}, 300);
	}
	get hasResults() {
		return (this.products.data.length > 0);
	}
	handleProductView(event) {
    		const productId = event.detail;
    		this[NavigationMixin.GenerateUrl]({
    			type: 'standard__recordPage',
    			attributes: {
    				recordId: productId,
    				objectApiName: 'Product__c',
    				actionName: 'view',
    			},
    		}).then(url => { window.open(url) });
    	}
    handleAddedToCart(event) {
        this.productsInCart = [...this.productsInCart, event.detail];
        }
    closeModal() {
        this.showModal = false;
    }
    @api
    showModalPopup(AccountId, AccountName) {
        this.AccountName = AccountName;
        this.AccountId = AccountId;
        this.showModal = true;
    }

}