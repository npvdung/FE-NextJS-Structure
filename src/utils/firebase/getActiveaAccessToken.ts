import { getAuth } from 'firebase/auth';
import { getApp } from 'firebase/app';
import { auth } from '../../configs/auth/firebase/firebase';
async function getAccessToken() {
	// console.log('getAccessToken', getAuth(getApp()).currentUser);
	// return await getAuth(getApp()).currentUser?.getIdToken();
	return await auth.currentUser?.getIdToken();
}

export default getAccessToken;
