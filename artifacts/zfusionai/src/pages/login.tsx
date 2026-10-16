import { useEffect } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { CheckCircle2, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import SeoHead from "@/components/SeoHead";
import Navbar from "@/components/Navbar";
import { useAuth, useAuthProviders } from "@/hooks/use-auth";
import { oauthUrl } from "@/lib/api";
import AccountLogin from "@/components/AccountLogin";

const ERROR_MESSAGES: Record<string, string> = {
  access_denied: "Sign-in was cancelled.",
  invalid_state: "Your sign-in session expired. Please try again.",
  oauth_failed: "We couldn't complete sign-in with that provider. Please try again.",
  email_unverified:
    "An account with this email already exists. Sign in with the provider you used first.",
  google_not_configured: "Google sign-in isn't configured on this server yet.",
  github_not_configured: "GitHub sign-in isn't configured on this server yet.",
  password_account_exists: "This email has a password account. Use the email and password form below.",
};

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.5 14.6 2.5 12 2.5 6.8 2.5 2.6 6.7 2.6 12s4.2 9.5 9.4 9.5c5.4 0 9-3.8 9-9.2 0-.6-.1-1.1-.2-1.6H12z" />
      <path fill="#34A853" d="M3.7 7.6l3.2 2.3C7.8 8 9.7 6.5 12 6.5c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.5 14.6 2.5 12 2.5 8.3 2.5 5.2 4.6 3.7 7.6z" opacity=".9" />
      <path fill="#FBBC05" d="M12 21.5c2.5 0 4.7-.8 6.2-2.3l-2.9-2.4c-.8.6-1.9 1.1-3.3 1.1-3.8 0-5.2-2.6-5.5-4l-3.2 2.5c1.5 3 4.6 5.1 8.7 5.1z" opacity=".9" />
      <path fill="#4285F4" d="M21 12.3c0-.6-.1-1.1-.2-1.6H12v3.9h5.5c-.3 1.3-1.1 2.3-2.2 3l2.9 2.4c1.7-1.6 2.8-4.1 2.8-7.7z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
      <path d="M12 .5C5.7.5.5 5.7.5 12a11.5 11.5 0 0 0 7.9 10.9c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  );
}

export default function LoginPage() {
  const { user, isLoading } = useAuth();
  const { data: providers } = useAuthProviders();
  const [, navigate] = useLocation();
  const params = new URLSearchParams(useSearch());
  const next = params.get("next") ?? "/dashboard";
  const errorCode = params.get("error");

  useEffect(() => {
    if (!isLoading && user) navigate(/^\/(?![\/\\])/.test(next) ? next : "/dashboard");
  }, [isLoading, user, next, navigate]);

  const buttonBase =
    "w-full inline-flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#030c07] text-slate-950 dark:text-white overflow-x-clip">
      <SeoHead
        title="Sign in | Free trial with 1,000 messages | ZFusionAI"
        description="Create an account and sign in to activate 1,000 free messages for AI agents, web app chat and WhatsApp automation. Your workspace is saved securely. No credit card required."
        path="/login"
        noindex
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none" />
      <Navbar />

      <main className="relative z-10 container mx-auto px-4 sm:px-6 pt-32 pb-20 grid lg:grid-cols-2 gap-12 items-center max-w-6xl">
        <section className="space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-mono text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FREE TRIAL · 1,000 MESSAGES · NO CARD</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-tight">
            AI agents for your <span className="text-cyan-700 dark:text-cyan-300">API</span>, <span className="text-emerald-700 dark:text-emerald-300">web app</span> and <span className="text-emerald-700 dark:text-[#25D366]">WhatsApp</span>.
          </h1>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Build an AI agent once and use it everywhere: call it from your code (OpenAI-compatible),
            embed it in your website, or let it answer WhatsApp customers 24/7. Sign in and register a unique phone number to activate
            <strong className="text-slate-950 dark:text-white"> 1,000 free messages</strong> shared across all three.
          </p>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            {[
              "Agentic AI: agents with webhook tools, REST + OpenAI-compatible API",
              "Web App: one-line AI chat widget for any website",
              "WhatsApp: AI auto-replies on the official Cloud API",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-label="Sign in"
          className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-2xl bg-slate-100/70 dark:bg-slate-900/70 backdrop-blur-xl border border-emerald-500/25 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <img src="/brand/logo_compressed.png" alt="" className="w-10 h-10 object-contain" />
            <div>
              <h2 className="text-xl font-display font-bold">Sign in to ZFusionAI</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Sign in, then activate your trial with a unique phone number.</p>
            </div>
          </div>

          {errorCode && (
            <div role="alert" className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-700 dark:text-red-300">
              {ERROR_MESSAGES[errorCode] ?? "Sign-in failed. Please try again."}
            </div>
          )}

          <AccountLogin next={next} />
          {providers?.google && <div className="space-y-3 mt-6 pt-6 border-t border-border">
            <a
              href={oauthUrl("google", next)}
              className={`${buttonBase} bg-white text-slate-900 hover:bg-slate-100`}
            >
              <GoogleIcon />
              Continue with Google
            </a>

          </div>}

          <div className="mt-6 flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
            <p>
              Your account keeps your agents, settings and message usage together. See our{" "}
              <Link href="/terms" className="text-emerald-700 dark:text-emerald-400 hover:underline">Terms</Link> and{" "}
              <Link href="/privacy" className="text-emerald-700 dark:text-emerald-400 hover:underline">Privacy Policy</Link>.
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-900/10 dark:border-white/10 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <MessageSquare className="w-4 h-4 text-emerald-700 dark:text-[#25D366]" />
            <span>
              Need a hand?{" "}
              <Link href="/contact" className="text-emerald-700 dark:text-emerald-400 hover:underline">
                Talk to an engineer
              </Link>
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}
