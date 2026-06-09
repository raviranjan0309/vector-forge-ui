"use client"

import * as React from "react"
import {
  LayoutGrid,
  FolderKanban,
  Lightbulb,
  Database,
  Cpu,
  Network,
  CloudCog,
  CreditCard,
  Activity,
  Settings,
  PanelLeftClose,
  PanelLeft,
  Hexagon,
  ChevronsUpDown,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"

type NavItem = {
  id: string
  label: string
  icon: React.ElementType
  badge?: string
}

const PRIMARY_NAV: NavItem[] = [
  { id: "workspaces", label: "Workspaces", icon: LayoutGrid },
  { id: "projects", label: "Projects", icon: FolderKanban, badge: "3" },
  { id: "use-cases", label: "Use Cases", icon: Lightbulb },
  { id: "datasets", label: "Datasets", icon: Database, badge: "2" },
  { id: "models", label: "Models", icon: Cpu },
  { id: "rag", label: "RAG Pipelines", icon: Network },
  { id: "deployments", label: "Deployments", icon: CloudCog },
]

const SECONDARY_NAV: NavItem[] = [
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "activity", label: "Activity Log", icon: Activity },
  { id: "settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = React.useState(false)
  const [active, setActive] = React.useState("use-cases")

  return (
    <aside
      className={cn(
        "hidden shrink-0 flex-col border-r border-border bg-surface transition-[width] duration-200 lg:flex",
        collapsed ? "w-[68px]" : "w-64",
      )}
      aria-label="Primary navigation"
    >
      {/* Brand */}
      <div className="flex h-14 items-center gap-2.5 border-b border-border px-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Hexagon className="h-5 w-5" aria-hidden="true" />
        </span>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-foreground">VectorForge</div>
            <div className="truncate text-[11px] text-muted-foreground">AI Strategy Platform</div>
          </div>
        )}
      </div>

      {/* Workspace switcher */}
      {!collapsed && (
        <div className="px-3 pt-3">
          <button className="flex w-full items-center gap-2.5 rounded-lg border border-border bg-surface-muted/60 px-2.5 py-2 text-left hover:bg-surface-muted">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-xs font-semibold text-background">
              AC
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-medium text-foreground">Acme Corp</span>
              <span className="block truncate text-[11px] text-muted-foreground">Enterprise plan</span>
            </span>
            <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          </button>
        </div>
      )}

      <nav className="scroll-thin flex-1 overflow-y-auto px-3 py-3">
        {!collapsed && (
          <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Workspace
          </p>
        )}
        <ul className="flex flex-col gap-0.5">
          {PRIMARY_NAV.map((item) => (
            <NavRow
              key={item.id}
              item={item}
              active={active === item.id}
              collapsed={collapsed}
              onClick={() => setActive(item.id)}
            />
          ))}
        </ul>

        <div className="my-3 h-px bg-border" />
        {!collapsed && (
          <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Account
          </p>
        )}
        <ul className="flex flex-col gap-0.5">
          {SECONDARY_NAV.map((item) => (
            <NavRow
              key={item.id}
              item={item}
              active={active === item.id}
              collapsed={collapsed}
              onClick={() => setActive(item.id)}
            />
          ))}
        </ul>
      </nav>

      {/* New project + collapse */}
      <div className="border-t border-border p-3">
        {!collapsed && (
          <button className="mb-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-dark">
            <Plus className="h-4 w-4" aria-hidden="true" />
            New Project
          </button>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-surface-muted hover:text-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeft className="h-4 w-4" aria-hidden="true" />
          ) : (
            <>
              <PanelLeftClose className="h-4 w-4" aria-hidden="true" />
              Collapse
            </>
          )}
        </button>
      </div>
    </aside>
  )
}

function NavRow({
  item,
  active,
  collapsed,
  onClick,
}: {
  item: NavItem
  active: boolean
  collapsed: boolean
  onClick: () => void
}) {
  const Icon = item.icon
  return (
    <li>
      <button
        onClick={onClick}
        aria-current={active ? "page" : undefined}
        title={collapsed ? item.label : undefined}
        className={cn(
          "group flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
          collapsed && "justify-center px-0",
          active
            ? "bg-info-soft text-primary"
            : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
        )}
      >
        <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
        {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
        {!collapsed && item.badge && (
          <span
            className={cn(
              "rounded-md px-1.5 py-0.5 text-[11px] font-semibold tabular-nums",
              active ? "bg-primary text-primary-foreground" : "bg-surface-muted text-muted-foreground",
            )}
          >
            {item.badge}
          </span>
        )}
      </button>
    </li>
  )
}
