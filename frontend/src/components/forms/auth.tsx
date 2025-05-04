"use client";

import * as React from "react";
import { ChevronLeft, Github, Twitter } from "lucide-react";
import { motion } from "motion/react";
import LogoIcon from "../icons/logo";
import SignInForm from "./sign-in";
import SignUpForm from "./sign-up";
import Link from "next/link";
// import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { DotPattern } from "../backgrounds/dot-pattern";
import { cn } from "@/lib/utils";

type AuthProps = {
    login: boolean;
};
const AuthPage: React.FC<AuthProps> = ({ login }) => {
    const router = useRouter();
    return (
        <div className="bg-white dark:bg-zinc-950 py-16 text-zinc-800 dark:text-zinc-200 selection:bg-zinc-300 dark:selection:bg-zinc-600">
            <DotPattern
                width={20}
                height={20}
                cx={1}
                cy={1}
                cr={1}
                className={cn(
                    "[mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)] "
                )}
            />
            <div className="relative z-10 mx-auto w-full max-w-xl p-4">
                <BackButton onClick={() => router.back()} />
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.25, ease: "easeInOut" }}
                    className="mt-10"
                >
                    <Logo />
                    <Header login={login} />
                    <SocialButtons />
                    <Divider />
                    {login ? <SignInForm /> : <SignUpForm />}
                    <TermsAndConditions />
                </motion.div>
            </div>
        </div>
    );
};

const BackButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
    <SocialButton icon={<ChevronLeft size={16} />} onClick={onClick}>
        Go back
    </SocialButton>
);

const Logo: React.FC = () => (
    <div className="mb-6 flex justify-center items-center">
        <LogoIcon />
        <span className="ml-2 text-xl font-bold">Cognivue</span>
    </div>
);

const Header: React.FC<AuthProps> = ({ login }) => (
    <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold">
            {login ? "Sign in to your account" : "Sign up your account"}
        </h1>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            {login ? "Don't have an account? " : "Already have an account? "}
            <Link
                href={login ? "/auth/sign-up" : "/auth/sign-in"}
                className="text-blue-600 dark:text-blue-400 hover:underline"
            >
                {login ? "Create one." : "Login."}
            </Link>
        </p>
    </div>
);

const SocialButtons: React.FC = () => (
    <div className="mb-6 space-y-3">
        <div className="grid grid-cols-2 gap-3">
            <SocialButton icon={<Twitter size={20} />} />
            <SocialButton icon={<Github size={20} />} />
            <SocialButton fullWidth>Sign in with SSO</SocialButton>
        </div>
    </div>
);

const SocialButton: React.FC<{
    icon?: React.ReactNode;
    fullWidth?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
}> = ({ icon, fullWidth, children, onClick }) => (
    <button
        onClick={onClick}
        className={`cursor-pointer relative z-0 flex items-center justify-center gap-2 overflow-hidden rounded-md
    border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800
    px-4 py-2 font-semibold text-zinc-800 dark:text-zinc-200 transition-all duration-500
    before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5]
    before:rounded-[100%] before:bg-zinc-800 dark:before:bg-zinc-200 before:transition-transform before:duration-1000 before:content-[""]
    hover:scale-105 hover:text-zinc-100 dark:hover:text-zinc-900 hover:before:translate-x-[0%] hover:before:translate-y-[0%] active:scale-95
    ${fullWidth ? "col-span-2" : ""}`}
    >
        {icon}
        <span>{children}</span>
    </button>
);

const Divider: React.FC = () => (
    <div className="my-6 flex items-center gap-3">
        <div className="h-[1px] w-full bg-zinc-300 dark:bg-zinc-700" />
        <span className="text-zinc-500 dark:text-zinc-400">OR</span>
        <div className="h-[1px] w-full bg-zinc-300 dark:bg-zinc-700" />
    </div>
);

const TermsAndConditions: React.FC = () => (
    <p className="mt-9 text-xs text-zinc-500 dark:text-zinc-400">
        By signing in, you agree to our{" "}
        <a href="#" className="text-blue-600 dark:text-blue-400">
            Terms & Conditions
        </a>{" "}
        and{" "}
        <a href="#" className="text-blue-600 dark:text-blue-400">
            Privacy Policy.
        </a>
    </p>
);

export default AuthPage;
