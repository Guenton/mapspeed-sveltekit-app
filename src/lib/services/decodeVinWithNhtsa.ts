import axios from 'axios';

import { PUBLIC_NHTSA_VIN_URL } from '$env/static/public';
import type { VehicleInfoNhtsa, VehicleVinNhtsaResponseFormat } from '$lib/types/vehicle';
import { alertTextState, alertTypeState } from '$lib/store';

const nhtsaUrl = PUBLIC_NHTSA_VIN_URL;

export default (vin: string) =>
	axios
		.get<VehicleVinNhtsaResponseFormat>(nhtsaUrl + vin, { params: { format: 'json' } })
		.then(({ data }) => {
			const vehicleInfo: VehicleInfoNhtsa = {
				make: data.Results[7].Value,
				model: data.Results[9].Value,
				year: data.Results[10].Value,
				bodyClass: data.Results[23].Value,
				numOfDoors: data.Results[24].Value,
				transmissionType: data.Results[49].Value,
				transmissionSpeeds: data.Results[50].Value,
				engineCylinders: data.Results[70].Value,
				engineCC: data.Results[71].Value,
				engineL: data.Results[73].Value,
				engineInfo: data.Results[86].Value,
				fuel: data.Results[77].Value,
				valveTrain: data.Results[78].Value,
			};
			alertTypeState.set('success');
			alertTextState.set(
				`Vin/DECODE: Successfully Decoded - ${vehicleInfo.make} ${vehicleInfo.model} ${vehicleInfo.year}`,
			);

			return vehicleInfo;
		})
		.catch((error) => {
			alertTypeState.set('error');
			alertTextState.set('Vin/DECODE: ' + error.message);
			throw error;
		});
