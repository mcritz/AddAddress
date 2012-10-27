j = jQuery.noConflict();

var countryStateInfo =
	{
		"country":
		[
			{
				"name":"Critzilvania",
				"field_prefix":"critz_",
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
				"field_prefix":"james_",
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
		equal( 	j('.chzn-select').hasClass('chzn-done'), true, 'have jQuery-chosen plugin installed' );
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
	
	1. Did I get an object?
	2. Did it have a country name?
	3. Did it have a street label?
	4. Did it have a city label?
	5. When a country has states does it give me a state label?
	6. Does it have a postal code label?
	7. Does it have a field order?
	8. Does it have an oid value?

 */

test('A valid country code for a country with NO states should',function(){

	var countryCode = 'CZ';
	var result = SCEDEV.AddressWidget.getCountryStateInfo(countryStateInfo,countryCode);


	equal ( typeof result, 'object', 'return an object');
	equal ( result.field_prefix, 'critz_', 'have a field_prefix');
	// equal ( result.name, 'Critzilvania', 'have a name matching the country code');
	equal ( result.fields.street, 'Street', 'have a street label');
	equal ( result.fields.state.label, '', 'have NO state label');
	equal ( result.fields.city, 'Megapolis', 'have a city label');
	equal ( result.fields.postal, 'Disputed Terrirotrial Area', 'have a postal code label')
	equal ( result.fieldOrder, 'default', 'Have a field order')
});

test('A valid country code for a country with states should',function(){
	var countryCode = 'JZ';
	var result = SCEDEV.AddressWidget.getCountryStateInfo(countryStateInfo,countryCode);

	equal ( result.fields.state.label, 'Prefecture', 'have a state label');
	equal( typeof result.fields.state.members, 'object', 'have an object named members');
	equal(result.fields.state.members.length, '47', 'have some states');

	// ------
	ok( ('hi!').toString, '-- Share the non-state properties below --');
	equal ( typeof result, 'object', 'return an object');
	equal ( result.field_prefix, 'james_', 'have a field_prefix');
	// equal ( result.name, 'Jamesistan', 'have a name matching the country code');
	equal ( result.fields.street, 'Street Address', 'have a street label');
	equal ( result.fields.city, 'Municipality', 'have a city label');
	equal ( result.fields.postal, 'Waste Designation', 'have a postal code label');
	equal ( result.fieldOrder, 'japanese', 'Have a field order')
});

test('When given a field_prefix should', function(){
	var field_prefix = 'james_';
	result = SCEDEV.AddressWidget.findWidgetByPrefix(field_prefix);

	equal( result.attr('name'), field_prefix, 'find the correct element');
});

test('When asked to be remove an address_widget should',function(){
	var field_prefix = 'remove_';
	var someDiv = j('.address_widget[name|="' + field_prefix + '"]');
	SCEDEV.AddressWidget.removeWidget(someDiv);
	result = j('.address_widget[name|="' + field_prefix + '"]').length;
	equal( result, 0, 'remove the div')
});

test('When given new form data it should', function(){
	var addressData = countryStateInfo.country[0];
	var fieldPrefix = 'shipping_';

	result = SCEDEV.AddressWidget.createWidgetDiv(addressData,fieldPrefix);
	equal( j('.address_widget').attr('name'),
		'shipping_address_widget',
		'create an address_widget div with the right name attribute');
	equal( j('.address_widget').hasClass('Critzilvania'), true, 'with the right class attribute')
});

/*
	test('It should have jQuery aliased to j()', function(){
		equal( j !== null, 		true, 'j is not null');
		equal( j !== undefined, 	true, 'j is not undefined');
		equal( j === jQuery, 	true, 'jQuery is loaded & aliased');
	});
	test('Chosen jQuery plugin should be applied to all .chzn-select selects', function(){
		equal( 	j('.chzn-select').hasClass('chzn-done'), true, 'chosen is loaded' );
	});
	test('The default state of the address_widget is empty', function(){
		equal( j('.address_widget').html(), '', 'contains no html');
	});
	test('Check user interaction -below-', function(){
		expect( 0 );

		countryOptions = j('#country option');
		// for( i = 0; i < countryOptions.length ; i++){
			// j('#country').val(countryOptions[i]).trigger('change');
			countryToTest = 'Japan';
			j('#country').val(countryToTest).trigger('change');
			j('.address_widget').promise().done(function(){
				test('Test behavior for chaning country', function(){

					fieldsetToTest = j('.address_widget fieldset');
					labelsToTest = j('.address_widget fieldset').find('label');
					inputsToTest = j('.address_widget fieldset').find('input');

					equal( j.contains('.address_widget', '.wait'), true , 'a div with class .wait created');
					equal( fieldsetToTest.find('legend').text(), countryToTest , 'a legend exists with for the matched country');
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
		// }
});
*/