'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InputField from "@/components/Input";
export default function Login() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (result.error || !response.ok) {
                setError(result.error || 'Invalid email or password');
                setIsLoading(false);
            } else {
                router.push('/protected');
                router.refresh();
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            setIsLoading(false);
        }
    }

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-blue-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3x1 font-bold mb-2 text-center text-blue-600" >Sign In</h1>
                <p className="text-center text-gray-600 mb-6">Login to your Account</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}
                    <InputField
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="example@email.com"
                        autoComplete="email"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none"
                        required
                    />

                    <InputField
                        label="Password"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-gray-600">
                            Don't have an account?{''}
                            <Link href="/register" className="text-blue-600 font-bold hover:underline">
                                Sign up here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}