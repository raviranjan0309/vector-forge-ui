import Link from "next/link"
import { ArrowRight, Building2, CheckCircle2, LockKeyhole, Mail, Sparkles, User } from "lucide-react"

const BENEFITS = [
  "Turn executive priorities into funded AI use cases with clear ROI",
  "Build audit-ready datasets from company data, web research, or enrichment",
  "Manage approvals, deployment readiness, cost control, and governance in one workflow",
]

export default function SignupPage() {
  return (
    <main className="min-h-dvh bg-canvas text-foreground">
      <div className="mx-auto grid min-h-dvh max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <section className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 shadow-sm lg:p-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="VectorForge home">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-heading text-lg font-semibold">VectorForge</span>
            </Link>

            <div className="mt-12">
              <div className="text-sm font-semibold text-primary">Create your workspace</div>
              <h1 className="mt-2 max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Turn business priorities into investable AI products.
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-6 text-muted-foreground">
                VectorForge helps teams identify high-value AI opportunities, source trusted data, validate business
                impact, and move from strategy to launch with the controls investors and enterprise buyers expect.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-3">
            {BENEFITS.map((benefit) => (
              <div key={benefit} className="flex gap-3 rounded-lg border border-border bg-background px-4 py-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                <span className="text-sm leading-6 text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center">
          <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Sign up</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Create an account for your team workspace. No payment required for the demo.
              </p>
            </div>

            <form className="mt-8 space-y-4">
              <Field icon={User} label="Full name" name="name" placeholder="Jordan Ellis" autoComplete="name" />
              <Field icon={Mail} label="Work email" name="email" type="email" placeholder="name@company.com" autoComplete="email" />
              <Field icon={Building2} label="Company" name="company" placeholder="Acme Corp" autoComplete="organization" />
              <Field
                icon={LockKeyhole}
                label="Password"
                name="password"
                type="password"
                placeholder="Create a password"
                autoComplete="new-password"
              />

              <Link
                href="/dashboard"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary-dark"
              >
                Create workspace
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </form>

            <p className="mt-4 text-xs leading-5 text-muted-foreground">
              By creating a workspace, you agree to use mock demo data responsibly. Production auth and billing can be
              connected to the backend later.
            </p>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

function Field({
  icon: Icon,
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
}: {
  icon: React.ElementType
  label: string
  name: string
  type?: string
  placeholder: string
  autoComplete: string
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <span className="mt-1.5 flex h-11 items-center gap-2 rounded-lg border border-border bg-surface-muted/60 px-3">
        <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <input
          type={type}
          name={name}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </span>
    </label>
  )
}
