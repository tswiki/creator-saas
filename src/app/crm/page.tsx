
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CRM() {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Lead', lastContact: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Customer', lastContact: '2024-01-14' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', status: 'Prospect', lastContact: '2024-01-13' },
  ]);

  useEffect(() => {
    // Simulate data fetching
    const fetchContacts = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Customer Relationship Management</h1>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Add Contact
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-indigo-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold">Total Contacts</h3>
            <p className="text-2xl font-bold text-indigo-600">{contacts.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold">Active Customers</h3>
            <p className="text-2xl font-bold text-green-600">2</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold">Pending Leads</h3>
            <p className="text-2xl font-bold text-yellow-600">1</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold">Follow-ups</h3>
            <p className="text-2xl font-bold text-purple-600">5</p>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{contact.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{contact.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      contact.status === 'Customer' ? 'bg-green-100 text-green-800' :
                      contact.status === 'Lead' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{contact.lastContact}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
