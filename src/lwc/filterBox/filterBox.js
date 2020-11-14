import { LightningElement, track, wire} from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Product__c';
import TYPE_FIELD from '@salesforce/schema/Product__c.Type__c';
import FAMILY_FIELD from '@salesforce/schema/Product__c.Family__c';

export default class filterBox extends LightningElement {
    @track value;
    @track FamilyValue;
    @track TypeValue;

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: TYPE_FIELD})
    TypePicklistValues;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: FAMILY_FIELD})
    FamilyPicklistValues;

    handleChangeFamily(event) {
        this.FamilyValue = event.detail.value;
        this.dispatchEvent(new CustomEvent('familychange', {detail:  event.detail.value }));
    }
    handleChangeType(event) {
        this.TypeValue = event.detail.value;
        this.dispatchEvent(new CustomEvent('typechange', {detail:  event.detail.value }));
    }
    handleResetClick() {
        this.FamilyValue = undefined;
        this.TypeValue = undefined;
        this.dispatchEvent(new CustomEvent('filterreset'));
    }
}