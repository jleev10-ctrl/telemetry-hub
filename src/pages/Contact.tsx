const EMAIL = "theboss@syntheticsportsyndicate.com";

const Contact = () => (
  <div className="min-h-screen bg-background text-foreground font-mono">
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 space-y-6">
      <header className="border-b border-hud/30 pb-3 flex items-center justify-between">
        <h1 className="text-base sm:text-lg font-black tracking-[0.25em] text-[hsl(var(--hud))] uppercase">
          Contact
        </h1>
        <a
          href="/"
          className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground"
        >
          ← Home
        </a>
      </header>

      <Block title="General Inquiries">
        Questions about the site, content, or how things work? Drop us a line.
        <a href={`mailto:${EMAIL}?subject=Synthetic%20Syndicate%20—%20General`} className="block mt-3 text-[hsl(var(--hud))] underline break-all">
          {EMAIL}
        </a>
      </Block>

      <Block title="Partnership / Affiliate Inquiries">
        Sportsbook, casino, or media partner interested in working with Synthetic Syndicate?
        We'd love to hear from you. Please include your operator name, jurisdictions, and proposed
        terms.
        <a href={`mailto:${EMAIL}?subject=Synthetic%20Syndicate%20—%20Partnership%20Inquiry`} className="block mt-3 text-[hsl(var(--hud))] underline break-all">
          {EMAIL}
        </a>
      </Block>

      <Block title="Press & Media">
        For interview requests, media kits, or background on our AI-generated content engine:
        <a href={`mailto:${EMAIL}?subject=Synthetic%20Syndicate%20—%20Press`} className="block mt-3 text-[hsl(var(--hud))] underline break-all">
          {EMAIL}
        </a>
      </Block>

      <Block title="Legal / Privacy">
        For Terms or Privacy questions, or to request removal of any content:
        <a href={`mailto:${EMAIL}?subject=Synthetic%20Syndicate%20—%20Legal`} className="block mt-3 text-[hsl(var(--hud))] underline break-all">
          {EMAIL}
        </a>
      </Block>

      <p className="text-[11px] text-muted-foreground tracking-wider pt-4 border-t border-hud/20">
        Synthetic Syndicate is an entertainment + affiliate referral service. We are not a
        sportsbook, casino, or wagering operator.
      </p>
    </div>
  </div>
);

const Block = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="hud-panel border border-hud/30 rounded-md p-4 space-y-1">
    <h2 className="text-[11px] tracking-[0.25em] uppercase text-[hsl(var(--hud))] font-bold mb-2">
      {title}
    </h2>
    <div className="text-[12px] sm:text-[13px] leading-relaxed text-foreground/85 font-sans">
      {children}
    </div>
  </section>
);

export default Contact;
