export default function TermsOfService() {
  const lastUpdated = "June 29, 2026";

  return (
    <div className="max-w-4xl mx-auto py-16 lg:py-24 relative">
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Terms of Service</h1>
        <p className="text-gray-400 text-sm">Last updated: {lastUpdated}</p>
      </div>

      <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl space-y-8 text-gray-300 relative z-10">
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">1. Acceptance of Terms</h2>
          <p className="leading-relaxed">
            By accessing or using the AI Tools Directory, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">2. User License</h2>
          <p className="leading-relaxed">
            Permission is granted to temporarily view and search the contents of the AI Tools Directory for personal, non-commercial transitory usage. Under this license, you may not:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Modify or copy the materials;</li>
            <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>Attempt to decompile or reverse engineer any software contained on the website;</li>
            <li>Remove any copyright or other proprietary notations from the materials; or</li>
            <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">3. Disclaimer</h2>
          <p className="leading-relaxed font-light italic">
            The materials on the AI Tools Directory website are provided on an &quot;as is&quot; basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
          <p className="leading-relaxed">
            Further, we do not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on our website or otherwise relating to such materials or on any sites linked to this site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">4. Limitations</h2>
          <p className="leading-relaxed">
            In no event shall the AI Tools Directory or its partners be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the site, even if an authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">5. Links & External Tools</h2>
          <p className="leading-relaxed">
            We have not reviewed all of the external sites linked to this directory and are not responsible for the contents of any such linked site or tool. The inclusion of any link does not imply endorsement by us. Use of any such linked website is at the user&apos;s own risk.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">6. Modifications</h2>
          <p className="leading-relaxed">
            We may revise these Terms of Service for our website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these Terms of Service.
          </p>
        </section>
      </div>
    </div>
  );
}
