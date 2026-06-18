import React, { useState } from "react";
import { Avatar, Badge, Button, Card, SidebarItem } from "./ui";
import {
  LayoutDashboard,
  CalendarDays,
  Clock,
  Settings,
  Calendar,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface AvailabilitySettingsProps {
  user: { name: string; email: string; avatar?: string };
  onNavigate: (page: string) => void;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface DayConfig {
  enabled: boolean;
  start: string;
  end: string;
}

const defaultHours: DayConfig[] = [
  { enabled: true, start: "09:00", end: "17:00" },
  { enabled: true, start: "09:00", end: "17:00" },
  { enabled: true, start: "09:00", end: "17:00" },
  { enabled: true, start: "09:00", end: "17:00" },
  { enabled: true, start: "09:00", end: "17:00" },
  { enabled: false, start: "10:00", end: "14:00" },
  { enabled: false, start: "10:00", end: "14:00" },
];

const timeOptions = Array.from({ length: 24 }, (_, h) =>
  [`${String(h).padStart(2, "0")}:00`, `${String(h).padStart(2, "0")}:30`]
).flat();

export function AvailabilitySettings({ user, onNavigate }: AvailabilitySettingsProps) {
  const [days, setDays] = useState<DayConfig[]>(defaultHours);
  const [buffer, setBuffer] = useState("15");
  const [duration, setDuration] = useState("30");
  const [copied, setCopied] = useState(false);
  const [linkGenerated, setLinkGenerated] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const firstName = user.name.split(" ")[0].toLowerCase();
  const bookingLink = `meetsync.app/u/${firstName}`;

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-full h-full" /> },
    { id: "meetings", label: "My Meetings", icon: <CalendarDays className="w-full h-full" />, badge: 3 },
    { id: "availability", label: "Availability", icon: <Clock className="w-full h-full" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-full h-full" /> },
  ];

  function toggleDay(i: number) {
    setDays((prev) => prev.map((d, idx) => (idx === i ? { ...d, enabled: !d.enabled } : d)));
  }

  function updateDay(i: number, field: keyof DayConfig, value: string) {
    setDays((prev) => prev.map((d, idx) => (idx === i ? { ...d, [field]: value } : d)));
  }

  function handleCopy() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex h-screen bg-[#F3F4F6] overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Sidebar */}
      <aside
        className="flex flex-col bg-[#1E1B4B] transition-all duration-200 shrink-0"
        style={{ width: sidebarCollapsed ? 64 : 240 }}
      >
        <div className="h-16 flex items-center px-4 border-b border-white/10 gap-3 shrink-0">
          <div className="w-8 h-8 bg-[#4F46E5] rounded-lg flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          {!sidebarCollapsed && <span className="text-white font-semibold">MeetSync</span>}
        </div>
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={sidebarCollapsed ? "" : item.label}
              active={item.id === "availability"}
              onClick={() => onNavigate(item.id)}
              badge={item.badge}
            />
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-3 px-2 py-2">
            <Avatar name={user.name} size="sm" />
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{user.name}</p>
                <p className="text-[#A5B4FC] text-xs truncate">{user.email}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-6 shrink-0">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:bg-[#F3F4F6] cursor-pointer"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <Avatar name={user.name} size="sm" />
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <h1 className="text-[#111827]" style={{ fontWeight: 700, fontSize: "1.5rem" }}>Availability Settings</h1>
              <p className="text-[#6B7280] text-sm mt-1">Configure when you're available for meetings.</p>
            </div>

            {/* Weekly grid */}
            <Card className="p-6 mb-5">
              <h2 className="text-[#111827] font-semibold mb-4">Working Hours</h2>
              <div className="flex flex-col gap-3">
                {DAYS.map((day, i) => (
                  <div key={day} className="flex items-center gap-4 flex-wrap">
                    {/* Toggle */}
                    <button
                      onClick={() => toggleDay(i)}
                      className={`relative w-10 h-5 rounded-full transition-colors duration-200 shrink-0 cursor-pointer ${days[i].enabled ? "bg-[#4F46E5]" : "bg-[#D1D5DB]"}`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${days[i].enabled ? "translate-x-5" : "translate-x-0.5"}`}
                      />
                    </button>

                    {/* Day name */}
                    <span className={`w-24 text-sm font-medium ${days[i].enabled ? "text-[#111827]" : "text-[#9CA3AF]"}`}>
                      {day}
                    </span>

                    {days[i].enabled ? (
                      <div className="flex items-center gap-2">
                        <select
                          value={days[i].start}
                          onChange={(e) => updateDay(i, "start", e.target.value)}
                          className="text-sm border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 bg-white text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 cursor-pointer"
                        >
                          {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <span className="text-[#9CA3AF] text-sm">→</span>
                        <select
                          value={days[i].end}
                          onChange={(e) => updateDay(i, "end", e.target.value)}
                          className="text-sm border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 bg-white text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 cursor-pointer"
                        >
                          {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    ) : (
                      <span className="text-sm text-[#9CA3AF]">Unavailable</span>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Meeting preferences */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              {/* Buffer time */}
              <Card className="p-5">
                <h3 className="text-[#111827] font-semibold text-sm mb-1">Buffer Time</h3>
                <p className="text-xs text-[#6B7280] mb-4">Padding between meetings</p>
                <select
                  value={buffer}
                  onChange={(e) => setBuffer(e.target.value)}
                  className="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 bg-white text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 cursor-pointer"
                >
                  <option value="0">No buffer</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </Card>

              {/* Meeting duration */}
              <Card className="p-5">
                <h3 className="text-[#111827] font-semibold text-sm mb-1">Meeting Duration</h3>
                <p className="text-xs text-[#6B7280] mb-4">Default length for booked meetings</p>
                <div className="flex gap-2 flex-wrap">
                  {["15", "30", "45", "60"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                        duration === d
                          ? "bg-[#4F46E5] text-white"
                          : "bg-[#F3F4F6] text-[#374151] hover:bg-[#EEF2FF] hover:text-[#4F46E5]"
                      }`}
                    >
                      {d} min
                    </button>
                  ))}
                </div>
              </Card>
            </div>

            {/* Generate link */}
            <Card className="p-6">
              <h3 className="text-[#111827] font-semibold mb-1">Your Booking Link</h3>
              <p className="text-sm text-[#6B7280] mb-4">
                Share this link and let others book time with you based on your availability settings.
              </p>
              {linkGenerated ? (
                <div>
                  <div className="flex items-center gap-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 mb-4">
                    <span className="text-[#4F46E5] font-medium flex-1 text-sm">{bookingLink}</span>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#4F46E5] font-medium transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-[#10B981]" />
                          <span className="text-[#10B981]">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" onClick={() => onNavigate("booking")}>
                      Preview page
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setLinkGenerated(false)}>
                      Regenerate
                    </Button>
                  </div>
                </div>
              ) : (
                <Button onClick={() => setLinkGenerated(true)} className="w-full sm:w-auto">
                  Generate My Link
                </Button>
              )}
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
