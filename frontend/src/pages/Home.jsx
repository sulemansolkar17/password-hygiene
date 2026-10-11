import { Link } from "react-router-dom";

const modules = [
  {
    icon: "🔐",
    title: "Password Hygiene",
    desc: "Learn to create and manage strong, unique passwords.",
    to: "/password-hygiene",
    color: "from-cyan-500/10 to-cyan-500/5 border-cyan-500/20 hover:border-cyan-500/50",
    badge: "Essential",
    badgeColor: "bg-cyan-500/10 text-cyan-400",
  },
  {
    icon: "🎣",
    title: "Phishing Awareness",
    desc: "Identify fake emails, links, and social engineering attacks.",
    to: "/phishing",
    color: "from-rose-500/10 to-rose-500/5 border-rose-500/20 hover:border-rose-500/50",
    badge: "Critical",
    badgeColor: "bg-rose-500/10 text-rose-400",
  },
  {
    icon: "🗄️",
    title: "Personal Data Protection",
    desc: "Understand what personal data is and how to protect it.",
    to: "/personal-data",
    color: "from-violet-500/10 to-violet-500/5 border-violet-500/20 hover:border-violet-500/50",
    badge: "Important",
    badgeColor: "bg-violet-500/10 text-violet-400",
  },
  {
    icon: "🌐",
    title: "Safe Browsing",
    desc: "Stay safe while browsing the web and using public networks.",
    to: "/safe-browsing",
    color: "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/50",
    badge: "Useful",
    badgeColor: "bg-emerald-500/10 text-emerald-400",
  },
  {
    icon: "📱",
    title: "Social Media Privacy",
    desc: "Control your digital footprint on social platforms.",
    to: "/social-media",
    color: "from-amber-500/10 to-amber-500/5 border-amber-500/20 hover:border-amber-500/50",
    badge: "Trending",
    badgeColor: "bg-amber-500/10 text-amber-400",
  },
  {
    icon: "📋",
    title: "Security Quiz",
    desc: "Test your cybersecurity knowledge and track your progress.",
    to: "/quiz",
    color: "from-sky-500/10 to-sky-500/5 border-sky-500/20 hover:border-sky-500/50",
    badge: "Interactive",
    badgeColor: "bg-sky-500/10 text-sky-400",
  },
];

const stats = [
  { value: "3.4B", label: "Phishing emails sent daily" },
  { value: "81%", label: "Breaches involve weak passwords" },
  { value: "₹1.7Cr", label: "Avg. cost of a data breach in India" },
  { value: "95%", label: "Breaches caused by human error" },
];

const checklist = [
  "Use a unique password for every account",
  "Enable two-factor authentication",
  "Never click unknown links in emails",
  "Keep your software updated",
  "Use a trusted password manager",
  "Avoid sharing personal info on public Wi-Fi",
];

const Home = () => {
  return (
    <div className="text-white">
      <section className="relative overflow-hidden bg-gray-950 py-24 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-gray-950 to-gray-950" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Free Cybersecurity Awareness Campaign
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
            Protect Yourself{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
              Online
            </span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Learn password hygiene, spot phishing attacks, and protect your
            personal data — all in one place, completely free.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold px-8 py-3.5 rounded-xl transition-colors text-sm"
            >
              Start Learning Free →
            </Link>
            <Link
              to="/quiz"
              className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm border border-gray-700"
            >
              Test Your Knowledge
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-900/50 border-y border-gray-800 py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-500 text-xs sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">Awareness Modules</h2>
            <p className="text-gray-500">
              Start with any module. No technical background required.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((mod) => (
              <Link
                key={mod.to}
                to={mod.to}
                className={`group relative bg-gradient-to-br ${mod.color} border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{mod.icon}</span>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${mod.badgeColor}`}>
                    {mod.badge}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{mod.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{mod.desc}</p>
                <div className="mt-4 text-cyan-400 text-sm font-medium group-hover:gap-2 flex items-center gap-1 transition-all">
                  Explore <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Quick Security Checklist</h2>
            <p className="text-gray-500">
              6 habits that will dramatically improve your online safety.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <ul className="space-y-4">
              {checklist.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-cyan-400 text-xs font-bold">{i + 1}</span>
                  </div>
                  <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-sm">
                Track your full checklist progress after signing up.
              </p>
              <Link
                to="/register"
                className="bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Are you cyber aware?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Take our free quiz and find out your security awareness level.
          </p>
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white font-bold px-10 py-4 rounded-xl transition-all text-sm"
          >
            Take Free Quiz →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;