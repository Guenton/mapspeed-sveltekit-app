import isEmpty from 'validator/lib/isEmpty';
import isAscii from 'validator/lib/isAscii';

import { alertTextState, alertTypeState } from '$lib/store';
import type { FirebaseServiceFormat } from '$lib/types/service';

/**
 * Validate the FirebaseVehicle format
 *
 * @param serviceFormat
 */
export default (serviceFormat: FirebaseServiceFormat) => {
	// Validate Uid
	if (isEmpty(serviceFormat.uid)) {
		alertTypeState.set('warning');
		alertTextState.set('Missing User Id');
		return false;
	}
	if (!isAscii(serviceFormat.uid)) {
		alertTypeState.set('warning');
		alertTextState.set('Your User Id contains forbidden characters');
		return false;
	}

	// Validate Vin
	if (isEmpty(serviceFormat.vin)) {
		alertTypeState.set('warning');
		alertTextState.set('Please enter a Vin Number');
		return false;
	}
	if (!isAscii(serviceFormat.vin)) {
		alertTypeState.set('warning');
		alertTextState.set('Your Vin contains forbidden characters');
		return false;
	}

	// Validate Vehicle Key
	if (isEmpty(serviceFormat.vehicleKey)) {
		alertTypeState.set('warning');
		alertTextState.set('Please select a vehicle');
		return false;
	}
	if (!isAscii(serviceFormat.vehicleKey)) {
		alertTypeState.set('warning');
		alertTextState.set('Your vehicle contains forbidden characters');
		return false;
	}

	// Validate Date
	if (isEmpty(serviceFormat.serviceDate)) {
		alertTypeState.set('warning');
		alertTextState.set('Please enter a vehicle service Date');
		return false;
	}
	if (!isAscii(serviceFormat.serviceDate)) {
		alertTypeState.set('warning');
		alertTextState.set('Your vehicle service Date contains forbidden characters');
		return false;
	}

	// Validate Service Type
	if (isEmpty(serviceFormat.serviceType)) {
		alertTypeState.set('warning');
		alertTextState.set('Please select a vehicle service Type');
		return false;
	}
	if (!isAscii(serviceFormat.serviceType)) {
		alertTypeState.set('warning');
		alertTextState.set('Your vehicle service Type contains forbidden characters');
		return false;
	}

	// Validate Service Status
	if (isEmpty(serviceFormat.status)) {
		alertTypeState.set('warning');
		alertTextState.set('Please select a vehicle service Status');
		return false;
	}
	if (!isAscii(serviceFormat.status)) {
		alertTypeState.set('warning');
		alertTextState.set('Your vehicle service Status contains forbidden characters');
		return false;
	}

	// Validate First Name
	if (isEmpty(serviceFormat.firstName)) {
		alertTypeState.set('warning');
		alertTextState.set('Please enter a first name');
		return false;
	}
	if (!isAscii(serviceFormat.firstName)) {
		alertTypeState.set('warning');
		alertTextState.set('Your first name contains forbidden characters');
		return false;
	}

	// Validate Phone
	if (isEmpty(serviceFormat.phone)) {
		alertTypeState.set('warning');
		alertTextState.set('Please enter a Phone Number');
		return false;
	}
	if (!isAscii(serviceFormat.phone)) {
		alertTypeState.set('warning');
		alertTextState.set('Your phone number contains forbidden characters');
		return false;
	}

	return true;
};
