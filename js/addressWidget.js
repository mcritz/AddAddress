j = jQuery.noConflict();

SCEDEV = {};
SCEDEV.AddressWidget = {
    generateFormElements : function(field_prefix, field_order, labels_for_this_country, list_of_states, field_values, field_errors) {
        var widgetDiv = this.removeWidgetByPrefix(field_prefix);
        var labelsAndInputs = this.generateFieldsAndLabels(field_order, list_of_states, labels_for_this_country, field_prefix);
        this.createWidgetDiv(field_prefix, labelsAndInputs);
        if(!j.isEmptyObject(field_values)) {
            this.populateFields(field_values, field_prefix);
        }
        if(!j.isEmptyObject(field_errors)) {
            this.displayErrors(field_errors, field_prefix);
        } else {
            console.log('no field_errors')
        }
        return field_prefix + ' address widget set.';
    }
    , removeWidgetByPrefix : function(field_prefix) {
        var addressWidgetDivToBeRemoved = j('.address_widget[name*="' + field_prefix + '"]');
        addressWidgetDivToBeRemoved.remove();
        return addressWidgetDivToBeRemoved;
    }
    , generateFieldsAndLabels : function(field_order, list_of_states, labels_for_this_country, field_prefix) {
        var fieldsAndLabels = '';
        var selectWithStates = '';

        // populate the states, if any
        if (list_of_states.length > 0){
            var labelForStates = '<div class="row ' + field_prefix + 'state"><label for="' + field_prefix + 'state">' + labels_for_this_country.state + '</label>';
            var selectWithStates = '<select id="' + field_prefix + 'state" class="chzn-select">';
            for (var i = 0; i < list_of_states.length; i++){
                // XXTODOXX: populate options numerically by oid
                var stateOption = '<option value="' + list_of_states[i].oid + '">' + list_of_states[i].name + '</option>';
                selectWithStates += stateOption;
            }
            selectWithStates += '</select></div>';
        }

        // Different field order for Japan
        if (field_order == 'japanese') {
            fieldsAndLabels += this.createInput('zip', labels_for_this_country.zip, field_prefix);
            if (list_of_states.length > 0){
                fieldsAndLabels += labelForStates + selectWithStates;
            }
            fieldsAndLabels += this.createInput('city', labels_for_this_country.city, field_prefix);
            fieldsAndLabels += this.createInput('address1', labels_for_this_country.address1, field_prefix);
        } else { // default
            fieldsAndLabels += this.createInput('address1', labels_for_this_country.address1, field_prefix);
            fieldsAndLabels += this.createInput('city', labels_for_this_country.city, field_prefix);
            if (list_of_states.length > 0){
                fieldsAndLabels += labelForStates + selectWithStates;
            }
            fieldsAndLabels += this.createInput('zip', labels_for_this_country.zip, field_prefix);
        }
        return(fieldsAndLabels);
        // console.log('fieldsAndLabels:\n' + fieldsAndLabels);
    }
    , createInput : function(fieldName, countryFieldLabel, field_prefix) {
        var labelAndInput = '<div class="row ' + field_prefix + fieldName + '"><label for="' + field_prefix + fieldName + '">'
        labelAndInput += countryFieldLabel +'</label><input id="' + field_prefix + fieldName + '" placeholder="' + countryFieldLabel + '" /></div>';
        return(labelAndInput);
    }
    , createWidgetDiv : function(fieldPrefix, labelsAndInputs) {
        // console.log('createWidgetDiv: \n' + fieldPrefix + '\n' + labelsAndInputs);
        selectForAddressWidget = j('#' + fieldPrefix + 'country_select');
        // console.log(selectForAddressWidget);
        selectForAddressWidget.after('<div class="address_widget ' + fieldPrefix + 'address_widget" name="' + fieldPrefix + 'address_widget">' + labelsAndInputs + '</div>');
        // j('.chzn-select').chosen();
    }
    , populateFields : function(field_values, field_prefix) {
        var streetValue = field_values.address1;
        var cityValue   = field_values.city;
        var postalValue = field_values.zip;
        var stateValue  = field_values.state;
        j('div[name*=' + field_prefix + '] input#' + field_prefix + 'address1').val(streetValue);
        j('div[name*=' + field_prefix + '] input#' + field_prefix + 'city').val(cityValue);
        j('div[name*=' + field_prefix + '] input#' + field_prefix + 'zip').val(postalValue);
        j('select#' + field_prefix + 'state').val(stateValue).trigger('change');
    }
    , displayErrors : function(field_errors, field_prefix) {
        j.each(field_errors, function(input,message){
            if (message != '') {
                // console.log(input + ' : ' + message + '\n   for ' + field_prefix + input);
                var errorDiv = SCEDEV.AddressWidget.createErrorDiv(message);
                // console.log('errorDiv: ' + errorDiv);
                var targetInput = j('div.row.' + field_prefix + input);
                // console.log(targetInput);
                j(errorDiv).insertBefore(targetInput);
            }
        });
    }
    , createErrorDiv : function(errorMessage) {
        errorHtml = '<div class="form-warning">' + errorMessage + '</div>';
        return errorHtml;
    }
}