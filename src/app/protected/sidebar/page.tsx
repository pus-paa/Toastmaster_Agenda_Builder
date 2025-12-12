
import { useState } from 'react';
import Sidebar from "@/pages/Sidebar";

const SidebarPage = () => {
  const [activeTab, setActiveTab] = useState<'meeting' | 'agenda'>('meeting');

  return <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />;
}

export default SidebarPage;