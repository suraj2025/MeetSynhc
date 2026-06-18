import React from "react";
import { Avatar, Badge, Button } from "./ui";
import { X, Clock, Calendar, Video, Users, RotateCcw, Trash2, ExternalLink } from "lucide-react";

interface Attendee {
  name: string;
  email: string;
  avatar?: string;
  status: "accepted" | "pending" | "declined";
}

interface Meeting {
  title: string;
  date: string;
  time: string;
  duration: string;
  meetLink: string;
  attendees: Attendee[];
  type: "meetsync" | "busy";
  topic?: string;
}

interface MeetingModalProps {
  meeting: Meeting;
  onClose: () => void;
  onCancel?: () => void;
  onReschedule?: () => void;
}

const statusStyle: Record<string, string> = {
  accepted: "text-[#059669]",
  pending: "text-[#D97706]",
  declined: "text-[#DC2626]",
};

const statusLabel: Record<string, string> = {
  accepted: "Accepted",
  pending: "Pending",
  declined: "Declined",
};

export function MeetingModal({ meeting, onClose, onCancel, onReschedule }: MeetingModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(17,24,39,0.45)", backdropFilter: "blur(4px)", fontFamily: "Inter, sans-serif" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
        {/* Header */}
        <div className="bg-[#1E1B4B] p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4F46E5] flex items-center justify-center shrink-0">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-semibold" style={{ fontSize: "1.1rem" }}>{meeting.title}</h2>
              {meeting.topic && (
                <p className="text-[#A5B4FC] text-sm mt-0.5">{meeting.topic}</p>
              )}
              <Badge variant="meetsync" className="mt-2">MeetSync</Badge>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-4">
          {/* Details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F9FAFB] rounded-xl p-3 flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#4F46E5] shrink-0" />
              <div>
                <p className="text-xs text-[#9CA3AF]">Date</p>
                <p className="text-sm font-medium text-[#111827]">{meeting.date}</p>
              </div>
            </div>
            <div className="bg-[#F9FAFB] rounded-xl p-3 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#4F46E5] shrink-0" />
              <div>
                <p className="text-xs text-[#9CA3AF]">Time</p>
                <p className="text-sm font-medium text-[#111827]">{meeting.time}</p>
              </div>
            </div>
            <div className="bg-[#F9FAFB] rounded-xl p-3 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#10B981] shrink-0" />
              <div>
                <p className="text-xs text-[#9CA3AF]">Duration</p>
                <p className="text-sm font-medium text-[#111827]">{meeting.duration}</p>
              </div>
            </div>
            <div className="bg-[#F9FAFB] rounded-xl p-3 flex items-center gap-2.5">
              <Users className="w-4 h-4 text-[#10B981] shrink-0" />
              <div>
                <p className="text-xs text-[#9CA3AF]">Attendees</p>
                <p className="text-sm font-medium text-[#111827]">{meeting.attendees.length} people</p>
              </div>
            </div>
          </div>

          {/* Google Meet link */}
          <div className="bg-[#EEF2FF] rounded-xl p-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <Video className="w-4 h-4 text-[#4F46E5] shrink-0" />
              <span className="text-sm text-[#4F46E5] font-medium truncate">{meeting.meetLink}</span>
            </div>
            <button className="flex items-center gap-1 text-xs text-[#4F46E5] hover:underline shrink-0 cursor-pointer font-medium">
              Join <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          {/* Attendees */}
          <div>
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Attendees</p>
            <div className="flex flex-col gap-2.5">
              {meeting.attendees.map((a) => (
                <div key={a.email} className="flex items-center gap-3">
                  <Avatar name={a.name} src={a.avatar} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#111827] truncate">{a.name}</p>
                    <p className="text-xs text-[#9CA3AF] truncate">{a.email}</p>
                  </div>
                  <span className={`text-xs font-medium ${statusStyle[a.status]}`}>
                    {statusLabel[a.status]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 pb-5 flex gap-2 border-t border-[#F3F4F6] pt-4">
          <Button
            variant="danger"
            size="sm"
            className="flex-1"
            onClick={onCancel}
          >
            <Trash2 className="w-3.5 h-3.5" />
            Cancel meeting
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={onReschedule}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reschedule
          </Button>
        </div>
      </div>
    </div>
  );
}

export const sampleMeeting: Meeting = {
  title: "Product strategy discussion",
  date: "June 18, 2026",
  time: "10:00 AM",
  duration: "30 minutes",
  meetLink: "meet.google.com/abc-defg-hij",
  topic: "Q3 roadmap review and priorities",
  type: "meetsync",
  attendees: [
    { name: "Sarah Chen", email: "sarah@example.com", status: "accepted" },
    { name: "Alex Johnson", email: "alex@example.com", status: "accepted" },
    { name: "Priya Nair", email: "priya@example.com", status: "pending" },
    { name: "Tom Rivera", email: "tom@example.com", status: "declined" },
  ],
};
