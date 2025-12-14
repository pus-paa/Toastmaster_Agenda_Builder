'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  
  const isActiveMeeting = pathname?.startsWith('/protected/meeting');
  const isActiveAgenda = pathname?.startsWith('/protected/agenda');

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <nav className="flex-1 px-3 py-4 space-y-1">
        <Link
          href="/protected/meetings"
          className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-3 ${
            isActiveMeeting
              ? 'bg-blue-50 text-blue-700 shadow-sm'
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <span className="text-lg">📅</span>
          <span>Meetings</span>
        </Link>

        <Link
          href="/protected/agendas"
          className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-3 ${
            isActiveAgenda
              ? 'bg-blue-50 text-blue-700 shadow-sm'
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <span className="text-lg">📝</span>
          <span>Agendas</span>
        </Link>
      </nav>
    </aside>
  );
}
