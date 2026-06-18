import React from "react";
import { clsx } from "clsx";

// ── Button ──────────────────────────────────────────────────────────────────

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/40 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-[#4F46E5] text-white hover:bg-[#4338CA] shadow-sm",
  secondary: "bg-[#EEF2FF] text-[#4F46E5] hover:bg-[#E0E7FF]",
  ghost: "bg-transparent text-[#6B7280] hover:bg-[#F3F4F6]",
  danger: "bg-[#FEF2F2] text-[#DC2626] hover:bg-[#FEE2E2]",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  loading,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(buttonBase, buttonVariants[variant], buttonSizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </button>
  );
}

// ── Badge ───────────────────────────────────────────────────────────────────

type BadgeVariant = "free" | "busy" | "pending" | "meetsync" | "default";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const badgeVariants: Record<BadgeVariant, string> = {
  free: "bg-[#D1FAE5] text-[#065F46]",
  busy: "bg-[#DBEAFE] text-[#1E40AF]",
  pending: "bg-[#FEF3C7] text-[#92400E]",
  meetsync: "bg-[#EDE9FE] text-[#5B21B6]",
  default: "bg-[#F3F4F6] text-[#374151]",
};

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        badgeVariants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

// ── Avatar ───────────────────────────────────────────────────────────────────

interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const avatarSizes = { sm: "w-7 h-7 text-xs", md: "w-9 h-9 text-sm", lg: "w-12 h-12 text-base" };

export function Avatar({ src, name, size = "md", className }: AvatarProps) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={clsx(
        "rounded-full flex items-center justify-center font-semibold shrink-0 overflow-hidden",
        avatarSizes[size],
        !src && "bg-[#EDE9FE] text-[#5B21B6]",
        className
      )}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        initials
      )}
    </div>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────────

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-white rounded-xl border border-[#E5E7EB] shadow-sm",
        onClick && "cursor-pointer hover:shadow-md transition-shadow",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// ── Input ─────────────────────────────────────────────────────────────────────

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-[#374151]">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={clsx(
          "w-full px-3 py-2 text-sm rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-[#111827]",
          "placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5]",
          "transition-colors duration-150",
          error && "border-red-400 focus:ring-red-200",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ── SidebarItem ───────────────────────────────────────────────────────────────

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  badge?: number;
}

export function SidebarItem({ icon, label, active, onClick, badge }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer",
        active
          ? "bg-white/15 text-white"
          : "text-[#A5B4FC] hover:bg-white/10 hover:text-white"
      )}
    >
      <span className="w-5 h-5 shrink-0">{icon}</span>
      <span className="flex-1 text-left">{label}</span>
      {badge != null && badge > 0 && (
        <span className="w-5 h-5 flex items-center justify-center rounded-full bg-[#10B981] text-white text-xs">
          {badge}
        </span>
      )}
    </button>
  );
}

// ── MetricCard ────────────────────────────────────────────────────────────────

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: "indigo" | "green" | "amber";
  sub?: string;
}

const metricColors = {
  indigo: { bg: "bg-[#EDE9FE]", icon: "text-[#4F46E5]", val: "text-[#312E81]" },
  green: { bg: "bg-[#D1FAE5]", icon: "text-[#059669]", val: "text-[#065F46]" },
  amber: { bg: "bg-[#FEF3C7]", icon: "text-[#D97706]", val: "text-[#92400E]" },
};

export function MetricCard({ label, value, icon, color, sub }: MetricCardProps) {
  const c = metricColors[color];
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#6B7280] mb-1">{label}</p>
          <p className={clsx("text-3xl font-semibold", c.val)}>{value}</p>
          {sub && <p className="text-xs text-[#9CA3AF] mt-1">{sub}</p>}
        </div>
        <div className={clsx("w-10 h-10 rounded-lg flex items-center justify-center", c.bg)}>
          <span className={clsx("w-5 h-5", c.icon)}>{icon}</span>
        </div>
      </div>
    </Card>
  );
}
