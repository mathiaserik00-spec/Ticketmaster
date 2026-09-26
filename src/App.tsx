import React, { useState } from 'react';
import { 
  QrCode, 
  ChevronRight, 
  Settings, 
  Calendar, 
  MapPin, 
  Check, 
  Plus, 
  Trash2, 
  RotateCcw, 
  HelpCircle, 
  ShieldCheck, 
  ArrowLeft,
  Share2,
  Lock,
  Smartphone,
  Sparkles
} from 'lucide-react';

export default function App() {
  // ADMIN CUSTOMIZER DRAWER STATE
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [editingTitleId, setEditingTitleId] = useState<number | null>(null);

  // Editable Event & Ticket State
  const [eventData, setEventData] = useState({
    eventName: 'BTS WORLD TOUR: LOVE YOURSELF',
    venueName: 'Estadio GNP Seguros (Foro Sol), Mexico City',
    dateStr: 'Sun • Oct 12, 2026 • 7:00 PM',
    imageUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80',
    orderNumber: 'Order #TM-SEED-BTS-CO',
    tickets: [
      { id: 1, title: 'Standard Ticket', section: 'Occidental Baja', row: '12', seat: '5' },
      { id: 2, title: 'Standard Ticket', section: 'Occidental Baja', row: '12', seat: '6' },
      { id: 3, title: 'Standard Ticket', section: 'Occidental Baja', row: '12', seat: '7' }
    ]
  });

  // Navigation & UI View State
  const [currentScreen, setCurrentScreen] = useState<'details' | 'transfer' | 'sell' | 'barcode' | 'faqs'>('details');
  const [selectedTicketTab, setSelectedTicketTab] = useState<'Tickets' | 'Add-Ons'>('Tickets');
  const [activeBarcodeIndex, setActiveBarcodeIndex] = useState(0);

  // Transfer state
  const [selectedTickets, setSelectedTickets] = useState<{ [key: number]: boolean }>({ 1: true, 2: false, 3: false });
  const [recipientEmail, setRecipientEmail] = useState('');
  const [transferComplete, setTransferComplete] = useState(false);

  // Admin Ticket helper functions
  const handleAddTicket = () => {
    const nextId = eventData.tickets.length > 0 ? Math.max(...eventData.tickets.map(t => t.id)) + 1 : 1;
    const lastTicket = eventData.tickets[eventData.tickets.length - 1] || { title: 'Standard Ticket', section: 'Occidental Baja', row: '12', seat: '1' };
    const nextSeatNum = (parseInt(lastTicket.seat, 10) || 0) + 1;
    const newTickets = [...eventData.tickets, { id: nextId, title: lastTicket.title || 'Standard Ticket', section: lastTicket.section, row: lastTicket.row, seat: String(nextSeatNum) }];
    setEventData({ ...eventData, tickets: newTickets });
    setSelectedTickets({ ...selectedTickets, [nextId]: true });
  };

  const handleDeleteTicket = (id: number) => {
    if (eventData.tickets.length <= 1) return; // Keep at least 1
    const newTickets = eventData.tickets.filter(t => t.id !== id);
    setEventData({ ...eventData, tickets: newTickets });
    const newSelected = { ...selectedTickets };
    delete newSelected[id];
    setSelectedTickets(newSelected);
  };

  const handleUpdateTicket = (ticketId: number, field: 'title' | 'section' | 'row' | 'seat', value: string) => {
    const newTickets = eventData.tickets.map(t => t.id === ticketId ? { ...t, [field]: value } : t);
    setEventData({ ...eventData, tickets: newTickets });
  };

  const handleSaveAll = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-start p-0 sm:p-6 font-sans relative selection:bg-blue-600 selection:text-white">
      
      {/* Floating Admin Customizer Trigger */}
      <button
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 font-bold text-sm tracking-wide transition-all transform hover:scale-105 border border-white/20"
      >
        <Settings className="w-4 h-4 animate-spin-slow" />
        <span>Customize Ticket App</span>
      </button>

      {/* Admin Customizer Drawer */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-md bg-slate-950 border-l border-slate-800 h-full overflow-y-auto p-6 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-bold text-white tracking-wide">Event & Tickets Customizer</h2>
              </div>
              <button 
                onClick={() => setIsAdminOpen(false)}
                className="text-slate-400 hover:text-white text-sm font-semibold bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>

            <div className="space-y-6 flex-1">
              {/* Event Details Section */}
              <div className="space-y-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Event Details</h3>
                
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Event Name</label>
                  <input 
                    type="text" 
                    value={eventData.eventName}
                    onChange={(e) => setEventData({ ...eventData, eventName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Venue & Location</label>
                  <input 
                    type="text" 
                    value={eventData.venueName}
                    onChange={(e) => setEventData({ ...eventData, venueName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Date & Time</label>
                  <input 
                    type="text" 
                    value={eventData.dateStr}
                    onChange={(e) => setEventData({ ...eventData, dateStr: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Event Image Banner URL</label>
                  <input 
                    type="text" 
                    value={eventData.imageUrl}
                    onChange={(e) => setEventData({ ...eventData, imageUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Order Number</label>
                  <input 
                    type="text" 
                    value={eventData.orderNumber}
                    onChange={(e) => setEventData({ ...eventData, orderNumber: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Tickets Configuration */}
              <div className="space-y-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Tickets ({eventData.tickets.length})</h3>
                  <button 
                    onClick={handleAddTicket}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Ticket
                  </button>
                </div>

                <div className="space-y-3">
                  {eventData.tickets.map((ticket, idx) => (
                    <div key={ticket.id} className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2 relative group">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400">Ticket #{idx + 1}</span>
                        {eventData.tickets.length > 1 && (
                          <button 
                            onClick={() => handleDeleteTicket(ticket.id)}
                            className="text-red-400 hover:text-red-300 p-1 rounded transition-colors"
                            title="Delete Ticket"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-0.5">Ticket Title / Type</label>
                        <input 
                          type="text" 
                          value={ticket.title}
                          onChange={(e) => handleUpdateTicket(ticket.id, 'title', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-bold text-xs focus:outline-none focus:border-blue-500"
                          placeholder="e.g. VIP Pass, General Admission"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-0.5">Section</label>
                          <input 
                            type="text" 
                            value={ticket.section}
                            onChange={(e) => handleUpdateTicket(ticket.id, 'section', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white font-medium text-xs focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-0.5">Row</label>
                          <input 
                            type="text" 
                            value={ticket.row}
                            onChange={(e) => handleUpdateTicket(ticket.id, 'row', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white font-medium text-xs focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-0.5">Seat</label>
                          <input 
                            type="text" 
                            value={ticket.seat}
                            onChange={(e) => handleUpdateTicket(ticket.id, 'seat', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white font-medium text-xs focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 mt-6 flex items-center gap-3">
              <button 
                onClick={handleSaveAll}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Check className="w-4 h-4" /> Save & Apply Changes
              </button>
            </div>
            {saveSuccess && (
              <div className="mt-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold py-2 rounded-lg text-center animate-pulse">
                Changes applied successfully!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Mobile App Container */}
      <div className="w-full sm:max-w-[430px] sm:h-[880px] bg-white sm:rounded-[44px] sm:shadow-2xl sm:border-[8px] sm:border-slate-800 flex flex-col overflow-hidden relative text-slate-900">
        
        {/* iOS Status Bar simulation */}
        <div className="bg-[#1D2228] text-white px-6 pt-3 pb-2 flex items-center justify-between text-xs font-semibold select-none">
          <span>9:41</span>
          <div className="flex items-center gap-1.5 text-[10px]">
            <span className="w-4 h-2.5 border border-white rounded-sm p-0.5 flex items-center"><span className="w-full h-full bg-white rounded-2xs"></span></span>
          </div>
        </div>

        {/* SCREEN 1: EVENT DETAILS & TICKET LIST */}
        {currentScreen === 'details' && (
          <div className="flex-1 flex flex-col bg-[#F7F7F9] overflow-y-auto">
            
            {/* Header Navbar */}
            <div className="bg-[#1D2228] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-20">
              <button onClick={() => setCurrentScreen('details')} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-sm font-bold tracking-tight">My Tickets</h1>
              <div className="w-7"></div>
            </div>

            {/* Event Hero Banner */}
            <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
              <img 
                src={eventData.imageUrl} 
                alt="Event Banner" 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider self-start mb-1.5">Verified Ticket</span>
                <h2 className="text-base font-extrabold leading-tight">{eventData.eventName}</h2>
              </div>
            </div>

            {/* Event Meta Info Card */}
            <div className="mx-4 -mt-4 bg-white rounded-xl p-4 shadow-sm border border-slate-200/60 relative z-10 space-y-2.5">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <p className="text-xs font-bold text-slate-800">{eventData.dateStr}</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <p className="text-xs font-medium text-slate-600 leading-snug">{eventData.venueName}</p>
              </div>
            </div>

            {/* Tabs Header */}
            <div className="px-4 mt-5 flex border-b border-slate-200">
              <button 
                onClick={() => setSelectedTicketTab('Tickets')}
                className={`pb-2.5 text-xs font-bold px-4 transition-colors relative ${selectedTicketTab === 'Tickets' ? 'text-slate-900 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Tickets ({eventData.tickets.length})
              </button>
              <button 
                onClick={() => setSelectedTicketTab('Add-Ons')}
                className={`pb-2.5 text-xs font-bold px-4 transition-colors relative ${selectedTicketTab === 'Add-Ons' ? 'text-slate-900 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Add-Ons (0)
              </button>
            </div>

            {/* Tickets List */}
            <div className="p-4 space-y-3 pb-24">
              {selectedTicketTab === 'Tickets' ? (
                eventData.tickets.map((ticket) => (
                  <div key={ticket.id} className="bg-[#EFEFF4] rounded-md p-3.5 border border-slate-200/60 shadow-none">
                    <div className="flex items-center justify-between mb-2">
                      {editingTitleId === ticket.id ? (
                        <input 
                          type="text" 
                          value={ticket.title} 
                          autoFocus
                          onBlur={() => setEditingTitleId(null)}
                          onChange={(e) => handleUpdateTicket(ticket.id, 'title', e.target.value)}
                          className="bg-white border border-blue-500 rounded px-2 py-0.5 text-xs font-bold text-slate-900 focus:outline-none"
                          onKeyDown={(e) => { if (e.key === 'Enter') setEditingTitleId(null); }}
                        />
                      ) : (
                        <div 
                          onClick={() => setEditingTitleId(ticket.id)} 
                          className="text-xs font-bold text-slate-900 cursor-pointer flex items-center gap-1.5 group"
                          title="Click to edit ticket title"
                        >
                          <span>{ticket.title}</span>
                          <span className="text-[10px] text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity font-normal underline">Edit</span>
                        </div>
                      )}
                      <span className="text-[10px] text-slate-400 font-semibold">Mobile Ticket</span>
                    </div>
                 <div className="space-y-3">
                  {eventData.tickets.map((ticket, idx) => (
                    <div key={ticket.id} className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2 relative group">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400">Ticket #{idx + 1}</span>
                        {eventData.tickets.length > 1 && (
                          <button 
                            onClick={() => handleDeleteTicket(ticket.id)}
                            className="text-red-400 hover:text-red-300 p-1 rounded transition-colors"
                            title="Delete Ticket"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-0.5">Ticket Title / Type</label>
                        <input 
                          type="text" 
                          value={ticket.title}
                          onChange={(e) => handleUpdateTicket(ticket.id, 'title', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-bold text-xs focus:outline-none focus:border-blue-500"
                          placeholder="e.g. VIP Pass, General Admission"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-0.5">Section</label>
                          <input 
                            type="text" 
                            value={ticket.section}
                            onChange={(e) => handleUpdateTicket(ticket.id, 'section', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white font-medium text-xs focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-0.5">Row</label>
                          <input 
                            type="text" 
                            value={ticket.row}
                            onChange={(e) => handleUpdateTicket(ticket.id, 'row', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white font-medium text-xs focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-0.5">Seat</label>
                          <input 
                            type="text" 
                            value={ticket.seat}
                            onChange={(e) => handleUpdateTicket(ticket.id, 'seat', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white font-medium text-xs focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 mt-6 flex items-center gap-3">
              <button 
                onClick={handleSaveAll}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Check className="w-4 h-4" /> Save & Apply Changes
              </button>
            </div>
            {saveSuccess && (
              <div className="mt-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold py-2 rounded-lg text-center animate-pulse">
                Changes applied successfully!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Mobile App Container */}
      <div className="w-full sm:max-w-[430px] sm:h-[880px] bg-white sm:rounded-[44px] sm:shadow-2xl sm:border-[8px] sm:border-slate-800 flex flex-col overflow-hidden relative text-slate-900">
        
        {/* iOS Status Bar simulation */}
        <div className="bg-[#1D2228] text-white px-6 pt-3 pb-2 flex items-center justify-between text-xs font-semibold select-none">
          <span>9:41</span>
          <div className="flex items-center gap-1.5 text-[10px]">
            <span className="w-4 h-2.5 border border-white rounded-sm p-0.5 flex items-center"><span className="w-full h-full bg-white rounded-2xs"></span></span>
          </div>
        </div>

        {/* SCREEN 1: EVENT DETAILS & TICKET LIST */}
        {currentScreen === 'details' && (
          <div className="flex-1 flex flex-col bg-[#F7F7F9] overflow-y-auto">
            
            {/* Header Navbar */}
            <div className="bg-[#1D2228] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-20">
              <button onClick={() => setCurrentScreen('details')} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-sm font-bold tracking-tight">My Tickets</h1>
              <div className="w-7"></div>
            </div>

            {/* Event Hero Banner */}
            <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
              <img 
                src={eventData.imageUrl} 
                alt="Event Banner" 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider self-start mb-1.5">Verified Ticket</span>
                <h2 className="text-base font-extrabold leading-tight">{eventData.eventName}</h2>
              </div>
            </div>

            {/* Event Meta Info Card */}
            <div className="mx-4 -mt-4 bg-white rounded-xl p-4 shadow-sm border border-slate-200/60 relative z-10 space-y-2.5">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <p className="text-xs font-bold text-slate-800">{eventData.dateStr}</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <p className="text-xs font-medium text-slate-600 leading-snug">{eventData.venueName}</p>
              </div>
            </div>

            {/* Tabs Header */}
            <div className="px-4 mt-5 flex border-b border-slate-200">
              <button 
                onClick={() => setSelectedTicketTab('Tickets')}
                className={`pb-2.5 text-xs font-bold px-4 transition-colors relative ${selectedTicketTab === 'Tickets' ? 'text-slate-900 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Tickets ({eventData.tickets.length})
              </button>
              <button 
                onClick={() => setSelectedTicketTab('Add-Ons')}
                className={`pb-2.5 text-xs font-bold px-4 transition-colors relative ${selectedTicketTab === 'Add-Ons' ? 'text-slate-900 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Add-Ons (0)
              </button>
            </div>

            {/* Tickets List */}
            <div className="p-4 space-y-3 pb-24">
              {selectedTicketTab === 'Tickets' ? (
                eventData.tickets.map((ticket) => (
                  <div key={ticket.id} className="bg-[#EFEFF4] rounded-md p-3.5 border border-slate-200/60 shadow-none">
                    <div className="flex items-center justify-between mb-2">
                      {editingTitleId === ticket.id ? (
                        <input 
                          type="text" 
                          value={ticket.title} 
                          autoFocus
                          onBlur={() => setEditingTitleId(null)}
                          onChange={(e) => handleUpdateTicket(ticket.id, 'title', e.target.value)}
                          className="bg-white border border-blue-500 rounded px-2 py-0.5 text-xs font-bold text-slate-900 focus:outline-none"
                          onKeyDown={(e) => { if (e.key === 'Enter') setEditingTitleId(null); }}
                        />
                      ) : (
                        <div 
                          onClick={() => setEditingTitleId(ticket.id)} 
                          className="text-xs font-bold text-slate-900 cursor-pointer flex items-center gap-1.5 group"
                          title="Click to edit ticket title"
                        >
                          <span>{ticket.title}</span>
                          <span className="text-[10px] text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity font-normal underline">Edit</span>
                        </div>
                      )}
                      <span className="text-[10px] text-slate-400 font-semibold">Mobile Ticket</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                                          <div className="grid grid-cols-3 gap-2">
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">SECTION</span>
                        <span className="text-xs font-extrabold text-slate-800">{ticket.section}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">ROW</span>
                        <span className="text-xs font-extrabold text-slate-800">{ticket.row}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">SEAT</span>
                        <span className="text-xs font-extrabold text-slate-800">{ticket.seat}</span>
                      </div>
                    </div>

                    {/* Ticket Action Button */}
                    <div className="mt-3 pt-3 border-t border-slate-300/60 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-semibold">{eventData.orderNumber}</span>
                      <button 
                        onClick={() => {
                          const idx = eventData.tickets.findIndex(t => t.id === ticket.id);
                          setActiveBarcodeIndex(idx >= 0 ? idx : 0);
                          setCurrentScreen('barcode');
                        }}
                        className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1 transition-colors shadow-sm"
                      >
                        <QrCode className="w-3.5 h-3.5" /> View Barcode <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-slate-400 text-xs font-medium">
                  No add-ons purchased for this event.
                </div>
              )}
            </div>

            {/* Bottom Action Footer */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3.5 flex items-center gap-3 z-20">
              <button 
                onClick={() => setCurrentScreen('transfer')}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs tracking-wide transition-colors shadow-sm"
              >
                Transfer
              </button>
              <button 
                onClick={() => setCurrentScreen('sell')}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs tracking-wide transition-colors shadow-sm"
              >
                Sell
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 2: BARCODE VIEWER (SWIPEABLE / SELECTABLE TICKETS) */}
        {currentScreen === 'barcode' && (
          <div className="flex-1 flex flex-col bg-[#1D2228] text-white overflow-y-auto pb-12">
            
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between">
              <button 
                onClick={() => setCurrentScreen('details')} 
                className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <span className="text-xs font-bold tracking-wider text-slate-300">
                Ticket {activeBarcodeIndex + 1} of {eventData.tickets.length}
              </span>
              <button 
                onClick={() => setCurrentScreen('faqs')}
                className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <HelpCircle className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Ticket Selector Dots */}
            {eventData.tickets.length > 1 && (
              <div className="flex justify-center items-center gap-1.5 py-2">
                {eventData.tickets.map((t, idx) => (
                  <button 
                    key={t.id}
                    onClick={() => setActiveBarcodeIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${activeBarcodeIndex === idx ? 'w-6 bg-blue-500' : 'w-1.5 bg-white/30'}`}
                  />
                ))}
              </div>
            )}

            {/* Active Ticket Card */}
            {(() => {
              const ticket = eventData.tickets[activeBarcodeIndex] || eventData.tickets[0];
              return (
                <div className="mx-4 my-2 bg-white rounded-2xl overflow-hidden text-slate-900 shadow-2xl flex flex-col">
                  
                  {/* Dynamic Ticket Header */}
                  <div className="p-5 bg-white text-center">
                    <h3 className="text-sm font-bold text-slate-900">{ticket.title}</h3>
                    <p className="text-xs text-slate-400 mb-3">Mobile Ticket</p>

                    {/* DYNAMIC SECTION FROM ADMIN */}
                    <div className="grid grid-cols-3 gap-2 bg-[#F7F7F9] p-3 rounded-xl border border-slate-200/60 mb-4">
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">SECTION</span>
                        <span className="text-xs font-extrabold text-slate-900">{ticket.section}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">ROW</span>
                        <span className="text-xs font-extrabold text-slate-900">{ticket.row}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">SEAT</span>
                        <span className="text-xs font-extrabold text-slate-900">{ticket.seat}</span>
                      </div>
                    </div>

                    {/* Standard Black Banner */}
                    <div className="bg-black text-white text-center text-xs font-bold py-2 rounded mb-3 tracking-wide">
                      {ticket.title}
                    </div>

                    {/* DYNAMIC ROW & SEAT FROM ADMIN */}
                    <p className="text-[11px] font-bold text-slate-500 mb-4">
                      Row {ticket.row} • Seat {ticket.seat}
                    </p>

                    {/* BARCODE GRAPHIC WITH SMOOTH HORIZONTAL SCANNER LINE */}
                    <div className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
                      {/* Horizontal Laser Scanner Animation */}
                      <div className="absolute inset-y-0 w-0.5 bg-blue-500 shadow-[0_0_8px_#026CD1] z-10 animate-scan-horizontal pointer-events-none"></div>

                      <div className="w-full h-24 flex items-center justify-center opacity-90 overflow-hidden">
                        {/* Simulated High-Res Barcode SVG */}
                        <svg className="w-full h-full" viewBox="0 0 300 90" preserveAspectRatio="none">
                          <rect x="0" y="0" width="300" height="90" fill="#FFFFFF"/>
                          <path d="M5,10 h3 v70 h-3 z M10,10 h2 v70 h-2 z M14,10 h5 v70 h-5 z M22,10 h1 v70 h-1 z M25,10 h4 v70 h-4 z M31,10 h2 v70 h-2 z M35,10 h6 v70 h-6 z M44,10 h1 v70 h-1 z M47,10 h3 v70 h-3 z M53,10 h5 v70 h-5 z M60,10 h2 v70 h-2 z M64,10 h4 v70 h-4 z M70,10 h1 v70 h-1 z M73,10 h3 v70 h-3 z M79,10 h2 v70 h-2 z M83,10 h5 v70 h-5 z M90,10 h3 v70 h-3 z M95,10 h1 v70 h-1 z M98,10 h4 v70 h-4 z M104,10 h2 v70 h-2 z M108,10 h6 v70 h-6 z M116,10 h1 v70 h-1 z M119,10 h3 v70 h-3 z M125,10 h4 v70 h-4 z M131,10 h2 v70 h-2 z M135,10 h1 v70 h-1 z M138,10 h5 v70 h-5 z M145,10 h3 v70 h-3 z M150,10 h2 v70 h-2 z M155,10 h4 v70 h-4 z M161,10 h1 v70 h-1 z M164,10 h3 v70 h-3 z M170,10 h5 v70 h-5 z M177,10 h2 v70 h-2 z M181,10 h4 v70 h-4 z M187,10 h1 v70 h-1 z M190,10 h3 v70 h-3 z M196,10 h2 v70 h-2 z M200,10 h6 v70 h-6 z M208,10 h1 v70 h-1 z M211,10 h3 v70 h-3 z M217,10 h4 v70 h-4 z M223,10 h2 v70 h-2 z M227,10 h1 v70 h-1 z M230,10 h5 v70 h-5 z M237,10 h3 v70 h-3 z M242,10 h2 v70 h-2 z M247,10 h4 v70 h-4 z M253,10 h1 v70 h-1 z M256,10 h3 v70 h-3 z M262,10 h5 v70 h-5 z M269,10 h2 v70 h-2 z M273,10 h4 v70 h-4 z M279,10 h1 v70 h-1 z M282,10 h3 v70 h-3 z M288,10 h2 v70 h-2 z M292,10 h4 v70 h-4 z" fill="#000000"/>
                        </svg>
                      </div>
                      <span className="text-[11px] font-mono font-bold tracking-widest text-slate-700 mt-2">
                        * 0492 8192 3859 1029 *
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-center gap-1 text-[11px] text-slate-500 font-semibold">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span>Screenshots won't get you in • SafeTix Protected</span>
                    </div>
                  </div>

                </div>
              );
            })()}

            {/* Bottom Actions */}
            <div className="mt-auto px-4 pt-4 flex gap-3">
              <button 
                onClick={() => setCurrentScreen('transfer')}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors border border-white/10"
              >
                <Share2 className="w-4 h-4" /> Transfer
              </button>
              <button 
                onClick={() => setCurrentScreen('sell')}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                Sell
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 3: TRANSFER TICKETS */}
        {currentScreen === 'transfer' && (
          <div className="flex-1 flex flex-col bg-[#F7F7F9] overflow-y-auto">
            <div className="bg-[#1D2228] text-white px-4 py-3 flex items-center justify-between">
              <button onClick={() => setCurrentScreen('details')} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-sm font-bold tracking-tight">Transfer Tickets</h1>
              <div className="w-7"></div>
            </div>

            {!transferComplete ? (
              <div className="p-4 flex-1 flex flex-col space-y-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Select tickets to transfer</h3>
                  <div className="space-y-2">
                    {eventData.tickets.map((ticket) => (
                      <label key={ticket.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            checked={!!selectedTickets[ticket.id]}
                            onChange={(e) => setSelectedTickets({ ...selectedTickets, [ticket.id]: e.target.checked })}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <div>
                            <p className="text-xs font-bold text-slate-900">{ticket.title}</p>
                            <p className="text-[11px] text-slate-500">Sec {ticket.section}, Row {ticket.row}, Seat {ticket.seat}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Recipient Info</h3>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Email Address or Mobile Number</label>
                    <input 
                      type="text" 
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="friend@example.com"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <button 
                    disabled={!recipientEmail.trim() || !Object.values(selectedTickets).some(Boolean)}
                    onClick={() => setTransferComplete(true)}
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl text-xs tracking-wide shadow-lg transition-all"
                  >
                    Transfer Tickets
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
                  <Check className="w-8 h-8" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Transfer Initiated!</h2>
                <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                  We've sent an email to <span className="font-semibold text-slate-800">{recipientEmail}</span> with instructions to claim the transferred tickets.
                </p>
                <button 
                  onClick={() => { setTransferComplete(false); setCurrentScreen('details'); }}
                  className="mt-6 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors"
                >
                  Back to Event
                </button>
              </div>
            )}
          </div>
        )}

        {/* SCREEN 4: SELL TICKETS */}
        {currentScreen === 'sell' && (
          <div className="flex-1 flex flex-col bg-[#F7F7F9] overflow-y-auto">
            <div className="bg-[#1D2228] text-white px-4 py-3 flex items-center justify-between">
              <button onClick={() => setCurrentScreen('details')} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-sm font-bold tracking-tight">Sell Tickets</h1>
              <div className="w-7"></div>
            </div>

            <div className="p-4 space-y-4 flex-1">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Set your listing price</h3>
                <p className="text-[11px] text-slate-500">Set a price for your tickets. You can adjust this anytime before they sell.</p>
                
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400 font-bold text-sm">$</span>
                  <input 
                    type="number" 
                    defaultValue="150.00"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg py-2.5 pl-8 pr-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-blue-900 text-xs space-y-1.5">
                <p className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" /> Official Fan-to-Fan Resale
                </p>
                <p className="text-[11px] text-blue-700 leading-relaxed">
                  Listing is free. Once your ticket sells, get paid securely via direct deposit or PayPal.
                </p>
              </div>

              <div className="mt-auto pt-4">
                <button 
                  onClick={() => {
                    alert('Listing created successfully!');
                    setCurrentScreen('details');
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl text-xs tracking-wide shadow-lg transition-all"
                >
                  List for Sale
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 5: FAQS / HELP */}
        {currentScreen === 'faqs' && (
          <div className="flex-1 flex flex-col bg-[#F7F7F9] overflow-y-auto">
            <div className="bg-[#1D2228] text-white px-4 py-3 flex items-center justify-between">
              <button onClick={() => setCurrentScreen('barcode')} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-sm font-bold tracking-tight">Ticket Help & FAQs</h1>
              <div className="w-7"></div>
            </div>

            <div className="p-4 space-y-3">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
                <h4 className="text-xs font-bold text-slate-900">Why isn't there a screenshot of my barcode?</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  To protect your tickets, barcodes feature SafeTix technology with rotating security codes. Screenshots and printed copies are not accepted at gates.
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
                <h4 className="text-xs font-bold text-slate-900">How do I enter the venue?</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Simply hold your phone up to the scanner at the gate with your barcode displayed. Brightness will automatically boost.
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
                <h4 className="text-xs font-bold text-slate-900">Can I transfer tickets to a friend?</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Yes! Tap the Transfer button on any ticket to securely send it via email or SMS.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* iOS Home Indicator */}
        <div className="bg-white py-2 flex justify-center pb-1">
          <div className="w-32 h-1 bg-slate-300 rounded-full"></div>
        </div>

      </div>
    </div>
  );
        }
