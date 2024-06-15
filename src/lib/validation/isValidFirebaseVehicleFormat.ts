import isEmpty from 'validator/lib/isEmpty';
import isAscii from 'validator/lib/isAscii';

import { alertTextState, alertTypeState } from '$lib/store';
import type { FirebaseVehicleFormat } from '$lib/types/vehicle';

/**
 * Validate the FirebaseVehicle format
 *
 * @param vehicleFormat
 */
export default (vehicleFormat: FirebaseVehicleFormat) => {
	// Validate Vin
	if (isEmpty(vehicleFormat.vin)) {
		alertTypeState.set('warning');
		alertTextState.set('Please enter a Vin Number');
		return false;
	}
	if (!isAscii(vehicleFormat.vin)) {
		alertTypeState.set('warning');
		alertTextState.set('Your Vin contains forbidden characters');
		return false;
	}

	// Validate Make
	if (isEmpty(vehicleFormat.make)) {
		alertTypeState.set('warning');
		alertTextState.set('Please enter a Vehicle Make');
		return false;
	}
	if (!isAscii(vehicleFormat.make)) {
		alertTypeState.set('warning');
		alertTextState.set('Your Vehicle Make contains forbidden characters');
		return false;
	}

	// Validate Model
	if (isEmpty(vehicleFormat.model)) {
		alertTypeState.set('warning');
		alertTextState.set('Please enter a vehicle model');
		return false;
	}
	if (!isAscii(vehicleFormat.model)) {
		alertTypeState.set('warning');
		alertTextState.set('Your Vin contains forbidden characters');
		return false;
	}

	// Validate Year
	if (isEmpty(vehicleFormat.year)) {
		alertTypeState.set('warning');
		alertTextState.set('Please enter a Vehicle Production Year');
		return false;
	}
	if (!isAscii(vehicleFormat.year)) {
		alertTypeState.set('warning');
		alertTextState.set('Your Vin contains forbidden characters');
		return false;
	}

	// Validate Fuel Type
	if (isEmpty(vehicleFormat.fuel)) {
		alertTypeState.set('warning');
		alertTextState.set('Please enter the Vehicle Fuel Type');
		return false;
	}
	if (!isAscii(vehicleFormat.fuel)) {
		alertTypeState.set('warning');
		alertTextState.set('Your Vehicle Fuel Type contains forbidden characters');
		return false;
	}

	// Validate First Name
	if (isEmpty(vehicleFormat.firstName)) {
		alertTypeState.set('warning');
		alertTextState.set('Please enter a first name');
		return false;
	}
	if (!isAscii(vehicleFormat.firstName)) {
		alertTypeState.set('warning');
		alertTextState.set('Your first name contains forbidden characters');
		return false;
	}

	// Validate Phone
	if (isEmpty(vehicleFormat.phone)) {
		alertTypeState.set('warning');
		alertTextState.set('Please enter a Phone Number');
		return false;
	}
	if (!isAscii(vehicleFormat.phone)) {
		alertTypeState.set('warning');
		alertTextState.set('Your phone number contains forbidden characters');
		return false;
	}

	return true;
};
