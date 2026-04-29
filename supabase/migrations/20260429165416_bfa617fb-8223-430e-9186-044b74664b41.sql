CREATE TABLE public.affiliate_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  placement TEXT NOT NULL,
  book TEXT NOT NULL,
  destination_url TEXT NOT NULL,
  page TEXT,
  referrer TEXT,
  country TEXT,
  region TEXT,
  city TEXT,
  device TEXT,
  browser TEXT,
  os TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.affiliate_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can record a click"
  ON public.affiliate_clicks
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE INDEX idx_affiliate_clicks_created_at ON public.affiliate_clicks (created_at DESC);
CREATE INDEX idx_affiliate_clicks_placement ON public.affiliate_clicks (placement);
CREATE INDEX idx_affiliate_clicks_book ON public.affiliate_clicks (book);