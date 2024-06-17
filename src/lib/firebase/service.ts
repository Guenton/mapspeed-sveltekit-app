import { db } from './app';
import { child, push, ref, remove, update } from 'firebase/database';

import { alertTextState, alertTypeState } from '$lib/store';
import type { FirebaseServiceFormat } from '$lib/types/service';

export const getAllServiceRef = () => child(ref(db), 'service/');
export const getServiceRef = (key: string) => child(ref(db), `service/${key}`);
export const getAllUserServiceRef = (uid: string) => child(ref(db), `user-service/${uid}`);
export const getUserServiceRef = (uid: string, key: string) =>
	child(ref(db), `user-service/${uid}/${key}`);

/** Stores new Service Appointment in firebase Reat-Time DB */
export const storeNewFirebaseServiceAsync = (service: FirebaseServiceFormat) => {
	const newServiceKey = push(getAllServiceRef()).key;

	if (!newServiceKey) {
		alertTypeState.set('error');
		alertTextState.set('Service/DB: ' + 'Failed to create new Service');
		throw new Error('Failed to create new Service');
	}

	const updates: { [key: string]: FirebaseServiceFormat } = {};
	updates[`service/${newServiceKey}`] = service;
	updates[`user-service/${service.uid}/${newServiceKey}`] = service;

	return update(ref(db), updates)
		.then(() => {
			alertTypeState.set('success');
			alertTextState.set('Service/DB: ' + 'Service Successfully Stored');
			return newServiceKey;
		})
		.catch((error) => {
			alertTypeState.set('error');
			alertTextState.set('Service/DB: ' + error.message);
			throw error;
		});
};

export const updateFirebaseServiceAsync = (key: string, service: FirebaseServiceFormat) => {
	if (!key) {
		alertTypeState.set('error');
		alertTextState.set(
			'Service/DB: ' + 'Failed to create new Service could not find the service key',
		);
		throw new Error('Failed to create new Service could not find the service key');
	}

	const updates: { [key: string]: FirebaseServiceFormat } = {};
	updates[`service/${key}`] = service;
	updates[`user-service/${service.uid}/${key}`] = service;

	return update(ref(db), updates)
		.then(() => {
			alertTypeState.set('success');
			alertTextState.set('Service/DB: ' + 'Service Successfully Updated');
		})
		.catch((error) => {
			alertTypeState.set('error');
			alertTextState.set('Service/DB: ' + error.message);
			throw error;
		});
};

/** Deletes the selected Service appointment from firebase Reat-Time DB */
export const removeFirebaseServiceAsync = (key: string, uid: string) => {
	if (!key) {
		alertTypeState.set('error');
		alertTextState.set('Service/DB: ' + 'Failed to delete the Service Appointment, missing Key');
		throw new Error('Failed to delete the Service Appointment, missing Service Appointment Key');
	}
	if (!uid) {
		alertTypeState.set('error');
		alertTextState.set(
			'Service/DB: ' + 'Failed to delete the Service Appointment, missing User Id',
		);
		throw new Error('Failed to delete the Service Appointment, missing User Id');
	}

	return remove(ref(db, `service/${key}`))
		.then(() => remove(ref(db, `user-service/${uid}/${key}`)))
		.then(() => {
			alertTypeState.set('info');
			alertTextState.set('Service/DB: ' + 'Service Successfully Deleted');
		})
		.catch((error) => {
			alertTypeState.set('error');
			alertTextState.set('Service/DB: ' + error.message);
			throw error;
		});
};
