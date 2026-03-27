"use client";

import { useState } from "react";

export default function AdminDashboard() {
  const [metrics] = useState({
    totalReps: 142,
    pendingVerifications: 12,
    activeCompanies: 45,
    mrr: "₹18.5L"
  });

  const [pendingProfiles, setPendingProfiles] = useState([
    { id: 1, docUrl: "form16_user12.pdf", ocrQuota: "105%", ocrArr: "₹1.2Cr" },
    { id: 2, docUrl: "w2_user89.pdf", ocrQuota: "125%", ocrArr: "₹3.5Cr" }
  ]);

  const handleApprove = (id: number) => {
    setPendingProfiles(p => p.filter(x => x.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold">Admin Control Center</h1>
          <p className="text-slate-400 mt-1">Platform overview and verification queue.</p>
        </header>

        {/* Global Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Approved Reps", val: metrics.totalReps },
            { label: "Pending Verification", val: metrics.pendingVerifications },
            { label: "Active Companies", val: metrics.activeCompanies },
            { label: "Monthly Rev (MRR)", val: metrics.mrr }
          ].map((m, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl">
              <h3 className="text-slate-400 text-sm mb-2">{m.label}</h3>
              <p className="text-3xl font-bold text-white">{m.val}</p>
            </div>
          ))}
        </div>

        {/* Verification Queue */}
        <section className="bg-white/[0.02] border border-white/5 rounded-3xl p-6">
          <h2 className="text-xl font-bold mb-6">Verification Queue</h2>
          
          <div className="space-y-4">
            {pendingProfiles.length === 0 ? (
              <p className="text-slate-400">Queue is empty! Great job.</p>
            ) : (
              pendingProfiles.map(profile => (
                <div key={profile.id} className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-slate-900 rounded-2xl border border-white/5">
                  <div className="flex gap-6 items-center">
                    <div className="w-12 h-12 bg-rose-500/20 text-rose-500 rounded-full flex items-center justify-center font-bold">
                      #{profile.id}
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 mb-1">Document: <a href="#" className="underline text-indigo-400">{profile.docUrl}</a></p>
                      <div className="flex gap-4 text-sm font-medium">
                        <span className="text-emerald-400">OCR Quota: {profile.ocrQuota}</span>
                        <span className="text-emerald-400">OCR ARR: {profile.ocrArr}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleApprove(profile.id)}
                      className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl transition-colors"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleApprove(profile.id)}
                      className="px-6 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 font-bold rounded-xl transition-colors border border-rose-500/20"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
