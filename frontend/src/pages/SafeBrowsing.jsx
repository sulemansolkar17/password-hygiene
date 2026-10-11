const tips = [
  {
    icon: "🔒",
    title: "Always Check for HTTPS",
    desc: "Before entering any sensitive information, verify the URL starts with 'https://' and has a padlock icon. HTTP sites transmit data in plaintext — anyone on the same network can read it.",
    action: "Never enter passwords or card details on HTTP sites.",
  },
  {
    icon: "🔗",
    title: "Verify URLs Before Clicking",
    desc: "Hover over links before clicking to see the actual destination. Phishers use URL shorteners and lookalike domains to trick you.",
    action: "Check: is the domain correct? Is there an extra word or number?",
  },
  {
    icon: "🧩",
    title: "Keep Browser & Extensions Updated",
    desc: "Outdated browsers have known vulnerabilities. Malicious browser extensions can steal your data, intercept passwords, and inject ads.",
    action: "Use minimal extensions. Remove ones you don't actively use.",
  },
  {
    icon: "🍪",
    title: "Manage Cookies & Trackers",
    desc: "Third-party cookies track you across websites and build a detailed profile of your behavior. Most sites work fine without them.",
    action: "Block third-party cookies in browser settings. Clear cookies regularly.",
  },
  {
    icon: "🚫",
    title: "Use an Ad Blocker",
    desc: "Malvertising — malware delivered through ads — is a real threat. Even legitimate sites can serve malicious ads through compromised ad networks.",
    action: "Install uBlock Origin. It blocks ads and malicious scripts.",
  },
  {
    icon: "🔐",
    title: "Use a Password Manager",
    desc: "A password manager auto-fills credentials only on the correct domain. It prevents you from entering passwords on fake lookalike sites.",
    action: "If your manager doesn't auto-fill, double-check the URL.",
  },
  {
    icon: "📶",
    title: "Avoid Public Wi-Fi for Sensitive Tasks",
    desc: "Public Wi-Fi networks are often unencrypted. Attackers on the same network can perform man-in-the-middle attacks to intercept your traffic.",
    action: "Use mobile data or a VPN for banking and email on public networks.",
  },
  {
    icon: "🖥️",
    title: "Enable Safe Browsing",
    desc: "Chrome, Firefox, and Edge have built-in safe browsing that warns you about known phishing and malware sites.",
    action: "Settings → Privacy → Safe Browsing → Enhanced Protection.",
  },
];

const browserSettings = [
  { setting: "Block third-party cookies", where: "Settings → Privacy → Cookies" },
  { setting: "Enable Enhanced Safe Browsing", where: "Settings → Privacy → Security" },
  { setting: "Auto-update browser", where: "Settings → About (triggers update)" },
  { setting: "Review installed extensions", where: "Extensions → Manage Extensions" },
  { setting: "Clear browsing data regularly", where: "Settings → Clear Browsing Data" },
  { setting: "Disable 'Save Password' in browser", where: "Use a dedicated password manager instead" },
];

const SafeBrowsing = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-12">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium px-4 py-2 rounded-full mb-5">
            🌐 Safe Browsing Module
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Stay Safe While Browsing the Web
          </h1>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            Your browser is your gateway to the internet — and one of the most common attack surfaces. Learn how to secure it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {tips.map((tip) => (
            <div key={tip.title} className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-2xl p-6 transition-colors">
              <span className="text-3xl block mb-4">{tip.icon}</span>
              <h3 className="text-white font-semibold text-sm mb-2">{tip.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-4">{tip.desc}</p>
              <div className="flex items-start gap-2 bg-emerald-500/5 border border-emerald-500/10 rounded-xl px-3 py-2">
                <span className="text-emerald-500 text-xs flex-shrink-0 mt-0.5">→</span>
                <p className="text-emerald-400 text-xs">{tip.action}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-white font-semibold text-lg mb-2">Browser Security Checklist</h2>
          <p className="text-gray-500 text-sm mb-6">Settings you should enable right now.</p>
          <div className="space-y-3">
            {browserSettings.map((item, i) => (
              <div key={i} className="flex items-start justify-between gap-4 p-4 bg-gray-800/50 border border-gray-800 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-400 text-xs font-bold">{i + 1}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{item.setting}</p>
                </div>
                <p className="text-gray-600 text-xs text-right max-w-[40%] leading-relaxed">{item.where}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SafeBrowsing;