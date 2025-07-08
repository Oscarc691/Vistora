import React from "react";
import Table from "../../ui/AppealsTable";

const AppealsManagement = () => {

  const sampleData = [
    {
      appealId: 'A001',
      claimId: 'C1234',
      provider: 'Dr. Smith',
      submissionDate: '2024-05-01',
      status: 'New',
      riskScore: 10,
    },
    {
      appealId: 'A002',
      claimId: 'C5678',
      provider: 'Dr. Patel',
      submissionDate: '2024-05-02',
      status: 'In Review',
      riskScore: 55,
    },
    {
      appealId: 'A003',
      claimId: 'C9876',
      provider: 'Dr. Lopez',
      submissionDate: '2024-05-01',
      status: 'Resolved',
      riskScore: 40,
    },
    {
      appealId: 'A003',
      claimId: 'C9876',
      provider: 'Dr. Lopez',
      submissionDate: '2024-05-01',
      status: 'New',
      riskScore: 20,
    },
    {
      appealId: 'A003',
      claimId: 'C9876',
      provider: 'Dr. Lopez',
      submissionDate: '2024-05-01',
      status: 'Resolved',
      riskScore: 60,
    },
    {
      appealId: 'A003',
      claimId: 'C9876',
      provider: 'Dr. Lopez',
      submissionDate: '2024-05-01',
      status: 'New',
      riskScore: 100,
    },
    {
      appealId: 'A003',
      claimId: 'C9876',
      provider: 'Dr. Lopez',
      submissionDate: '2024-05-01',
      status: 'In Review',
      riskScore: 80,
    },
  ];


  return (
    <section className="m-0 h-screen w-full overflow-hidden p-6 flex flex-col gap-20 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
      <h1 className="text-2xl font-bold">Appeals Management</h1>
      <Table data={sampleData}/>
    </section>
  );
};

export default AppealsManagement;
