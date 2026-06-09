import type { DemoWorkspace } from "./types"

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:8000"

export async function fetchDemoWorkspace(signal?: AbortSignal): Promise<DemoWorkspace> {
  const response = await fetch(`${API_BASE_URL}/api/demo-workspace`, {
    signal,
    headers: {
      Accept: "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Mock backend returned ${response.status}`)
  }

  return response.json()
}

