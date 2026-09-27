import React, { useState } from 'react';
import {
Compass, Heart, Ticket, DollarSign, User, ArrowLeft,
Trash2, Plus, SlidersHorizontal, QrCode, UserPlus, Lock, MoreHorizontal, ChevronRight, Check
} from 'lucide-react';

export default function TicketMasterApp() {
// --- STATE MANAGEMENT ---
const [currentScreen, setCurrentScreen] = useState('login'); // login, events, details, transfer_select, transfer_verify, transfer_recipient, barcode
const [activeTab, setActiveTab] = useState('My Tickets');

// Login Form
const [loginEmail, setLoginEmail] = useState('user@example.com');
const [loginPassword, setLoginPassword] = useState('password');

// Event & Ticket Data (Editable by Admin in "My Account")
const [eventData, setEventData] = useState({
title: 'BTS WORLD TOUR ARIRANG - BOGOTÁ',
dateTime: 'FRI • OCT 2, 2026 • 7:00 PM',
venue: 'Estadio El Campín, Bogotá',
coverImage: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80',
orderNumber: 'Order #TM-SEED-BTS-CO',
tickets: [
{ id: 1, type: 'Standard Ticket', section: 'Occidental Baja', row: '12', seat: '5', selected: true },
{ id: 2, type: 'Standard Ticket', section: 'Occidental Baja', row: '12', seat: '6', selected: true },
{ id: 3, type: 'Standard Ticket', section: 'Occidental Baja', row: '12', seat: '7', selected: false }
]
});

// Transfer Form State
const [verifyCode, setVerifyCode] = useState(['4', '8', '1', '9', '2', '0']);
const [recipient, setRecipient] = useState({
firstName: 'Sofia',
lastName: 'Martinez',
email: 'sofia.martinez@example.com',
note: 'Enjoy the concert! See you at the venue.'
});

// --- HANDLERS ---
const handleLogin = (e) => {
e.preventDefault();
setCurrentScreen('events');
};

const handleTicketSelect = (id) => {
setEventData(prev => ({
...prev,
tickets: prev.tickets.map(t => t.id === id ? { ...t, selected: !t.selected } : t)
}));
};

const handleSelectAllTickets = () => {
const allSelected = eventData.tickets.every(t => t.selected);
setEventData(prev => ({
...prev,
tickets: prev.tickets.map(t => ({ ...t, selected: !allSelected }))
}));
};

const handleAdminTicketChange = (index, field, value) => {
const updatedTickets = [...eventData.tickets];
updatedTickets[index][field] = value;
setEventData({ ...eventData, tickets: updatedTickets });
};

const handleAddTicket = () => {
const newId = eventData.tickets.length + 1;
setEventData({
...eventData,
tickets: [
...eventData.tickets,
{ id: newId, type: 'Standard Ticket', section: 'Occidental Baja', row: '12', seat: ${newId + 4}, selected: false }
]
});
};

const handleDeleteTicket = (index) => {
const updatedTickets = eventData.tickets.filter((_, i) => i !== index);
setEventData({ ...eventData, tickets: updatedTickets });
};

// --- RENDER SCREENS ---

// 1. LOGIN SCREEN
if (currentScreen === 'login') {
return (
<div className="flex flex-col min-h-screen bg-white text-gray-900 items-center justify-center p-6">
<div className="w-full max-w-sm flex flex-col items-center">
<div className="w-16 h-16 bg-[#026CDF] rounded-full flex items-center justify-center mb-6 shadow-md">
<Ticket size={32} className="text-white" />
</div>
<h2 className="text-2xl font-bold mb-2 text-center text-gray-900">Sign In to Ticketmaster</h2>
<p className="text-xs text-gray-500 mb-8">Enter your credentials to manage your tickets</p>

<form onSubmit={handleLogin} className="w-full space-y-4">  
        <div>  
          <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Email Address</label>  
          <input   
            type="email"   
            required  
            value={loginEmail}  
            onChange={(e) => setLoginEmail(e.target.value)}  
            placeholder="user@example.com"  
            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#026CDF]"  
          />  
        </div>  
        <div>  
          <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Password</label>  
          <input   
            type="password"   
            required  
            value={loginPassword}  
            onChange={(e) => setLoginPassword(e.target.value)}  
            placeholder="••••••••"  
            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#026CDF]"  
          />  
        </div>  
        <button   
          type="submit"   
          className="w-full py-3.5 bg-[#026CDF] hover:bg-blue-700 font-bold rounded-lg text-white shadow-sm transition duration-200 text-sm mt-2"  
        >  
          Sign In  
        </button>  
      </form>  
    </div>  
  </div>  
);

}

return (
<div className="flex flex-col min-h-screen bg-white text-gray-900 max-w-md mx-auto relative font-sans">

{/* SCREEN CONTENT AREA */}  
  <div className="flex-1 overflow-y-auto pb-20">  
      
    {/* TAB: ADMIN PANEL ("My Account" TAB) */}  
    {activeTab === 'My Account' && (  
      <div className="p-4 bg-zinc-900 text-white min-h-full">  
        <h1 className="text-lg font-bold mb-4 text-center border-b border-zinc-800 pb-3">  
          Admin Event Manager  
        </h1>  

        <div className="space-y-4">  
          <div>  
            <label className="block text-[10px] font-bold text-zinc-400 mb-1 uppercase">Event Title</label>  
            <input   
              type="text"   
              value={eventData.title}   
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}  
              className="w-full p-2.5 rounded bg-zinc-800 text-white font-semibold text-xs border border-zinc-700 focus:outline-none focus:border-blue-500"  
            />  
          </div>  

          <div>  
            <label className="block text-[10px] font-bold text-zinc-400 mb-1 uppercase">Date & Time String</label>  
            <input   
              type="text"   
              value={eventData.dateTime}   
              onChange={(e) => setEventData({ ...eventData, dateTime: e.target.value })}  
              className="w-full p-2.5 rounded bg-zinc-800 text-white font-semibold text-xs border border-zinc-700 focus:outline-none focus:border-blue-500"  
            />  
          </div>  

          <div>  
            <label className="block text-[10px] font-bold text-zinc-400 mb-1 uppercase">Venue Name</label>  
            <input   
              type="text"   
              value={eventData.venue}   
              onChange={(e) => setEventData({ ...eventData, venue: e.target.value })}  
              className="w-full p-2.5 rounded bg-zinc-800 text-white font-semibold text-xs border border-zinc-700 focus:outline-none focus:border-blue-500"  
            />  
          </div>  

          <div>  
            <label className="block text-[10px] font-bold text-zinc-400 mb-1 uppercase">Header Cover Image URL</label>  
            <input   
              type="text"   
              value={eventData.coverImage}   
              onChange={(e) => setEventData({ ...eventData, coverImage: e.target.value })}  
              className="w-full p-2.5 rounded bg-zinc-800 text-white text-xs border border-zinc-700 focus:outline-none focus:border-blue-500"  
            />  
          </div>  

          <div>  
            <label className="block text-[10px] font-bold text-zinc-400 mb-1 uppercase">Order Number</label>  
            <input   
              type="text"   
              value={eventData.orderNumber}   
              onChange={(e) => setEventData({ ...eventData, orderNumber: e.target.value })}  
              className="w-full p-2.5 rounded bg-zinc-800 text-white font-semibold text-xs border border-zinc-700 focus:outline-none focus:border-blue-500"  
            />  
          </div>  

          {/* INDIVIDUAL TICKETS MANAGEMENT */}  
          <div className="pt-2">  
            <div className="flex justify-between items-center mb-3">  
              <span className="text-xs font-bold text-blue-400 uppercase">  
                Individual Tickets ({eventData.tickets.length})  
              </span>  
              <button   
                onClick={handleAddTicket}  
                className="flex items-center gap-1 bg-[#026CDF] hover:bg-blue-700 text-xs text-white font-bold px-3 py-1.5 rounded"  
              >  
                <Plus size={14} /> Add Ticket  
              </button>  
            </div>  

            <div className="space-y-3">  
              {eventData.tickets.map((t, idx) => (  
                <div key={t.id} className="bg-zinc-800 p-3 rounded-lg border border-zinc-700 space-y-2">  
                  <div className="flex justify-between items-center">  
                    <span className="text-xs font-bold text-zinc-300">Ticket #{idx + 1}</span>  
                    <button onClick={() => handleDeleteTicket(idx)} className="text-red-500 hover:text-red-400">  
                      <Trash2 size={16} />  
                    </button>  
                  </div>  

                  <div>  
                    <label className="block text-[10px] text-zinc-400 uppercase">Ticket Title / Type</label>  
                    <input   
                      type="text"   
                      value={t.type}   
                      onChange={(e) => handleAdminTicketChange(idx, 'type', e.target.value)}  
                      className="w-full p-2 rounded bg-zinc-900 text-white text-xs border border-zinc-700 focus:outline-none"  
                    />  
                  </div>  

                  <div>  
                    <label className="block text-[10px] text-zinc-400 uppercase">Section</label>  
                    <input   
                      type="text"   
                      value={t.section}   
                      onChange={(e) => handleAdminTicketChange(idx, 'section', e.target.value)}  
                      className="w-full p-2 rounded bg-zinc-900 text-white text-xs border border-zinc-700 focus:outline-none"  
                    />  
                  </div>  

                  <div className="grid grid-cols-2 gap-2">  
                    <div>  
                      <label className="block text-[10px] text-zinc-400 uppercase">Row</label>  
                      <input   
                        type="text"   
                        value={t.row}   
                        onChange={(e) => handleAdminTicketChange(idx, 'row', e.target.value)}  
                        className="w-full p-2 rounded bg-zinc-900 text-white text-xs border border-zinc-700 focus:outline-none"  
                      />  
                    </div>  
                    <div>  
                      <label className="block text-[10px] text-zinc-400 uppercase">Seat</label>  
                      <input   
                        type="text"   
                        value={t.seat}   
                        onChange={(e) => handleAdminTicketChange(idx, 'seat', e.target.value)}  
                        className="w-full p-2 rounded bg-zinc-900 text-white text-xs border border-zinc-700 focus:outline-none"  
                      />  
                    </div>  
                  </div>  
                </div>  
              ))}  
            </div>  
          </div>  

          {/* RECIPIENT INFO */}  
          <div className="pt-2">  
            <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase">Recipient Name & Email</label>  
            <div className="grid grid-cols-2 gap-2 mb-2">  
              <input   
                type="text"   
                value={recipient.firstName}   
                onChange={(e) => setRecipient({ ...recipient, firstName: e.target.value })}  
                className="p-2 rounded bg-zinc-800 text-white text-xs border border-zinc-700 focus:outline-none"  
              />  
              <input   
                type="text"   
                value={recipient.lastName}   
                onChange={(e) => setRecipient({ ...recipient, lastName: e.target.value })}  
                className="p-2 rounded bg-zinc-800 text-white text-xs border border-zinc-700 focus:outline-none"  
              />  
            </div>  
            <input   
              type="email"   
              value={recipient.email}   
              onChange={(e) => setRecipient({ ...recipient, email: e.target.value })}  
              className="w-full p-2 rounded bg-zinc-800 text-white text-xs border border-zinc-700 focus:outline-none"  
            />  
          </div>  

          <button   
            onClick={() => setActiveTab('My Tickets')}  
            className="w-full py-3 bg-[#026CDF] font-bold rounded-lg text-xs hover:bg-blue-700 mt-4 tracking-wider uppercase text-white"  
          >  
            SAVE & APPLY CHANGES  
          </button>  
        </div>  
      </div>  
    )}  

    {/* SCREEN 1: "MY EVENTS" LIST VIEW (`65779.jpg`) */}  
    {activeTab === 'My Tickets' && currentScreen === 'events' && (  
      <div className="bg-white min-h-full">  
        {/* Header */}  
        <div className="flex justify-between items-center px-4 py-3 bg-black text-white">  
          <button onClick={() => setCurrentScreen('login')} className="text-white">  
            <ArrowLeft size={20} />  
          </button>  
          <h1 className="font-bold text-base flex items-center gap-1.5">  
            My Events <span className="text-xs">🇺🇸</span>  
          </h1>  
          <div className="w-8 h-8 rounded-full bg-[#026CDF] flex items-center justify-center text-white">  
            <SlidersHorizontal size={16} />  
          </div>  
        </div>  

        {/* Event Tabs */}  
        <div className="flex bg-black text-white border-b border-zinc-800 text-xs font-bold tracking-wider">  
          <button className="flex-1 py-3 text-center border-b-2 border-white text-white">UPCOMING (7)</button>  
          <button className="flex-1 py-3 text-center text-zinc-500">PAST (3)</button>  
        </div>  

        {/* Events List Container */}  
        <div className="p-3 space-y-4 bg-white">  
          {/* Event Card 1 (Editable) */}  
          <div   
            onClick={() => setCurrentScreen('details')}  
            className="bg-zinc-900 rounded-lg overflow-hidden cursor-pointer shadow-md"  
          >  
            <div className="relative h-44">  
              <img src={eventData.coverImage} alt="Event" className="w-full h-full object-cover" />  
              <div className="absolute inset-0 bg-black/40"></div>  
              <div className="absolute bottom-3 left-3 bg-black/70 px-2 py-1 rounded text-[11px] font-bold text-white tracking-wide">  
                {eventData.dateTime}  
              </div>  
            </div>  

            <div className="p-3 text-white">  
              <h3 className="font-black text-base leading-tight uppercase mb-2">{eventData.title}</h3>  
              <div className="flex justify-between items-center text-xs text-zinc-400">  
                <span>{eventData.venue}</span>  
                <span className="flex items-center gap-1 font-bold text-white">  
                  <Ticket size={14} /> x{eventData.tickets.length}  
                </span>  
              </div>  
            </div>  
          </div>  

          {/* Event Card 2 */}  
          <div className="bg-zinc-900 rounded-lg overflow-hidden shadow-md">  
            <div className="relative h-44">  
              <img   
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80"   
                alt="Event 2"   
                className="w-full h-full object-cover"   
              />  
              <div className="absolute inset-0 bg-black/40"></div>  
              <div className="absolute bottom-3 left-3 bg-black/70 px-2 py-1 rounded text-[11px] font-bold text-white">  
                SUN • OCT 11, 2026 • 7:30 PM  
              </div>  
            </div>  
            <div className="p-3 text-white">  
              <h3 className="font-black text-base leading-tight uppercase mb-2">PACIFIC TITANS VS HARBOR HAWKS</h3>  
              <div className="flex justify-between items-center text-xs text-zinc-400">  
                <span>Pacific Dome Arena, Los Angeles</span>  
                <span className="flex items-center gap-1 font-bold text-white">  
                  <Ticket size={14} /> x3  
                </span>  
              </div>  
            </div>  
          </div>  
        </div>  
      </div>  
    )}  

    {/* SCREEN 2: TICKET DETAILS VIEW (`66335.jpg`) */}  
    {activeTab === 'My Tickets' && currentScreen === 'details' && (  
      <div className="bg-[#F6F7F9] min-h-full">  
        {/* Header Overlay */}  
        <div className="relative bg-zinc-900 text-white p-4 pt-4">  
          <button onClick={() => setCurrentScreen('events')} className="mb-3 text-white">  
            <ArrowLeft size={20} />  
          </button>  
          <div className="text-[10px] font-bold tracking-wider text-zinc-300 uppercase">{eventData.dateTime}</div>  
          <h2 className="text-lg font-extrabold uppercase leading-tight mt-1">{eventData.title}</h2>  
          <div className="flex justify-between items-center text-xs text-zinc-300 mt-2">  
            <span>{eventData.venue}</span>  
            <span className="font-bold text-white">x{eventData.tickets.length}</span>  
          </div>  
        </div>  

        {/* Action Bar */}  
        <button   
          onClick={() => setCurrentScreen('barcode')}  
          className="w-full bg-[#026CDF] hover:bg-blue-700 py-3 text-center text-white font-bold text-sm tracking-wider flex justify-center items-center gap-2 shadow-sm"  
        >  
          <QrCode size={18} /> VIEW TICKETS  
        </button>  

        {/* Quick Actions */}  
        <div className="bg-white flex justify-around py-3 border-b border-gray-200 text-xs text-[#026CDF] font-bold">  
          <button onClick={() => setCurrentScreen('transfer_select')} className="flex flex-col items-center gap-1">  
            <UserPlus size={18} />  
            <span>Transfer</span>  
          </button>  
          <button className="flex flex-col items-center gap-1 text-gray-400 cursor-not-allowed">  
            <Lock size={18} />  
            <span>Sell</span>  
          </button>  
          <button className="flex flex-col items-center gap-1 text-[#026CDF]">  
            <MoreHorizontal size={18} />  
            <span>More</span>  
          </button>  
        </div>  

        {/* Section Tabs */}  
        <div className="bg-white border-b border-gray-200 flex text-xs font-bold text-gray-600">  
          <button className="flex-1 py-3 text-center border-b-2 border-[#026CDF] text-[#026CDF]">Tickets</button>
<button className="flex-1 py-3 text-center text-gray-400">Extras</button>
</div>

{/* Ticket Cards Container */}
<div className="p-4 space-y-3">
  <div className="flex justify-between items-center px-1">
    <div>
      <div className="text-xs font-bold text-gray-900">{eventData.orderNumber}</div>
      <div className="text-[11px] text-gray-500">{eventData.tickets.length} Tickets</div>
    </div>
    <MoreHorizontal size={16} className="text-gray-400" />
  </div>

  {eventData.tickets.map((t) => (
    <div key={t.id} className="bg-white rounded-lg p-3.5 border border-[#E5E7EB] shadow-xs">
      <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-2">
        <span className="font-bold text-xs text-gray-900">{t.type}</span>
        <span className="text-[10px] text-gray-400 font-semibold">Mobile Ticket</span>
      </div>

      <div className="grid grid-cols-3 text-center">
        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase">SECTION</div>
          <div className="font-extrabold text-xs text-gray-900">{t.section}</div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase">ROW</div>
          <div className="font-extrabold text-xs text-gray-900">{t.row}</div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase">SEAT</div>
          <div className="font-extrabold text-xs text-gray-900">{t.seat}</div>
        </div>
      </div>
    </div>
  ))}
</div>
</div>
)}

{/* SCREEN 3: SELECT TICKETS TO TRANSFER */}
{activeTab === 'My Tickets' && currentScreen === 'transfer_select' && (
  <div className="bg-white text-gray-900 min-h-full p-4">
    <div className="flex justify-between items-center mb-4">
      <button onClick={() => setCurrentScreen('details')} className="text-gray-900">
        <ArrowLeft size={20} />
      </button>
      <h2 className="font-bold text-sm">Transfer</h2>
      <div className="w-5"></div>
    </div>

    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
      {eventData.title} • {eventData.tickets.length} AVAILABLE
    </div>

    <h1 className="text-xl font-extrabold mb-1 mt-1">
      Select tickets to transfer
    </h1>

    <p className="text-xs text-gray-500 mb-4 leading-relaxed">
      Ticket Transfer is free. Your recipient has to accept the tickets in their Ticketmaster account before they can use them.
    </p>

    <button
      onClick={handleSelectAllTickets}
      className="text-[#026CDF] font-bold text-xs mb-3 block"
    >
      Select All
    </button>

    <div className="space-y-3 mb-6">
      {eventData.tickets.map((t) => (
        <div
          key={t.id}
          className="border border-[#E5E7EB] rounded-lg p-3 flex items-center gap-3 bg-white shadow-xs"
        >
          <input
            type="checkbox"
            checked={t.selected}
            onChange={() => handleTicketSelect(t.id)}
            className="w-5 h-5 accent-[#026CDF] rounded"
          />

          <div className="flex-1">
            <div className="font-bold text-xs text-gray-900">{t.type}</div>

            <div className="flex gap-4 text-[11px] text-gray-500 mt-1">
              <span>
                SEC <strong className="text-gray-900">{t.section}</strong>
              </span>
              <span>
                ROW <strong className="text-gray-900">{t.row}</strong>
              </span>
              <span>
                SEAT <strong className="text-gray-900">{t.seat}</strong>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>

    <button
      onClick={() => setCurrentScreen('transfer_verify')}
      className="w-full py-3.5 bg-[#026CDF] hover:bg-blue-700 text-white font-bold rounded-lg text-sm shadow-sm"
    >
      Transfer To &gt;
    </button>
  </div>
)}

{/* SCREEN 4: SECURITY CODE VERIFICATION */}
{activeTab === 'My Tickets' && currentScreen === 'transfer_verify' && (
  <div className="bg-white text-gray-900 min-h-full p-4 flex flex-col justify-between">
    <div>
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setCurrentScreen('transfer_select')}
          className="text-gray-900"
        >
          <ArrowLeft size={20} />
        </button>

        <h2 className="font-bold text-sm">Verify it's you</h2>
        <div className="w-5"></div>
      </div>

      <p className="text-xs text-gray-600 mb-6 leading-relaxed">
        For your security, enter the 6-digit verification code sent to your phone number ending in <strong>4410</strong>.
      </p>

      <div className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">
        SECURITY CODE
      </div>

      <div className="flex gap-2 justify-between mb-6">
        {verifyCode.map((digit, idx) => (
          <input
            key={idx}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => {
              const updated = [...verifyCode];
              updated[idx] = e.target.value;
              setVerifyCode(updated);
            }}
            className="w-11 h-12 border border-gray-300 rounded-lg text-center text-lg font-bold bg-gray-50 text-gray-900 focus:border-[#026CDF] focus:ring-1 focus:ring-[#026CDF] focus:outline-none"
          />
        ))}
      </div>

      <button
        onClick={() => setCurrentScreen('transfer_recipient')}
        className="w-full py-3.5 bg-[#026CDF] hover:bg-blue-700 text-white font-bold rounded-lg text-sm shadow-sm"
      >
        Confirm & Continue
      </button>

      <div className="text-center mt-6">
        <button className="text-[#026CDF] font-bold text-xs">
          Didn't receive code? Resend
        </button>
      </div>
    </div>
  </div>
)}

{/* SCREEN 5: RECIPIENT INFORMATION */}
{activeTab === 'My Tickets' && currentScreen === 'transfer_recipient' && (
  <div className="bg-white text-gray-900 min-h-full p-4">
    <div className="flex border border-gray-200 rounded-lg p-1 bg-gray-50 mb-6">
      <button className="flex-1 py-1.5 text-xs font-bold rounded bg-white shadow-xs text-gray-900">
        Email
      </button>
      <button className="flex-1 py-1.5 text-xs font-bold text-gray-400">
        Text
      </button>
    </div>

    <div className="space-y-4">
      <div>
        <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider">
          FIRST NAME
        </label>
        <input
          type="text"
          value={recipient.firstName}
          onChange={(e) =>
            setRecipient({ ...recipient, firstName: e.target.value })
          }
          className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#026CDF]"
        />
      </div>

      <div>
        <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider">
          LAST NAME
        </label>
        <input
          type="text"
          value={recipient.lastName}
          onChange={(e) =>
            setRecipient({ ...recipient, lastName: e.target.value })
          }
          className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#026CDF]"
        />
      </div>

      <div>
        <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider">
          EMAIL
        </label>
        <input
          type="email"
          value={recipient.email}
          onChange={(e) =>
            setRecipient({ ...recipient, email: e.target.value })
          }
          className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#026CDF]"
        />
      </div>

      <div>
        <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider">
          NOTE (OPTIONAL)
        </label>
        <textarea
          value={recipient.note}
          onChange={(e) =>
            setRecipient({ ...recipient, note: e.target.value })
          }
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-900"
        />
      </div>

      <button
        onClick={() => {
          alert('Ticket Transfer Successfully Processed!');
          setCurrentScreen('events');
        }}
        className="w-full py-3.5 bg-[#026CDF] hover:bg-blue-700 text-white font-bold rounded-lg text-sm mt-4 shadow-sm"
      >
        CONTINUE
      </button>
    </div>
  </div>
)}

{/* SCREEN 6: BARCODE / PASS SCREEN */}
{activeTab === 'My Tickets' && currentScreen === 'barcode' && (
  <div className="bg-zinc-900 text-white min-h-full p-4 flex flex-col justify-between">
    <div className="flex justify-between items-center">
      <button
        onClick={() => setCurrentScreen('details')}
        className="text-white"
      >
        <ArrowLeft size={20} />
      </button>

      <span className="text-xs font-bold uppercase tracking-wider">
        Mobile Ticket
      </span>

      <div className="w-5"></div>
    </div>

    <div className="bg-white text-gray-900 rounded-xl p-6 text-center shadow-lg my-auto space-y-4">
      <h2 className="font-extrabold text-lg uppercase leading-tight">
        {eventData.title}
      </h2>

      <p className="text-xs text-gray-500 font-semibold">
        {eventData.dateTime}
      </p>

      <div className="py-6 border-y border-gray-200 my-4 flex flex-col items-center">
        <div className="w-48 h-48 bg-gray-100 flex items-center justify-center rounded border border-gray-300">
          <QrCode size={160} className="text-gray-900" />
        </div>

        <span className="text-xs text-gray-400 mt-2 font-mono">
          Scan at entrance
        </span>
      </div>

      <div className="grid grid-cols-3 text-center">
        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase">
            SECTION
          </div>
          <div className="font-extrabold text-sm">
            {eventData.tickets[0]?.section || 'Baja'}
          </div>
        </div>

        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase">
            ROW
          </div>
          <div className="font-extrabold text-sm">
            {eventData.tickets[0]?.row || '12'}
          </div>
        </div>

        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase">
            SEAT
          </div>
          <div className="font-extrabold text-sm">
            {eventData.tickets[0]?.seat || '5'}
          </div>
        </div>
      </div>
    </div>

    <div className="text-center text-xs text-gray-400">
      Hold near reader to enter event
    </div>
  </div>
)}

</div>

{/* BOTTOM NAVIGATION BAR */}
<div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 flex justify-around py-2.5 px-1 text-[10px] text-gray-500 z-50">

  <button
    onClick={() => setActiveTab('Discover')}
    className={`flex flex-col items-center gap-1 ${
      activeTab === 'Discover' ? 'text-[#026CDF] font-bold' : ''
    }`}
  >
    <Compass size={20} />
    <span>Discover</span>
  </button>

  <button
    onClick={() => setActiveTab('Favorites')}
    className={`flex flex-col items-center gap-1 ${
      activeTab === 'Favorites' ? 'text-[#026CDF] font-bold' : ''
    }`}
  >
    <Heart size={20} />
    <span>Favorites</span>
  </button>

  <button
    onClick={() => {
      setActiveTab('My Tickets');
      if (currentScreen === 'login') setCurrentScreen('events');
    }}
    className={`flex flex-col items-center gap-1 ${
      activeTab === 'My Tickets' ? 'text-[#026CDF] font-bold' : ''
    }`}
  >
    <Ticket size={20} />
    <span>My Tickets</span>
  </button>

  <button
    onClick={() => setActiveTab('Sell')}
    className={`flex flex-col items-center gap-1 ${
      activeTab === 'Sell' ? 'text-[#026CDF] font-bold' : ''
    }`}
  >
    <DollarSign size={20} />
    <span>Sell</span>
  </button>

  <button
    onClick={() => setActiveTab('My Account')}
    className={`flex flex-col items-center gap-1 relative ${
      activeTab === 'My Account' ? 'text-[#026CDF] font-bold' : ''
    }`}
  >
    <div className="relative">
      <User size={20} />
      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
    </div>
    <span>My Account</span>
  </button>

</div>

</div>
);
}
