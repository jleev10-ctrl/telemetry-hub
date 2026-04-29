-- Page views: simple traffic counter, no PII stored
CREATE TABLE public.page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT NOT NULL,
  referrer TEXT,
  country TEXT,
  region TEXT,
  city TEXT,
  device TEXT,
  browser TEXT,
  os TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_page_views_created_at ON public.page_views (created_at DESC);
CREATE INDEX idx_page_views_path ON public.page_views (path);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (the counter pings from any visitor)
CREATE POLICY "Anyone can record a page view"
ON public.page_views
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No SELECT policy = nobody can read via the public API.
-- Only the service role (used by the /stats edge function) can read.
