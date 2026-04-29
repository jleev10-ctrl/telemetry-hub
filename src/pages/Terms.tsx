const Terms = () => (
  <div className="min-h-screen bg-background text-foreground font-mono">
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 space-y-6">
      <header className="border-b border-hud/30 pb-3 flex items-center justify-between">
        <h1 className="text-base sm:text-lg font-black tracking-[0.25em] text-[hsl(var(--hud))] uppercase">
          Terms of Use
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

      <Section title="1. What Synthetic Syndicate Is">
        Synthetic Syndicate is an <strong>entertainment website and affiliate referral service</strong>.
        We publish AI-generated sports content (analyst personas, simulated picks, commentary) and
        link out to third-party licensed sportsbooks and gaming operators. We are <strong>not a
        sportsbook, casino, bookmaker, or wagering platform</strong>. We do not accept bets, hold
        funds, or process gambling transactions of any kind.
      </Section>

      <Section title="2. AI-Generated Content">
        All on-site analysts, hosts, names, voices, video personas, picks, win records, and unit
        counts are <strong>AI-generated and simulated for entertainment</strong>. Nothing on this
        site is professional advice — financial, investment, wagering, or otherwise. Do not rely on
        any content for real-money decisions.
      </Section>

      <Section title="3. Third-Party Operators">
        When you click an outbound link to a sportsbook or casino, you leave Synthetic Syndicate and
        enter a third-party site governed by that operator's own terms, privacy policy, and
        licensing. Synthetic Syndicate is not responsible for the conduct, content, payouts,
        promotions, or account decisions of any third-party operator.
      </Section>

      <Section title="4. Affiliate Disclosure">
        We earn referral commissions when visitors sign up or place activity with our partner
        operators via links on this site. Commissions do not influence rankings or content — picks
        and personas are produced independently by our content engine.
      </Section>

      <Section title="5. Eligibility">
        This site is intended for visitors aged <strong>21 or older</strong>, located in
        jurisdictions where sports wagering is legal. It is your responsibility to comply with the
        laws of your jurisdiction before engaging with any third-party operator linked from this
        site.
      </Section>

      <Section title="6. Responsible Play">
        If you or someone you know has a gambling problem, call <a href="tel:18004262537" className="text-[hsl(var(--hud))] underline">1-800-GAMBLER</a>.
        Help is free, confidential, and available 24/7.
      </Section>

      <Section title="7. No Warranty / Limitation of Liability">
        The site is provided "as is" without warranties of any kind. To the maximum extent permitted
        by law, Synthetic Syndicate, its operators, and contributors are not liable for any direct,
        indirect, incidental, or consequential damages arising from your use of the site or any
        third-party operator linked from it.
      </Section>

      <Section title="8. Changes">
        We may update these Terms at any time. Continued use of the site after changes are posted
        constitutes acceptance.
      </Section>

      <Section title="9. Contact">
        Questions about these Terms? See our <a href="/contact" className="text-[hsl(var(--hud))] underline">Contact</a> page.
      </Section>
    </div>
  </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="space-y-2">
    <h2 className="text-[11px] tracking-[0.25em] uppercase text-[hsl(var(--hud))] font-bold">
      {title}
    </h2>
    <p className="text-[12px] sm:text-[13px] leading-relaxed text-foreground/85 font-sans">
      {children}
    </p>
  </section>
);

export default Terms;
