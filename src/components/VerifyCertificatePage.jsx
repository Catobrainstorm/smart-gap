// src/components/VerifyCertificatePage.jsx
// Standalone Certificate Verification Page (/verify and /verify/:serial)
// Direct integration with play.thesmartgap.com GET /api/verify/:serial
// Dev-proxied to bypass localhost CORS, submit-only verification, handles valid, revoked, unknown, and rate_limited states.

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  HiOutlineShieldCheck,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineXCircle,
  HiMagnifyingGlass,
  HiOutlineArrowLeft,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineTicket,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { useSound } from "./ui/SoundController";

export const VerifyCertificatePage = () => {
  const { serial: urlSerial } = useParams();
  const [serial, setSerial] = useState(urlSerial || "");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { playUiSound } = useSound();

  // Log on mount for easy developer debugging in browser DevTools
  useEffect(() => {
    console.log(
      "%c[SmartGap Certificate Registry]%c Console debugging active. Enter any certificate serial (e.g. SG-2026-4X6V5J) to test.",
      "background: #211540; color: #FFFFFF; font-weight: bold; padding: 2px 6px; border-radius: 4px; border: 1px solid #5B38A8;",
      "color: #C4B5FD; font-weight: bold; margin-left: 6px;"
    );
  }, []);

  const performVerification = async (targetSerial) => {
    const cleanSerial = (targetSerial || "").trim();
    if (!cleanSerial) return;

    setIsLoading(true);
    setResult(null);

    console.group(
      `%c[SmartGap Verification]%c Serial: ${cleanSerial}`,
      "color: #FFFFFF; font-weight: bold; background: #211540; padding: 2px 6px; border-radius: 4px; border: 1px solid #5B38A8;",
      "color: #FFFFFF; font-weight: bold; margin-left: 6px;"
    );
    console.log("1. Serial to verify:", cleanSerial);

    try {
      const isLocal =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";
      const endpoint = isLocal
        ? `/api/verify/${encodeURIComponent(cleanSerial)}`
        : `https://play.thesmartgap.com/api/verify/${encodeURIComponent(cleanSerial)}`;

      console.log("2. Fetching endpoint:", endpoint, isLocal ? "(Vite dev proxy -> play.thesmartgap.com)" : "(Direct)");

      let res;
      try {
        res = await fetch(endpoint, { cache: "no-store" });
      } catch (networkErr) {
        console.warn("Proxy/direct attempt failed, trying alternative endpoint:", networkErr.message);
        const fallbackEndpoint = isLocal
          ? `https://play.thesmartgap.com/api/verify/${encodeURIComponent(cleanSerial)}`
          : `/api/verify/${encodeURIComponent(cleanSerial)}`;
        res = await fetch(fallbackEndpoint, { cache: "no-store" });
      }

      console.log("3. HTTP Status code:", res.status);

      if (res.status === 429) {
        console.warn("4. Rate limited (HTTP 429). Exceeded 20 checks/min.");
        console.groupEnd();
        setResult({
          status: "rate_limited",
          message: "Too many verification requests. Please wait a minute and try again.",
        });
        return;
      }

      const data = await res.json();
      console.log("4. Response payload:", data);

      if (data.status === "valid") {
        console.log("%c✓ Valid Certificate Verified:", "color: #10B981; font-weight: bold;", data);
        console.groupEnd();
        playUiSound("pop");
        setResult({
          status: "valid",
          serial: data.serial || cleanSerial,
          name: data.name,
          programme: data.programme || data.program || data.Programme || "SmartGap",
          Programme: data.programme || data.program || data.Programme || "SmartGap",
          completedOn: data.completedOn,
          level: data.level || null,
          issuedOn: data.issuedOn,
        });
      } else if (data.status === "revoked") {
        console.warn("⚠ Certificate Revoked:", data);
        console.groupEnd();
        setResult({
          status: "revoked",
          serial: data.serial || cleanSerial,
          revokedOn: data.revokedOn,
          reason: data.reason || "Withdrawn by institution",
        });
      } else {
        // Unknown serial
        console.info("ℹ Unknown certificate serial number.");
        console.groupEnd();
        setResult({
          status: "unknown",
          message: "We have no certificate with that number. Check the number and try again.",
        });
      }
    } catch (err) {
      console.error("Verification error:", err);
      console.groupEnd();
      setResult({
        status: "unknown",
        message: "We have no certificate with that number. Check the number and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (urlSerial) {
      setSerial(urlSerial);
      performVerification(urlSerial);
    }
  }, [urlSerial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    playUiSound("click");
    performVerification(serial);
  };

  const formatDate = (isoString) => {
    if (!isoString) return "";
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (_) {
      return isoString;
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-white flex flex-col justify-between selection:bg-[#211540] selection:text-white">
      {/* Background radial glow */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-gradient-to-br from-[#211540] via-[#2F1E5C] to-[#120B24] rounded-full blur-[140px] opacity-90 pointer-events-none" />

      {/* STICKY TOP HEADER */}
      <header className="sticky top-0 z-50 w-full px-4 sm:px-8 lg:px-12 py-3.5 sm:py-4 bg-[#07090E]/85 backdrop-blur-xl border-b border-white/10 flex items-center justify-between transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <Link
          to="/"
          className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono font-bold uppercase tracking-wider text-white/80 hover:text-white transition-all group active:scale-95 shrink-0"
        >
          <HiOutlineArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#FF9600]" />
          <span className="text-[11px] sm:text-xs">Back to SmartGap</span>
        </Link>

        <Link to="/" className="flex items-center group">
          <img
            src="/assets/logo.webp"
            alt="SmartGap"
            className="h-6 sm:h-7 w-auto object-contain group-hover:scale-105 transition-transform"
          />
        </Link>
      </header>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 max-w-4xl mx-auto w-full px-6 py-12 sm:py-20 space-y-12">
        {/* HERO TITLE & PURPOSE */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#C4B5FD] font-semibold">
            Official Credential Registry
          </p>

          <h1 className="display-title text-4xl sm:text-6xl font-black uppercase text-white tracking-tight leading-[0.95]">
            Verify a Certificate
          </h1>

          <p className="font-body text-sm sm:text-base text-white/70 leading-relaxed font-light">
            Every SmartGap certificate is issued with a permanent unique serial number. Employers, university admissions offices, and sponsors can instantly verify credential authenticity.
          </p>
        </div>

        {/* VERIFICATION FORM */}
        <div className="bg-[#0E121D] border border-white/12 rounded-[32px] p-6 sm:p-10 shadow-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label
              htmlFor="certificate-serial-input"
              className="block text-xs font-mono uppercase tracking-wider text-white/70 font-bold"
            >
              Certificate Serial Number
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                  <HiMagnifyingGlass className="w-5 h-5" />
                </div>
                <input
                  id="certificate-serial-input"
                  type="text"
                  required
                  value={serial}
                  onChange={(e) => setSerial(e.target.value.toUpperCase())}
                  placeholder="e.g. SG-2026-4X6V5J"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/60 border border-white/15 text-white font-mono text-sm sm:text-base tracking-wider uppercase placeholder:text-white/30 focus:outline-none focus:border-[#7C5CFF] transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#211540] via-[#3B256E] to-[#211540] hover:from-[#2F1E5C] hover:to-[#4A2F8A] text-white border border-[#5B38A8] font-mono font-black text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_25px_rgba(33,21,64,0.7)] shrink-0 disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </span>
                ) : (
                  <span>Verify Now</span>
                )}
              </button>
            </div>

            <p className="text-[11px] font-mono text-white/40">
              Serial format: SG-YYYY-XXXXXX • Case and stray spaces are tidied automatically.
            </p>
          </form>

          {/* DYNAMIC RESULT DISPLAY */}
          {result && (
            <div className="pt-4 border-t border-white/10 animate-fade-in">
              {/* 1. VALID CERTIFICATE */}
              {result.status === "valid" && (
                <div className="p-6 sm:p-7 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-white space-y-3">
                  <div className="flex items-center gap-3">
                    <HiOutlineCheckCircle className="w-7 h-7 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                        AUTHENTIC CREDENTIAL VERIFIED
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold font-body text-white">
                        {result.name}
                      </h3>
                    </div>
                  </div>

                  <p className="font-body text-sm sm:text-base text-white/90 leading-relaxed pt-1">
                    <strong className="text-white">{result.name}</strong> completed the{" "}
                    <strong className="text-white">
                      {(result.Programme || "SmartGap").replace(/\bProgram\b/gi, "Programme")}
                    </strong>
                    {!/\bprogramme\b/i.test(result.Programme || "") ? " Programme" : ""}
                    {result.completedOn ? ` on ${formatDate(result.completedOn)}` : ""}.
                    {result.level ? ` Level: ${result.level}.` : ""}
                  </p>

                  <div className="pt-3 flex flex-wrap gap-4 sm:gap-6 text-xs font-mono text-white/60 border-t border-emerald-500/20">
                    <span>Serial: {result.serial}</span>
                    {result.issuedOn && (
                      <span>Issued: {formatDate(result.issuedOn)}</span>
                    )}
                  </div>
                </div>
              )}

              {/* 2. REVOKED CERTIFICATE */}
              {result.status === "revoked" && (
                <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-white space-y-2">
                  <div className="flex items-center gap-3">
                    <HiOutlineExclamationTriangle className="w-7 h-7 text-amber-400 shrink-0" />
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                        CERTIFICATE WITHDRAWN
                      </span>
                      <h3 className="text-lg font-bold font-body text-white">
                        Certificate {result.serial}
                      </h3>
                    </div>
                  </div>
                  <p className="font-body text-sm text-white/80 leading-relaxed">
                    Certificate <strong>{result.serial}</strong> was withdrawn
                    {result.revokedOn ? ` on ${formatDate(result.revokedOn)}` : ""}.
                  </p>
                  {result.reason && (
                    <p className="text-xs font-mono text-amber-300">
                      Reason: {result.reason}
                    </p>
                  )}
                </div>
              )}

              {/* 3. UNKNOWN CERTIFICATE */}
              {result.status === "unknown" && (
                <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-white flex items-center gap-3">
                  <HiOutlineXCircle className="w-6 h-6 text-rose-400 shrink-0" />
                  <p className="font-body text-sm sm:text-base text-white/90">
                    {result.message}
                  </p>
                </div>
              )}

              {/* 4. RATE LIMITED */}
              {result.status === "rate_limited" && (
                <div className="p-5 rounded-2xl bg-[#FB923C]/10 border border-[#FB923C]/30 text-white flex items-center gap-3">
                  <HiOutlineExclamationTriangle className="w-6 h-6 text-[#FB923C] shrink-0" />
                  <p className="font-body text-sm sm:text-base text-white/90">
                    {result.message}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* BOTTOM PORTAL LINKS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="https://play.thesmartgap.com/redeem"
            target="_blank"
            rel="noreferrer"
            className="p-6 rounded-3xl bg-[#0E121D] border border-white/10 hover:border-[#FF9600] transition-all group text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <HiOutlineTicket className="w-6 h-6 text-[#FF9600]" />
              <HiOutlineArrowTopRightOnSquare className="w-4 h-4 text-white/40 group-hover:text-[#FF9600] transition-colors" />
            </div>
            <h4 className="font-body text-base font-bold text-white group-hover:text-[#FF9600] transition-colors">
              Have a gift card? Use it here
            </h4>
            <p className="text-xs text-white/60 font-light mt-1">
              Redeem your unique voucher code at play.thesmartgap.com/redeem.
            </p>
          </a>

          <a
            href="https://play.thesmartgap.com/login"
            target="_blank"
            rel="noreferrer"
            className="p-6 rounded-3xl bg-[#0E121D] border border-white/10 hover:border-[#5B38A8] transition-all group text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <HiOutlineUserCircle className="w-6 h-6 text-[#A78BFA]" />
              <HiOutlineArrowTopRightOnSquare className="w-4 h-4 text-white/40 group-hover:text-[#C4B5FD] transition-colors" />
            </div>
            <h4 className="font-body text-base font-bold text-white group-hover:text-[#C4B5FD] transition-colors">
              Already on the Programme? Sign in
            </h4>
            <p className="text-xs text-white/60 font-light mt-1">
              Access your daily quest log, Shuri AI copilot, and live sessions.
            </p>
          </a>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 w-full px-6 sm:px-12 py-8 border-t border-white/10 text-center text-xs font-mono text-white/40">
        © {new Date().getFullYear()} SMARTGAP • POWERED BY SMARTAN HOUSE IMPACT ECOSYSTEM
      </footer>
    </div>
  );
};

export default VerifyCertificatePage;
