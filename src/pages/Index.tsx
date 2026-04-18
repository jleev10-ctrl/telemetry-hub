import { useState } from "react";
import { HeaderBar } from "@/components/HeaderBar";
import { PartnersBar } from "@/components/PartnersBar";
import { LiveFeed } from "@/components/LiveFeed";
import { NavTabs } from "@/components/NavTabs";
import { BackendBar } from "@/components/BackendBar";
import { FeaturedDriver } from "@/components/FeaturedDriver";
import { InfluencerGrid } from "@/components/InfluencerGrid";
import { Grand13Telemetry } from "@/components/Grand13Telemetry";
import { LockMeIn } from "@/components/LockMeIn";
import { SiteFooter } from "@/components/SiteFooter";
import { JoinModal } from "@/components/JoinModal";

const Index = () => {
  const [joinOpen, setJoinOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <HeaderBar onJoin={() => setJoinOpen(true)} />
      <PartnersBar />
      <LiveFeed />
      <NavTabs />
      <BackendBar />
      <FeaturedDriver />
      <InfluencerGrid />
      <Grand13Telemetry />
      <LockMeIn />
      <SiteFooter />
      <JoinModal open={joinOpen} onOpenChange={setJoinOpen} />
    </div>
  );
};

export default Index;
