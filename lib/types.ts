import type { LucideIcon } from "lucide-react"

export type AgentStatus =
  | "draft"
  | "waiting-approval"
  | "running"
  | "complete"
  | "needs-attention"
  | "failed"
  | "deployed"

export type AgentName =
  | "Intent Agent"
  | "Strategy Agent"
  | "Data Agent"
  | "Training Agent"
  | "RAG Agent"
  | "Deployment Agent"
  | "Billing Agent"

export type NavSection = {
  id: string
  label: string
  icon: LucideIcon
  badge?: string | number
}

export type EffortLevel = "low" | "medium" | "high" | "xhigh"

export type EffortOption = {
  value: EffortLevel
  label: string
  cost: string
  description: string
}

export type SchemaColumn = {
  name: string
  type: "string" | "number" | "integer" | "boolean"
  nullPct: number
  sample: string
  source: "uploaded" | "exa" | "enriched"
}

export type ActivityEntry = {
  id: string
  agent: AgentName
  message: string
  time: string
  status: AgentStatus
  tool?: string
  cost?: string
  detail?: string
}

export type LeaderboardRow = {
  rank: number
  model: string
  metric: number
  inferTime: string
  best?: boolean
}
