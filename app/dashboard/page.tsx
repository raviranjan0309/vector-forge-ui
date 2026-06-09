"use client"

import { useState } from "react"
import { Sidebar } from "@/components/shell/sidebar"
import { TopBar } from "@/components/shell/top-bar"
import { Inspector } from "@/components/shell/inspector"
import { ChatThread } from "@/components/chat/chat-thread"

export default function DashboardPage() {
  const [inspectorOpen, setInspectorOpen] = useState(true)

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-canvas text-foreground">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar inspectorOpen={inspectorOpen} onToggleInspector={() => setInspectorOpen((v) => !v)} />

        <div className="flex min-h-0 flex-1">
          <main className="min-w-0 flex-1 bg-canvas">
            <ChatThread />
          </main>

          <Inspector open={inspectorOpen} />
        </div>
      </div>
    </div>
  )
}
