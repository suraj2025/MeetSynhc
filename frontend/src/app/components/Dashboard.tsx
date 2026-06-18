import React, { useState } from "react";
import { Avatar, Badge, Button, Card, MetricCard, SidebarItem } from "./ui";
import {
  LayoutDashboard,
  CalendarDays,
  Clock,
  Settings,
  Calendar,
  Plus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Video,
  Users,
} from "lucide-react";

interface DashboardProps {
  user: { name: string; email: string; avatar?: string };
  onNavigate: (page: string) => void;
  activePage?: string;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 10 }, (_, i) => `${i + 8}:00`);

const calendarEvents: CalEvent[] = [
  { id: "1", title: "Product Review", day: 0, startHour: 9, duration: 1, type: "busy" },
  { id: "2", title: "MeetSync: Alex Johnson", day: 1, startHour: 10, duration: 0.5, type: "meetsync" },
  { id: "3", title: "Team Standup", day: 2, startHour: 9, duration: 0.5, type: "busy" },
  { id: "4", title: "MeetSync: Priya Nair", day: 2, startHour: 14, duration: 1, type: "meetsync" },
  { id: "5", title: "Design Sync", day: 3, startHour: 11, duration: 1.5, type: "busy" },
  { id: "6", title: "Free block", day: 3, startHour: 14, duration: 2, type: "free" },
  { id: "7", title: "MeetSync: Tom Rivera", day: 4, startHour: 10, duration: 0.5, type: "meetsync" },
  { id: "8", title: "1:1 with Manager", day: 4, startHour: 15, duration: 1, type: "busy" },
];

interface CalEvent {
  id: string;
  title: string;
  day: number;
  startHour: number;
  duration: number;
  type: "free" | "busy" | "meetsync";
}

const eventStyle: Record<string, string> = {
  free: "bg-[#D1FAE5] border-l-2 border-[#10B981] text-[#065F46]",
  busy: "bg-[#DBEAFE] border-l-2 border-[#3B82F6] text-[#1E40AF]",
  meetsync: "bg-[#EDE9FE] border-l-2 border-[#4F46E5] text-[#5B21B6]",
};

const upcomingMeetings = [
  { id: "1", title: "MeetSync: Alex Johnson", time: "Today, 10:00 AM", duration: "30 min", avatar: "A", type: "meetsync" as const },
  { id: "2", title: "Design Sync", time: "Tomorrow, 11:00 AM", duration: "90 min", avatar: "D", type: "busy" as const },
  { id: "3", title: "MeetSync: Priya Nair", time: "Wed, 2:00 PM", duration: "60 min", avatar: "P", type: "meetsync" as const },
];

export function Dashboard({ user, onNavigate, activePage = "dashboard" }: DashboardProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const firstName = user.name.split(" ")[0];
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-full h-full" /> },
    { id: "meetings", label: "My Meetings", icon: <CalendarDays className="w-full h-full" />, badge: 3 },
    { id: "availability", label: "Availability", icon: <Clock className="w-full h-full" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-full h-full" /> },
  ];

  return (
    <div className="flex h-screen bg-[#F3F4F6] overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Sidebar */}
      <aside
        className="flex flex-col bg-[#1E1B4B] transition-all duration-200 shrink-0"
        style={{ width: sidebarCollapsed ? 64 : 240 }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-white/10 gap-3 shrink-0">
          <div className="w-8 h-8 bg-[#4F46E5] rounded-lg flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          {!sidebarCollapsed && (
            <span className="text-white font-semibold">MeetSync</span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={sidebarCollapsed ? "" : item.label}
              active={activePage === item.id}
              onClick={() => onNavigate(item.id)}
              badge={item.badge}
            />
          ))}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-3 px-2 py-2">
            <Avatar name={user.name} src={user.avatar} size="sm" />
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{user.name}</p>
                <p className="text-[#A5B4FC] text-xs truncate">{user.email}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-6 shrink-0">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" onClick={() => onNavigate("availability")}>
              <Plus className="w-3.5 h-3.5" />
              New Meeting
            </Button>
            <Avatar name={user.name} src={user.avatar} size="sm" />
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Welcome */}
          <div className="mb-6">
            <h1 className="text-[#111827]" style={{ fontWeight: 700, fontSize: "1.5rem" }}>
              {greeting}, {firstName} 👋
            </h1>
            <p className="text-[#6B7280] text-sm mt-1">Here's what's happening with your schedule today.</p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <MetricCard
              label="Upcoming Meetings"
              value={7}
              icon={<CalendarDays className="w-full h-full" />}
              color="indigo"
              sub="Next: 10:00 AM today"
            />
            <MetricCard
              label="Pending Requests"
              value={3}
              icon={<Users className="w-full h-full" />}
              color="amber"
              sub="2 need confirmation"
            />
            <MetricCard
              label="Free Slots Today"
              value={5}
              icon={<Clock className="w-full h-full" />}
              color="green"
              sub="2h 30min available"
            />
          </div>

          {/* Calendar + Sidebar */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-6">
            {/* Weekly Calendar */}
            <Card className="overflow-hidden">
              <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between">
                <h2 className="text-[#111827] font-semibold text-sm">Week of June 16 – 22, 2026</h2>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#D1FAE5] border-l-2 border-[#10B981] inline-block" />Free</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#DBEAFE] border-l-2 border-[#3B82F6] inline-block" />Busy</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#EDE9FE] border-l-2 border-[#4F46E5] inline-block" />MeetSync</span>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <div className="min-w-[600px]">
                  {/* Day headers */}
                  <div className="grid border-b border-[#E5E7EB]" style={{ gridTemplateColumns: "56px repeat(7, 1fr)" }}>
                    <div />
                    {DAYS.map((d, i) => (
                      <div key={d} className={`py-2 text-center text-xs font-medium border-l border-[#E5E7EB] ${i === 2 ? "text-[#4F46E5]" : "text-[#6B7280]"}`}>
                        <div>{d}</div>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mx-auto mt-0.5 text-xs font-semibold ${i === 2 ? "bg-[#4F46E5] text-white" : "text-[#374151]"}`}>
                          {16 + i}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Time grid */}
                  <div className="relative" style={{ height: 480 }}>
                    {/* Hour lines */}
                    {HOURS.map((h, hi) => (
                      <div
                        key={h}
                        className="absolute w-full flex"
                        style={{ top: hi * 48, height: 48 }}
                      >
                        <div className="w-14 pr-2 text-right text-xs text-[#9CA3AF] pt-0.5 shrink-0">{h}</div>
                        <div className="flex-1 border-t border-[#F3F4F6] grid" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
                          {DAYS.map((d) => (
                            <div key={d} className="border-l border-[#F3F4F6] h-full" />
                          ))}
                        </div>
                      </div>
                    ))}
                    {/* Events */}
                    {calendarEvents.map((ev) => {
                      const topPx = (ev.startHour - 8) * 48 + 2;
                      const heightPx = ev.duration * 48 - 4;
                      const leftPct = (ev.day / 7) * 100;
                      const widthPct = (1 / 7) * 100;
                      return (
                        <div
                          key={ev.id}
                          className={`absolute rounded-md px-2 py-1 text-xs overflow-hidden cursor-pointer hover:opacity-90 transition-opacity ${eventStyle[ev.type]}`}
                          style={{
                            top: topPx,
                            height: heightPx,
                            left: `calc(56px + ${leftPct}%)`,
                            width: `calc(${widthPct}% - 4px)`,
                          }}
                        >
                          <span className="font-medium truncate block">{ev.title}</span>
                          {heightPx > 30 && (
                            <span className="opacity-75">{ev.startHour}:00</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>

            {/* Upcoming meetings list */}
            <div className="flex flex-col gap-4">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[#111827] font-semibold text-sm">Upcoming</h3>
                  <button className="text-[#4F46E5] text-xs font-medium hover:underline">View all</button>
                </div>
                <div className="flex flex-col gap-3">
                  {upcomingMeetings.map((m) => (
                    <div key={m.id} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#F9FAFB] transition-colors cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-[#EDE9FE] flex items-center justify-center text-[#4F46E5] text-xs font-semibold shrink-0">
                        {m.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#111827] truncate">{m.title}</p>
                        <p className="text-xs text-[#6B7280]">{m.time}</p>
                        <Badge variant={m.type} className="mt-1">{m.duration}</Badge>
                      </div>
                      <button className="text-[#9CA3AF] hover:text-[#374151]">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Your link */}
              <Card className="p-4">
                <h3 className="text-[#111827] font-semibold text-sm mb-1">Your booking link</h3>
                <p className="text-xs text-[#6B7280] mb-3">Share this link to let others book time with you.</p>
                <div className="bg-[#F9FAFB] rounded-lg p-2.5 flex items-center gap-2 border border-[#E5E7EB]">
                  <span className="text-xs text-[#4F46E5] font-medium flex-1 truncate">meetsync.app/u/{firstName.toLowerCase()}</span>
                  <button
                    className="text-xs text-[#6B7280] hover:text-[#4F46E5] font-medium shrink-0"
                    onClick={() => {}}
                  >
                    Copy
                  </button>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full mt-3"
                  onClick={() => onNavigate("booking")}
                >
                  <Video className="w-3.5 h-3.5" />
                  Preview page
                </Button>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
