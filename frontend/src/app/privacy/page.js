export default function PrivacyPolicy() {
  const lastUpdated = "June 29, 2026";
  
  return (
    <div className="max-w-4xl mx-auto py-16 lg:py-24 relative">
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Privacy Policy</h1>
        <p className="text-gray-400 text-sm">Last updated: {lastUpdated}</p>
      </div>

      <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl space-y-8 text-gray-300 relative z-10">
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">1. Introduction</h2>
          <p className="leading-relaxed">
            Welcome to the AI Tools Directory. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">2. The Data We Collect</h2>
          <p className="leading-relaxed">
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong className="text-white">Contact Data:</strong> includes email address (e.g., when you fill out the Contact Us form).</li>
            <li><strong className="text-white">Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting, operating system and platform.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">3. How We Use Your Data</h2>
          <p className="leading-relaxed">
            We will only use your personal data when the law allows us to. Most commonly, we use your personal data to respond to inquiries via our contact form or to analyze site performance and customize your experience. We never sell your personal details to third parties.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">4. Google AdSense & Cookies</h2>
          <p className="leading-relaxed">
            We use Google AdSense to serve ads on our site. Google, as a third-party vendor, uses cookies to serve ads based on your visits to this and other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users.
          </p>
          <p className="leading-relaxed">
            You may opt out of personalized advertising by visiting Google&apos;s <a href="https://settings.google.com/ads" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline font-semibold transition-colors">Ads Settings</a> or by disabling cookies in your browser settings.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">5. Security</h2>
          <p className="leading-relaxed">
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way. In addition, we limit access to your personal data to those administrators who have a business need to know.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">6. Contact Information</h2>
          <p className="leading-relaxed">
            If you have any questions or complaints about this privacy policy, please contact us using our Contact Us form.
          </p>
        </section>
      </div>
    </div>
  );
}
