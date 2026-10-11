import { useState } from "react";

const dataCategories = [
  {
    icon: "👤",
    title: "Identity Data",
    color: "border-violet-500/20 bg-violet-500/5",
    badgeColor: "bg-violet-500/10 text-violet-400",
    examples: ["Full name", "Date of birth", "Gender", "Aadhaar number", "PAN card"],
    risk: "Used for identity theft, loan fraud, and impersonation attacks.",
  },
  {
    icon: "📞",
    title: "Contact Data",
    color: "border-cyan-500/20 bg-cyan-500/5",
    badgeColor: "bg-cyan-500/10 text-cyan-400",
    examples: ["Email address", "Phone number", "Home address", "City / State"],
    risk: "Used for phishing, spam, SIM swap attacks, and physical threats.",
  },
  {
    icon: "💰",
    title: "Financial Data",
    color: "border-emerald-500/20 bg-emerald-500/5",
    badgeColor: "bg-emerald-500/10 text-emerald-400",
    examples: ["Bank account number", "Credit/debit card", "UPI ID", "Income details"],
    risk: "Used for financial fraud, unauthorized transactions, and scams.",
  },
  {
    icon: "📍",
    title: "Location Data",
    color: "border-amber-500/20 bg-amber-500/5",
    badgeColor: "bg-amber-500/10 text-amber-400",
    examples: ["GPS location", "Home address", "Work address", "Travel history"],
    risk: "Used for stalking, burglary planning, and targeted physical attacks.",
  },
  {
    icon: "🌐",
    title: "Online Activity",
    color: "border-rose-500/20 bg-rose-500/5",
    badgeColor: "bg-rose-500/10 text-rose-400",
    examples: ["Browsing history", "Search history", "Cookies", "App usage"],
    risk: "Used for behavioral profiling, targeted ads, and manipulation.",
  },
  {
    icon: "🔐",
    title: "Credentials",
    color: "border-sky-500/20 bg-sky-500/5",
    badgeColor: "bg-sky-500/10 text-sky-400",
    examples: ["Usernames", "Passwords", "Security questions", "PINs"],
    risk: "Direct account takeover and access to all linked services.",
  },
];

const exposurePoints = [
  {
    icon: "📱",
    title: "App Permissions",
    desc: "Apps often request camera, contacts, and location access they don't need. Review and revoke unused permissions.",
    action: "Go to phone Settings → Apps → Permissions",
  },
  {
    icon: "📋",
    title: "Online Forms",
    desc: "Websites collect more than they need. Only fill mandatory fields. Use a secondary email for sign-ups.",
    action: "Never fill optional fields. Use aliases where possible.",
  },
  {
    icon: "🛍️",
    title: "E-commerce Sites",
    desc: "Shopping sites store your card details, address, and purchase history. Use guest checkout when possible.",
    action: "Delete saved cards after purchase. Use UPI instead of cards.",
  },
  {
    icon: "📸",
    title: "Social Media",
    desc: "Photos contain EXIF metadata with location. Public profiles expose your routines and personal details.",
    action: "Disable location in camera. Set profiles to private.",
  },
  {
    icon: "☁️",
    title: "Cloud Storage",
    desc: "Documents uploaded to cloud may be scanned or accessed if account is compromised.",
    action: "Enable 2FA on cloud accounts. Encrypt sensitive files.",
  },
  {
    icon: "📶",
    title: "Public Wi-Fi",
    desc: "Unsecured networks allow attackers to intercept data. Avoid logging into accounts on public Wi-Fi.",
    action: "Use a VPN on public networks. Prefer mobile data for sensitive tasks.",
  },
];

const scenarios = [
  {
    title: "The Oversharing Profile",
    type: "bad",
    content: `Name: Rahul Sharma
Birthday: 15 August 1998
City: Mumbai, Maharashtra
College: Mumbai University
Phone: +91 98765 43210
"Just got home from my morning run at Juhu Beach 🏃"`,
    issues: [
      "Full name + birthday = identity theft risk",
      "Exact location reveals daily routine",
      "Phone number exposes to spam and SIM swap",
      "Real-time location posts signal when you're out",
    ],
  },
  {
    title: "The Privacy-Aware Profile",
    type: "good",
    content: `Name: R. Sharma
Location: Maharashtra
"Morning run done ✅ Feeling fresh!"`,
    good: [
      "No birthday or full name",
      "Only state-level location, not city or area",
      "No phone number or personal contact",
      "No real-time location revealed",
    ],
  },
];

const protectionTips = [
  { icon: "🔍", tip: "Search your own name online regularly to see what data is exposed about you" },
  { icon: "📧", tip: "Use a separate email address for newsletters, apps, and signups" },
  { icon: "🗑️", tip: "Delete old accounts on services you no longer use" },
  { icon: "📖", tip: "Read privacy policies — at least check what data they collect and share" },
  { icon: "🔔", tip: "Enable breach alerts via services like HaveIBeenPwned.com" },
  { icon: "🧹", tip: "Regularly review and delete your Google, Facebook, and app data" },
  { icon: "📵", tip: "Revoke unused app permissions on your phone every month" },
  { icon: "🏷️", tip: "Use unique usernames — don't use the same handle across all platforms" },
];

const PersonalData = () => {
  const [activeScenario, setActiveScenario] = useState(0);
  const [checkedTips, setCheckedTips] = useState([]);

  const toggleTip = (i) => {
    setCheckedTips((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-12">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium px-4 py-2 rounded-full mb-5">
            🗄️ Personal Data Protection Module
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Your Personal Data Is More Valuable Than You Think
          </h1>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            Every app, website, and form you fill collects data about you. Learn what it is, where it goes, and how to protect it.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-2">What Is Personal Data?</h2>
          <p className="text-gray-500 text-sm mb-6">
            Any information that can identify you — directly or indirectly — is personal data.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataCategories.map((cat) => (
              <div key={cat.title} className={`border rounded-2xl p-5 ${cat.color}`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{cat.icon}</span>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${cat.badgeColor}`}>
                    Sensitive
                  </span>
                </div>
                <h3 className="text-white font-semibold text-sm mb-3">{cat.title}</h3>
                <ul className="space-y-1 mb-4">
                  {cat.examples.map((ex) => (
                    <li key={ex} className="text-gray-400 text-xs flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-600 flex-shrink-0" />
                      {ex}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-white/5 pt-3">
                  <p className="text-gray-600 text-xs leading-relaxed">{cat.risk}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-2">Where Do You Expose Your Data?</h2>
          <p className="text-gray-500 text-sm mb-6">
            Most data exposure happens unknowingly through everyday actions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {exposurePoints.map((point) => (
              <div key={point.title} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-colors">
                <div className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0">{point.icon}</span>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">{point.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-3">{point.desc}</p>
                    <div className="flex items-start gap-2 bg-cyan-500/5 border border-cyan-500/10 rounded-lg px-3 py-2">
                      <span className="text-cyan-500 text-xs flex-shrink-0 mt-0.5">→</span>
                      <p className="text-cyan-400 text-xs">{point.action}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-2">Real World Comparison</h2>
          <p className="text-gray-500 text-sm mb-6">
            See the difference between an oversharing and privacy-aware social media profile.
          </p>
          <div className="flex gap-2 mb-5">
            {scenarios.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveScenario(i)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  activeScenario === i
                    ? s.type === "bad"
                      ? "bg-rose-500/10 border border-rose-500/30 text-rose-400"
                      : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                    : "bg-gray-800 border border-gray-700 text-gray-400 hover:text-white"
                }`}
              >
                {s.type === "bad" ? "❌" : "✅"} {s.title}
              </button>
            ))}
          </div>

          <div className={`border rounded-2xl overflow-hidden ${
            scenarios[activeScenario].type === "bad"
              ? "border-rose-500/20"
              : "border-emerald-500/20"
          }`}>
            <div className={`px-5 py-3 text-xs font-semibold ${
              scenarios[activeScenario].type === "bad"
                ? "bg-rose-500/10 text-rose-400"
                : "bg-emerald-500/10 text-emerald-400"
            }`}>
              {scenarios[activeScenario].type === "bad" ? "🚫 Oversharing Example" : "✅ Privacy-Aware Example"}
            </div>

            <div className="bg-gray-900 p-6">
              <pre className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-sans mb-6">
                {scenarios[activeScenario].content}
              </pre>

              <div className="border-t border-gray-800 pt-5">
                <p className={`text-xs font-semibold mb-3 ${
                  scenarios[activeScenario].type === "bad" ? "text-rose-400" : "text-emerald-400"
                }`}>
                  {scenarios[activeScenario].type === "bad" ? "🚩 Issues" : "✓ Why This Is Better"}
                </p>
                <ul className="space-y-2">
                  {(scenarios[activeScenario].issues || scenarios[activeScenario].good).map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className={`flex-shrink-0 text-xs mt-0.5 ${
                        scenarios[activeScenario].type === "bad" ? "text-rose-500" : "text-emerald-500"
                      }`}>
                        {scenarios[activeScenario].type === "bad" ? "✕" : "✓"}
                      </span>
                      <span className="text-gray-400 text-xs leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-white font-semibold text-lg">Personal Data Protection Checklist</h2>
              <p className="text-gray-500 text-sm mt-1">Check off what you've already done.</p>
            </div>
            <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
              {checkedTips.length}/{protectionTips.length}
            </span>
          </div>

          <ul className="space-y-3">
            {protectionTips.map((item, i) => {
              const checked = checkedTips.includes(i);
              return (
                <li
                  key={i}
                  onClick={() => toggleTip(i)}
                  className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                    checked
                      ? "bg-emerald-500/5 border-emerald-500/20"
                      : "bg-gray-800/30 border-gray-800 hover:border-gray-700"
                  }`}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border transition-colors mt-0.5 ${
                    checked ? "bg-emerald-500 border-emerald-500" : "border-gray-600"
                  }`}>
                    {checked && <span className="text-gray-950 text-xs font-bold">✓</span>}
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <span className={`text-sm leading-relaxed ${checked ? "text-gray-400 line-through" : "text-gray-300"}`}>
                      {item.tip}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>

          {checkedTips.length === protectionTips.length && (
            <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
              <p className="text-emerald-400 font-semibold text-sm">
                🎉 You've completed all data protection steps. Excellent!
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default PersonalData;