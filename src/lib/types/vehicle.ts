/** VEHICLE - Format for NHTSA Vin responses */
export type VehicleVinNhtsaResponseFormat = {
	Count: number;
	Message: string;
	SearchCriteria: string;
	Results: VehicleVinNhtsaResponseField[];
};

/** VEHICLE - Format for NHTSA Vin responses */
export type VehicleVinNhtsaResponseField = {
	Value: string;
	ValueId: string;
	Variable: string;
	VariableId: number;
};

/** VEHICLE - Short Format for NHTSA Vin responses */
export type VehicleInfoNhtsa = {
	make: string;
	model: string;
	year: string;
	bodyClass: string;
	numOfDoors: string;
	transmissionType: string;
	transmissionSpeeds: string;
	engineCylinders: string;
	engineCC: string;
	engineL: string;
	engineInfo: string;
	fuel: string;
	valveTrain: string;
};

/** VEHICLE - Firebase Vehicle Information Format */
export type FirebaseVehicleFormat = {
	uid: string;
	vin: string;
	make: string;
	model: string;
	year: string;
	bodyClass: string;
	engineInfo: string;
	engineCC: string;
	engineCylinders: string;
	fuel: string;
	email: string;
	firstName: string;
	lastName: string;
	phone: string;
	remarks: string;
};
