import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const EFFECTIVE_DATE = 'August 31, 2026';

export const PrivacyPolicyPage: React.FC = () => {
  // Set document title and meta description for SEO
  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc =
      document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';

    document.title = 'Privacy Policy | Dr. Reema Shukla';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Privacy Policy for Dr. Reema Shukla and Savitri Dental Hospital & Maxillofacial Centre.',
      );
    }

    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      document.title = prevTitle;
      if (metaDesc) metaDesc.setAttribute('content', prevDesc);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#04010D] text-white pt-24">
      {/* Background gradient — matches App.tsx exactly */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(139,61,255,0.2),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(245,197,66,0.08),_transparent_22%),linear-gradient(180deg,_#04010D_0%,_#050214_56%,_#08031B_100%)]" />
      <div className="pointer-events-none absolute inset-0 lux-grid opacity-[0.16]" />

      <Navbar />

      <main className="relative z-10" id="privacy-policy-main">
        <article className="mx-auto max-w-3xl px-6 py-16 lg:py-24">

          {/* ── Page header ── */}
          <header className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F5C542] mb-4">
              Legal
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm text-white/50">
              Effective Date:{' '}
              <time dateTime="2026-08-31" className="text-white/70">
                {EFFECTIVE_DATE}
              </time>
            </p>
            {/* Decorative divider */}
            <div className="mt-8 h-px w-full bg-gradient-to-r from-[#F5C542]/40 via-[#8B3DFF]/30 to-transparent" />
          </header>

          {/* ── Introduction ── */}
          <section className="mb-10 text-white/75 leading-relaxed text-[15px]">
            <p>
              This Privacy Policy explains how Dr. Reema Shukla and Savitri Dental Hospital &amp;
              Maxillofacial Centre (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;)
              collects, uses, and protects your personal information when you use our website or
              contact us for healthcare services.
            </p>
            <p className="mt-4">
              By using our website or submitting any form, you agree to the practices described in
              this policy. If you do not agree, please do not use our website.
            </p>
          </section>

          {/* ── Sections ── */}
          <div className="space-y-12">

            {/* 1 */}
            <PolicySection number={1} title="Information We Collect">
              <p>We may collect the following types of personal information:</p>
              <ul>
                <li>
                  <strong className="text-white/90">Contact Information</strong> — name, phone
                  number, email address, and message content submitted through our appointment or
                  contact forms.
                </li>
                <li>
                  <strong className="text-white/90">Health-Related Information</strong> — details
                  you voluntarily share when booking an appointment or describing your dental or
                  aesthetic concern.
                </li>
                <li>
                  <strong className="text-white/90">Technical Data</strong> — browser type, device
                  type, IP address, pages visited, and time spent on the website (collected
                  automatically through standard web analytics tools).
                </li>
                <li>
                  <strong className="text-white/90">Communication Data</strong> — any messages,
                  queries, or feedback you send us via WhatsApp, email, or the website form.
                </li>
              </ul>
            </PolicySection>

            {/* 2 */}
            <PolicySection number={2} title="How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to appointment requests and patient enquiries.</li>
                <li>Provide, manage, and improve our healthcare services.</li>
                <li>Send appointment confirmations or reminders (if applicable).</li>
                <li>Improve our website experience and understand user behaviour.</li>
                <li>Comply with applicable legal and regulatory obligations.</li>
                <li>
                  Prevent fraud, misuse, or any activity that may harm our patients or clinic.
                </li>
              </ul>
              <p className="mt-3">
                We do <strong className="text-white/90">not</strong> use your personal information
                for unsolicited marketing without your explicit consent.
              </p>
            </PolicySection>

            {/* 3 */}
            <PolicySection number={3} title="Sharing Your Information">
              <p>
                We treat your personal information with the highest degree of confidentiality.
                We do <strong className="text-white/90">not</strong> sell, rent, or trade your
                personal data to third parties.
              </p>
              <p className="mt-3">We may share your information only in the following cases:</p>
              <ul>
                <li>
                  <strong className="text-white/90">Service Providers</strong> — trusted
                  third-party tools or platforms that help us operate our website or manage
                  appointments (e.g., WhatsApp Business, Google Forms), strictly for the purpose
                  of providing those services.
                </li>
                <li>
                  <strong className="text-white/90">Legal Obligations</strong> — when required by
                  law, court order, or regulatory authority.
                </li>
                <li>
                  <strong className="text-white/90">Medical Referrals</strong> — with your
                  explicit consent, if we refer you to a specialist or associated healthcare
                  provider.
                </li>
              </ul>
            </PolicySection>

            {/* 4 */}
            <PolicySection number={4} title="Cookies and Tracking Technologies">
              <p>Our website may use the following:</p>
              <ul>
                <li>
                  <strong className="text-white/90">Essential Cookies</strong> — required for basic
                  website functionality.
                </li>
                <li>
                  <strong className="text-white/90">Analytics</strong> — tools such as Google
                  Analytics may collect anonymised usage data to help us understand how visitors
                  interact with our website.
                </li>
                <li>
                  <strong className="text-white/90">Third-Party Embeds</strong> — embedded content
                  such as Google Maps or YouTube videos may use their own cookies.
                </li>
              </ul>
              <p className="mt-3">
                You can disable cookies through your browser settings. Disabling cookies may affect
                certain features of the website.
              </p>
            </PolicySection>

            {/* 5 */}
            <PolicySection number={5} title="Data Retention">
              <p>
                We retain your personal information only for as long as necessary to fulfil the
                purpose for which it was collected, or as required by applicable law.
              </p>
              <p className="mt-3">
                Patient-related data shared for healthcare purposes may be retained for the period
                required under Indian medical record-keeping regulations.
              </p>
            </PolicySection>

            {/* 6 */}
            <PolicySection number={6} title="Data Security">
              <p>
                We take reasonable technical and organisational measures to protect your personal
                information from unauthorised access, disclosure, alteration, or destruction.
              </p>
              <p className="mt-3">
                However, no method of transmission over the internet or electronic storage is 100%
                secure. While we strive to protect your information, we cannot guarantee absolute
                security.
              </p>
            </PolicySection>

            {/* 7 */}
            <PolicySection number={7} title="Your Rights">
              <p>You have the right to:</p>
              <ul>
                <li>
                  <strong className="text-white/90">Access</strong> — request a copy of the
                  personal information we hold about you.
                </li>
                <li>
                  <strong className="text-white/90">Correction</strong> — ask us to correct
                  inaccurate or incomplete information.
                </li>
                <li>
                  <strong className="text-white/90">Deletion</strong> — request deletion of your
                  personal data, subject to legal retention requirements.
                </li>
                <li>
                  <strong className="text-white/90">Withdrawal of Consent</strong> — withdraw
                  consent for optional uses of your data at any time.
                </li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please contact us using the details in Section 10.
              </p>
            </PolicySection>

            {/* 8 */}
            <PolicySection number={8} title="Children's Privacy">
              <p>
                Our website is not directed at children under the age of 13. We do not knowingly
                collect personal information from minors. If you believe we have inadvertently
                collected such information, please contact us and we will promptly delete it.
              </p>
              <p className="mt-3">
                Appointment bookings for minor patients should be made by a parent or legal
                guardian.
              </p>
            </PolicySection>

            {/* 9 */}
            <PolicySection number={9} title="Links to Third-Party Websites">
              <p>
                Our website may contain links to external sites, including social media platforms
                (Instagram, Facebook, WhatsApp) and Google Maps. We are not responsible for the
                privacy practices or content of those websites.
              </p>
              <p className="mt-3">
                We encourage you to read the privacy policies of any third-party site you visit.
              </p>
            </PolicySection>

            {/* 10 */}
            <PolicySection number={10} title="Contact Us">
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or
                the handling of your personal data, please contact us:
              </p>
              <address className="mt-4 not-italic space-y-2">
                <p className="font-semibold text-white/90">
                  Savitri Dental Hospital &amp; Maxillofacial Centre
                </p>
                <p>
                  Ward No-25, 66A/2C, Stanley Rd, near Mahboob Ali Inter College,
                  <br />
                  Annpurna Vihar, Prayagraj, Uttar Pradesh 211002
                </p>
                <p>
                  <span className="text-white/55">Phone: </span>
                  <a
                    href="tel:9956967000"
                    className="text-[#F5C542] hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C542]/70 rounded"
                  >
                    +91 99569 67000
                  </a>
                </p>
                <p>
                  <span className="text-white/55">Email: </span>
                  <a
                    href="mailto:dentalsavitri@gmail.com"
                    className="text-[#F5C542] hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C542]/70 rounded"
                  >
                    dentalsavitri@gmail.com
                  </a>
                </p>
              </address>
            </PolicySection>

            {/* 11 */}
            <PolicySection number={11} title="Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our
                practices or legal requirements. The updated policy will be posted on this page
                with a revised Effective Date.
              </p>
              <p className="mt-3">
                We encourage you to review this page periodically. Continued use of our website
                after any changes constitutes your acceptance of the updated policy.
              </p>
            </PolicySection>

          </div>

          {/* ── Bottom divider ── */}
          <div className="mt-16 pt-8 border-t border-white/8">
            <p className="text-xs text-white/35 text-center">
              This policy applies to the website of Savitri Dental Hospital &amp; Maxillofacial
              Centre and any services offered through it.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

/* ─── Helper component for numbered policy sections ─────────────────────── */

interface PolicySectionProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

const PolicySection: React.FC<PolicySectionProps> = ({ number, title, children }) => (
  <section aria-labelledby={`policy-section-${number}`}>
    <h2
      id={`policy-section-${number}`}
      className="flex items-center gap-3 text-lg font-semibold text-white mb-4"
    >
      <span
        aria-hidden="true"
        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#F5C542]/15 border border-[#F5C542]/25 text-[#F5C542] text-xs font-bold flex-shrink-0"
      >
        {number}
      </span>
      {title}
    </h2>
    <div className="pl-10 text-white/70 leading-relaxed text-[15px] space-y-2 [&_ul]:space-y-2 [&_ul]:list-none [&_ul]:pl-0 [&_li]:flex [&_li]:gap-2 [&_li]:items-start [&_li]:before:content-['·'] [&_li]:before:text-[#F5C542] [&_li]:before:font-bold [&_li]:before:flex-shrink-0 [&_li]:before:mt-0.5">
      {children}
    </div>
  </section>
);
