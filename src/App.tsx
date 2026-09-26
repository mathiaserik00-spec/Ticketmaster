import React, { useState } from "react";
import {
  QrCode,
  ChevronRight,
  Settings,
  Calendar,
  MapPin,
  Check,
  Plus,
  Trash2,
  HelpCircle,
  ShieldCheck,
  ArrowLeft,
  Share2,
  Lock,
  Smartphone,
  Sparkles,
} from "lucide-react";

type Ticket = {
  id: number;
  title: string;
  section: string;
  row: string;
  seat: string;
};

type Screen = "details" | "transfer" | "sell" | "barcode" | "faqs";

export default function App() {
  const [admin, setAdmin] = useState(false);
  const [screen, setScreen] = useState<Screen>("details");
  const [tab, setTab] = useState<"Tickets" | "Add-Ons">("Tickets");
  const [barcodeIndex, setBarcodeIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [saved, setSaved] = useState(false);

  const [event, setEvent] = useState({
    name: "BTS WORLD TOUR: LOVE YOURSELF",
    venue: "Estadio GNP Seguros, Mexico City",
    date: "Sun • Oct 12, 2026 • 7:00 PM",
    image:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1200&q=80",
    order: "DEMO-ORDER-001",
    tickets: [
      {
        id: 1,
        title: "Standard Ticket",
        section: "Occidental Baja",
        row: "12",
        seat: "5",
      },
      {
        id: 2,
        title: "Standard Ticket",
        section: "Occidental Baja",
        row: "12",
        seat: "6",
      },
      {
        id: 3,
        title: "Standard Ticket",
        section: "Occidental Baja",
        row: "12",
        seat: "7",
      },
    ] as Ticket[],
  });

  const addTicket = () => {
    const id =
      Math.max(0, ...event.tickets.map((ticket) => ticket.id)) + 1;

    setEvent({
      ...event,
      tickets: [
        ...event.tickets,
        {
          id,
          title: "Standard Ticket",
          section: "Occidental Baja",
          row: "12",
          seat: String(4 + event.tickets.length),
        },
      ],
    });
  };

  const deleteTicket = (id: number) => {
    if (event.tickets.length === 1) return;

    setEvent({
      ...event,
      tickets: event.tickets.filter((ticket) => ticket.id !== id),
    });
  };

  const updateTicket = (
    id: number,
    field: keyof Ticket,
    value: string
  ) => {
    setEvent({
      ...event,
      tickets: event.tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, [field]: value } : ticket
      ),
    });
  };

  const currentTicket =
    event.tickets[barcodeIndex] || event.tickets[0];

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center p-0 sm:p-6 font-sans">
      <button
        onClick={() => setAdmin(true)}
        className="fixed bottom-5 right-5 z-50 bg-blue-600 text-white px-5 py-3 rounded-full font-bold shadow-xl flex gap-2 items-center"
      >
        <Settings className="w-4 h-4" />
        Customize
      </button>

      {admin && (
        <div className="fixed inset-0 z-[100] bg-black/70 flex justify-end">
          <div className="w-full max-w-md bg-slate-950 text-white h-full overflow-y-auto p-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg">Event Customizer</h2>
              <button
                onClick={() => setAdmin(false)}
                className="bg-slate-800 px-3 py-2 rounded-lg"
              >
                Close
              </button>
            </div>

            <div className="space-y-4">
              <input
                value={event.name}
                onChange={(e) =>
                  setEvent({ ...event, name: e.target.value })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3"
                placeholder="Event name"
              />

              <input
                value={event.venue}
                onChange={(e) =>
                  setEvent({ ...event, venue: e.target.value })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3"
                placeholder="Venue"
              />

              <input
                value={event.date}
                onChange={(e) =>
                  setEvent({ ...event, date: e.target.value })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3"
                placeholder="Date"
              />

              <input
                value={event.image}
                onChange={(e) =>
                  setEvent({ ...event, image: e.target.value })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3"
                placeholder="Image URL"
              />

              <h3 className="font-bold pt-4">
                Tickets ({event.tickets.length})
              </h3>

              {event.tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-slate-900 border border-slate-700 rounded-xl p-3 space-y-2"
                >
                  <div className="flex justify-between">
                    <span className="text-sm">
                      Ticket #{ticket.id}
                    </span>

                    {event.tickets.length > 1 && (
                      <button
                        onClick={() => deleteTicket(ticket.id)}
                        className="text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <input
                    value={ticket.title}
                    onChange={(e) =>
                      updateTicket(
                        ticket.id,
                        "title",
                        e.target.value
                      )
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2"
                  />

                  <div className="grid grid-cols-3 gap-2">
                    <input
                      value={ticket.section}
                      onChange={(e) =>
                        updateTicket(
                          ticket.id,
                          "section",
                          e.target.value
                        )
                      }
                      className="bg-slate-950 border border-slate-700 rounded p-2"
                    />

                    <input
                      value={ticket.row}
                      onChange={(e) =>
                        updateTicket(
                          ticket.id,
                          "row",
                          e.target.value
                        )
                      }
                      className="bg-slate-950 border border-slate-700 rounded p-2"
                    />

                    <input
                      value={ticket.seat}
                      onChange={(e) =>
                        updateTicket(
                          ticket.id,
                          "seat",
                          e.target.value
                        )
                      }
                      className="bg-slate-950 border border-slate-700 rounded p-2"
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={addTicket}
                className="w-full bg-blue-600 py-3 rounded-xl font-bold flex justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Ticket
              </button>

              <button
                onClick={() => {
                  setSaved(true);
                  setTimeout(() => setSaved(false), 2000);
                }}
                className="w-full bg-emerald-600 py-3 rounded-xl font-bold"
              >
                Save Changes
              </button>

              {saved && (
                <p className="text-center text-emerald-400">
                  Changes saved
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="w-full sm:max-w-[430px] min-h-screen bg-[#f7f7f9] overflow-hidden">
        <div className="bg-[#1d2228] text-white px-5 py-3 flex justify-between text-xs">
          <span>9:41</span>
          <span>● ● ▰</span>
        </div>

        {screen === "details" && (
          <>
            <div className="bg-[#1d2228] text-white p-4 flex justify-between">
              <ArrowLeft className="w-5 h-5" />
              <b>My Tickets</b>
              <span />
            </div>

            <div className="h-48 relative">
              <img
                src={event.image}
                className="w-full h-full object-cover"
                alt="Event"
              />

              <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-5 text-white">
                <span className="bg-blue-600 px-2 py-1 rounded text-[10px] w-fit">
                  DEMO TICKET
                </span>
                <h1 className="font-extrabold mt-2">
                  {event.name}
                </h1>
              </div>
            </div>

            <div className="bg-white mx-4 -mt-4 relative rounded-xl p-4 shadow">
              <div className="flex gap-3 text-xs font-bold">
                <Calendar className="w-4 h-4 text-blue-600" />
                {event.date}
              </div>

              <div className="flex gap-3 text-xs mt-3">
                <MapPin className="w-4 h-4 text-blue-600" />
                {event.venue}
              </div>
            </div>

            <div className="flex border-b mt-5 px-4">
              <button
                onClick={() => setTab("Tickets")}
                className={`p-3 text-xs font-bold ${
                  tab === "Tickets"
                    ? "border-b-2 border-blue-600"
                    : "text-slate-400"
                }`}
              >
                Tickets ({event.tickets.length})
              </button>

              <button
                onClick={() => setTab("Add-Ons")}
                className={`p-3 text-xs font-bold ${
                  tab === "Add-Ons"
                    ? "border-b-2 border-blue-600"
                    : "text-slate-400"
                }`}
              >
                Add-Ons (0)
              </button>
            </div>

            <div className="p-4 space-y-3">
              {tab === "Tickets" ? (
                event.tickets.map((ticket, index) => (
                  <div
                    key={ticket.id}
                    className="bg-[#eeeeF3] rounded-xl p-4 border"
                  >
                    <div className="flex justify-between">
                      <b className="text-xs">{ticket.title}</b>
                      <span className="text-[10px] text-slate-400">
                        Mobile Ticket
                      </span>
                    </div>

                    <div className="grid grid-cols-3 mt-4">
                      <div>
                        <small>SECTION</small>
                        <p className="text-xs font-bold">
                          {ticket.section}
                        </p>
                      </div>

                      <div>
                        <small>ROW</small>
                        <p className="text-xs font-bold">
                          {ticket.row}
                        </p>
                      </div>

                      <div>
                        <small>SEAT</small>
                        <p className="text-xs font-bold">
                          {ticket.seat}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setBarcodeIndex(index);
                        setScreen("barcode");
                      }}
                      className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg text-xs font-bold flex justify-center gap-2"
                    >
                      <QrCode className="w-4 h-4" />
                      View Ticket
                    </button>
                  </div>
                ))
              ) : (
                <div className="bg-white p-6 rounded-xl text-center">
                  <Sparkles className="mx-auto text-blue-600" />
                  <p className="font-bold mt-2">No Add-Ons</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setScreen("transfer")}
                  className="bg-white border rounded-xl p-3 text-xs font-bold"
                >
                  Transfer
                </button>

                <button
                  onClick={() => setScreen("sell")}
                  className="bg-white border rounded-xl p-3 text-xs font-bold"
                >
                  Sell
                </button>
              </div>

              <button
                onClick={() => setScreen("faqs")}
                className="w-full bg-white border rounded-xl p-3 text-xs font-bold flex justify-between"
              >
                Help & FAQs
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

        {screen === "barcode" && (
          <div className="min-h-screen bg-white">
            <div className="bg-[#1d2228] text-white p-4 flex gap-3">
              <button onClick={() => setScreen("details")}>
                <ArrowLeft />
              </button>
              <b>Mobile Ticket</b>
            </div>

            <div className="p-5 text-center">
              <ShieldCheck className="mx-auto text-emerald-500 w-10 h-10" />

              <h2 className="font-bold mt-3">{event.name}</h2>

              <p className="text-xs text-slate-500">
                {event.date}
              </p>

              <div className="border rounded-2xl p-6 mt-6">
                <QrCode className="w-56 h-56 mx-auto" />

                <h3 className="font-bold mt-5">
                  {currentTicket.title}
                </h3>

                <p className="text-xs mt-2">
                  Section {currentTicket.section} • Row{" "}
                  {currentTicket.row} • Seat{" "}
                  {currentTicket.seat}
                </p>
              </div>

              <button
                onClick={() => setScreen("details")}
                className="w-full bg-blue-600 text-white py-3 rounded-xl mt-5 font-bold"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {screen === "transfer" && (
          <div className="min-h-screen">
            <div className="bg-[#1d2228] text-white p-4 flex gap-3">
              <button onClick={() => setScreen("details")}>
                <ArrowLeft />
              </button>
              <b>Transfer Tickets</b>
            </div>

            <div className="p-5">
              {sent ? (
                <div className="bg-white p-6 rounded-xl text-center">
                  <Check className="mx-auto text-emerald-500 w-10 h-10" />
                  <h2 className="font-bold mt-3">Transfer Sent</h2>

                  <button
                    onClick={() => {
                      setSent(false);
                      setScreen("details");
                    }}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl mt-5"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div className="bg-white p-5 rounded-xl">
                  <h2 className="font-bold">Recipient email</h2>

                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="recipient@example.com"
                    className="w-full border rounded-lg p-3 mt-3"
                  />

                  <button
                    disabled={!email}
                    onClick={() => setSent(true)}
                    className="w-full bg-blue-600 disabled:bg-slate-300 text-white py-3 rounded-xl mt-4 font-bold"
                  >
                    Transfer Tickets
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {screen === "sell" && (
          <div className="min-h-screen">
            <div className="bg-[#1d2228] text-white p-4 flex gap-3">
              <button onClick={() => setScreen("details")}>
                <ArrowLeft />
              </button>
              <b>Sell Tickets</b>
            </div>

            <div className="p-5">
              <div className="bg-white rounded-xl p-5">
                <Smartphone className="text-blue-600" />
                <h2 className="font-bold mt-3">
                  List your ticket
                </h2>

                <p className="text-xs text-slate-500 mt-2">
                  This is a learning/demo listing flow.
                </p>

                {event.tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="border rounded-lg p-3 mt-3"
                  >
                    <b className="text-xs">{ticket.title}</b>

                    <p className="text-[10px] text-slate-500">
                      {ticket.section} • Row {ticket.row} • Seat{" "}
                      {ticket.seat}
                    </p>

                    <button
                      onClick={() =>
                        alert("Demo listing started.")
                      }
                      className="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs mt-2"
                    >
                      List Ticket
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {screen === "faqs" && (
          <div className="min-h-screen">
            <div className="bg-[#1d2228] text-white p-4 flex gap-3">
              <button onClick={() => setScreen("details")}>
                <ArrowLeft />
              </button>
              <b>Help & FAQs</b>
            </div>

            <div className="p-5 space-y-3">
              <div className="bg-white p-4 rounded-xl">
                <HelpCircle className="text-blue-600" />
                <h3 className="font-bold mt-2">
                  How do mobile tickets work?
                </h3>
                <p className="text-xs text-slate-500 mt-2">
                  This demo displays a sample mobile ticket
                  interface.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl">
                <Share2 className="text-blue-600" />
                <h3 className="font-bold mt-2">
                  Can I transfer a ticket?
                </h3>
                <p className="text-xs text-slate-500 mt-2">
                  Yes. Use the demo transfer screen.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl">
                <Lock className="text-blue-600" />
                <h3 className="font-bold mt-2">
                  Is this a real ticket?
                </h3>
                <p className="text-xs text-slate-500 mt-2">
                  No. This is a learning/demo application.
                </p>
              </div>

              <button
                onClick={() => setScreen("details")}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold"
              >
                Back to Tickets
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
