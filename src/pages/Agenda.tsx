'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AgendaProps {
  onSuccess?: () => void;
  onBack?: () => void;
}

export default function Agenda({ onSuccess, onBack }: AgendaProps) {
  const [formData, setFormData] = useState({
    meetingId: '',
    role: '',
    assignedTo: '',
    memberId: '',
    memberDetail: '',
    allocatedTime: '',
    sequence: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/agendas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          meetingId: parseInt(formData.meetingId),
          memberId: formData.memberId ? parseInt(formData.memberId) : null,
          sequence: parseInt(formData.sequence),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to create agenda');

      setSuccess('Agenda created successfully!');
      setFormData({
        meetingId: '',
        role: '',
        assignedTo: '',
        memberId: '',
        memberDetail: '',
        allocatedTime: '',
        sequence: '',
      });

      if (onSuccess) onSuccess();
      
      if (onBack) {
        setTimeout(() => {
          router.push('/protected/agendas');
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back to List</span>
          </button>
        )}
        <h1 className="text-3xl font-bold mb-2 text-center text-blue-600">Create Agenda</h1>
        <p className="text-center text-gray-600 mb-6">Fill in the agenda details</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}
          {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">{success}</div>}

          <input
            type="number"
            name="meetingId"
            placeholder="Meeting ID"
            value={formData.meetingId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />

          <input
            type="text"
            name="role"
            placeholder="Role (e.g., Speaker, Timer)"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />

          <input
            type="text"
            name="assignedTo"
            placeholder="Assigned To"
            value={formData.assignedTo}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />

          <input
            type="number"
            name="memberId"
            placeholder="Member ID (optional)"
            value={formData.memberId}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />

          <input
            type="text"
            name="memberDetail"
            placeholder="Member Detail (optional)"
            value={formData.memberDetail}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />

          <input
            type="text"
            name="allocatedTime"
            placeholder="Allocated Time (optional)"
            value={formData.allocatedTime}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />

          <input
            type="number"
            name="sequence"
            placeholder="Sequence"
            value={formData.sequence}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Agenda'}
          </button>
        </form>
      </div>
    </div>
  );
}
