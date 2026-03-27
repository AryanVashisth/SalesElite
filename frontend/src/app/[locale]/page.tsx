import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("HomePage");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30">
      {/* Navbar */}
      <nav className="fixed w-full z-50 top-0 border-b border-white/10 bg-slate-950/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-2xl tracking-tighter bg-gradient-to-r from-emerald-400 to-indigo-400 bg-clip-text text-transparent">
            SalesElite
          </div>
          <div className="flex gap-4">
            <Link href={`/${locale}/auth/company`} className="px-5 py-2 rounded-full text-sm font-medium hover:bg-white/5 transition-colors">
              Company Login
            </Link>
            <Link href={`/${locale}/auth/rep`} className="px-5 py-2 rounded-full text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-slate-950 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              Rep Application
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Reverse Recruiting for India's Top 1%
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight mb-8">
          The Exclusive Network for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Elite Sales Professionals
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
          {t("description")} Upload anonymized proof of performance. Let top tech and SaaS companies pitch to you directly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href={`/${locale}/auth/rep`} className="px-8 py-4 rounded-full font-semibold bg-white text-slate-950 hover:scale-105 transition-transform">
            Apply as Sales Rep
          </Link>
          <Link href={`/${locale}/auth/company`} className="px-8 py-4 rounded-full font-semibold bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            Hire Top Talent
          </Link>
        </div>
      </main>

      {/* Features Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Anonymized Profiles", desc: "No names, no companies. We verify your W2/Form 16 and abstract your metrics." },
          { title: "Zero Noise", desc: "Skip the cold recruiters. Only get pitched by companies offering your exact target OTE." },
          { title: "AI-Verified", desc: "Our OCR extracts deal sizes and quotas automatically to prove your track record." }
        ].map((feat, i) => (
          <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-colors group relative overflow-hidden cursor-pointer">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl -mr-16 -mt-16 rounded-full group-hover:bg-emerald-500/20 transition-colors"></div>
            <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
            <p className="text-slate-400 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
