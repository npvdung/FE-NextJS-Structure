import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../configs/auth/firebase/firebase';
import LoginInputForm from '../../components/auth/LoginInputForm';
import getAccessToken from '../../utils/firebase/getActiveAccessToken';
import { useRouter } from 'next/router';

function AuthFirebaseView() {
    const router = useRouter();
    // Inside AuthProvider
    const provider = new GoogleAuthProvider();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                console.log('uid', uid);
                const token = await user.getIdToken();
                const token2 = await user.getIdTokenResult();
                localStorage.setItem('accesstoken', token);
                console.log('token', token);
                // console.log('token2', token2);
                const res = await fetch(`${process.env.NEXT_PUBLIC_BE_DOMAIN_URL}/user/auth/${token}`)
                    .then((res) => res.json())
                    .catch((err) => console.log(err));
                if (res?.statusCode === 200 && res?.data?.email) {
                    console.log(res);
                    router.push('/dashboard');
                }
            } else {
                console.log('no user');
            }
        });
    }, []);
    const login = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                // console.log({ credential, token, user });
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log({ errorCode, errorMessage, email, credential });
            });
    };

    const logout = () => {
        auth.signOut();
        console.log('logout');
    };
    return (
        <div className="flex justify-center">
            <div className="w-[600px]">
                <div className="mx-[25px] p-[20px]">
                    <div className="pt-[10px]">
                        <img src="https://share-gcdn.basecdn.net/brand/logo.full.png" alt="Logo" className="mx-auto" />
                    </div>
                    <LoginInputForm />
                    <div className="mt-[35px] text-[13px] text-[#AAAAAA] text-center">Or, login via single sign-on</div>
                    <div
                        onClick={login}
                        className="flex items-center justify-center w-[250px] h-[38px] text-[#267BDE] bg-[#f3f3f3] hover:bg-[#267BDE] hover:text-[#FFFFFF] mx-auto mt-[20px] text-[13px] font-medium rounded-[3px] cursor-pointer"
                    >
                        Login with Google
                    </div>
                    <div
                        onClick={logout}
                        className="flex items-center justify-center w-[250px] h-[38px] text-[#267BDE] bg-[#f3f3f3] hover:bg-[#267BDE] hover:text-[#FFFFFF] mx-auto mt-[20px] text-[13px] font-medium rounded-[3px] cursor-pointer"
                    >
                        Logout
                    </div>
                    {/* <div onClick={testHandle}>Test</div> */}
                </div>
            </div>
            <div className="hidden lg:block">
                <img
                    src="https://static-gcdn.basecdn.net/account/image/background.png"
                    alt=""
                    // className=" object-cover"
                />
            </div>
        </div>
    );
}

export default AuthFirebaseView;
