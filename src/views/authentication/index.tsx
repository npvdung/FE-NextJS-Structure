import { useRouter } from 'next/router';
import React from 'react';
import LoginInputForm from '../../components/auth/LoginInputForm';

function AuthenticationView() {
	const router = useRouter();

	const LoginByGoogle = async () => {
		// router.replace(`http://localhost:5000/auth/google`);
		router.replace(
			`${process.env.NEXT_PUBLIC_BE_DOMAIN_URL}/auth/google`
			// `http://localhost:5000/auth/google`
		);
	};
	return (
		<div className="flex justify-center">
			<div className="w-[600px]">
				<div className="mx-[25px] p-[20px]">
					<div className="pt-[10px]">
						<img
							src="https://share-gcdn.basecdn.net/brand/logo.full.png"
							alt="Logo"
							className="mx-auto"
						/>
					</div>
					<LoginInputForm />
					<div className="mt-[35px] text-[13px] text-[#AAAAAA] text-center">
						Or, login via single sign-on
					</div>
					<div
						onClick={LoginByGoogle}
						className="flex items-center justify-center w-[250px] h-[38px] text-[#267BDE] bg-[#f3f3f3] hover:bg-[#267BDE] hover:text-[#FFFFFF] mx-auto mt-[20px] text-[13px] font-medium rounded-[3px] cursor-pointer"
					>
						Login with Google
					</div>
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

export default AuthenticationView;
