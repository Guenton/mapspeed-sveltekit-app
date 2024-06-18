// import { getFirebaseUserId } from '$lib/firebase/auth';
import { authLoginPage, homePage } from '$utils/pages';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// export const ssr = false;

export const load: PageServerLoad = ({ cookies }) => {
	// const userId = getFirebaseUserId();
	const userId = cookies.get('userId') as string | undefined;

	if (userId) {
		throw redirect(307, homePage);
	} else {
		throw redirect(307, authLoginPage);
	}
};
