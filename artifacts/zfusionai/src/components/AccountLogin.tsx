import { useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { api, type PublicUser } from "@/lib/api";

export default function AccountLogin({ next }: { next: string }) {
  const [location, navigate] = useLocation();
  const [register, setRegister] = useState(location === "/signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();
  const login = useMutation({
    mutationFn: () => api<{ user: PublicUser }>(register ? "/auth/register" : "/auth/login", {
      method: "POST", body: { name, email, password },
    }),
    onSuccess: ({ user }) => {
      queryClient.removeQueries({ queryKey: ["account"] });
      queryClient.setQueryData(["auth", "me"], user);
      setPassword("");
      navigate(/^\/(?![\/\\])/.test(next) ? next : "/dashboard");
    },
  });
  function submit(event: FormEvent) { event.preventDefault(); login.mutate(); }
  const field = "block w-full rounded-xl border border-input bg-background text-foreground px-3 py-3 mt-1.5 focus:outline-emerald-500";
  return <div className="space-y-5">
    <div className="flex rounded-lg border border-border p-1 gap-1" aria-label="Account access">
      {[false, true].map((isRegister) => <button type="button" key={String(isRegister)}
        aria-pressed={register === isRegister} disabled={login.isPending}
        onClick={() => { setRegister(isRegister); setPassword(""); login.reset(); }}
        className={`flex-1 rounded-md p-2 text-sm font-semibold ${register === isRegister ? "bg-emerald-500 text-black" : "text-muted-foreground"}`}>
        {isRegister ? "Create account" : "Sign in"}
      </button>)}
    </div>
    <form onSubmit={submit} className="space-y-4">
      {register && <label className="block text-sm font-medium">Your name
        <input name="name" autoComplete="name" required maxLength={100} value={name} onChange={(e) => setName(e.target.value)} className={field} />
      </label>}
      <label className="block text-sm font-medium">Email address
        <input name="email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
      </label>
      <label className="block text-sm font-medium">Password
        <input name="password" type="password" autoComplete={register ? "new-password" : "current-password"} required
          minLength={register ? 15 : 1} maxLength={128} value={password} onChange={(e) => setPassword(e.target.value)}
          aria-describedby={register ? "password-help" : undefined} className={field} />
      </label>
      {register && <p id="password-help" className="text-xs text-muted-foreground">Use at least 15 characters. A few unrelated words work well.</p>}
      {register && <label className="flex items-start gap-2 text-xs text-muted-foreground">
        <input type="checkbox" required className="mt-0.5 accent-emerald-600" />
        <span>I agree to the <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.</span>
      </label>}
      {login.error && <p role="alert" className="text-sm text-red-700 dark:text-red-300">{login.error.message}</p>}
      <button type="submit" disabled={login.isPending} className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-400 py-3 font-bold text-black disabled:opacity-50">
        {login.isPending ? "Please wait…" : register ? "Create my account" : "Sign in to my account"}
      </button>
      <p className="text-xs text-muted-foreground">Your workspace and message usage are saved to your account.</p>
    </form>
  </div>;
}
