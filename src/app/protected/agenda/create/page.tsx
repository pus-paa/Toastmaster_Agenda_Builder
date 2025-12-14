'use client';

import { useRouter } from 'next/navigation';
import Sidebar from "@/pages/Sidebar";
import Agenda from "@/pages/Agenda";

const CreateAgendaPage = () => {
  const router = useRouter();

  return (
    <div className="flex h-full">
      <Sidebar />
      
      <div className="flex-1 bg-gray-50 flex items-center justify-center overflow-hidden">
        <Agenda 
          onSuccess={() => {
            console.log('Agenda created successfully');
          }}
          onBack={() => router.push('/protected/agendas')}
        />
      </div>
    </div>
  );
}

export default CreateAgendaPage;
