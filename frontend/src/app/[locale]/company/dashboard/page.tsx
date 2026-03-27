"use client";

import { useState } from "react";

export default function CompanyDashboard() {
  const [subscribed, setSubscribed] = useState(true);
  const [search, setSearch] = useState("");

  const dummyReps = [
    { id: "SE-1092", quota: "142%", dealSize: "₹85L", arr: "₹4.2Cr", exp: "8 Yrs", ind: "SaaS, FinTech" },
    { id: "SE-3304", quota: "115%", dealSize: "₹25L", arr: "₹1.5Cr", exp: "5 Yrs", ind: "EdTech, IT" },
    { id: "SE-8821", quota: "210%", dealSize: "₹120L", arr: "₹8.5Cr", exp: "12 Yrs", ind: "Enterprise SaaS" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold">Company Hub</h1>
            <p className="text-slate-400 mt-1">Discover and recruit top 1% sales talent in India.</p>
          </div>
          <div className="flex items-center gap-4">
            {!subscribed ? (
              <button className="bg-gradient-to-r from-emerald-500 to-indigo-500 text-white px-6 py-2 rounded-full font-medium hover:scale-105 transition-transform">
                Upgrade to Premium
              </button>
            ) : (
              <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                Premium Member
              </div>
            )}
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-1/4 space-y-6">
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 sticky top-8">
              <h2 className="font-bold text-lg mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                Talent Filters
              </h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Target Quota Attainment</label>
                  <select className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-indigo-500 text-sm">
                    <option>Any Quota</option>
                    <option>&gt; 100% (Quota Achiever)</option>
                    <option>&gt; 150% (President's Club)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Avg Deal Size (₹ Lakhs)</label>
                  <input type="range" min="5" max="200" className="w-full accent-indigo-500" />
                  <div className="flex justify-between text-xs text-slate-500 mt-1"><span>₹5L</span><span>₹200L+</span></div>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">Industry Experience</label>
                  <input type="text" placeholder="e.g. EdTech, SaaS" className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 text-sm" />
                </div>
              </div>

              <button className="w-full mt-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-semibold transition-colors border border-white/10">
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Results Grid */}
          <main className="lg:w-3/4 space-y-4">
            <div className="flex items-center justify-between text-sm text-slate-400 mb-4 px-2">
              <span>Showing {dummyReps.length} verified candidates</span>
              <select className="bg-transparent border-none focus:outline-none cursor-pointer">
                <option>Sort by: Arr (High to Low)</option>
                <option>Sort by: Quota (High to Low)</option>
              </select>
            </div>

            {dummyReps.map((rep) => (
              <div key={rep.id} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col md:flex-row gap-6 md:items-center">
                  <div className="h-16 w-16 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
                    {rep.id.split('-')[1]}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1 flex items-center gap-2">
                      Anonymized Candidate <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Verified</span>
                    </h3>
                    <p className="text-slate-400 text-sm mb-3">Industries: {rep.ind}</p>
                    <div className="flex flex-wrap gap-3">
                      <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-xs font-medium text-slate-300">Quota: <span className="text-emerald-400">{rep.quota}</span></span>
                      <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-xs font-medium text-slate-300">Target OTE: <span className="text-white">{rep.arr}</span></span>
                      <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-xs font-medium text-slate-300">Avg Deal: {rep.dealSize}</span>
                      <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-xs font-medium text-slate-300">Exp: {rep.exp}</span>
                    </div>
                  </div>
                </div>
                
                <button className="md:w-auto w-full px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors whitespace-nowrap">
                  Send Interest
                </button>
              </div>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
