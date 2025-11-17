import React from 'react';

const MetricCard = ({ title, value, change }) => (
  <div className="bg-white p-6 rounded shadow flex-flex-col">
    <h3 className="text-base font-medium text-gray-600">{title}</h3>
    <div className="mt-2 text-3xl font-bold text-gray-800">{value}</div>
  </div>
);

export default MetricCard;
