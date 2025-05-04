"use client";
import { FeaturesSection } from "@/components/features";
import FooterSection from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { PricingSection } from "@/components/pricing";
import { defaultTiers } from "@/lib/features";

export default function Page() {
    return (
        <div>
            <div id="hero">
                <HeroSection />
            </div>
            <div id="features">
                <FeaturesSection />
            </div>
            <div id="pricing">
                <PricingSection tiers={defaultTiers} />
            </div>
            <FooterSection />
        </div>
    );
}
