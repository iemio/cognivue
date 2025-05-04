"use client";
import AboutSection from "@/components/about-section";
import { FeaturesSection } from "@/components/features-section";
import FooterSection from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { PricingSection } from "@/components/pricing-section";
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
            <div id="about">
                <AboutSection />
            </div>
            <FooterSection />
        </div>
    );
}
