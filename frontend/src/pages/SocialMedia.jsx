import { useState } from "react";

const privacySettings = [
  {
    platform: "Instagram",
    icon: "📸",
    color: "border-rose-500/20 bg-rose-500/5",
    settings: [
      "Set account to Private",
      "Disable 'Show activity status'",
      "Turn off 'Allow story sharing'",
      "Remove phone number from profile",
      "Disable location tagging on posts",
      "Review third-party app access",
    ],
  },
  {
    platform: "Facebook",
    icon: "👥",
    color: "border-sky-500/20 bg-sky-500/5",
    settings: [
      "Set profile to Friends only",
      "Limit past post visibility",
      "Turn off facial recognition",
      "Remove unnecessary personal info",
      "Review app permissions regularly",
      "Disable location history",
    ],
  },
  {
    platform: "LinkedIn",
    icon: "💼",
    color: "border-blue-500/20 bg-blue-500/5",
    settings: [
      "Hide your connections list",
      "Turn off activity broadcasts",
      "Limit profile visibility to connections",
      "Disable data sharing with third parties",
      "Remove personal phone/email from profile",
      "Review who can see your email address",
    ],
  },
  {
    platform: "WhatsApp",
    icon: "💬",
    color: "border-emerald-500/20 bg-emerald-500/5",
    settings: [
      "Set profile photo to Contacts only",
      "Set 'Last seen' to Nobody",
      "Enable two-step verification",
      "Disable Read receipts",
      "Turn off automatic media download",
      "Review linked devices regularly",
    ],
  },
];

const risks = [
  {
    icon: "📍",
    title: "Location Oversharing",
    desc: "Posting 'just arrived at [place]' tells strangers your real-time location. Photos contain GPS metadata.",
    fix: "Disable location in camera app. Strip metadata before sharing.",
  },
  {
    icon: "🗓️",
    title: "Routine Exposure",
    desc: "'Monday morning run at Juhu!' repeated weekly tells attackers when you're away from home.",
    fix: "Post updates after you've left the location, not in real-time.",
  },
  {
    icon: "🤝",
    title: "Accepting Unknown Requests",
    desc: "Fake profiles are used for social engineering, phishing, and catfishing. 1 in 5 social media profiles is fake.",
    fix: "Only accept requests from people you actually know.",
  },
  {
    icon: "🎂",
    title: "Birthday & Personal Info",
    desc: "Your birthday + name + city = enough for identity verification on many services.",
    fix: "Remove or hide birthday. Never post your Aadhaar or PAN.",
  },
  {
    icon: "📸",
    title: "Photo Metadata (EXIF)",
    desc: "Photos taken on your phone contain GPS coordinates, device model, and timestamp embedded invisibly.",
    fix: "Use apps like Scrambled Exif to remove metadata before sharing.",
  },
  {
    icon: "🔗",
    title: "Same Username Everywhere",
    desc: "Using the same handle across all platforms makes it easy to cross-reference and profile you.",
    fix: "Use different usernames for different types of platforms.",
  },
];

const SocialMedia = () => {
  const [activePlatform, setActivePlatform] = useState(0);
  const [checked, setChecked] = useState({});

  const toggleCheck = (platform, i) => {
    const key = `${platform}-${i}`;
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getPlatformProgress = (platform) => {
    const settings = privacySettings.find((p) => p.platform === platform)?.settings || [];
    const done = settings.filter((_, i) => checked[`${platform}-${i}`]).length;
    return { done, total: settings.length };
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-12">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium px-4 py-2 rounded-full mb-5">
            📱 Social Media Privacy Module
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Control Your Digital Footprint
          </h1>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            Social media is the #1 source of personal data exposure. Learn what you're sharing and how to lock it down.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-2">Common Social Media Risks</h2>
          <p className="text-gray-500 text-sm mb-6">These mistakes expose your personal data every day.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {risks.map((risk) => (
              <div key={risk.title} className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-2xl p-5 transition-colors">
                <div className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0">{risk.icon}</span>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">{risk.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-3">{risk.desc}</p>
                    <div className="flex items-start gap-2 bg-amber-500/5 border border-amber-500/10 rounded-lg px-3 py-2">
                      <span className="text-amber-500 text-xs flex-shrink-0 mt-0.5">→</span>
                      <p className="text-amber-400 text-xs">{risk.fix}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-white font-semibold text-lg mb-2">Platform Privacy Checklists</h2>
          <p className="text-gray-500 text-sm mb-6">
            Select a platform and check off each privacy setting you've enabled.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {privacySettings.map((p, i) => {
              const { done, total } = getPlatformProgress(p.platform);
              return (
                <button
                  key={p.platform}
                  onClick={() => setActivePlatform(i)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                    activePlatform === i
                      ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                      : "bg-gray-800 border-gray-700 text-gray-400 hover:text-white"
                  }`}
                >
                  <span>{p.icon}</span>
                  {p.platform}
                  {done > 0 && (
                    <span className="text-xs bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full">
                      {done}/{total}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {(() => {
            const platform = privacySettings[activePlatform];
            const { done, total } = getPlatformProgress(platform.platform);
            return (
              <div className={`border rounded-2xl overflow-hidden ${platform.color}`}>
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{platform.icon}</span>
                    <span className="text-white font-semibold">{platform.platform} Privacy</span>
                  </div>
                  <span className="text-xs text-gray-500">{done}/{total} done</span>
                </div>
                <div className="p-6 space-y-3">
                  {platform.settings.map((setting, i) => {
                    const key = `${platform.platform}-${i}`;
                    const isChecked = checked[key];
                    return (
                      <div
                        key={i}
                        onClick={() => toggleCheck(platform.platform, i)}
                        className={`flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition-all ${
                          isChecked
                            ? "bg-emerald-500/5 border-emerald-500/20"
                            : "bg-gray-800/30 border-gray-700/50 hover:border-gray-600"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border transition-colors ${
                          isChecked ? "bg-emerald-500 border-emerald-500" : "border-gray-600"
                        }`}>
                          {isChecked && <span className="text-gray-950 text-xs font-bold">✓</span>}
                        </div>
                        <span className={`text-sm ${isChecked ? "text-gray-500 line-through" : "text-gray-300"}`}>
                          {setting}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {done === total && (
                  <div className="px-6 pb-6">
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
                      <p className="text-emerald-400 font-semibold text-sm">
                        🎉 {platform.platform} privacy fully configured!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>

      </div>
    </div>
  );
};

export default SocialMedia;