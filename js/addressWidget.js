j = jQuery.noConflict();
var countrySelect = j('#country');

SCEDEV = {};
SCEDEV.AddressWidget = {
    generateFormElements : function(selected_country_code, field_prefix, field_data, country_info) {
        var countryInfo = this.getCountryStateInfo(country_info,selected_country_code);
        var widgetDiv = this.removeWidgetByPrefix(field_prefix);
        var labelsAndInputs = this.generateFieldsAndLabels(selected_country_code,countryInfo,field_prefix);
        this.createWidgetDiv(countryInfo, field_prefix, labelsAndInputs);
        if(!j.isEmptyObject(field_data)) {
            this.populateFields(field_data, field_prefix);
        }
        return field_prefix + ' address set to ' + selected_country_code + '.';
    }
    , getCountryStateInfo : function(countryStateInfo,countryCode){
        addressData = countryStateInfo.country;
        for (i = 0; i < addressData.length; i++) {
            if (addressData[i].code == countryCode){
                return addressData[i];
            }
        }
        throw 'No country Code Found!';
    }
    , removeWidgetByPrefix : function(field_prefix) {
        var addressWidgetDivToBeRemoved = j('.address_widget[name*="' + field_prefix + '"]');
        addressWidgetDivToBeRemoved.remove();
        return addressWidgetDivToBeRemoved;
    }
    , generateFieldsAndLabels : function(selected_country_code, countryInfo, field_prefix) {
        var fieldsAndLabels = '';
        // console.log('countryInfo: \n' + countryInfo);
        fieldsAndLabels += ('<fieldset name="' + selected_country_code +'"><legend>' + countryInfo.name + '</legend>');

        // populate the states, if any
        if (countryInfo.fields.state.members.length > 0){
            var labelForStates = '<label for="' + field_prefix + 'state">' + countryInfo.fields.state.label + '</label>';
            var selectWithStates = '<select id="' + field_prefix + 'state" class="chzn-select">';
            for (var i = 0; i < countryInfo.fields.state.members.length; i++){
                var stateOption = '<option val="' + countryInfo.fields.state.members[i].oid + '">' + countryInfo.fields.state.members[i].name + '</option>';
                selectWithStates += stateOption;
            }
            selectWithStates += '</select>';
        }

        // Different field order for Japan
        if (countryInfo.fieldOrder == 'japanese') {
            fieldsAndLabels += this.createInput('postal', countryInfo.fields.postal, field_prefix);
            if (countryInfo.fields.state.members.length > 0){
                fieldsAndLabels += labelForStates + selectWithStates;
            }
            fieldsAndLabels += this.createInput('city', countryInfo.fields.city, field_prefix);
            fieldsAndLabels += this.createInput('street', countryInfo.fields.street, field_prefix);
        } else { // default
            fieldsAndLabels += this.createInput('street', countryInfo.fields.street, field_prefix);
            fieldsAndLabels += this.createInput('city', countryInfo.fields.city, field_prefix);
            if (countryInfo.fields.state.members.length > 0){
                fieldsAndLabels += labelForStates + selectWithStates;
            }
            fieldsAndLabels += this.createInput('postal', countryInfo.fields.postal, field_prefix);
        }
        fieldsAndLabels += '</fieldset>';
        return(fieldsAndLabels);
        // console.log('fieldsAndLabels:\n' + fieldsAndLabels);
    }
    , createInput : function(countryField, countryFieldLabel, field_prefix) {
        var labelAndInput = '<div class="row"><label for="' + field_prefix + countryField+ '">'
        labelAndInput += countryFieldLabel +'</label><input id="' + field_prefix + countryField + '" placeholder="' + countryFieldLabel + '" /></div>';
        return(labelAndInput);
    }
    , createWidgetDiv : function(addressData, fieldPrefix, labelsAndInputs) {
        // console.log('createWidgetDiv: \n' + addressData + '\n' + fieldPrefix + '\n' + labelsAndInputs);
        selectForAddressWidget = j('#' + fieldPrefix + 'country_chzn');
        selectForAddressWidget.after('<div class="address_widget ' + addressData.name + '" name="' + fieldPrefix + 'address_widget">' + labelsAndInputs + '</div>');
        j('.chzn-select').chosen();
    }
    , populateFields : function(field_data, field_prefix) {
        var streetValue = field_data.streetAddress1[0].value;
        var cityValue   = field_data.city[0].value;
        var postalValue = field_data.zip[0].value;
        var stateValue  = field_data.state[0].value;
        j('div[name*=' + field_prefix + '] input#' + field_prefix + 'street').val(streetValue);
        j('div[name*=' + field_prefix + '] input#' + field_prefix + 'city').val(cityValue);
        j('div[name*=' + field_prefix + '] input#' + field_prefix + 'postal').val(postalValue);
        j('select#' + field_prefix + 'state').val(stateValue).trigger('change');
    }
}