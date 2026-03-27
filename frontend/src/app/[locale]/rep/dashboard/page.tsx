"use client";

import { useState } from "react";

export default function RepDashboard() {
  const [status, setStatus] = useState("Pending Review");
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold">Rep Dashboard</h1>
            <p className="text-slate-400 mt-1">Manage your anonymous profile and interviews.</p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
            <div className={`w-3 h-3 rounded-full ${status === 'Approved' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></div>
            <span className="text-sm font-medium">{status}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
              <h2 className="text-xl font-bold mb-4">Proof of Performance</h2>
              <p className="text-sm text-slate-400 mb-6">
                Upload your latest Form 16, W2, or commission statements. Our AI will extract your metrics and permanently delete the file to ensure privacy.
              </p>
              
              <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:border-emerald-500/50 transition-colors cursor-pointer relative">
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleUpload}
                />
                <div className="text-emerald-400 mb-2">
                  <svg className="w-8 h-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <p className="font-medium">{file ? file.name : "Click or drag file to upload"}</p>
                <p className="text-xs text-slate-500 mt-1">PDF, JPG, PNG up to 10MB</p>
              </div>

              {file && (
                <button className="mt-4 w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold transition-colors">
                  Submit for Verification
                </button>
              )}
            </section>

            <section className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
              <h2 className="text-xl font-bold mb-4">Extracted Metrics</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Quota Attainment", val: "124%" },
                  { label: "Avg Deal Size", val: "₹45L" },
                  { label: "Total ARR", val: "₹2.1Cr" },
                  { label: "Experience", val: "6 Yrs" }
                ].map((m, i) => (
                  <div key={i} className="bg-slate-900/50 p-4 rounded-2xl border border-white/5">
                    <div className="text-xs text-slate-500 mb-1">{m.label}</div>
                    <div className="text-lg font-bold text-emerald-400">{m.val}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <section className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
              <h2 className="text-xl font-bold mb-4">Interview Requests</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-indigo-400">Postman</h3>
                    <span className="text-xs font-medium px-2 py-1 bg-white/10 rounded items-center">New</span>
                  </div>
                  <p className="text-sm text-slate-300 mb-3">Enterprise AE role. Target OTE: ₹60L + Equity.</p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-colors">
                      Accept & Sign NDA
                    </button>
                    <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors">
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
