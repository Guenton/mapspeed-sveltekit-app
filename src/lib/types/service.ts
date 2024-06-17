/** SERVICE - Enum for service types */
export type ServiceType = 'BASIC' | 'PREMIUM' | 'CUSTOM';

/** SERVICE - Enum for service status */
export type ServiceStatus =
	| 'REQUESTED'
	| 'APPROVED'
	| 'DECLINED'
	| 'COMPLETED'
	| 'CANCELLED'
	| 'PENDING';

/** SERVICE - Firebase Service Information Format */
export type FirebaseServiceFormat = {
	uid: string;
	vin: string;
	vehicleKey: string;
	vehicleInfo: string;
	serviceDate: string;
	displayDate: string;
	serviceType: ServiceType;
	remarks: string;
	status: ServiceStatus;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
};

/** SERVICE - Service Table Row Format */
export type ServiceTableRowFormat = {
	key: string;
	uid: string;
	vin: string;
	vehicleKey: string;
	vehicleInfo: string;
	serviceDate: string;
	serviceType: ServiceType;
	remarks: string;
	status: ServiceStatus;
};
