import React from "react";
import MetricCard from "../components/MetricCard";
import NotificationBanner from "../components/NotificationBanner";
import ListingsTable from "../components/ListingsTable";
import GrowthChart from "../components/GrowthChart";
import ChartCard from "../components/ChartCard";

const Dashboard = () => {
  const fetchSalesData = async () => [
    { label: "Jan", value: 30 },
    { label: "Feb", value: 45 },
    { label: "Mar", value: 60 },
    { label: "Apr", value: 80 },
    { label: "May", value: 120 }
  ];

  const fetchGrowthData = async () => [
    { label: "Jan", value: 5 },
    { label: "Feb", value: 10 },
    { label: "Mar", value: 15 },
    { label: "Apr", value: 20 },
    { label: "May", value: 25 }
  ];

  return (
    <main className="p-6 h-[80vh] bg-gray-50 overflow-auto space-y-6">
        {/* Top Metric Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard title="Total Properties" value="5,569" change="+3.0%" />
        <MetricCard title="Total Rent" value="569" change="+2.7%" />
        <MetricCard title="Total Sale" value="5,000" change="+5k this month" />
        <MetricCard title="Total Revenue" value="₹12.5M" change="+8% this month" />
      </section>

      {/* Notification */}
      <NotificationBanner message="🏘️ 74 tenants have been submitted recently — please check them out!" />

      {/* Metric Cards & Notification omitted for brevity */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Sales Statistics</h2>
          <ChartCard fetchData={fetchSalesData} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Growth Statistics</h2>
          <GrowthChart fetchData={fetchGrowthData} />
        </div>
      </section>
  {/* Recent Listings */}
      <section className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent Listings</h2>
        <ListingsTable />
      </section>
      {/* Recent Listings table omitted for brevity */}
    </main>
  );
};

export default Dashboard;
