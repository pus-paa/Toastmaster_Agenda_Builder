'use client';

import { useState } from 'react';

export default function Meeting({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    meetingNumber: '',
    meetingTheme: '',
    meetingDate: '',
    startTime: '',
    toastMasterOfDay: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          meetingNumber: parseInt(formData.meetingNumber),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to create meeting');

      setSuccess('Meeting created successfully!');
      setFormData({
        meetingNumber: '',
        meetingTheme: '',
        meetingDate: '',
        startTime: '',
        toastMasterOfDay: '',
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-blue-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2 text-center text-blue-600">Create Meeting</h1>
        <p className="text-center text-gray-600 mb-6">Fill in the meeting details</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}

          <input
            type="number"
            name="meetingNumber"
            placeholder="Meeting Number"
            value={formData.meetingNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none"
          />

          <input
            type="text"
            name="meetingTheme"
            placeholder="Meeting Theme"
            value={formData.meetingTheme}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none"
          />

          <input
            type="date"
            name="meetingDate"
            value={formData.meetingDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none"
          />

          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none"
          />

          <input
            type="text"
            name="toastMasterOfDay"
            placeholder="Toastmaster of the Day"
            value={formData.toastMasterOfDay}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Meeting'}
          </button>
        </form>
      </div>
    </div>
  );
}
