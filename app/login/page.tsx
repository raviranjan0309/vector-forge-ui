import Link from "next/link"
import { ArrowRight, LockKeyhole, Mail, ShieldCheck, Sparkles } from "lucide-react"

export default function LoginPage() {
  return (
    <main className="grid min-h-dvh bg-canvas text-foreground lg:grid-cols-[0.92fr_1.08fr]">
      <AuthPanel />

      <section className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
          <Link href="/" className="mb-8 inline-flex items-center gap-2.5" aria-label="VectorForge home">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="font-heading text-lg font-semibold">VectorForge</span>
          </Link>

          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Log in</h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Access your AI strategy workspace, datasets, training runs, approvals, and deployments.
            </p>
          </div>

          <form className="mt-8 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-foreground">Work email</span>
              <span className="mt-1.5 flex h-11 items-center gap-2 rounded-lg border border-border bg-surface-muted/60 px-3">
                <Mail className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="name@company.com"
                  className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </span>
            </label>

            <label className="block">
              <span className="flex items-center justify-between text-sm font-medium text-foreground">
                Password
                <a href="#" className="text-xs font-medium text-primary hover:underline">
                  Forgot password?
                </a>
              </span>
              <span className="mt-1.5 flex h-11 items-center gap-2 rounded-lg border border-border bg-surface-muted/60 px-3">
                <LockKeyhole className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </span>
            </label>

            <Link
              href="/dashboard"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary-dark"
            >
              Log in to workspace
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to VectorForge?{" "}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}

function AuthPanel() {
  return (
    <section className="hidden border-r border-border bg-surface px-10 py-12 lg:flex lg:flex-col lg:justify-between">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          Enterprise AI delivery control plane
        </div>
        <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-tight tracking-tight">
          Keep every AI workflow auditable from intent to deployment.
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground">
          Review strategy, data provenance, model performance, RAG configuration, usage costs, and approval history in
          one operational workspace.
        </p>
      </div>

      <div className="grid gap-3">
        {["Schema approval before model training", "Usage gates before paid actions", "Activity logs for every agent handoff"].map((item) => (
          <div key={item} className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}
