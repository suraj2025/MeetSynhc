import React from "react";
import { Card } from "./ui";

export function OAuthLoading() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6" style={{ fontFamily: "Inter, sans-serif" }}>
      <Card className="w-full max-w-sm p-10 text-center">
        {/* Google logo */}
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
          <svg viewBox="0 0 48 48" className="w-12 h-12">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.29-8.16 2.29-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
          </svg>
        </div>

        {/* Spinner */}
        <div className="w-10 h-10 mx-auto mb-5">
          <svg className="animate-spin w-10 h-10 text-[#4F46E5]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path
              className="opacity-90"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>

        <h2 className="text-[#111827] mb-2" style={{ fontWeight: 600, fontSize: "1.125rem" }}>
          Connecting your Google Calendar...
        </h2>
        <p className="text-[#6B7280] text-sm leading-relaxed">
          We're securely syncing your calendar. This only takes a moment.
        </p>

        {/* Steps */}
        <div className="mt-8 flex flex-col gap-2.5 text-left">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  step.done
                    ? "bg-[#10B981] text-white"
                    : "border-2 border-[#E5E7EB]"
                }`}
              >
                {step.done && (
                  <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className={`text-sm ${step.done ? "text-[#374151]" : "text-[#9CA3AF]"}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

const steps = [
  { label: "Verifying Google account", done: true },
  { label: "Reading calendar events", done: true },
  { label: "Setting up your profile", done: false },
];
