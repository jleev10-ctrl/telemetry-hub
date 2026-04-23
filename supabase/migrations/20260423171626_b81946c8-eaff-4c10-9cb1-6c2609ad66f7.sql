CREATE TABLE public.votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contest_id TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  choice TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_votes_contest_iphash_created ON public.votes (contest_id, ip_hash, created_at DESC);

ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

-- No client-side access. All reads/writes go through the edge function with the service role.
-- Intentionally NO policies created => RLS denies all anon/authenticated access by default.