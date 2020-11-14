import { LightningElement, api} from 'lwc';

export default class ProductTile extends LightningElement {
    @api product;
    handleOpenRecordClick() {
	    const selectEvent = new CustomEvent('productview', {
		    detail: this.product.Id
	    });
	    this.dispatchEvent(selectEvent);
    }
    handleAddToCart(event) {
        const addedEvent = new CustomEvent('addedtocart', {
        		detail: this.product.Id
        });
        this.dispatchEvent(addedEvent);
    }
}