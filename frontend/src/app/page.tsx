"use client";
import AboutSection from "@/components/landing-page/about-section";
import { FeatureSection } from "@/components/landing-page/features-section";
import FooterSection from "@/components/footer";
import { HeroSection } from "@/components/landing-page/hero-section";
import { PricingSection } from "@/components/landing-page/pricing-section";
import { defaultTiers } from "@/lib/features";

export default function Page() {
    return (
        <div>
            <div id="hero">
                <HeroSection />
            </div>
            <div id="features">
                <FeatureSection />
            </div>
            <div id="pricing">
                <PricingSection tiers={defaultTiers} />
            </div>
            <div id="about">
                <AboutSection />
            </div>
            <FooterSection />
        </div>
    );
}
