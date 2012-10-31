j = jQuery.noConflict();
var fieldData =
	{
		"state": [
			{"value":"Mie"},
			{"errorMessage":""}
		],
		"streetAddress1":[
				{"value":"64 Baker Street"},
				{"errorMessage":"Baker Street Irregulars"}
		],
		"city":[
			{"value":"Sagamihara"},
			{"errorMessage":"Sagamihara is not in Jamesistan."}
		],
		"zip":[
			{"value":"ABC123"},
			{"errorMessage":"This cannot be blank. Must have 3 letters and 3 digits seperated by a space."}
		]
	}

var emptyObject = {};

var labelsForADefaultCountry =
{
	"city":"Metropolis",
	"state":"Political District",
	"address1":"Avenue",
	"zip":"Post Office Number"
}

var fieldValuesForAForm =
{
	"address1":"64 Baker Street",
	"city":"London",
	"state":"Mie",
	"zip":"ABC123"
}

var fieldErrorsForAForm =
{
	"address1":"Please enter a street address",
	"city":"Please enter a city",
	"state":"Please select a state",
	"zip":"Please enter a postal code"
}

var listOfStatesForACountry = 
[
	{"name":"Hokkaido", "oid":1},{"name":"Aomori", "oid":2},{"name":"Iwate", "oid":3},{"name":"Miyagi", "oid":4},{"name":"Akita", "oid":5},{"name":"Yamagata", "oid":6},{"name":"Fukushima", "oid":7},{"name":"Ibaraki", "oid":8},{"name":"Tochigi", "oid":9},{"name":"Gunma", "oid":10},{"name":"Saitama", "oid":11},{"name":"Chiba", "oid":12},{"name":"Tokyo", "oid":13},{"name":"Kanagawa", "oid":14},{"name":"Niigata", "oid":15},{"name":"Toyama", "oid":16},{"name":"Ishikawa", "oid":17},{"name":"Fukui", "oid":18},{"name":"Yamanashi", "oid":19},{"name":"Nagano", "oid":20},{"name":"Gifu", "oid":21},{"name":"Shizuoka", "oid":22},{"name":"Aichi", "oid":23},{"name":"Mie", "oid":24},{"name":"Shiga", "oid":25},{"name":"Kyoto", "oid":26},{"name":"Osaka", "oid":27},{"name":"Hyogo", "oid":28},{"name":"Nara", "oid":29},{"name":"Wakayama", "oid":30},{"name":"Tottori", "oid":31},{"name":"Shimane", "oid":32},{"name":"Okayama", "oid":33},{"name":"Hiroshima", "oid":34},{"name":"Yamaguchi", "oid":35},{"name":"Tokushima", "oid":36},{"name":"Kagawa", "oid":37},{"name":"Ehime", "oid":38},{"name":"Kochi", "oid":39},{"name":"Fukuoka", "oid":40},{"name":"Saga", "oid":41},{"name":"Nagasaki", "oid":42},{"name":"Kumamoto", "oid":43},{"name":"Oita", "oid":44},{"name":"Miyazaki", "oid":45},{"name":"Kagoshima", "oid":46},{"name":"Okinawa", "oid":47}
]

var countryStateInfo =
	{
		"country":
		[
			{
				"name":"Critzilvania",
				"code":"CZ",
				"fieldOrder":"default",
				"fields":
				{
					"street":"Street",
					"city":"Megapolis",
					"state":
					{
						"label":"",
						"members":[]
					},
					"postal":"Disputed Terrirotrial Area"
				}
			},
			{
				"name":"Jamesistan",
				"code":"JZ",
				"fieldOrder":"japanese",
				"fields":
				{
					"street":"Street Address",
					"city":"Municipality",
					"state":
					{
						"label":"Prefecture",
						"members":
						[
							{"name":"Hokkaido", "oid":1},{"name":"Aomori", "oid":2},{"name":"Iwate", "oid":3},{"name":"Miyagi", "oid":4},{"name":"Akita", "oid":5},{"name":"Yamagata", "oid":6},{"name":"Fukushima", "oid":7},{"name":"Ibaraki", "oid":8},{"name":"Tochigi", "oid":9},{"name":"Gunma", "oid":10},{"name":"Saitama", "oid":11},{"name":"Chiba", "oid":12},{"name":"Tokyo", "oid":13},{"name":"Kanagawa", "oid":14},{"name":"Niigata", "oid":15},{"name":"Toyama", "oid":16},{"name":"Ishikawa", "oid":17},{"name":"Fukui", "oid":18},{"name":"Yamanashi", "oid":19},{"name":"Nagano", "oid":20},{"name":"Gifu", "oid":21},{"name":"Shizuoka", "oid":22},{"name":"Aichi", "oid":23},{"name":"Mie", "oid":24},{"name":"Shiga", "oid":25},{"name":"Kyoto", "oid":26},{"name":"Osaka", "oid":27},{"name":"Hyogo", "oid":28},{"name":"Nara", "oid":29},{"name":"Wakayama", "oid":30},{"name":"Tottori", "oid":31},{"name":"Shimane", "oid":32},{"name":"Okayama", "oid":33},{"name":"Hiroshima", "oid":34},{"name":"Yamaguchi", "oid":35},{"name":"Tokushima", "oid":36},{"name":"Kagawa", "oid":37},{"name":"Ehime", "oid":38},{"name":"Kochi", "oid":39},{"name":"Fukuoka", "oid":40},{"name":"Saga", "oid":41},{"name":"Nagasaki", "oid":42},{"name":"Kumamoto", "oid":43},{"name":"Oita", "oid":44},{"name":"Miyazaki", "oid":45},{"name":"Kagoshima", "oid":46},{"name":"Okinawa", "oid":47}
						]
					},
					"postal":"Waste Designation"
				}
			}
		]
	};
/* 
 * Test environment
 */

test('The browser should', function(){
		equal( j === jQuery, 	true, 'have jQuery is loaded & aliased to var j');
		// equal( 	j('.chzn-select').hasClass('chzn-done'), true, 'have jQuery-chosen plugin installed' );
		equal( typeof(SCEDEV), 'object' , 'SCEDEV should be a defined object')
});

/*
 * Test for fail
 */

test('A nonexistant country code should', function(){
	var exceptionThrown = false;
	var countryCode = 'This code doesnt exist';

	try {
		var countryCode = 'This code doesnt exist';
		var result = SCEDEV.AddressWidget.getCountryStateInfo(countryStateInfo,countryCode);
	} catch (e) {
		exceptionThrown = true;
	}
	ok(exceptionThrown, 'throw an exception');
});

/*
 * Test for valid country
	/
		1. Did I get an object?
		2. Did it have a country name?
		3. Did it have a street label?
		4. Did it have a city label?
		5. When a country has states does it give me a state label?
		6. Does it have a postal code label?
		7. Does it have a field order?
		8. Does it have an oid value?
	/
 */

// test('A valid country code for a country with NO states should',function(){

// 	var countryCode = 'CZ';
// 	var result = SCEDEV.AddressWidget.getCountryStateInfo(countryStateInfo,countryCode);


// 	equal ( typeof result, 'object', 'return an object');
// 	// equal ( result.field_prefix, 'critz_', 'have a field_prefix');
// 	equal ( result.name, 'Critzilvania', 'have a name matching the country code');
// 	equal ( result.fields.street, 'Street', 'have a street label');
// 	equal ( result.fields.state.label, '', 'have NO state label');
// 	equal ( result.fields.city, 'Megapolis', 'have a city label');
// 	equal ( result.fields.postal, 'Disputed Terrirotrial Area', 'have a postal code label')
// 	equal ( result.fieldOrder, 'default', 'Have a field order')
// });

// test('A valid country code for a country with states should',function(){
// 	var countryCode = 'JZ';
// 	var result = SCEDEV.AddressWidget.getCountryStateInfo(countryStateInfo,countryCode);

// 	equal ( result.fields.state.label, 'Prefecture', 'have a state label');
// 	equal( typeof result.fields.state.members, 'object', 'have an object named members');
// 	equal(result.fields.state.members.length, '47', 'have some states');

// 	// ------
// 	ok( ('hi!').toString, '-- Share the non-state properties below --');
// 	equal ( typeof result, 'object', 'return an object');
// 	// equal ( result.field_prefix, 'james_', 'have a field_prefix');
// 	equal ( result.name, 'Jamesistan', 'have a name matching the country code');
// 	equal ( result.fields.street, 'Street Address', 'have a street label');
// 	equal ( result.fields.city, 'Municipality', 'have a city label');
// 	equal ( result.fields.postal, 'Waste Designation', 'have a postal code label');
// 	equal ( result.fieldOrder, 'japanese', 'Have a field order')
// });

test('When given a field_prefix to be removed should', function(){
	var field_prefix = 'james_';
	result = SCEDEV.AddressWidget.removeWidgetByPrefix(field_prefix);

	equal( j('.address_widget[name*="james_"]').length, 0, 'remove all matched elements');
});

test('When given country data it should', function(){
	var fieldOrder = 'default';
	var fieldPrefix = 'shipping_';
	var result = SCEDEV.AddressWidget.generateFieldsAndLabels(
		fieldOrder,
		emptyObject,
		labelsForADefaultCountry,
		fieldPrefix
	);
	var regex = /label.for="shipping_address1".Avenue/;
	equal( result.search(regex) != -1, true, 'contain a label with the right street name.');

	var regex = /label.for="shipping_city".Metropolis/;
	equal( result.search(regex) != -1, true, 'contain a label with the right city name.');

	var regex = /label.for="shipping_zip".Post Office Number/;
	equal( result.search(regex) != -1, true, 'contain a label with the right postal name.');

	var regex = /select/;
	equal (result.search(regex) != -1, false, 'NOT have a select for states if NONE are present.');

	var result = SCEDEV.AddressWidget.generateFieldsAndLabels(
		fieldOrder,
		listOfStatesForACountry,
		labelsForADefaultCountry,
		fieldPrefix
	);
	var regex = /label for=\"shipping_state\"/;
	equal ( result.search(regex) != -1, true, 'have a label for states if some are present');
	var regex = /select id=\"shipping_state/;
	equal( result.search(regex) != -1, true, 'have a select if states if some are present.' );

	var regex = /option/;
	equal( result.search(regex) != -1, true, 'have at least one option if states are present.');
});

/*
 * Test the created DOM
 */

test('When given form data for a country with NO states it should', function(){
	j('#country_select').attr('id','billing_country_select');
	var fieldOrder = 'default';
	var fieldPrefix = 'billing_';
	var emptyStates = emptyObject;
	var labelsAndFields = SCEDEV.AddressWidget.generateFieldsAndLabels(
		fieldOrder,
		emptyStates,
		labelsForADefaultCountry,
		fieldPrefix
	);
	var result = SCEDEV.AddressWidget.createWidgetDiv(fieldPrefix, labelsAndFields);
	equal( j('.address_widget').attr('name'),
		'billing_address_widget',
		'create an address_widget div with the right name attribute');
	equal( j('.address_widget').attr('name'), 'billing_address_widget', 'with the right name attribute');
	// Street + City + Postal Code + (no states) = 3
	equal ( j('.billing_address_widget label').length, 3, 'create the right number of labels for no states');
	equal ( j('.billing_address_widget input').length, 3, 'create the right number of inputs for no states');
	// tear down this test
	SCEDEV.AddressWidget.removeWidgetByPrefix('address_widget');
	j('#billing_country_select').attr('id','country_select');
});

test('When given form data for a country WITH states it should', function(){
	j('#country_select').attr('id','shipping_country_select');
	var addressData = countryStateInfo.country[1];
	var fieldPrefixStates = 'shipping_';
	var fieldOrder = 'default';
	var labelsAndFieldsStates = SCEDEV.AddressWidget.generateFieldsAndLabels(
		fieldOrder,
		listOfStatesForACountry,
		labelsForADefaultCountry,
		fieldPrefixStates
	);
	var result = SCEDEV.AddressWidget.createWidgetDiv(fieldPrefixStates, labelsAndFieldsStates);
	
	// Street + City + Postal Code + States = 4
	equal ( j('.shipping_address_widget label').length, 4, 'create the right number of labels for a country with states');
	// added the [id] selector here because chosen plugin will create additional inputs, but they have no id attribute
	equal ( j('.shipping_address_widget input[id]').length, 3, 'create the right number of inputs for a country with states');
	equal ( j('.shipping_address_widget select').attr('id'), 'shipping_state', 'create a select for states');
	equal ( j('.shipping_address_widget option').length, 47, 'create the correct number of states for a given states select.');
	// tear down this test
	SCEDEV.AddressWidget.removeWidgetByPrefix('shipping_');
	j('#shipping_country_select').attr('id','country_select');
});

/// XXTODOXX: NEED TO TEST FIELD ORDER!

/*
test('Check user interaction -below-', function(){
	// expect( 0 );
	countryToTest = 'CZ';
	j('#shipping_country').val(countryToTest).trigger('change');
	j('.address_widget').promise().done(function(){
		test('When the user changes the country', function(){

			fieldsetToTest = j('.United fieldset');
			labelsToTest = j('.address_widget fieldset').find('label');
			inputsToTest = j('.address_widget fieldset').find('input');

			equal( fieldsetToTest.find('legend').text(), 'United States' , 'a legend exists with for the matched country');
			equal( j.contains(labelsToTest, 'postal_' + countryToTest), true , 'a label for postal_code exists for matched country');
			equal( j.contains(inputsToTest, 'postal_' + countryToTest), true , 'an input for postal_code exists for matched country');
			equal( j.contains(labelsToTest, 'states_' + countryToTest), true , 'a label for states exists for matched country');
			equal( j('.address_widget fieldset select').attr('id'), 'states_' + countryToTest, true , 'a select for states exists for matched country');
			equal( j.contains(labelsToTest, 'city_' + countryToTest), true , 'a label for city exists for matched country');
			equal( j.contains(inputsToTest, 'city_' + countryToTest), true , 'an input for city exists for matched country');
			equal( j.contains(labelsToTest, 'street_' + countryToTest), true , 'a label for street exists for matched country');
			equal( j.contains(inputsToTest, 'street_' + countryToTest), true , 'an input for street exists for matched country');
	 	});
	});
});
*/

/*
 * Test for field Data
 */

test('Nonexistant field_data should', function(){
	j('#country_select').attr('id','nodata_country_select');
	var fieldOrder = 'default'
	var fieldPrefix = 'nodata_';
	var emptyData = emptyObject;
	SCEDEV.AddressWidget.generateFormElements(
		fieldPrefix,
		fieldOrder,
		labelsForADefaultCountry,
		listOfStatesForACountry,
		emptyData,
		fieldErrorsForAForm
	);

	equal(j('.nodata_address_widget input').val(), '', 'have no prepopulated fields.');

	// tear down this test
	SCEDEV.AddressWidget.removeWidgetByPrefix('nodata_');
	j('#nodata_country_select').attr('id','country_select');
});


test('Valid field_data should', function(){
	j('#country_select').attr('id','data_country_select');
	var fieldOrder = 'default'
	var fieldPrefix = 'data_';
	SCEDEV.AddressWidget.generateFormElements(
		fieldPrefix,
		fieldOrder,
		labelsForADefaultCountry,
		listOfStatesForACountry,
		fieldValuesForAForm,
		fieldErrorsForAForm
	);

	equal( j('.data_address_widget input#data_address1').val(), '64 Baker Street', 'prepopulate the street input.');
	equal( j('.data_address_widget input#data_city').val(), 'London', 'prepopulate the city input.');
	equal( j('.data_address_widget input#data_zip').val(), 'ABC123', 'prepopulate the zip input.');
	equal( j('.data_address_widget select#data_state').val(), 'Mie', 'prepopulate the state select.');

	// tear down this test
	SCEDEV.AddressWidget.removeWidgetByPrefix('data_');
	j('#data_country_select').attr('id','country_select');
});

test('Nonexistant field_errors should', function(){
	j('#country_select').attr('id','noerrors_country_select');
	var fieldOrder = 'default'
	var fieldPrefix = 'noerrors';
	var countryInfo = countryStateInfo;
	SCEDEV.AddressWidget.generateFormElements(
		fieldPrefix,
		fieldOrder,
		labelsForADefaultCountry,
		listOfStatesForACountry,
		fieldValuesForAForm,
		emptyObject
	);

	equal(j('.noerrors_address_widget .form-warning').length, 0, 'have no elements with class .form-warning');

	// tear down this test
	SCEDEV.AddressWidget.removeWidgetByPrefix('noerrors_');
	j('#noerrors_country_select').attr('id','country_select');
});

test('When given field_errors should', function(){
	j('#country_select').attr('id','errors_country_select');
	var fieldOrder = 'default'
	var fieldPrefix = 'errors';
	var countryInfo = countryStateInfo;
	SCEDEV.AddressWidget.generateFormElements(
		fieldPrefix,
		fieldOrder,
		labelsForADefaultCountry,
		listOfStatesForACountry,
		fieldValuesForAForm,
		fieldErrorsForAForm
	);

	equal(j('.errors_address_widget .form-warning').length, 4, 'have the right number of elements with class .form-warning');

	// tear down this test
	// SCEDEV.AddressWidget.removeWidgetByPrefix('noerrors_');
	// j('#noerrors_country_select').attr('id','country_select');
});

// test('When given valid field data should', function(){
// 	var selected_country_code = 'JZ';
// 	var field_prefix = 'shipping_';
// 	var validFieldData = fieldData;
// 	var countryInfo = countryStateInfo;
// 	SCEDEV.AddressWidget.generateFormElements(
// 		selected_country_code,
// 		field_prefix,
// 		fieldData,
// 		countryInfo
// 		);
// 	equal( j('.Jamesistan input#shipping_street').val(), '64 Baker Street', 'have the correct value for street.');
// 	equal( j('.Jamesistan input#shipping_city').val(), 'Sagamihara', 'have the correct value for city.');
// 	equal( j('.Jamesistan input#shipping_postal').val(), 'ABC123', 'have the correct value for postal code.');
// 	equal( j('.Jamesistan select#shipping_state').val(), 'Mie', 'have the correct value for state.');
// 	equal( j('.Jamesistan .chzn-single span').text(), 'Mie', 'have the correct text displayed in the chosen dropdown UI');
// 	equal( j('.Jamesistan .error').length, 3, 'have the correct number of divs with class .error.');
// 	equal( j('.Jamesistan .error').text(), 'some error message', 'have the correct error text for field.');
// });
