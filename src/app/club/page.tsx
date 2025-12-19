'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function ClubPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        clubId: '',
        name: '',
        region: '',
        district: '',
        division: '',
        area: '',
        charteredDate: '',
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const res = await fetch('api/club/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });
        if (res.ok) {
            alert('Club created successfully');
            router.push('/dashboard');
        } else {
            alert('Failed to create club');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">Welcome! Choose an Option</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Create Club Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <h3 className="text-xl font-semibold text-blue-600 mb-2">Create Club</h3>
                        <input name="clubId"
                            placeholder="Club Number"
                            onChange={handleChange} required
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500" />
                        <input name="name"
                            placeholder="Club Name"
                            onChange={handleChange} required
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500" />
                        <input name="region"
                            placeholder="Region"
                            onChange={handleChange} required
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500" />
                        <input name="district"
                            placeholder="District" onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500" />
                        <input name="division"
                            placeholder="Division"
                            onChange={handleChange} required
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500" />
                        <input name="area"
                            placeholder="Area"
                            onChange={handleChange} required
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500" />
                        <input type="date"
                            name="charteredDate"
                            onChange={handleChange} required
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500" />
                        <button type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition">Create Club</button>
                    </form>
                    <div className="flex flex-col justify-center items-center bg-blue-50 rounded-lg p-6 shadow">
                        <h3 className="text-xl font-semibold text-blue-600 mb-4">Join Existing Club</h3>
                        <button
                            onClick={() => router.push('/club/join')}
                            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                        >
                            Join Club
                        </button>
                    </div>
                </div>
                <div className="text-center mt-6">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="text-gray-600 underline hover:text-blue-600"
                    >
                        Skip for now
                    </button>
                </div>
            </div>
        </div>
    );
}

