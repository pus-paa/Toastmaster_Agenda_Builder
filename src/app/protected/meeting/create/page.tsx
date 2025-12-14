'use client';

import { useRouter } from 'next/navigation';
import Sidebar from "@/pages/Sidebar";
import Meeting from "@/pages/Meeting";

const CreateMeetingPage = () => {
  const router = useRouter();

  return (
    <div className="flex h-full">
      <Sidebar />
      
      <div className="flex-1 bg-gray-50 flex items-center justify-center overflow-hidden">
        <Meeting 
          onSuccess={() => {
            console.log('Meeting created successfully');
          }}
          onBack={() => router.push('/protected/meetings')}
        />
      </div>
    </div>
  );
}

export default CreateMeetingPage;
