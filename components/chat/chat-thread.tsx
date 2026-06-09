"use client"

import { useEffect, useState } from "react"
import { UserMessage, AgentMessage, SystemCardSlot } from "./messages"
import { Composer } from "./composer"
import { StrategyCard } from "@/components/cards/strategy-card"
import { DataSourceCard } from "@/components/cards/data-source-card"
import { ExaBuilderCard } from "@/components/cards/exa-builder-card"
import { SchemaConfirmCard } from "@/components/cards/schema-confirm-card"
import { TrainingCard } from "@/components/cards/training-card"
import { RagCard } from "@/components/cards/rag-card"
import { DeploymentCard } from "@/components/cards/deployment-card"
import { BillingApprovalCard } from "@/components/cards/billing-approval-card"
import { fetchDemoWorkspace } from "@/lib/api"
import type { DemoWorkspace } from "@/lib/types"

export function ChatThread() {
  const [workspace, setWorkspace] = useState<DemoWorkspace | null>(null)
  const [apiState, setApiState] = useState<"loading" | "connected" | "fallback">("loading")

  useEffect(() => {
    const controller = new AbortController()

    fetchDemoWorkspace(controller.signal)
      .then((data) => {
        setWorkspace(data)
        setApiState("connected")
      })
      .catch(() => {
        setApiState("fallback")
      })

    return () => controller.abort()
  }, [])

  return (
    <div className="relative flex h-full flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6">
          {/* Day divider */}
          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Today &middot; Churn Propensity Model
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="mx-auto rounded-full border border-border bg-surface-muted/70 px-3 py-1 text-[11px] font-medium text-muted-foreground">
            {apiState === "connected"
              ? "Mock backend connected"
              : apiState === "fallback"
                ? "Using local UI fallback data"
                : "Connecting to mock backend..."}
          </div>

          <UserMessage time="9:41 AM">
            We&apos;re losing enterprise customers and can&apos;t predict who&apos;s about to churn. Help me build
            something that flags at-risk accounts before renewal.
          </UserMessage>

          <AgentMessage agent="Intent Agent" time="9:41 AM">
            Got it. That&apos;s a <span className="font-medium text-foreground">churn prediction</span> problem. Before
            we touch data, let me translate this into a concrete ML strategy and lay out the path end-to-end. Here&apos;s
            what I&apos;m proposing.
          </AgentMessage>

          <SystemCardSlot>
            <StrategyCard strategy={workspace?.strategy} />
          </SystemCardSlot>

          <UserMessage time="9:43 AM">Looks right. The plan works for me &mdash; let&apos;s proceed.</UserMessage>

          <AgentMessage agent="Data Agent" time="9:43 AM">
            To train a reliable model I need historical account data. You can bring your own, connect a warehouse, or I
            can build a fresh labeled dataset from the open web using Exa. How do you want to source data?
          </AgentMessage>

          <SystemCardSlot>
            <DataSourceCard paths={workspace?.dataSources} />
          </SystemCardSlot>

          <UserMessage time="9:45 AM">
            We don&apos;t have clean historical labels. Build a dataset with Exa &mdash; B2B SaaS companies with firmographics
            and public churn signals.
          </UserMessage>

          <AgentMessage agent="Data Agent" time="9:45 AM">
            Understood. Synthesizing a labeled dataset is a billable, long-running job, so you&apos;ll approve scope and
            cost before anything runs. Configure the build below.
          </AgentMessage>

          <SystemCardSlot>
            <ExaBuilderCard run={workspace?.exaRun} />
          </SystemCardSlot>

          <AgentMessage agent="Data Agent" time="10:02 AM">
            Dataset ready &mdash; 4,820 rows across 14 features, fully traceable to source. Here&apos;s the final schema.
            Confirm it and I&apos;ll hand off to training. This is the last gate before model search begins.
          </AgentMessage>

          <SystemCardSlot>
            <SchemaConfirmCard dataset={workspace?.dataset} />
          </SystemCardSlot>

          <AgentMessage agent="Training Agent" time="10:04 AM">
            Schema locked. Running AutoGluon to search model families and ensembles against your churn label. No further
            input needed &mdash; I&apos;ll surface the leaderboard as it converges.
          </AgentMessage>

          <SystemCardSlot>
            <TrainingCard training={workspace?.training} />
          </SystemCardSlot>

          <AgentMessage agent="RAG Agent" time="10:19 AM">
            The strategy also called for a retrieval layer so account managers can ask questions in natural language. I
            built an AutoRAG pipeline over your dataset and source documents.
          </AgentMessage>

          <SystemCardSlot>
            <RagCard rag={workspace?.rag} />
          </SystemCardSlot>

          <AgentMessage agent="Deployment Agent" time="10:24 AM">
            Everything passed validation. I can promote the winning ensemble and the RAG endpoint to a managed,
            autoscaling deployment with a versioned API.
          </AgentMessage>

          <SystemCardSlot>
            <DeploymentCard />
          </SystemCardSlot>

          <AgentMessage agent="Billing Agent" time="10:24 AM">
            Promoting to production moves this workspace to metered usage. Review the cost summary and approve to go
            live.
          </AgentMessage>

          <SystemCardSlot>
            <BillingApprovalCard />
          </SystemCardSlot>

          <div className="h-2" />
        </div>
      </div>

      <Composer />
    </div>
  )
}
