
(function(){
	'use strict';
	var constants = {
	    ownershipList:[{label:"Own", value:"own"}, {label:"Hired", value:"hired"}],
		makeList:[{id:'Tata', label:'Tata'}, {id:'Leyland', label:'Leyland'}],
		fuelList:[{id:"Diesel", label:"Diesel"}, {id:"Petrol", label:"Petrol"}, {id:"Gas", label:"Gas"}],
		typeList:[{id:"LCV", label:"LCV"}, {id:"HCV", label:"HCV"}],
		paymentList:[{label:"Online", value:"Online"}, {label:"Cash", value:"Cash"}, {label:"Cheque", value:"Cheque"}, {label:"Credit", value:"Credit"}],
		tyreMakeList:[{id: 'MRF', label: 'MRF'}, {id: 'Tyre1', label: 'Tyre1'}],
		tyrePositionList:[
					{id: 'FL', label: 'Front Left'}, 
	                {id: 'FR', label: 'Front Right'}, 
	                {id: 'BL1', label: 'Back Left1'},
	                {id: 'BL2', label: 'Back Left2'},
	                {id: 'BR1', label: 'Back Right1'},
	                {id: 'BR2', label: 'Back Right2'}
                ],
        batteryMakeList:[{id: 'make1', label: 'Make 1'}, {id: 'make2', label: 'Make 2'}],
		goodsType:[{
                id: 'Battery',
                label: 'Battery'
            }, {
                id: 'Electricals',
                label: 'Electricals'
            }, {
                id: 'Spare Parts',
                label: 'Spare Parts'
            }, {
                id: 'Tyre',
                label: 'Tyre'
            }],
     	workorderList:[{label:"Labour", value:"L"}, {label:"Spare Parts", value:"S"}]
	}
	MetronicApp.constant("config", constants)
}())