import { db } from './app';
import { child, push, ref, remove, update } from 'firebase/database';

import { alertTextState, alertTypeState } from '$lib/store';
import type { FirebaseVehicleFormat } from '$lib/types/vehicle';

export const getAllVehicleRef = () => child(ref(db), 'vehicles/');
export const getAllUserVehicleRef = () => child(ref(db), 'user-vehicles/');
export const getVehicleRef = (key: string) => child(ref(db), `vehicles/${key}`);
export const getUserVehicleRef = (uid: string) => child(ref(db), `user-vehicles/${uid}`);

/** Stores the current authenticated user in firebase Reat-Time DB */
export const storeNewFirebaseVehicleAsync = (vehicle: FirebaseVehicleFormat) => {
	const newVehicleKey = push(getAllVehicleRef()).key;

	if (!newVehicleKey) {
		alertTypeState.set('error');
		alertTextState.set('Vehicles/DB: ' + 'Failed to create new Vehicle');
		throw new Error('Failed to create new Vehicle');
	}

	const updates: { [key: string]: FirebaseVehicleFormat } = {};
	updates[`vehicles/${newVehicleKey}`] = vehicle;
	updates[`user-vehicles/${vehicle.uid}/${newVehicleKey}`] = vehicle;

	return update(ref(db), updates)
		.then(() => {
			alertTypeState.set('success');
			alertTextState.set('Vehicles/DB: ' + 'Vehicle Successfully Stored');
			return newVehicleKey;
		})
		.catch((error) => {
			alertTypeState.set('error');
			alertTextState.set('Vehicles/DB: ' + error.message);
			throw error;
		});
};

export const updateFirebaseVehicleAsync = (key: string, vehicle: FirebaseVehicleFormat) => {
	if (!key) {
		alertTypeState.set('error');
		alertTextState.set(
			'Vehicles/DB: ' + 'Failed to create new Vehicle could not find the vehicle key',
		);
		throw new Error('Failed to create new Vehicle could not find the vehicle key');
	}

	const updates: { [key: string]: FirebaseVehicleFormat } = {};
	updates[`vehicles/${key}`] = vehicle;
	updates[`user-vehicles/${vehicle.uid}/${key}`] = vehicle;

	return update(ref(db), updates)
		.then(() => {
			alertTypeState.set('success');
			alertTextState.set('Vehicles/DB: ' + 'Vehicle Successfully Updated');
		})
		.catch((error) => {
			alertTypeState.set('error');
			alertTextState.set('Vehicles/DB: ' + error.message);
			throw error;
		});
};

/** Deletes the selected vehicle from firebase Reat-Time DB */
export const removeFirebaseVehicleAsync = (key: string, uid: string) => {
	if (!key) {
		alertTypeState.set('error');
		alertTextState.set('Vehicles/DB: ' + 'Failed to delete the Vehicle, missing vehicle Key');
		throw new Error('Failed to delete the Vehicle, missing vehicle Key');
	}
	if (!uid) {
		alertTypeState.set('error');
		alertTextState.set('Vehicles/DB: ' + 'Failed to delete the Vehicle, missing User Id');
		throw new Error('Failed to delete the Vehicle, missing User Id');
	}

	return remove(ref(db, `vehicles/${key}`))
		.then(() => remove(ref(db, `user-vehicles/${uid}/${key}`)))
		.then(() => {
			alertTypeState.set('info');
			alertTextState.set('Vehicle/DB: ' + 'Vehicle Successfully Purged');
		})
		.catch((error) => {
			alertTypeState.set('error');
			alertTextState.set('Vehicle/DB: ' + error.message);
			throw error;
		});
};
