'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Sidebar from '@/pages/Sidebar';

interface Agenda {
  id: number;
  role: string;
  assignedTo: string;
  memberDetail: string | null;
  allocatedTime: string | null;
  sequence: number;
}

interface Meeting {
  id: number;
  meetingNumber: number;
  meetingTheme: string;
  meetingDate: string;
  startTime: string;
  toastMasterOfDay: string;
  agendas: Agenda[];
}

export default function MeetingViewPage() {
  const router = useRouter();
  const params = useParams();
  const meetingId = params?.id as string;

  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (meetingId) {
      fetchMeeting();
    }
  }, [meetingId]);

  const fetchMeeting = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/meetings/${meetingId}`);
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch meeting details');
      }
      
      const data = await res.json();
      setMeeting(data);
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
        weekday: 'long',
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
            <p className="mt-4 text-gray-600">Loading meeting details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !meeting) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md">
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-4">
              <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h2 className="text-xl font-bold mb-2">Meeting Not Found</h2>
              <p className="mb-1">{error || 'The meeting you are looking for does not exist or has been deleted.'}</p>
              <p className="text-sm">Meeting ID: {meetingId}</p>
            </div>
            <button
              onClick={() => router.push('/protected/meetings')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 mx-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Meetings List
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 bg-gray-50 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.push('/protected/meetings')}
              className="text-blue-600 hover:text-blue-700 flex items-center gap-2 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Meetings
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{meeting.meetingTheme}</h1>
                <p className="text-lg text-gray-600">Meeting #{meeting.meetingNumber}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="text-sm text-gray-500 font-medium">Date</p>
                <p className="text-lg text-gray-800 font-semibold">{formatDate(meeting.meetingDate)}</p>
              </div>
              <div className="border-l-4 border-green-600 pl-4">
                <p className="text-sm text-gray-500 font-medium">Start Time</p>
                <p className="text-lg text-gray-800 font-semibold">{meeting.startTime}</p>
              </div>
              <div className="border-l-4 border-purple-600 pl-4">
                <p className="text-sm text-gray-500 font-medium">Toastmaster of the Day</p>
                <p className="text-lg text-gray-800 font-semibold">{meeting.toastMasterOfDay}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Meeting Agenda</h2>
              <button
                onClick={() => router.push(`/protected/agenda/create?meetingId=${meetingId}`)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Agenda Item
              </button>
            </div>

            {meeting.agendas && meeting.agendas.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sequence</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned To</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {meeting.agendas.sort((a, b) => a.sequence - b.sequence).map((agenda) => (
                      <tr key={agenda.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{agenda.sequence}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full">
                            {agenda.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">{agenda.assignedTo}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{agenda.memberDetail || '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{agenda.allocatedTime || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-500 text-lg font-medium">No agenda items yet</p>
                <p className="text-gray-400 text-sm mt-2">Click "Add Agenda Item" to create your first agenda</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
