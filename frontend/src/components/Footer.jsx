import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-cyan-400 text-xl">🛡️</span>
              <span className="text-white font-bold">CyberSafe<span className="text-cyan-400">India</span></span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              A free educational platform to help you understand password hygiene and personal data protection.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Learn</h4>
            <ul className="space-y-2">
              {[
                { label: "Password Hygiene", to: "/password-hygiene" },
                { label: "Phishing Awareness", to: "/phishing" },
                { label: "Personal Data", to: "/personal-data" },
                { label: "Take the Quiz", to: "/quiz" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-500 hover:text-cyan-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Account</h4>
            <ul className="space-y-2">
              {[
                { label: "Register", to: "/register" },
                { label: "Login", to: "/login" },
                { label: "Dashboard", to: "/dashboard" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-500 hover:text-cyan-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-600 text-xs">
          © {new Date().getFullYear()} CyberSafeIndia. Educational purposes only.
        </div>
      </div>
    </footer>
  );
};

export default Footer;