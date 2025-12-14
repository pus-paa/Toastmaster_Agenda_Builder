'use client';

import Sidebar from "@/pages/Sidebar";
import MeetingList from "@/pages/MeetingList";

const MeetingListPage = () => {
  return (
    <div className="flex h-full">
      <Sidebar />
      
      <div className="flex-1 bg-gray-50 overflow-auto">
        <MeetingList />
      </div>
    </div>
  );
}

export default MeetingListPage;
