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

type Ticket = {
  id: number;
  title: string;
  section: string;
  row: string;
  seat: string;
};

type Screen = 'details' | 'transfer' | 'sell' | 'barcode' | 'faqs';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [editingTitleId, setEditingTitleId] = useState<number | null>(null);

  const [eventData, setEventData] = useState({
    eventName: 'BTS WORLD TOUR: LOVE YOURSELF',
    venueName: 'Estadio GNP Seguros (Foro Sol), Mexico City',
    dateStr: 'Sun • Oct 12, 2026 • 7:00 PM',
    imageUrl:
      'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80',
    orderNumber: 'Order #TM-SEED-BTS-CO',
    tickets: [
      {
        id: 1,
        title: 'Standard Ticket',
        section: 'Occidental Baja',
        row: '12',
        seat: '5'
      },
      {
        id: 2,
        title: 'Standard Ticket',
        section: 'Occidental Baja',
        row: '12',
        seat: '6'
      },
      {
        id: 3,
        title: 'Standard Ticket',
        section: 'Occidental Baja',
        row: '12',
        seat: '7'
      }
    ] as Ticket[]
  });

  const [currentScreen, setCurrentScreen] =
    useState<Screen>('details');

  const [selectedTicketTab, setSelectedTicketTab] =
    useState<'Tickets' | 'Add-Ons'>('Tickets');

  const [activeBarcodeIndex, setActiveBarcodeIndex] = useState(0);

  const [selectedTickets, setSelectedTickets] =
    useState<Record<number, boolean>>({
      1: true,
      2: false,
      3: false
    });

  const [recipientEmail, setRecipientEmail] = useState('');
  const [transferComplete, setTransferComplete] = useState(false);

  const handleAddTicket = () => {
    const nextId =
      eventData.tickets.length > 0
        ? Math.max(...eventData.tickets.map((t) => t.id)) + 1
        : 1;

    const lastTicket = eventData.tickets[
      eventData.tickets.length - 1
    ] || {
      title: 'Standard Ticket',
      section: 'Occidental Baja',
      row: '12',
      seat: '1'
    };

    const nextSeat =
      (parseInt(lastTicket.seat, 10) || 0) + 1;

    const newTicket: Ticket = {
      id: nextId,
      title: lastTicket.title || 'Standard Ticket',
      section: lastTicket.section,
      row: lastTicket.row,
      seat: String(nextSeat)
    };

    setEventData({
      ...eventData,
      tickets: [...eventData.tickets, newTicket]
    });

    setSelectedTickets({
      ...selectedTickets,
      [nextId]: true
    });
  };

  const handleDeleteTicket = (id: number) => {
    if (eventData.tickets.length <= 1) return;

    setEventData({
      ...eventData,
      tickets: eventData.tickets.filter(
        (ticket) => ticket.id !== id
      )
    });

    const updated = { ...selectedTickets };
    delete updated[id];
    setSelectedTickets(updated);
  };

  const handleUpdateTicket = (
    ticketId: number,
    field: 'title' | 'section' | 'row' | 'seat',
    value: string
  ) => {
    setEventData({
      ...eventData,
      tickets: eventData.tickets.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, [field]: value }
          : ticket
      )
    });
  };

  const handleSaveAll = () => {
    setSaveSuccess(true);

    setTimeout(() => {
      setSaveSuccess(false);
    }, 2500);
  };

  const toggleTicket = (id: number) => {
    setSelectedTickets({
      ...selectedTickets,
      [id]: !selectedTickets[id]
    });
  };

  const goBack = () => {
    setCurrentScreen('details');
  };

  const currentTicket =
    eventData.tickets[activeBarcodeIndex] ||
    eventData.tickets[0];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-start p-0 sm:p-6 font-sans relative">

      {/* ADMIN BUTTON */}
      <button
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 font-bold text-sm"
      >
        <Settings className="w-4 h-4" />
        Customize Ticket App
      </button>

      {/* ADMIN DRAWER */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-950 border-l border-slate-800 h-full overflow-y-auto p-6 shadow-2xl">

            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-bold text-white">
                  Event & Tickets Customizer
                </h2>
              </div>

              <button
                onClick={() => setIsAdminOpen(false)}
                className="bg-slate-800 px-3 py-2 rounded-lg text-sm"
              >
                Close
              </button>
            </div>

            <div className="space-y-6">

              {/* EVENT DETAILS */}
              <div className="space-y-4 bg-slate-900 p-4 rounded-xl border border-slate-800">

                <h3 className="text-xs font-bold text-blue-400 uppercase">
                  Event Details
                </h3>

                <div>
                  <label className="block text-xs mb-1">
                    Event Name
                  </label>

                  <input
                    value={eventData.eventName}
                    onChange={(e) =>
                      setEventData({
                        ...eventData,
                        eventName: e.target.value
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs mb-1">
                    Venue & Location
                  </label>

                  <input
                    value={eventData.venueName}
                    onChange={(e) =>
                      setEventData({
                        ...eventData,
                        venueName: e.target.value
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs mb-1">
                    Date & Time
                  </label>

                  <input
                    value={eventData.dateStr}
                    onChange={(e) =>
                      setEventData({
                        ...eventData,
                        dateStr: e.target.value
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs mb-1">
                    Event Image URL
                  </label>

                  <input
                    value={eventData.imageUrl}
                    onChange={(e) =>
                      setEventData({
                        ...eventData,
                        imageUrl: e.target.value
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs mb-1">
                    Order Number
                  </label>

                  <input
                    value={eventData.orderNumber}
                    onChange={(e) =>
                      setEventData({
                        ...eventData,
                        orderNumber: e.target.value
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm"
                  />
                </div>
              </div>

              {/* TICKETS */}
              <div className="space-y-4 bg-slate-900 p-4 rounded-xl border border-slate-800">

                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-blue-400 uppercase">
                    Tickets ({eventData.tickets.length})
                  </h3>

                  <button
                    onClick={handleAddTicket}
                    className="bg-blue-600 px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    Add Ticket
                  </button>
                </div>

                {eventData.tickets.map((ticket, index) => (
                  <div
                    key={ticket.id}
                    className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2"
                  >

                    <div className="flex justify-between">
                      <span className="text-xs text-slate-400">
                        Ticket #{index + 1}
                      </span>

                      {eventData.tickets.length > 1 && (
                        <button
                          onClick={() =>
                            handleDeleteTicket(ticket.id)
                          }
                          className="text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <input
                      value={ticket.title}
                      onChange={(e) =>
                        handleUpdateTicket(
                          ticket.id,
                          'title',
                          e.target.value
                        )
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs"
                      placeholder="Ticket type"
                    />

                    <div className="grid grid-cols-3 gap-2">

                      <input
                        value={ticket.section}
                        onChange={(e) =>
                          handleUpdateTicket(
                            ticket.id,
                            'section',
                            e.target.value
                          )
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs"
                        placeholder="Section"
                      />

                      <input
                        value={ticket.row}
                        onChange={(e) =>
                          handleUpdateTicket(
                            ticket.id,
                            'row',
                            e.target.value
                          )
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs"
                        placeholder="Row"
                      />

                      <input
                        value={ticket.seat}
                        onChange={(e) =>
                          handleUpdateTicket(
                            ticket.id,
                            'seat',
                            e.target.value
                          )
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs"
                        placeholder="Seat"
                      />

                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleSaveAll}
              className="mt-6 w-full bg-blue-600 py-3 rounded-xl font-bold flex justify-center items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Save & Apply Changes
            </button>

            {saveSuccess && (
              <div className="mt-3 text-center text-emerald-400 text-sm">
                Changes applied successfully!
              </div>
            )}
          </div>
        </div>
      )}

      {/* PHONE APP */}
      <div className="w-full sm:max-w-[430px] sm:h-[880px] bg-white sm:rounded-[44px] sm:border-8 sm:border-slate-800 overflow-hidden relative text-slate-900 flex flex-col">

        {/* STATUS BAR */}
        <div className="bg-[#1D2228] text-white px-6 pt-3 pb-2 flex justify-between text-xs font-semibold">
          <span>9:41</span>
          <span>● ● ▰</span>
        </div>

        {/* DETAILS SCREEN */}
        {currentScreen === 'details' && (
          <div className="flex-1 flex flex-col bg-[#F7F7F9] overflow-y-auto">

            <div className="bg-[#1D2228] text-white px-4 py-3 flex items-center justify-between">
              <button
                onClick={() => setCurrentScreen('details')}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <h1 className="text-sm font-bold">
                My Tickets
              </h1>

              <div className="w-5" />
            </div>

            {/* HERO */}
            <div className="relative h-48 w-full bg-slate-900">
              <img
                src={eventData.imageUrl}
                alt="Event"
                className="w-full h-full object-cover opacity-80"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-5 text-white">

                <span className="bg-blue-600 text-[10px] font-bold px-2 py-1 rounded self-start mb-2">
                  VERIFIED TICKET
                </span>

                <h2 className="text-base font-extrabold">
                  {eventData.eventName}
                </h2>
              </div>
            </div>

            {/* EVENT INFO */}
            <div className="mx-4 -mt-4 bg-white rounded-xl p-4 shadow-sm relative z-10 space-y-3">

              <div className="flex gap-3">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold">
                  {eventData.dateStr}
                </span>
              </div>

              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-slate-600">
                  {eventData.venueName}
                </span>
              </div>
            </div>

            {/* TABS */}
            <div className="px-4 mt-5 flex border-b">

              <button
                onClick={() => setSelectedTicketTab('Tickets')}
                className={`pb-3 px-4 text-xs font-bold ${
                  selectedTicketTab === 'Tickets'
                    ? 'border-b-2 border-blue-600'
                    : 'text-slate-400'
                }`}
              >
                Tickets ({eventData.tickets.length})
              </button>

              <button
                onClick={() => setSelectedTicketTab('Add-Ons')}
                className={`pb-3 px-4 text-xs font-bold ${
                  selectedTicketTab === 'Add-Ons'
                    ? 'border-b-2 border-blue-600'
                    : 'text-slate-400'
                }`}
              >
                Add-Ons (0)
              </button>

            </div>

            {/* TICKET LIST */}
            <div className="p-4 space-y-3 pb-28">

              {selectedTicketTab === 'Tickets' ? (
                eventData.tickets.map((ticket, index) => (

                  <div
                    key={ticket.id}
                    className="bg-[#EFEFF4] rounded-lg p-4 border"
                  >

                    <div className="flex justify-between mb-3">

                      {editingTitleId === ticket.id ? (
                        <input
                          autoFocus
                          value={ticket.title}
                          onBlur={() =>
                            setEditingTitleId(null)
                          }
                          onChange={(e) =>
                            handleUpdateTicket(
                              ticket.id,
                              'title',
                              e.target.value
                            )
                          }
                          className="bg-white border border-blue-500 rounded px-2 py-1 text-xs"
                        />
                      ) : (
                        <button
                          onClick={() =>
                            setEditingTitleId(ticket.id)
                          }
                          className="text-xs font-bold"
                        >
                          {ticket.title}
                        </button>
                      )}

                      <span className="text-[10px] text-slate-400">
                        Mobile Ticket
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">

                      <div>
                        <span className="block text-[9px] text-slate-400 font-bold">
                          SECTION
                        </span>
                        <span className="text-xs font-bold">
                          {ticket.section}
                        </span>
                      </div>

                      <div>
                        <span className="block text-[9px] text-slate-400 font-bold">
                          ROW
                        </span>
                        <span className="text-xs font-bold">
                          {ticket.row}
                        </span>
                      </div>

                      <div>
                        <span className="block text-[9px] text-slate-400 font-bold">
                          SEAT
                        </span>
                        <span className="text-xs font-bold">
                          {ticket.seat}
                        </span>
                      </div>

                    </div>

                    <div className="mt-3 pt-3 border-t flex justify-between items-center">

                      <span className="text-[10px] text-slate-500">
                        {eventData.orderNumber}
                      </span>

                      <button
                        onClick={() => {
                          setActiveBarcodeIndex(index);
                          setCurrentScreen('barcode');
                        }}
                        className="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1"
                      >
                        <QrCode className="w-3 h-3" />
                        View Ticket
                      </button>

                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-xl p-6 text-center">
                  <Sparkles className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                  <h3 className="font-bold">
                    No Add-Ons
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    No additional items are attached to this order.
                  </p>
                </div>
              )}

              {/* ACTIONS */}
              <div className="grid grid-cols-2 gap-3 pt-2">

                <button
          
