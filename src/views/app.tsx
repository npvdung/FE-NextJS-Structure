import React from 'react';
import { auth } from '../configs/auth/firebase/firebase';
import { useRouter } from 'next/router';

function HomeView() {
    const router = useRouter();
    const logout = async () => {
        auth.signOut();
        console.log('logout');
        localStorage.removeItem('accesstoken');
        router.push('/auth-firebase');
    };
    return (
        <div>
            <a href="/dashboard" className="text-sky-700 underline decoration-sky-700">
                {' '}
                Dashboard{' '}
            </a>

            <div onClick={logout}>Logout</div>
        </div>
    );
}

export default HomeView;
