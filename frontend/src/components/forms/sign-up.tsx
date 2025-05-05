import React, { useState } from "react";

const SignUpForm: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => e.preventDefault();

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <div className="mb-1.5 flex items-end justify-between">
                    <label
                        htmlFor="name-input"
                        className="block text-zinc-500 dark:text-zinc-400"
                    >
                        Name
                    </label>
                </div>
                <input
                    id="name-input"
                    type="text"
                    placeholder="John Doe"
                    className="w-full rounded-md border border-zinc-300 dark:border-zinc-700
          bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200
          placeholder-zinc-400 dark:placeholder-zinc-500
          ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
                />
            </div>
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
            </div>{" "}
            <div className="mb-6">
                <div className="mb-1.5 flex items-end justify-between">
                    <label
                        htmlFor="password-input"
                        className="block text-zinc-500 dark:text-zinc-400"
                    >
                        Password
                    </label>
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
            {/* <div className="mb-6">
                <div className="mb-1.5 flex items-end justify-between">
                    <label
                        htmlFor="confirm-password-input"
                        className="block text-zinc-500 dark:text-zinc-400"
                    >
                        Confirm Password
                    </label>
                </div>
                <input
                    id="confirm-password-input"
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full rounded-md border border-zinc-300 dark:border-zinc-700
          bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200
          placeholder-zinc-400 dark:placeholder-zinc-500
          ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
                />
            </div> */}
            <Button type="submit" className="w-full">
                Sign up
            </Button>
        </form>
    );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

// const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => (
//     <button
//         className={`cursor-pointer rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50
//     ring-2 hover:ring-blue-500/50 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950
//     transition-all hover:scale-[0.98] ring-transparent active:scale-[0.98] active:ring-blue-500/70 ${className}`}
//         {...props}
//     >
//         {children}
//     </button>
// );

const Button: React.FC<ButtonProps> = ({
    children,
    className = "",
    ...props
}) => {
    const [loading, setLoading] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 5000);

        // Call the user's onClick handler
        props.onClick?.(e);
    };

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className={`rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50
        ring-2 ring-offset-2 ring-transparent ring-offset-white dark:ring-offset-zinc-950 transition-all duration-200
        ${
            loading
                ? "ring-blue-500/50 cursor-not-allowed opacity-80"
                : "hover:scale-[0.98] hover:ring-blue-500/50 cursor-pointer"
        }
        active:scale-[0.98] active:ring-blue-500/70
        ${className}`}
            {...props}
        >
            {loading ? "Signing up..." : children}
        </button>
    );
};

export default SignUpForm;
