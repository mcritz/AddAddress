j = jQuery.noConflict();
var countrySelect = j('#country');

SCEDEV = {};
SCEDEV.AddressWidget = {
    generateFormElements : function(selected_country_code, field_prefix, field_data, country_info) {
       var countryinfo = this.getCountryStateInfo(country_info,selected_country_code);
       var widgetDiv = findWidgetByPrefix(field_prefix);
       // this.resetForm(widgetDiv);
       // this.generateFieldsAndLabels(widgetDiv, countryinfo);
       // if(has_existing_data) {
           // this.populateWidget(widgetDiv, data);
       //}

    },
    getCountryStateInfo : function(countryStateInfo,countryCode){
        addressData = countryStateInfo.country;
        for (i = 0; i < addressData.length; i++) {
            if (addressData[i].code == countryCode){
                return addressData[i];
            }
        }
        throw 'No country Code Found!';
    },
    // applyChosen : function(){
    //     j('.chzn-select').chosen();
    // },
    findWidgetByPrefix : function(field_prefix){
        return j('.address_widget[name|="' + field_prefix + '"]');
    },
    clearWidget : function(element){
        element.html('');
    },
    createFields : function(addressData){
        return addressData;
    }
}
var jsonURL = 'js/widget.json';
var transitionDuration = 250;

var addressData = {};
var formCountry = "";
var countryFormType = {};
var stateLabel = "";
var states = "";

// apply Chosen jQuery plugin to form elements
var applyChosen = function(){
    j('.chzn-select').chosen();
}

var initCountryStateInfo = function(chosenCountry){
    formCountry = chosenCountry;
    j.getJSON(jsonURL,
        function(data){
            updateAddressForm(data);
        }
    )
}



var updateAddressForm = function(formData){
    addressData = j(formData)[0].country;
    console.log('addressData: \n' + addressData);
    for (i = 0; i < addressData.length; i++) {
        if (addressData[i].name == formCountry){
            matchFoundForCountry = true;
            createAddressForm(addressData[i]);
            return;
        }
    }
    if (matchFoundForCountry == false){
        matchFoundForCountry = true;
        createAddressForm(addressData[0]);
    }
}

var createAddressForm = function(formForCountry){
    matchFoundForCountry = false;
    // console.log('formForCountry.fieldOrder \n' + formForCountry.fieldOrder);
    states = "";
    labelValue  = formForCountry.name;
    stateLabel  = formForCountry.fields.state.label;
    // console.log('stateLabel: ' + stateLabel);
    if (formForCountry.fields.state.members.length > 0) {
        states = '<label for="states_' + labelValue + '">' + stateLabel + '</label><select id="states_' + labelValue + '" class="chzn-select">';
        for (s = 0; s < formForCountry.fields.state.members.length; s++ ){
            thisState = formForCountry.fields.state.members[s].name;
            states = states + '<option value="' + thisState + '">' + thisState + '</option>';
        }
        states = states + '</select><br>';
    } else {
        states = '';
    }
    if(formForCountry.fieldOrder == "Japanese"){
        j('.address_widget').html(
            '<fieldset name="' + labelValue +'"><legend>' + labelValue + '</legend>'
            + '<label for="postal_' + labelValue + '"> ' + formForCountry.fields.postal + ' 〒</label>'
            + '<input id="postal_' + labelValue + '" placeholder="' + formForCountry.fields.postal + '"><br>'
            + states
            + '<label for="city_' + labelValue + '">' + formForCountry.fields.city + '</label>'
            + '<input id="city_' + labelValue + '" placeholder="' + formForCountry.fields.city + '"><br>'
            + '<label for="street_' + labelValue + '">' + formForCountry.fields.street + '</label>'
            + '<input id="street_' + labelValue + '" placeholder="' + formForCountry.fields.street + '">'
            + '</fieldset>');
    } else if(formForCountry.fieldOrder == "European"){
        j('.address_widget').html(
            '<fieldset name="' + labelValue +'"><legend>' + labelValue + '</legend>'
            + '<label for="street_' + labelValue + '">' + formForCountry.fields.street + '</label>'
            + '<input id="street_' + labelValue + '" placeholder="' + formForCountry.fields.street + '"><br>'
            + '<label for="postal_' + labelValue + '">' + formForCountry.fields.postal + '</label>'
            + '<input id="postal_' + labelValue + '" placeholder="' + formForCountry.fields.postal + '"><br>'
            + '<label for="city_' + labelValue + '">' + formForCountry.fields.city + '</label>'
            + '<input id="city_' + labelValue + '" placeholder="' + formForCountry.fields.city + '">'
            + states
            + '</fieldset>');
    } else { // "default"
        j('.address_widget').html(
            '<fieldset name="' + labelValue +'"><legend>' + labelValue + '</legend>'
            + '<label for="street_' + labelValue + '">' + formForCountry.fields.street + '</label>'
            + '<input id="street_' + labelValue + '" placeholder="' + formForCountry.fields.street + '"><br/>'
            + '<label for="city_' + labelValue + '">' + formForCountry.fields.city + '</label>'
            + '<input id="city_' + labelValue + '" placeholder="' + formForCountry.fields.city + '"><br>'
            + states
            + '<label for="postal_' + labelValue + '">' + formForCountry.fields.postal + '</label>'
            + '<input id="postal_' + labelValue + '" placeholder="' + formForCountry.fields.postal + '">'
            + '</fieldset>');
    }
    applyChosen();
}

countrySelect.change(function(){
    j('.address_widget').stop(true,true).fadeOut(transitionDuration,
        function(){
            j(this).html('<div class="wait"></div>');
            try {
                initCountryStateInfo(countrySelect.val());
            } catch(e) {
                j(this).html('<div class="sd_message sd_error">Problem loading address form</div>');
            }
            j(this).fadeIn(transitionDuration);
    });
});

j(document).ready(function(){
    applyChosen();
});