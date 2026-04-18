import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const LockMeIn = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast({ title: "Valid email required", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    // Frontend-only stub. Backend wiring (Lovable Cloud leads table) coming later.
    setTimeout(() => {
      toast({
        title: "You're locked in",
        description: "Syndicate access link sent to your inbox.",
      });
      setEmail("");
      setSubmitting(false);
    }, 700);
  };

  return (
    <section className="mx-2.5 mb-4 border-[1.5px] border-green py-5 px-3.5 text-center">
      <div className="text-[20px] font-black text-green tracking-[2px] mb-1">Lock Me In</div>
      <div className="text-[12px] text-muted-foreground mb-3.5">
        Email only. One tap. Pure Syndicate access.
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-background border-[0.5px] border-syndicate text-foreground text-[14px] py-3 px-3.5 outline-none mb-2.5 focus:border-green placeholder:text-[#333]"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green text-background border-none text-[13px] font-black tracking-[2px] uppercase py-3.5 cursor-pointer hover:bg-green-dim transition-colors disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Lock Me In"}
        </button>
      </form>
      <div className="text-[10px] text-[#444] mt-2 leading-[1.5]">
        No spam. Syndicate access delivered to your inbox.
      </div>
    </section>
  );
};
