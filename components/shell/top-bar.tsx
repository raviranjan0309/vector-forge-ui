"use client"

import {
  ChevronRight,
  PanelRightOpen,
  PanelRightClose,
  Search,
  Bell,
  ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function TopBar({
  inspectorOpen,
  onToggleInspector,
}: {
  inspectorOpen: boolean
  onToggleInspector: () => void
}) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-surface px-4">
      {/* Breadcrumb */}
      <div className="flex min-w-0 items-center gap-1.5 text-sm">
        <span className="hidden text-muted-foreground sm:inline">Customer Intelligence</span>
        <ChevronRight className="hidden h-4 w-4 text-muted-foreground sm:inline" aria-hidden="true" />
        <span className="truncate font-semibold text-foreground">Churn Prediction Use Case</span>
        <span className="ml-2 hidden items-center gap-1 rounded-md bg-success-soft px-2 py-0.5 text-[11px] font-medium text-success md:inline-flex">
          <ShieldCheck className="h-3 w-3" aria-hidden="true" />
          Approver role
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <div className="relative hidden md:block">
          <Search
            className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search projects, datasets…"
            aria-label="Search"
            className="h-9 w-56 rounded-lg border border-border bg-surface-muted/60 pl-8 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:bg-surface"
          />
        </div>

        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell className="h-5 w-5" aria-hidden="true" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-warning" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleInspector}
          aria-label={inspectorOpen ? "Hide inspector" : "Show inspector"}
          className={cn(inspectorOpen && "bg-surface-muted text-foreground")}
        >
          {inspectorOpen ? (
            <PanelRightClose className="h-5 w-5" aria-hidden="true" />
          ) : (
            <PanelRightOpen className="h-5 w-5" aria-hidden="true" />
          )}
        </Button>

        <span
          className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background"
          aria-label="Jordan Ellis account"
        >
          JE
        </span>
      </div>
    </header>
  )
}
