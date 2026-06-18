import React from "react";
import { Button, Badge, Card } from "./ui";
import { Calendar, Link2, Zap, CheckCircle, ArrowRight, Star } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

export function LandingPage({ onGetStarted, onSignIn }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#4F46E5] rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-[#111827]" style={{ fontSize: "1.1rem" }}>MeetSync</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onSignIn}>Sign in</Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={onSignIn}
              className="flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign in with Google
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
        <Badge variant="meetsync" className="mb-6 px-4 py-1.5">
          ✨ Smart scheduling powered by AI
        </Badge>
        <h1
          className="text-[#111827] mb-6 leading-tight"
          style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)", fontWeight: 700, lineHeight: 1.15 }}
        >
          Schedule meetings without
          <br />
          <span className="text-[#4F46E5]">the back-and-forth</span>
        </h1>
        <p className="text-[#6B7280] max-w-xl mx-auto mb-10" style={{ fontSize: "1.125rem", lineHeight: 1.7 }}>
          MeetSync syncs with your Google Calendar, finds the best slots, and lets others book time with you — all with one shareable link.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Button size="lg" onClick={onGetStarted} className="shadow-lg shadow-indigo-200/60">
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="lg" onClick={onSignIn}>
            See how it works
          </Button>
        </div>
        <p className="mt-5 text-xs text-[#9CA3AF]">No credit card required · Free forever for individuals</p>

        {/* Hero visual */}
        <div className="mt-16 relative">
          <div className="rounded-2xl border border-[#E5E7EB] shadow-2xl shadow-indigo-100/40 overflow-hidden mx-auto max-w-4xl">
            <div className="bg-[#1E1B4B] px-5 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-[#A5B4FC] text-xs">meetsync.app/u/sarah</span>
              </div>
            </div>
            <div className="bg-[#F9FAFB] p-8">
              <MiniBookingPreview />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#F9FAFB] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[#111827] mb-3" style={{ fontWeight: 700, fontSize: "2rem" }}>
              Everything you need to take control of your time
            </h2>
            <p className="text-[#6B7280]">Simple, powerful, and designed for modern teams.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <Card key={f.title} className="p-6 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.iconBg}`}>
                  <f.Icon className={`w-6 h-6 ${f.iconColor}`} />
                </div>
                <h3 className="text-[#111827] mb-2" style={{ fontWeight: 600 }}>{f.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{f.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]" />
            ))}
          </div>
          <p className="text-[#6B7280] text-sm">Loved by 12,000+ professionals</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.name} className="p-5">
              <p className="text-[#374151] text-sm leading-relaxed mb-4">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#EDE9FE] text-[#4F46E5] text-sm font-semibold">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#111827]">{t.name}</p>
                  <p className="text-xs text-[#9CA3AF]">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#4F46E5] py-20 text-center">
        <h2 className="text-white mb-4" style={{ fontWeight: 700, fontSize: "2rem" }}>
          Ready to reclaim your time?
        </h2>
        <p className="text-[#C7D2FE] mb-8">Join thousands of professionals who schedule smarter.</p>
        <Button
          size="lg"
          className="bg-white text-[#4F46E5] hover:bg-[#EEF2FF] shadow-lg"
          onClick={onGetStarted}
        >
          Get Started Free
          <ArrowRight className="w-4 h-4" />
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E5E7EB] py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#4F46E5] rounded flex items-center justify-center">
              <Calendar className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold text-[#374151]">MeetSync</span>
          </div>
          <p className="text-xs text-[#9CA3AF]">© 2026 MeetSync. All rights reserved.</p>
          <div className="flex gap-5 text-xs text-[#6B7280]">
            <span className="cursor-pointer hover:text-[#4F46E5]">Privacy</span>
            <span className="cursor-pointer hover:text-[#4F46E5]">Terms</span>
            <span className="cursor-pointer hover:text-[#4F46E5]">Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MiniBookingPreview() {
  const slots = ["9:00 AM", "9:30 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:30 PM"];
  return (
    <div className="flex gap-8 flex-wrap justify-center">
      <div className="flex-1 min-w-[240px]">
        <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">June 2026</p>
        <div className="grid grid-cols-7 gap-1 text-center">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <div key={i} className="text-xs text-[#9CA3AF] py-1">{d}</div>
          ))}
          {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
            <div
              key={d}
              className={`text-xs py-1.5 rounded-md cursor-pointer ${
                d === 18
                  ? "bg-[#4F46E5] text-white font-semibold"
                  : d === 20 || d === 23 || d === 25
                  ? "bg-[#D1FAE5] text-[#065F46]"
                  : "text-[#374151] hover:bg-[#F3F4F6]"
              }`}
            >
              {d}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 min-w-[200px]">
        <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Available slots · Thu, Jun 18</p>
        <div className="flex flex-col gap-2">
          {slots.map((s) => (
            <button
              key={s}
              className="w-full text-sm py-2 px-4 rounded-lg bg-[#D1FAE5] text-[#065F46] font-medium hover:bg-[#A7F3D0] transition-colors text-left"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    title: "Sync your Google Calendar",
    description:
      "Connect once and MeetSync automatically reads your real-time availability — no manual updates, no double-bookings.",
    Icon: Calendar,
    iconBg: "bg-[#EDE9FE]",
    iconColor: "text-[#4F46E5]",
  },
  {
    title: "Smart slot suggestions",
    description:
      "Our AI analyzes your schedule patterns and suggests optimal meeting windows that protect your focus time.",
    Icon: Zap,
    iconBg: "bg-[#D1FAE5]",
    iconColor: "text-[#059669]",
  },
  {
    title: "Share your availability link",
    description:
      "One link, zero hassle. Send meetsync.app/u/you and let others pick a time that works — no sign-up required.",
    Icon: Link2,
    iconBg: "bg-[#FEF3C7]",
    iconColor: "text-[#D97706]",
  },
];

const testimonials = [
  {
    quote: "MeetSync completely eliminated the scheduling back-and-forth with clients. I get 3 hours of focus time back every week.",
    name: "Sarah Chen",
    role: "Product Manager, Stripe",
  },
  {
    quote: "I love that it respects my buffer time. No more back-to-back calls that leave me drained.",
    name: "Marcus Rivera",
    role: "Engineering Lead, Vercel",
  },
  {
    quote: "The shareable link is genius. My clients book calls without me ever lifting a finger.",
    name: "Priya Nair",
    role: "Freelance Designer",
  },
];
