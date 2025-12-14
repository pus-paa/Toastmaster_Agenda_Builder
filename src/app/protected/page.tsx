
'use client';

import { useState } from 'react';
import Sidebar from '@/pages/Sidebar';
import Meeting from '@/pages/Meeting';
import Agenda from '@/pages/Agenda';
import Link from 'next/link';

const ProtectedPage = () => {
  const [activeTab, setActiveTab] = useState<'meeting' | 'agenda'>('meeting');

  return (
    <div className="flex h-full">
    
      <Sidebar />

      
      <div className="flex-1 bg-gray-50 overflow-auto">
        <div className="flex items-center justify-center min-h-full p-6">
          Wecome to Admin
        </div>
      </div>
    </div>
  );
};

export default ProtectedPage;