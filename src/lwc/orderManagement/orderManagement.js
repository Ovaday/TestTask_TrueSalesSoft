import { LightningElement, api, wire, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import USER_ID from '@salesforce/user/Id';
import { getRecord } from 'lightning/uiRecordApi';
import userChecker from '@salesforce/apex/userCheckerLWC.search';
export default class orderManagement extends LightningElement {
    searchTerm = "";
    filterType = "";
    filterFamily = "";
    @track showModal = false;
    @track showNegativeButton;
    handleChangeType(event) {
        this.filterType = event.detail;
    }
    handleChangeFamily(event) {
        this.filterFamily = event.detail;
    }
    handleResetClick() {
        this.filterFamily = "";
        this.filterType = "";
    }
    closeModal() {
        this.showModal = false;
    }
    showModalPopup() {
        this.showModal = true;
    }
    handleCartClick() {
        this.template.querySelector('c-products-list').showModalPopup(this.accountId, this.accountName);
    }

    @track objUser = {};
    @wire(getRecord, { recordId: USER_ID, fields: ['User.IsManager__c'] })
    userData({error, data}) {
        if(data) {
            window.console.log('data ====> '+JSON.stringify(data));
            let objCurrentData = data.fields;
            this.objUser = {
                IsManager : objCurrentData.IsManager__c.value,
            }
        }
        else if(error) {
            window.console.log('error ====> '+JSON.stringify(error))
        }
    }

    @wire(CurrentPageReference)
        getAccountIdFromUrl(currentPageReference) {
            if(currentPageReference){
                if(currentPageReference.state.c__AccountId){
                    let parameters = currentPageReference.state.c__AccountId.split('/');
                    for(let i = 0; i< parameters.length; i++){
                        if(parameters[i].startsWith("001")){
                            this.accountId = parameters[i];
                            this.errorMessages = [];
                        }
                    }
                }
                if(currentPageReference.state.c__AccountName){
                     let parameters = currentPageReference.state.c__AccountName.split('/');
                     for(let i = 0; i< parameters.length; i++){
                          this.accountName = parameters[i];
                          this.errorMessages = [];

                     }
                }
                if(currentPageReference.state.c__AccountNumber){
                     let parameters = currentPageReference.state.c__AccountNumber.split('/');
                     for(let i = 0; i< parameters.length; i++){
                          this.accountNumber = parameters[i];
                          this.errorMessages = [];
                     }
                }
            }
        }
}