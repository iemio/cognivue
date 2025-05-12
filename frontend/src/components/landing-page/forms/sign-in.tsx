"use client";
import { loginAction } from "@/app/auth/actions";
import { useToast } from "@/lib/hooks/use-toast";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

const SignInForm: React.FC = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            console.log(email, password);
            const errorMessage = (await loginAction(email, password))
                .errorMessage;

            if (!errorMessage) {
                router.replace(`/dashboard`);
            } else {
                toast({
                    title: "Error",
                    description: errorMessage,
                    variant: "destructive",
                });
            }
        });
    };
    // const handleSubmit = (e: React.FormEvent) => e.preventDefault();
    return (
        <form action={handleSubmit}>
            <div className="mb-3">
                <label
                    htmlFor="email-input"
                    className="mb-1.5 block text-zinc-500 dark:text-zinc-400"
                >
                    Email
                </label>
                <input
                    id="email-input"
                    type="email"
                    disabled={isPending}
                    name="email"
                    placeholder="your.email@provider.com"
                    className="w-full rounded-md border border-zinc-300 dark:border-zinc-700
          bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200
          placeholder-zinc-400 dark:placeholder-zinc-500
          ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
                />
            </div>
            <div className="mb-6">
                <div className="mb-1.5 flex items-end justify-between">
                    <label
                        htmlFor="password-input"
                        className="block text-zinc-500 dark:text-zinc-400"
                    >
                        Password
                    </label>
                    <a
                        href="#"
                        className="text-sm text-blue-600 dark:text-blue-400"
                    >
                        Forgot?
                    </a>
                </div>
                <input
                    id="password-input"
                    disabled={isPending}
                    type="password"
                    name="password"
                    placeholder="••••••••••••"
                    className="w-full rounded-md border border-zinc-300 dark:border-zinc-700
          bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200
          placeholder-zinc-400 dark:placeholder-zinc-500
          ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
                />
            </div>
            <Button
                disabled={isPending}
                className={`w-full  ${
                    isPending
                        ? "ring-blue-500/50 cursor-not-allowed opacity-80"
                        : "hover:scale-[0.98] hover:ring-blue-500/50 cursor-pointer"
                }`}
            >
                {isPending ? "Signing in ..." : "Sign In"}
            </Button>
        </form>
    );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    className = "",
    ...props
}) => {
    // const [loading, setLoading] = useState(false);

    // const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     setLoading(true);
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 5000);

    //     // Call the user's onClick handler
    //     props.onClick?.(e);
    // };

    return (
        <button
            // onClick={handleClick}
            // disabled={loading}
            className={`rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50
        ring-2 ring-offset-2 ring-transparent ring-offset-white dark:ring-offset-zinc-950 transition-all duration-200
        active:scale-[0.98] active:ring-blue-500/70
        ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default SignInForm;
