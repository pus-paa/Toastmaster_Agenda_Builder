'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Sidebar from '@/pages/Sidebar';

interface Member {
  id: number;
  name: string;
  emailAddress: string;
  phoneNumber: string;
}

interface Meeting {
  id: number;
  meetingNumber: number;
  meetingTheme: string;
  meetingDate: string;
  startTime: string;
}

interface Agenda {
  id: number;
  meetingId: number;
  role: string;
  assignedTo: string;
  memberId: number | null;
  memberDetail: string | null;
  allocatedTime: string | null;
  sequence: number;
  meeting: Meeting;
  member: Member | null;
}

export default function AgendaViewPage() {
  const router = useRouter();
  const params = useParams();
  const agendaId = params?.id as string;

  const [agenda, setAgenda] = useState<Agenda | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (agendaId) {
      fetchAgenda();
    }
  }, [agendaId]);

  const fetchAgenda = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/agendas/${agendaId}`);
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch agenda details');
      }
      
      const data = await res.json();
      setAgenda(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading agenda details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !agenda) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
            {error || 'Agenda not found'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 bg-gray-50 overflow-auto">
        <div className="max-w-5xl mx-auto p-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.push('/protected/agendas')}
              className="text-blue-600 hover:text-blue-700 flex items-center gap-2 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Agendas
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{agenda.role}</h1>
                <p className="text-lg text-gray-600">Sequence #{agenda.sequence}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="text-sm text-gray-500 font-medium">Assigned To</p>
                <p className="text-lg text-gray-800 font-semibold">{agenda.assignedTo}</p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <p className="text-sm text-gray-500 font-medium">Allocated Time</p>
                <p className="text-lg text-gray-800 font-semibold">{agenda.allocatedTime || 'Not specified'}</p>
              </div>

              <div className="border-l-4 border-purple-600 pl-4">
                <p className="text-sm text-gray-500 font-medium">Member Details</p>
                <p className="text-lg text-gray-800 font-semibold">{agenda.memberDetail || 'No details'}</p>
              </div>

              <div className="border-l-4 border-orange-600 pl-4">
                <p className="text-sm text-gray-500 font-medium">Member</p>
                <p className="text-lg text-gray-800 font-semibold">
                  {agenda.member ? agenda.member.name : 'Not assigned'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Meeting Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Meeting Number</span>
                <span className="text-gray-900 font-semibold">#{agenda.meeting.meetingNumber}</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Meeting Theme</span>
                <span className="text-gray-900 font-semibold">{agenda.meeting.meetingTheme}</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Meeting Date</span>
                <span className="text-gray-900 font-semibold">{formatDate(agenda.meeting.meetingDate)}</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Start Time</span>
                <span className="text-gray-900 font-semibold">{agenda.meeting.startTime}</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => router.push(`/protected/meeting/${agenda.meetingId}`)}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                View Full Meeting
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
