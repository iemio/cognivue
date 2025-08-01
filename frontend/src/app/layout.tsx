import { Inter, Geist_Mono, Patrick_Hand } from "next/font/google";
import { ThemeProvider } from "../providers/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
    title: "Cognivue",
    // icons: [
    //     {
    //         rel: "icon",
    //         url: "/favicon-light.ico",
    //         media: "(prefers-color-scheme: light)",
    //     },
    //     {
    //         rel: "icon",
    //         url: "/favicon-dark.ico",
    //         media: "(prefers-color-scheme: dark)",
    //     },
    // ],
};

const fontSans = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

const fontMono = Geist_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
});

const sketchnoteText = Patrick_Hand({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-sketchnote",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${fontSans.variable} ${fontMono.variable} ${sketchnoteText.variable} font-sans antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
