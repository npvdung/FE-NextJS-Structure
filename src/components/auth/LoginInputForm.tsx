import React from 'react';

function LoginInputForm() {
	return (
		<form>
			<div className="text-center">
				<h1 className=" pt-[35px] pb-[8px] text-[24px] font-medium">
					Login
				</h1>
				<p className="pb-[20px] text-[14px] text-[#888] border-b-2 border-[#eee]">
					Welcome back. Login to start working.
				</p>
			</div>
			<div className="flex flex-col pb-[20px]">
				<label
					htmlFor="email"
					className="font-bold text-[13px] pb-[10px] text-[#000000]"
				>
					Email:
				</label>
				<input
					id="email"
					type="text"
					placeholder="Your email"
					// onChange={handleEmail}
					className="p-[10px] h-[40px] text-[16px] placeholder-[#888] rounded-[3px] bg-[#FFFFFF] outline-none border border-[#d3d3d3] "
				/>
			</div>
			<div className="flex flex-col pb-[20px]">
				<label
					htmlFor="password"
					className="font-bold text-[13px] pb-[10px] text-[#000000]"
				>
					Password:
					<p className="float-right text-[#267cde] text-[13px] font-normal">
						Forget your password?
					</p>
				</label>
				<input
					id="password"
					type="password"
					placeholder="Your password"
					// onChange={handleEmail}
					className="p-[10px] h-[40px] text-[16px] placeholder-[#888] rounded-[3px] bg-[#FFFFFF] outline-none border border-[#d3d3d3] "
				/>
			</div>
			<div className="flex">
				<div className="flex items-center">
					<input type="checkbox" />
				</div>
				<div className="text-[#888] text-[13px] ml-[12px]">
					Keep me logged in
				</div>
			</div>
			<div className="mt-[20px]">
				<button
					className="w-full h-[40px] text-center text-white-text text-[14px] font-medium bg-[#2bd14e] rounded-[3px]"
					type="submit"
				>
					Login to start working
				</button>
			</div>
		</form>
	);
}

export default LoginInputForm;
