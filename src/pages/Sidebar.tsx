'use client';

interface Sidebar {
  activeTab: 'meeting' | 'agenda';
  onTabChange: (tab: 'meeting' | 'agenda') => void;
}

export default function Sidebar({ activeTab, onTabChange }: Sidebar) {
  return (
    <div className="w-64 border-r bg-gray-50 p-4 min-h-screen">
<h2 className="text-wrap font-bold mb-6  text-blue-600">Dashboard</h2>

      <nav className="space-y-2">
        <button
          onClick={() => onTabChange('meeting')}
          className={`w-full text-left px-4 py-2 rounded ${
            activeTab === 'meeting' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
          }`}
        >
          Meeting
        </button>

        <button
          onClick={() => onTabChange('agenda')}
          className={`w-full text-left px-4 py-2 rounded ${
            activeTab === 'agenda' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
          }`}
        >
          Agenda
        </button>
      </nav>
    </div>
  );
}
