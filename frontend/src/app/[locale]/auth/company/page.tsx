"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CompanyAuth() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/en/company/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/[0.02] border border-white/5 rounded-3xl p-8">
        <h1 className="text-3xl font-bold mb-2">Company Access</h1>
        <p className="text-slate-400 mb-8">Sign in to scout top 1% sales talent.</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Work Email</label>
            <input type="email" required className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500" placeholder="founder@startup.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Password</label>
            <input type="password" required className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold transition-colors mt-4">
            View Talent Pool
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          <Link href="/en" className="hover:text-indigo-400 transition-colors">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}
