import React, { useState } from "react";
import { Avatar, Badge, Button, Card, Input } from "./ui";
import { Clock, Video, ChevronLeft, ChevronRight, Check } from "lucide-react";

interface PublicBookingProps {
  hostName?: string;
  onBack?: () => void;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const availableSlots: Record<number, string[]> = {
  18: ["9:00 AM", "9:30 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:30 PM"],
  19: ["10:00 AM", "10:30 AM", "2:00 PM", "4:00 PM"],
  20: ["9:00 AM", "11:30 AM", "1:00 PM", "3:00 PM"],
  23: ["9:30 AM", "10:00 AM", "2:30 PM"],
  24: ["10:00 AM", "11:00 AM", "1:30 PM", "4:00 PM"],
  25: ["9:00 AM", "10:30 AM", "3:00 PM"],
};

export function PublicBooking({ hostName = "Sarah Chen", onBack }: PublicBookingProps) {
  const [selectedDate, setSelectedDate] = useState<number | null>(18);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [month, setMonth] = useState(5); // June
  const [year] = useState(2026);
  const [form, setForm] = useState({ name: "", email: "", topic: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const slots = selectedDate ? availableSlots[selectedDate] ?? [] : [];

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.includes("@")) e.email = "Enter a valid email";
    if (!form.topic.trim()) e.topic = "Please enter a meeting topic";
    return e;
  }

  function handleConfirm() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setConfirmed(true);
  }

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7; // Mon=0

  if (confirmed) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6" style={{ fontFamily: "Inter, sans-serif" }}>
        <Card className="w-full max-w-md p-10 text-center">
          <div className="w-16 h-16 bg-[#D1FAE5] rounded-full flex items-center justify-center mx-auto mb-5">
            <Check className="w-8 h-8 text-[#10B981]" />
          </div>
          <h2 className="text-[#111827] mb-2" style={{ fontWeight: 700, fontSize: "1.25rem" }}>Meeting confirmed!</h2>
          <p className="text-[#6B7280] text-sm mb-4">
            Your meeting with <strong>{hostName}</strong> is booked for{" "}
            <strong>June {selectedDate}, 2026 at {selectedSlot}</strong>.
          </p>
          <div className="bg-[#F3F4F6] rounded-xl p-4 text-left mb-6">
            <div className="flex items-center gap-2 text-sm text-[#374151] mb-2">
              <Clock className="w-4 h-4 text-[#4F46E5]" />
              30 minutes
            </div>
            <div className="flex items-center gap-2 text-sm text-[#374151]">
              <Video className="w-4 h-4 text-[#4F46E5]" />
              Google Meet link will be emailed to you
            </div>
          </div>
          <p className="text-xs text-[#9CA3AF]">A calendar invite has been sent to {form.email}</p>
          {onBack && (
            <Button variant="ghost" size="sm" className="mt-4" onClick={onBack}>
              ← Back to MeetSync
            </Button>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center gap-4">
          {onBack && (
            <button onClick={onBack} className="text-[#6B7280] hover:text-[#4F46E5] cursor-pointer mr-1">
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <Avatar name={hostName} size="lg" />
          <div>
            <h1 className="text-[#111827]" style={{ fontWeight: 700, fontSize: "1.25rem" }}>{hostName}</h1>
            <p className="text-[#6B7280] text-sm">Book a meeting · 30 minutes · Google Meet</p>
            <div className="flex items-center gap-3 mt-1.5">
              <Badge variant="free">Available</Badge>
              <span className="text-xs text-[#9CA3AF]">Usually responds within 1 hour</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {!showForm ? (
          <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6">
            {/* Calendar */}
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[#111827] font-semibold text-sm">
                  {MONTHS[month]} {year}
                </h2>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setMonth((m) => Math.max(0, m - 1))}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[#6B7280] hover:bg-[#F3F4F6] cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setMonth((m) => Math.min(11, m + 1))}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[#6B7280] hover:bg-[#F3F4F6] cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS.map((d) => (
                  <div key={d} className="text-center text-xs text-[#9CA3AF] py-1 font-medium">{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
                  const hasSlots = availableSlots[d] && availableSlots[d].length > 0;
                  const isSelected = selectedDate === d;
                  const isPast = d < 18;
                  return (
                    <button
                      key={d}
                      disabled={!hasSlots || isPast}
                      onClick={() => { setSelectedDate(d); setSelectedSlot(null); }}
                      className={`aspect-square rounded-lg text-sm flex items-center justify-center transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-[#4F46E5] text-white font-semibold"
                          : hasSlots && !isPast
                          ? "bg-[#D1FAE5] text-[#065F46] hover:bg-[#A7F3D0] font-medium"
                          : "text-[#D1D5DB] cursor-not-allowed"
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center gap-3 text-xs text-[#6B7280]">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#D1FAE5] inline-block" />Available</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#4F46E5] inline-block" />Selected</span>
              </div>
            </Card>

            {/* Time slots */}
            <Card className="p-5">
              <h3 className="text-[#111827] font-semibold text-sm mb-1">
                {selectedDate ? `June ${selectedDate}` : "Select a date"}
              </h3>
              <p className="text-xs text-[#9CA3AF] mb-4">
                {selectedDate ? `${slots.length} slots available` : "Choose a date to see available times"}
              </p>
              {slots.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {slots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`w-full text-sm py-2.5 px-4 rounded-lg font-medium transition-all cursor-pointer ${
                        selectedSlot === slot
                          ? "bg-[#4F46E5] text-white shadow-sm"
                          : "bg-[#D1FAE5] text-[#065F46] hover:bg-[#A7F3D0]"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-32 text-center">
                  <Clock className="w-8 h-8 text-[#D1D5DB] mb-2" />
                  <p className="text-sm text-[#9CA3AF]">No slots available</p>
                </div>
              )}

              {selectedSlot && (
                <Button
                  className="w-full mt-4"
                  onClick={() => setShowForm(true)}
                >
                  Confirm — {selectedSlot}
                </Button>
              )}
            </Card>
          </div>
        ) : (
          /* Booking form */
          <div className="max-w-lg mx-auto">
            <button
              onClick={() => setShowForm(false)}
              className="flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#4F46E5] mb-6 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to time selection
            </button>

            <Card className="p-6">
              {/* Summary */}
              <div className="bg-[#F9FAFB] rounded-xl p-4 mb-6 border border-[#E5E7EB]">
                <p className="text-sm font-semibold text-[#111827] mb-1">Meeting with {hostName}</p>
                <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                  <span>June {selectedDate}, 2026</span>
                  <span>·</span>
                  <span>{selectedSlot}</span>
                  <span>·</span>
                  <span>30 min</span>
                </div>
              </div>

              <h2 className="text-[#111827] font-semibold mb-4">Your details</h2>
              <div className="flex flex-col gap-4">
                <Input
                  label="Your name"
                  placeholder="Alex Johnson"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  error={errors.name}
                />
                <Input
                  label="Email address"
                  type="email"
                  placeholder="alex@example.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  error={errors.email}
                />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#374151]">Meeting topic</label>
                  <textarea
                    value={form.topic}
                    onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
                    placeholder="What would you like to discuss?"
                    rows={3}
                    className={`w-full px-3 py-2 text-sm rounded-lg border bg-[#F9FAFB] text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] transition-colors resize-none ${errors.topic ? "border-red-400" : "border-[#E5E7EB]"}`}
                  />
                  {errors.topic && <p className="text-xs text-red-500">{errors.topic}</p>}
                </div>

                <Button onClick={handleConfirm} size="lg" className="w-full">
                  Confirm Meeting
                </Button>
                <p className="text-xs text-center text-[#9CA3AF]">
                  A Google Meet link will be sent to your email.
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
