import React from 'react';

const NotificationBanner = ({ message }) => (
  <div className="bg-teal-50 border-teal-200 text-teal-800 p-4 rounded mb-6 flex justify-between items-center">
    <div>{message}</div>
    <button className="text-teal-700 underline hover:text-teal-900">Review Listings</button>
  </div>
);

export default NotificationBanner;
