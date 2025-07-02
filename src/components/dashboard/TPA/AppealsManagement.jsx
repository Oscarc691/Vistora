import React from "react";
import { useState } from "react";
import Table from "../../ui/AppealsTable";
import DashboardStatCard from "../General/DashboardStatCard";
import { MessageSquare, Clock, AlarmClockCheck, AlarmMinusIcon, AlertTriangleIcon } from "lucide-react"; 

const AppealsManagement = () => {

  const [statusFilter, setStatusFilter] = useState('');

  const sampleData = [
    {
      appealId: 'A001',
      claimId: 'C1234',
      patient: 'John Smith',
      submissionDate: '2024-05-01',
      status: 'New',
      priority: 'High',
      doctorID: 1234,
      daysOpen: 8,
      riskScore: 10,
    },
    {
      appealId: 'A002',
      claimId: 'C5678',
      patient: 'Lenord Patel',
      submissionDate: '2024-05-02',
      status: 'In Review',
      priority: 'Medium',
      doctorID: 5678,
      daysOpen: 3,
      riskScore: 55,
    },
    {
      appealId: 'A003',
      claimId: 'C9876',
      patient: 'Carlos Lopez',
      submissionDate: '2024-05-01',
      status: 'Resolved',
      priority: 'Low',
      doctorID: 4321,
      daysOpen: 1,
      riskScore: 40,
    },
    {
      appealId: 'A003',
      claimId: 'C9876',
      patient: 'Carlos Lopez',
      submissionDate: '2024-05-01',
      status: 'Pending Info',
      priority: 'High',
      doctorID: 8765,
      daysOpen: 4,
      riskScore: 20,
    },
    {
      appealId: 'A003',
      claimId: 'C9876',
      patient: 'Daniel Santiago',
      submissionDate: '2024-05-01',
      status: 'Resolved',
      priority: 'Low',
      doctorID: 9099,
      daysOpen: 5,
      riskScore: 60,
    },
    {
      appealId: 'A003',
      claimId: 'C9876',
      patient: 'Monica Diaz',
      submissionDate: '2024-05-01',
      status: 'New',
      priority: 'High',
      doctorID: 2040,
      daysOpen: 10,
      riskScore: 100,
    },
    {
      appealId: 'A003',
      claimId: 'C9876',
      patient: 'Will Metzler',
      submissionDate: '2024-05-01',
      status: 'In Review',
      priority: 'Medium',
      doctorID: 3113,
      daysOpen: 0,
      riskScore: 80,
    },
  ];

  const statusCounts = sampleData.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  const totalDaysOpen = sampleData.reduce((sum, item) => sum + item.daysOpen, 0);
  const avgDaysOpen = sampleData.length > 0 ? totalDaysOpen / sampleData.length : 0;

  return (
    <section className="-mx-4 -my-4 min-h-screen min-w-screen overflow-hidden bg-gray-50 p-4 flex flex-col gap-10 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
      <span className="w-full inline-flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Appeals Management</h1>
          <p className="text-sm text-gray-500">Review and manage provider appeals efficiently</p>
        </div>
        <span className="w-fit inline-flex gap-3 text-sm">
          <button className="bg-white rounded-[6px] border border-gray-200 px-4 py-2">Assign Bulk</button>
          <button className="text-white rounded-[6px] bg-red-800 border px-2 py-2">Export Appeals</button>
        </span>
      </span>
      
      {/* Section for each status type and how many */}
      <div className="w-full flex flex-nowrap gap-2 overflow-x-auto text-xs">
        <div className="basis-1/5 hover:opacity-70 hover:cursor-pointer transition-all duration-500" onClick={() => setStatusFilter('New')}>
          <DashboardStatCard 
            icon={<MessageSquare />} // or any other icon you imported from Lucide
            cardTitle="New Appeals"
            cardNumber={statusCounts.New || 0} // example dynamic count
            cardAnalytics=" "
            cardHighlighted={false}
            analyticsPositive={false}
          />
        </div>

        <div className="basis-1/5 hover:opacity-70 hover:cursor-pointer transition-all duration-500" onClick={() => setStatusFilter('In Review')}>
          <DashboardStatCard 
            icon={<AlarmMinusIcon />} // or any other icon you imported from Lucide
            cardTitle="In Review"
            cardNumber={statusCounts['In Review'] || 0} // example dynamic count
            cardAnalytics=" "
            cardHighlighted={false}
            analyticsPositive={false}
          />
        </div>
        
        <div className="basis-1/5 hover:opacity-70 hover:cursor-pointer transition-all duration-500" onClick={() => setStatusFilter('Pending Info')}>
          <DashboardStatCard 
            icon={<AlertTriangleIcon />} // or any other icon you imported from Lucide
            cardTitle="Pending Info"
            cardNumber={statusCounts['Pending Info'] || 0} // example dynamic count
            cardAnalytics=" "
            cardHighlighted={false}
            analyticsPositive={false}
          />
        </div>
  
        <div className="basis-1/5 hover:opacity-70 hover:cursor-pointer transition-all duration-500" onClick={() => setStatusFilter('Resolved')}>
          <DashboardStatCard 
            icon={<AlarmClockCheck />} // or any other icon you imported from Lucide
            cardTitle="Resolved"
            cardNumber={statusCounts.Resolved || 0} // example dynamic count
            cardAnalytics=" "
            cardHighlighted={false}
            analyticsPositive={false}
          />
        </div>
        
        <div className="basis-1/5 hover:opacity-70 hover:cursor-pointer transition-all duration-500">
          <DashboardStatCard 
            icon={<Clock />} // or any other icon you imported from Lucide
            cardTitle="Avg Days Open"
            cardNumber={avgDaysOpen.toFixed(1)} // example dynamic count
            cardAnalytics=" "
            cardHighlighted={false}
            analyticsPositive={false}
          />
        </div>
        
      </div>
      <Table data={sampleData} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
    </section>
  );
};

export default AppealsManagement;
