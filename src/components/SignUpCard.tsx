import React from "react";
import { quicksand } from "@/utils/fonts";
import { User } from "@/types/user";

export default function SignUpCard({
    handleSignup,
    setUser,
    user,
    error,
    loading
}: {
    handleSignup: (e: React.FormEvent) => void;
    setUser: (user: User) => void;
    user: User;
    error: string;
    loading: boolean;
}) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex bg-white rounded-large shadow-lg overflow-hidden max-w-4xl w-full mx-4 md:w-1/2 lg:mx-0">

                {/* Left Side - Login Form */}
                <div className={`${quicksand.className} w-full p-12`}>
                    <h1 className="text-5xl font-bold mb-2 text-gray-800">Join Us Today!</h1>
                    <p className="text-gray-500 mb-8">Create an account to get started</p>

                    <form onSubmit={handleSignup}>
                        <p className="text-red-500">{error}</p>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Name"
                                className="rounded-large w-full px-6 py-4 bg-gray-50 text-gray-800 border-slate-200 focus:outline-none focus:border-indigo-500"
                                onChange={(e) => setUser({ ...user, full_name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="email"
                                placeholder="Email"
                                className="rounded-large w-full px-6 py-4 bg-gray-50 text-gray-800 border-slate-200 focus:outline-none focus:border-indigo-500"
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="password"
                                placeholder="Password"
                                className="rounded-large w-full px-6 py-4 bg-gray-50 text-gray-800 border-slate-200 focus:outline-none focus:border-indigo-500"
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                required
                            />
                        </div>

                        <button className="rounded-large w-full bg-black text-white py-4 font-semibold hover:bg-gray-800 transition duration-300" disabled={loading}>
                            {loading ? 'Signing up...' : 'Sign Up'}
                        </button>
                    </form>

                </div>

                {/* Right Side - Image */}
                {/* <div className="hidden content-center md:block md:w-1/2 bg-white">
                    <Image
                        className="rounded-large p-4"
                        src="https://azxasgdbcdovagnxalgh.supabase.co/storage/v1/object/public/Refine%20image%20bucket/AIRI.png"
                        width={500}
                        height={500}
                        alt="airi image"
                    />
                </div> */}

            </div>
        </div>
    );
}
