import { useState } from "react";

const phishingEmails = [
  {
    id: 1,
    from: "security@paypa1-verify.com",
    subject: "⚠️ Your account has been suspended! Act now",
    time: "2 min ago",
    body: `Dear Valued Customer,

We have detected suspicious activity on your PayPal account. Your account has been temporarily suspended.

You must verify your identity within 24 HOURS or your account will be permanently deleted.

Click the link below immediately:

👉 http://paypa1-secure-verify.xyz/login

Enter your email, password, and card details to restore access.

PayPal Security Team`,
    redFlags: [
      { text: "Sender domain is 'paypa1-verify.com' — note the '1' instead of 'l'", severity: "high" },
      { text: "Creates extreme urgency — '24 HOURS or permanently deleted'", severity: "high" },
      { text: "Link goes to 'paypa1-secure-verify.xyz' — not paypal.com", severity: "high" },
      { text: "Asks for card details via email — legitimate companies never do this", severity: "high" },
      { text: "Generic greeting 'Dear Valued Customer' — not your real name", severity: "medium" },
    ],
  },
  {
    id: 2,
    from: "noreply@sbi-netbanking-alert.in",
    subject: "Your SBI account will be blocked in 12 hours",
    time: "1 hour ago",
    body: `Dear SBI Account Holder,

Your KYC verification is incomplete. As per RBI guidelines, your account will be BLOCKED within 12 hours.

To avoid blocking, update your KYC immediately:

Step 1: Click http://sbi-kyc-update.net/verify
Step 2: Enter your Account Number, ATM PIN, and OTP

This is mandatory. Ignore at your own risk.

State Bank of India
Customer Care`,
    redFlags: [
      { text: "Domain 'sbi-netbanking-alert.in' is not sbi.co.in", severity: "high" },
      { text: "Asks for ATM PIN — banks NEVER ask for your PIN", severity: "high" },
      { text: "Link goes to 'sbi-kyc-update.net' — fake domain", severity: "high" },
      { text: "Threatening tone — 'Ignore at your own risk'", severity: "high" },
      { text: "Asks for OTP via a link — legitimate banks use official apps", severity: "high" },
    ],
  },
  {
    id: 3,
    from: "prizes@amazon-lucky-winner.co",
    subject: "🎉 Congratulations! You won an iPhone 15 Pro",
    time: "3 hours ago",
    body: `Hello Lucky Winner!

You have been selected as our GRAND PRIZE WINNER in Amazon's 25th Anniversary Giveaway!

🏆 Prize: iPhone 15 Pro (₹1,34,900 value)

To claim your prize within 48 hours:
1. Visit: http://amazon-prize-claim.xyz
2. Pay a small ₹299 shipping fee
3. Enter your delivery address and card details

Hurry! 847 other winners are also trying to claim this prize.

Amazon Rewards Team`,
    redFlags: [
      { text: "You never entered any Amazon contest", severity: "high" },
      { text: "Domain is 'amazon-prize-claim.xyz' — not amazon.in", severity: "high" },
      { text: "Asks for payment to claim a 'free' prize — classic advance fee scam", severity: "high" },
      { text: "Fake scarcity — '847 other winners' to pressure you", severity: "medium" },
      { text: "Asks for card details to receive a prize", severity: "high" },
    ],
  },
];

const quizScenarios = [
  {
    id: 1,
    question: "You receive an SMS: 'Your HDFC card is blocked. Click http://hdfc-unblock.net to restore.' What do you do?",
    options: [
      "Click the link immediately to unblock",
      "Call the number in the SMS",
      "Ignore and call official HDFC number from card back",
      "Reply STOP to unsubscribe",
    ],
    correct: 2,
    explanation: "Always contact your bank through the official number printed on your card or their official website. Never click links in SMS messages about accounts.",
  },
  {
    id: 2,
    question: "An email from 'support@g00gle.com' says your Gmail is compromised. It asks for your password. What is wrong?",
    options: [
      "Nothing, it looks official",
      "The domain uses zeros instead of 'o' — it's fake",
      "Google never sends emails",
      "The email is too long",
    ],
    correct: 1,
    explanation: "Phishers replace letters with similar-looking characters. 'g00gle.com' uses two zeros instead of 'oo'. Always check the sender domain carefully.",
  },
  {
    id: 3,
    question: "Which of these is a genuine sign of a phishing attempt?",
    options: [
      "Email uses your full name",
      "Email comes from a verified domain",
      "Email creates extreme urgency and asks you to act in hours",
      "Email has no attachments",
    ],
    correct: 2,
    explanation: "Urgency is the #1 tactic in phishing. Attackers want you to panic and act without thinking. Legitimate companies give you time and never threaten immediate deletion.",
  },
  {
    id: 4,
    question: "You get a WhatsApp message: 'I am your cousin. I lost my phone. Send ₹5000 to this new number urgently.' What do you do?",
    options: [
      "Send money immediately since it's urgent",
      "Ask a personal question only your real cousin would know",
      "Call the new number they gave you",
      "Forward to family group",
    ],
    correct: 1,
    explanation: "Social engineering exploits trust and urgency. Always verify identity through a separate channel — call their known number or ask something only they would know.",
  },
];

const severityStyles = {
  high: "bg-rose-500/10 border-rose-500/20 text-rose-300",
  medium: "bg-amber-500/10 border-amber-500/20 text-amber-300",
};

const EmailCard = ({ email, isOpen, onToggle }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
      <div
        onClick={onToggle}
        className="flex items-start gap-4 p-5 cursor-pointer hover:bg-gray-800/50 transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center flex-shrink-0 text-rose-400 font-bold text-sm">
          ?
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="text-gray-400 text-xs truncate">{email.from}</p>
            <span className="text-gray-600 text-xs flex-shrink-0">{email.time}</span>
          </div>
          <p className="text-white text-sm font-medium">{email.subject}</p>
        </div>
        <span className="text-gray-600 text-xs flex-shrink-0 mt-1">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className="border-t border-gray-800">
          <div className="p-5 bg-gray-800/30">
            <pre className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
              {email.body}
            </pre>
          </div>

          <div className="p-5 border-t border-gray-800">
            {!revealed ? (
              <button
                onClick={() => setRevealed(true)}
                className="w-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 font-semibold py-3 rounded-xl text-sm transition-colors"
              >
                🔍 Reveal Red Flags
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-white font-semibold text-sm mb-4">
                  🚩 {email.redFlags.length} Red Flags Found
                </p>
                {email.redFlags.map((flag, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 px-4 py-3 rounded-xl border text-sm ${severityStyles[flag.severity]}`}
                  >
                    <span className="flex-shrink-0 font-bold">
                      {flag.severity === "high" ? "🔴" : "🟡"}
                    </span>
                    <span>{flag.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Phishing = () => {
  const [openEmail, setOpenEmail] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (qId, index) => {
    if (submitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qId]: index }));
  };

  const handleSubmit = () => {
    if (Object.keys(quizAnswers).length < quizScenarios.length) return;
    setSubmitted(true);
  };

  const score = submitted
    ? quizScenarios.filter((q) => quizAnswers[q.id] === q.correct).length
    : 0;

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-12">
      <div className="max-w-4xl mx-auto">

        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium px-4 py-2 rounded-full mb-5">
            🎣 Phishing Awareness Module
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Can You Spot a Phishing Attack?
          </h1>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            Phishing is responsible for 36% of data breaches. These are fictional examples — learn to spot the red flags before attackers fool you.
          </p>
        </div>

        <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 mb-10 flex gap-4">
          <span className="text-2xl flex-shrink-0">⚠️</span>
          <div>
            <p className="text-amber-400 font-semibold text-sm mb-1">Educational Content Only</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              All emails, links, and scenarios below are completely fictional and created for educational purposes. No real credentials are collected. Never click suspicious links in real life.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Spot the Phishing Emails</h2>
            <span className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
              Click an email to inspect it
            </span>
          </div>

          <div className="space-y-4">
            {phishingEmails.map((email) => (
              <EmailCard
                key={email.id}
                email={email}
                isOpen={openEmail === email.id}
                onToggle={() => setOpenEmail(openEmail === email.id ? null : email.id)}
              />
            ))}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="text-xl font-bold mb-2">Common Phishing Tactics</h2>
          <p className="text-gray-500 text-sm mb-6">Know these — they appear in 90% of phishing attempts.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: "⏰", title: "Urgency & Fear", desc: "Creates panic — 'Act in 24 hours or lose access forever'" },
              { icon: "🔗", title: "Fake Domains", desc: "paypa1.com, amaz0n.in, sbi-kyc-update.net — look-alike URLs" },
              { icon: "🎁", title: "Too Good to Be True", desc: "You won a prize you never entered. Always a scam." },
              { icon: "🎭", title: "Impersonation", desc: "Pretending to be banks, government, or family members" },
              { icon: "📎", title: "Malicious Attachments", desc: "PDF or Word files containing hidden malware" },
              { icon: "💬", title: "Social Engineering", desc: "Exploiting trust — 'I'm your cousin, send money urgently'" },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-800">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">{item.title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold mb-2">Phishing Scenario Quiz</h2>
          <p className="text-gray-500 text-sm mb-8">
            {submitted
              ? `You scored ${score}/${quizScenarios.length} — ${score === quizScenarios.length ? "Perfect! 🎉" : "Review the explanations below."}`
              : "Choose the correct response for each scenario."}
          </p>

          <div className="space-y-8">
            {quizScenarios.map((q, qi) => (
              <div key={q.id}>
                <p className="text-white font-medium text-sm mb-4">
                  <span className="text-gray-600 mr-2">Q{qi + 1}.</span>
                  {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, i) => {
                    const selected = quizAnswers[q.id] === i;
                    const isCorrect = i === q.correct;

                    let style = "bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600";
                    if (submitted && isCorrect) style = "bg-emerald-500/10 border-emerald-500/40 text-emerald-300";
                    else if (submitted && selected && !isCorrect) style = "bg-rose-500/10 border-rose-500/40 text-rose-300";
                    else if (!submitted && selected) style = "bg-cyan-500/10 border-cyan-500/40 text-cyan-300";

                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(q.id, i)}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${style}`}
                      >
                        <span className="text-gray-600 mr-2">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="mt-3 p-4 bg-sky-500/5 border border-sky-500/20 rounded-xl">
                    <p className="text-sky-400 text-xs font-semibold mb-1">Explanation</p>
                    <p className="text-gray-400 text-xs leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {!submitted && (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(quizAnswers).length < quizScenarios.length}
              className="mt-8 w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-gray-950 font-bold py-3 rounded-xl text-sm transition-colors"
            >
              {Object.keys(quizAnswers).length < quizScenarios.length
                ? `Answer all questions (${Object.keys(quizAnswers).length}/${quizScenarios.length})`
                : "Submit Answers"}
            </button>
          )}

          {submitted && (
            <div className={`mt-8 p-5 rounded-xl border text-center ${score === quizScenarios.length ? "bg-emerald-500/10 border-emerald-500/20" : "bg-amber-500/10 border-amber-500/20"}`}>
              <p className={`text-2xl font-bold mb-1 ${score === quizScenarios.length ? "text-emerald-400" : "text-amber-400"}`}>
                {score}/{quizScenarios.length}
              </p>
              <p className="text-gray-400 text-sm">
                {score === quizScenarios.length
                  ? "You can identify phishing attacks. Stay vigilant."
                  : "Review the explanations above and practice more."}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Phishing;