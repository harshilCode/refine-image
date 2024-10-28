import React from "react";
import Image from 'next/image'
import { quicksand } from "@/utils/fonts";
import GoogleButton from "./Buttons/GoogleButton";

export default function LoginCard({
    handleLogin,
    handleGoogleLogin,
    setEmail,
    setPassword,
    error
}: {
    handleLogin: (e: React.FormEvent) => void;
    handleGoogleLogin: () => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    error: string;
}) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex bg-white rounded-large shadow-lg overflow-hidden max-w-4xl w-full mx-4 lg:mx-0">

                {/* Left Side - Login Form */}
                <div className={`${quicksand.className} w-full md:w-1/2 p-12`}>
                    <h1 className="text-5xl font-bold mb-2 text-gray-800">Welcome</h1>
                    <p className="text-gray-500 mb-8">We are glad to see you back with us</p>

                    <form onSubmit={handleLogin}>
                        <p className="text-red-500">{error}</p>
                        <div className="mb-4">
                            <input
                                type="email"
                                placeholder="Email"
                                className="rounded-large w-full px-6 py-4 bg-gray-100 text-gray-800 focus:outline-none focus:border-indigo-500"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-4 text-right">
                            <a href="#" className="text-gray-600 hover:underline text-sm">
                                Forgot Password?
                            </a>
                        </div>
                        <div className="mb-6">
                            <input
                                type="password"
                                placeholder="Password"
                                className="rounded-large w-full px-6 py-4 bg-gray-100 text-gray-800 focus:outline-none focus:border-indigo-500"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button className="rounded-large w-full bg-black text-white py-4 font-semibold hover:bg-gray-800 transition duration-300">
                            Log In
                        </button>
                    </form>

                    {/* <button className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 mt-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
                        <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" />
                        Log in with Google
                    </button> */}
                    <div className="mt-4">
                        <GoogleButton onClick={handleGoogleLogin} />
                    </div>
                </div>

                {/* Right Side - Image */}
                <div className="hidden content-center md:block md:w-1/2 bg-white">
                    <Image
                        className="rounded-large p-4"
                        src="https://azxasgdbcdovagnxalgh.supabase.co/storage/v1/object/public/Refine%20image%20bucket/AIRI.png"
                        width={500}
                        height={500}
                        alt="airi image"
                    />
                </div>

            </div>
        </div>
    );
}
