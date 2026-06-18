import React, { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { OAuthLoading } from "./components/OAuthLoading";
import { Dashboard } from "./components/Dashboard";
import { AvailabilitySettings } from "./components/AvailabilitySettings";
import { PublicBooking } from "./components/PublicBooking";
import { MeetingModal, sampleMeeting } from "./components/MeetingModal";

// MARKER-MAKE-KIT-INVOKED
// MARKER-MAKE-KIT-DISCOVERY-READ
// No @make-kits package present — using Tailwind + Radix primitives directly.

type Page = "landing" | "oauth" | "dashboard" | "availability" | "booking" | "settings" | "meetings";

const mockUser = {
  name: "Sarah Chen",
  email: "sarah.chen@gmail.com",
};

export default function App() {
  const [page, setPage] = useState<Page>("landing");
  const [showModal, setShowModal] = useState(false);

  // Simulate OAuth flow
  function handleSignIn() {
    setPage("oauth");
    setTimeout(() => setPage("dashboard"), 2800);
  }

  function handleNavigate(target: string) {
    if (target === "dashboard") setPage("dashboard");
    else if (target === "availability") setPage("availability");
    else if (target === "booking") setPage("booking");
    else if (target === "settings") setPage("dashboard");
    else if (target === "meetings") {
      setPage("dashboard");
      setTimeout(() => setShowModal(true), 100);
    }
  }

  return (
    <div className="size-full" style={{ fontFamily: "Inter, sans-serif" }}>
      {page === "landing" && (
        <LandingPage
          onGetStarted={handleSignIn}
          onSignIn={handleSignIn}
        />
      )}

      {page === "oauth" && <OAuthLoading />}

      {page === "dashboard" && (
        <Dashboard
          user={mockUser}
          onNavigate={handleNavigate}
          activePage="dashboard"
        />
      )}

      {page === "availability" && (
        <AvailabilitySettings
          user={mockUser}
          onNavigate={handleNavigate}
        />
      )}

      {page === "booking" && (
        <PublicBooking
          hostName={mockUser.name}
          onBack={() => setPage("dashboard")}
        />
      )}

      {/* Meeting detail modal — can overlay any page */}
      {showModal && (
        <MeetingModal
          meeting={sampleMeeting}
          onClose={() => setShowModal(false)}
          onCancel={() => setShowModal(false)}
          onReschedule={() => setShowModal(false)}
        />
      )}

      {/* Demo nav — floating pill for easy screen switching */}
      {page !== "landing" && page !== "oauth" && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white rounded-full shadow-lg border border-[#E5E7EB] flex items-center gap-1 px-3 py-2"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {[
            { id: "dashboard", label: "Dashboard" },
            { id: "availability", label: "Availability" },
            { id: "booking", label: "Public Page" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id as Page)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                page === item.id
                  ? "bg-[#4F46E5] text-white"
                  : "text-[#6B7280] hover:bg-[#F3F4F6]"
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => setShowModal(true)}
            className="px-3 py-1.5 rounded-full text-xs font-medium text-[#6B7280] hover:bg-[#F3F4F6] cursor-pointer transition-colors"
          >
            Meeting Modal
          </button>
          <div className="w-px h-4 bg-[#E5E7EB] mx-1" />
          <button
            onClick={() => setPage("landing")}
            className="px-3 py-1.5 rounded-full text-xs font-medium text-[#6B7280] hover:bg-[#F3F4F6] cursor-pointer transition-colors"
          >
            ← Landing
          </button>
        </div>
      )}
    </div>
  );
}
