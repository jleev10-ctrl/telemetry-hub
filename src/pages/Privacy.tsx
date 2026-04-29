const Privacy = () => (
  <div className="min-h-screen bg-background text-foreground font-mono">
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 space-y-6">
      <header className="border-b border-hud/30 pb-3 flex items-center justify-between">
        <h1 className="text-base sm:text-lg font-black tracking-[0.25em] text-[hsl(var(--hud))] uppercase">
          Privacy Policy
        </h1>
        <a
          href="/"
          className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground"
        >
          ← Home
        </a>
      </header>

      <p className="text-[11px] text-muted-foreground tracking-wider">
        Last updated: April 29, 2026
      </p>

      <Section title="1. Who We Are">
        Synthetic Syndicate is an entertainment + affiliate referral website. We do not operate a
        sportsbook, casino, or wagering platform. We do not collect betting data, financial data,
        or government-issued identifiers.
      </Section>

      <Section title="2. What We Collect">
        We collect minimal, anonymous traffic data to understand how visitors use the site:
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Page visited (e.g., <em>/drivers/swoosh</em>)</li>
          <li>Referrer (where you came from, e.g., x.com)</li>
          <li>Approximate location: country, region, city (derived from your IP, not stored)</li>
          <li>Device type (mobile / desktop / tablet)</li>
          <li>Browser and OS family</li>
          <li>UTM campaign tags if present in the URL</li>
          <li>Timestamp of the visit</li>
        </ul>
      </Section>

      <Section title="3. What We Do NOT Collect">
        <ul className="list-disc pl-5 space-y-1">
          <li>Your IP address (used only momentarily for geo lookup, never stored)</li>
          <li>Your name, email, phone, or address</li>
          <li>Payment, financial, or banking information</li>
          <li>Bets, wagers, or gambling activity (we don't operate any)</li>
          <li>Cookies that track you across other websites</li>
        </ul>
      </Section>

      <Section title="4. Third-Party Operators">
        When you click an outbound link to a sportsbook or casino partner, you leave our site and
        their privacy policy applies. We may receive aggregated, anonymous referral statistics from
        partners (e.g., "X visitors clicked through this month") but no personal identifiers.
      </Section>

      <Section title="5. Sharing">
        We do not sell or rent visitor data. We do not share visitor data with third parties except
        anonymous aggregate statistics with affiliate partners as described above, or when required
        by law.
      </Section>

      <Section title="6. Data Retention">
        Anonymous page-view records are retained for operational analytics. We may purge older
        records periodically. Because no personal identifiers are stored, there is nothing
        identifiable to you to delete.
      </Section>

      <Section title="7. Your Rights (GDPR / CCPA)">
        Because we do not collect personal information, most data-subject requests do not apply.
        If you have specific concerns, contact us via the <a href="/contact" className="text-[hsl(var(--hud))] underline">Contact</a> page.
      </Section>

      <Section title="8. Children">
        This site is intended for adults aged 21+. We do not knowingly collect data from minors.
      </Section>

      <Section title="9. Changes">
        We may update this Privacy Policy at any time. Continued use of the site after changes are
        posted constitutes acceptance.
      </Section>

      <Section title="10. Contact">
        Privacy questions? See our <a href="/contact" className="text-[hsl(var(--hud))] underline">Contact</a> page.
      </Section>
    </div>
  </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="space-y-2">
    <h2 className="text-[11px] tracking-[0.25em] uppercase text-[hsl(var(--hud))] font-bold">
      {title}
    </h2>
    <div className="text-[12px] sm:text-[13px] leading-relaxed text-foreground/85 font-sans">
      {children}
    </div>
  </section>
);

export default Privacy;
