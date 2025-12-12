// import { getSession } from '@/lib/auth';
// import { redirect } from 'next/navigation';
// import Link from 'next/link';


// export default async function ProtectedPage() {
//   const session = await getSession();

//   if (!session) {
//     redirect('/login');
//   }
//   return (
//     <div className="flex h-screen">
//       Welcome to the dashboard, {session?.user?.name}!
//       <Link href="/protected/agenda" className="ml-4 text-blue-600 hover:underline">
//         Agendas
//       </Link>
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import Sidebar from '@/pages/Sidebar';
import Meeting from '@/pages/Meeting';
import Agenda from '@/pages/Agenda';

const ProtectedPage = () => {
  const [activeTab, setActiveTab] = useState<'meeting' | 'agenda'>('meeting');

  return (
    <div className="flex h-full -m-6 overflow-hidden">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex items-center justify-center">
        {activeTab === 'meeting' ? (
          <Meeting onSuccess={() => {
            console.log('Meeting created successfully');
          }} />
        ) : (
          <Agenda onSuccess={() => {
            console.log('Agenda created successfully');
          }} />
        )}
      </div>
    </div>
  );
};

export default ProtectedPage;