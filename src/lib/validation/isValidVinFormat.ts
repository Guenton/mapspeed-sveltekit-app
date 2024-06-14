import isEmpty from 'validator/lib/isEmpty';
import isAscii from 'validator/lib/isAscii';
import isUppercase from 'validator/lib/isUppercase';

import { alertTextState, alertTypeState } from '$lib/store';

/**
 * Validate the login format and parameters
 *
 * @param vin
 */
export default (vin: string) => {
	// Check if the Vin has a value
	if (isEmpty(vin)) {
		alertTypeState.set('warning');
		alertTextState.set('Please enter an Vin');
		return false;
	}

	// Check if the Vin has forbidden characters
	if (!isAscii(vin)) {
		alertTypeState.set('warning');
		alertTextState.set('Your Vin contains forbidden characters');
		return false;
	}

	// Check if the Vin is in all caps
	if (!isUppercase(vin)) {
		alertTypeState.set('warning');
		alertTextState.set('Your Vin must be in CAPITALIZED LETTERS');
		return false;
	}

	return true;
};
