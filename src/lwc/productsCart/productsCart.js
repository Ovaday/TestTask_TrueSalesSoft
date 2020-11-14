import {LightningElement, api, track, wire} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getCartProducts from '@salesforce/apex/cartController.cartProducts';

export default class ProductCart extends LightningElement {
    @api showNegative;
    @api showModal;
    @api accountId;
    @api accountName;
    @api productsInCart;
    @track cartRecords;
    recordsData = [];
    showCart = false;

    constructor() {
        super();
        this.showNegative = true;
        this.showModal = false;
    }
    handleNegative() {
        this.dispatchEvent(new CustomEvent('negative'));
    }
    handleClose() {
        this.dispatchEvent(new CustomEvent('close'));
    }
    @wire(getCartProducts, {inProductIds : '$productsInCart'})
    wiredProductInCart({error, data}) {
        if (data) {
            this.cartRecords = JSON.parse(data.toString());
            this.recordsData = [];
            for (let i in this.cartRecords) {
                this.recordsData.push({id: i, count: this.cartRecords[i] })
            }
        }
    }
    handleCartCheckOut() {
        if (this.recordsData.length !== 0)
            this.template.querySelector('c-checkout-creator').createOrder(this.recordsData, this.accountId, this.accountName);
        else {
             this.dispatchEvent(
                 new ShowToastEvent({
                     title: 'Cart is empty, checkout cannot be processed',
                     variant: 'error',
                 })
             );
        }
    }
    @api
    changeCartView() {
        this.showCart = true;
    }
    @api
    setProductsInCart(value) {
        this.productsInCart = value;
        this.showCart = true;
    }
}