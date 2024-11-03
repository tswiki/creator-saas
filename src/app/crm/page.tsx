

'use client';

import { useState, useEffect } from 'react';
import { PopoverNewLead } from "@/components/ui/popover-newLead";

export default function CRM() {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'New Lead', lastContact: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Contact Made', lastContact: '2024-01-14' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', status: 'Replied', lastContact: '2024-01-13' },
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const popoverElement = document.querySelector('.popover');
      if (popoverElement && !popoverElement.contains(event.target as Node)) {
        setShowPopover(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
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

  const columns = ['New Lead', 'Contact Made', 'Replied', 'Call Booked For Agency'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {columns.map((column) => (
        <div
          key={column}
          className="bg-white shadow-md rounded-lg p-4"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const contactId = e.dataTransfer.getData("text");
            const contact = contacts.find((c) => `contact-${c.id}` === contactId);
            if (contact) {
              setContacts(
                contacts.map((c) =>
                  c.id === contact.id ? { ...c, status: column } : c
                )
              );
            }
          }}
        >
          <h2 className="text-lg font-semibold mb-4">{column}</h2>
          <div className="space-y-4">
            {contacts
              .filter((contact) => contact.status === column)
              .map((contact) => (
                <div
                  key={contact.id}
                  id={`contact-${contact.id}`}
                  className="bg-gray-100 p-4 rounded-md shadow cursor-pointer"
                  draggable="true"
                  onDragStart={(e) =>
                    e.dataTransfer.setData("text", e.currentTarget.id)
                  }
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="text-sm font-medium">{contact.name}</p>
                  <p className="text-xs text-gray-500">{contact.email}</p>
                  <p className="text-xs text-gray-400">
                    Last Contact: {contact.lastContact}
                  </p>
                </div>
              ))}
          </div>
          <button
            className="mt-4 text-indigo-600 hover:underline"
            onClick={() => setShowPopover(true)}
          >
            + Add Card
          </button>
          {showPopover && (
            <PopoverNewLead
              onSubmit={({ name, surname, email, phoneNo }) => {
                const newContact = {
                  id: contacts.length + 1,
                  name: `${name} ${surname}`,
                  email: email,
                  status: column,
                  lastContact: new Date().toISOString().split("T")[0],
                  phoneNo: phoneNo,
                };
                setContacts([...contacts, newContact]);
              }}
              onClose={() => setShowPopover(false)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
