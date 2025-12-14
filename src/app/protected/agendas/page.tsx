'use client';

import Sidebar from "@/pages/Sidebar";
import AgendaList from "@/pages/AgendaList";

const AgendaListPage = () => {
  return (
    <div className="flex h-full">
      <Sidebar />
      
      <div className="flex-1 bg-gray-50 overflow-auto">
        <AgendaList />
      </div>
    </div>
  );
}

export default AgendaListPage;
