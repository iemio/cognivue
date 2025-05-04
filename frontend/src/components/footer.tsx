import { ModeToggle } from "@/components/ui/mode-toggle";
import { Footer, FooterBottom } from "@/components/ui/footer";
import { siteConfig } from "@/config/site";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FooterLink {
    text: string;
    href: string;
}

interface FooterColumnProps {
    title: string;
    links: FooterLink[];
}

interface FooterProps {
    logo?: ReactNode;
    name?: string;
    columns?: FooterColumnProps[];
    copyright?: string;
    policies?: FooterLink[];
    showModeToggle?: boolean;
    className?: string;
}

export default function FooterSection({
    copyright = "© 2025 iemio. All rights reserved",
    policies = [
        { text: "Privacy Policy", href: siteConfig.url },
        { text: "Terms of Service", href: siteConfig.url },
    ],
    showModeToggle = true,
    className,
}: FooterProps) {
    return (
        <footer className={cn("bg-background w-full px-4", className)}>
            <div className="max-w-container mx-auto">
                <Footer>
                    <FooterBottom>
                        <div></div>
                        <div>{copyright}</div>
                        <div></div>
                        <div className="flex items-center gap-4">
                            {policies.map((policy, index) => (
                                <a key={index} href={policy.href}>
                                    {policy.text}
                                </a>
                            ))}
                            {showModeToggle && <ModeToggle />}
                        </div>
                        <div></div>
                    </FooterBottom>
                </Footer>
            </div>
        </footer>
    );
}
