import React from "react";

const SignInForm: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => e.preventDefault();

    return (
        <form onSubmit={handleSubmit}>
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
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full rounded-md border border-zinc-300 dark:border-zinc-700
          bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200
          placeholder-zinc-400 dark:placeholder-zinc-500
          ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
                />
            </div>
            <Button type="submit" className="w-full">
                Sign in
            </Button>
        </form>
    );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => (
    <button
        className={`cursor-pointer rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50
    ring-2 ring-blue-500/50 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950
    transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70 ${className}`}
        {...props}
    >
        {children}
    </button>
);

export default SignInForm;
