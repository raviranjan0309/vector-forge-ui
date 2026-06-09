import Link from "next/link"
import {
  ArrowRight,
  BadgeDollarSign,
  Bot,
  CheckCircle2,
  DatabaseZap,
  FileSearch,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

const PRODUCT_STEPS = [
  {
    title: "Translate business intent",
    description:
      "Capture a problem statement, KPIs, domain context, and timeline. The agent classifies the AI task and turns vague requirements into a concrete execution plan.",
    icon: Bot,
  },
  {
    title: "Source or generate data",
    description:
      "Upload existing files, connect a database, or let the Exa-powered Data Agent build schema-validated datasets from live web sources.",
    icon: DatabaseZap,
  },
  {
    title: "Train and optimize",
    description:
      "Run AutoGluon model search and AutoRAG pipeline trials from one orchestrated workflow, with progress, cost, and provenance visible in chat.",
    icon: Network,
  },
]

const FEATURES = [
  "Dual-path data sourcing: upload, Exa web build, or hybrid enrichment",
  "Human approval gates for paid Exa runs, schema confirmation, and billing",
  "Dataset preview, quality score, null-rate detection, and field-level provenance",
  "AutoGluon leaderboard and feature importance surfaced as rich agent cards",
  "AutoRAG trial optimization with retriever, reranker, chunking, and latency metrics",
  "Enterprise audit trail across agents, tools, approvals, costs, and deployments",
]

const METRICS = [
  { value: "180", label: "Rows generated in demo dataset" },
  { value: "0.921", label: "Best ROC-AUC from AutoGluon" },
  { value: "24", label: "AutoRAG pipeline trials" },
]

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-canvas text-foreground">
      <header className="border-b border-border bg-surface/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5" aria-label="VectorForge home">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="font-heading text-lg font-semibold tracking-tight">VectorForge</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <a href="#product" className="hover:text-foreground">Product</a>
            <a href="#workflow" className="hover:text-foreground">Workflow</a>
            <a href="#security" className="hover:text-foreground">Enterprise</a>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-surface-muted hover:text-foreground sm:inline-flex"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary-dark"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            From problem statement to production AI
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            AI strategy, data sourcing, training, and deployment in one agentic workspace.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            VectorForge turns vague business problems into deployable AI systems. Define KPIs, source or generate
            training data, confirm schema quality, run AutoGluon and AutoRAG, then deploy the winning model and RAG
            endpoint with clear approvals.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary-dark"
            >
              Start building
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-surface px-5 text-sm font-medium text-foreground hover:bg-surface-muted"
            >
              View demo workspace
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
          <div className="rounded-xl border border-border bg-surface-muted/60 p-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <div className="text-xs font-medium text-muted-foreground">Live agent run</div>
                <div className="mt-1 font-heading text-xl font-semibold">Dataset Build Complete</div>
              </div>
              <span className="rounded-full border border-success/30 bg-success-soft px-2.5 py-1 text-xs font-medium text-success">
                Complete
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {METRICS.map((metric) => (
                <div key={metric.label} className="rounded-lg border border-border bg-surface px-3 py-3">
                  <div className="font-mono text-lg font-semibold text-foreground">{metric.value}</div>
                  <div className="mt-1 text-[11px] leading-snug text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 overflow-hidden rounded-lg border border-border">
              <div className="grid grid-cols-4 bg-surface-muted px-3 py-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                <span>Company</span>
                <span>ARR</span>
                <span>NPS</span>
                <span>Churned</span>
              </div>
              {[
                ["Northwind", "$4.2M", "41", "false"],
                ["Lumen", "$1.1M", "28", "true"],
                ["Cedar", "$8.9M", "53", "false"],
              ].map((row) => (
                <div key={row[0]} className="grid grid-cols-4 border-t border-border px-3 py-2 text-[13px]">
                  {row.map((cell) => (
                    <span key={cell} className="truncate text-muted-foreground">{cell}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="product" className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
          {PRODUCT_STEPS.map((step) => {
            const Icon = step.icon
            return (
              <article key={step.title} className="rounded-xl border border-border bg-background p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-info-soft text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 text-lg font-semibold">{step.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section id="workflow" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="text-sm font-semibold text-primary">Complete production loop</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Built for auditable enterprise AI delivery.</h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              The product is designed around the exact decisions enterprise teams need to trust before they spend credits,
              train models, deploy endpoints, or approve usage charges.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <div key={feature} className="flex gap-3 rounded-lg border border-border bg-surface px-4 py-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                <span className="text-sm leading-6 text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="security" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Auditability", text: "Every agent action records tool, status, cost, output summary, and approval context.", icon: FileSearch },
            { title: "Cost control", text: "Paid Exa, training, deployment, and Stripe actions are gated by explicit approval steps.", icon: BadgeDollarSign },
            { title: "Governance-ready", text: "Designed for workspaces, projects, roles, datasets, provenance, activity, and billing.", icon: ShieldCheck },
          ].map((item) => {
            const Icon = item.icon
            return (
              <article key={item.title} className="rounded-xl border border-border bg-surface p-5">
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <h2 className="mt-4 text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
