import React from "react";

// SVG Filters Component
export const WatercolorFilters: React.FC = () => (
    <svg className="absolute w-0 h-0">
        <defs>
            {/* Main watercolor filter - heavily inspired by https://codepen.io/sevenissimo/details/Kojaqj */}
            <filter id="watercolor">
                <feTurbulence
                    result="noise-lg"
                    type="fractalNoise"
                    baseFrequency=".0125"
                    numOctaves="2"
                    seed="1222"
                />
                <feTurbulence
                    result="noise-md"
                    type="fractalNoise"
                    baseFrequency=".12"
                    numOctaves="3"
                    seed="11413"
                />
                {/* BaseGraphic w/ chroma variation */}
                <feComposite
                    result="BaseGraphic"
                    in="SourceGraphic"
                    in2="noise-lg"
                    operator="arithmetic"
                    k1="0.3"
                    k2="0.45"
                    k4="-.07"
                />
                {/* 1st layer of paint w/more water */}
                <feMorphology
                    id="water"
                    result="layer-1"
                    in="BaseGraphic"
                    operator="dilate"
                    radius="0.5"
                />
                <feDisplacementMap
                    result="layer-1"
                    in="layer-1"
                    in2="noise-lg"
                    xChannelSelector="R"
                    yChannelSelector="B"
                    scale="2"
                />
                <feDisplacementMap
                    result="layer-1"
                    in="layer-1"
                    in2="noise-md"
                    xChannelSelector="R"
                    yChannelSelector="B"
                    scale="3"
                />
                <feDisplacementMap
                    result="mask"
                    in="layer-1"
                    in2="noise-lg"
                    xChannelSelector="A"
                    yChannelSelector="A"
                    scale="4"
                />
                <feGaussianBlur result="mask" in="mask" stdDeviation="6" />
                <feComposite
                    result="layer-1"
                    in="layer-1"
                    in2="mask"
                    operator="arithmetic"
                    k1="1"
                    k2=".25"
                    k3="-.25"
                    k4="0"
                />
                {/* 2nd layer of paint w/more pigment */}
                <feDisplacementMap
                    result="layer-2"
                    in="BaseGraphic"
                    in2="noise-lg"
                    xChannelSelector="G"
                    yChannelSelector="R"
                    scale="2"
                />
                <feDisplacementMap
                    result="layer-2"
                    in="layer-2"
                    in2="noise-md"
                    xChannelSelector="A"
                    yChannelSelector="G"
                    scale="3"
                />
                <feDisplacementMap
                    result="glow"
                    in="BaseGraphic"
                    in2="noise-lg"
                    xChannelSelector="R"
                    yChannelSelector="A"
                    scale="5"
                />
                <feMorphology
                    result="glow-diff"
                    in="glow"
                    operator="erode"
                    radius="2"
                />
                <feComposite
                    result="glow"
                    in="glow"
                    in2="glow-diff"
                    operator="out"
                />
                <feGaussianBlur result="glow" in="glow" stdDeviation=".5" />
                <feComposite
                    id="color"
                    result="layer-2"
                    in="layer-2"
                    in2="glow"
                    operator="arithmetic"
                    k1="1.2"
                    k2="0.55"
                    k3=".3"
                    k4="-0.2"
                />
                {/* merge 'em all */}
                <feComposite
                    result="watercolor"
                    in="layer-1"
                    in2="layer-2"
                    operator="over"
                />
            </filter>

            {/* Simpler watercolor filter for navigation and dividers */}
            <filter id="watercolor2">
                <feTurbulence
                    result="noise-lg"
                    type="fractalNoise"
                    baseFrequency=".0125"
                    numOctaves="2"
                    seed="1222"
                />
                <feTurbulence
                    result="noise-md"
                    type="fractalNoise"
                    baseFrequency=".12"
                    numOctaves="3"
                    seed="11413"
                />
                {/* BaseGraphic w/ chroma variation */}
                <feComposite
                    result="BaseGraphic"
                    in="SourceGraphic"
                    in2="noise-lg"
                    operator="arithmetic"
                    k1="0.3"
                    k2="0.35"
                    k4="-.05"
                />
                <feDisplacementMap
                    result="layer-2"
                    in="BaseGraphic"
                    in2="noise-lg"
                    xChannelSelector="G"
                    yChannelSelector="R"
                    scale="2"
                />
                <feDisplacementMap
                    result="layer-2"
                    in="layer-2"
                    in2="noise-md"
                    xChannelSelector="A"
                    yChannelSelector="G"
                    scale="3"
                />
                <feDisplacementMap
                    result="glow"
                    in="BaseGraphic"
                    in2="noise-lg"
                    xChannelSelector="R"
                    yChannelSelector="A"
                    scale="4"
                />
                <feMorphology
                    result="glow-diff"
                    in="glow"
                    operator="erode"
                    radius="2"
                />
                <feComposite
                    result="glow"
                    in="glow"
                    in2="glow-diff"
                    operator="out"
                />
                <feGaussianBlur result="glow" in="glow" stdDeviation="4" />
                <feComposite
                    id="color"
                    result="layer-2"
                    in="layer-2"
                    in2="glow"
                    operator="arithmetic"
                    k1="0.65"
                    k2="1.0"
                    k3="0.4"
                    k4="-0.15"
                />
            </filter>
        </defs>
    </svg>
);

// Button Component
interface ButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    onClick?: () => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    onClick,
    className = "",
}) => {
    const baseClasses = `
    relative text-xl text-white border-none outline-none
    px-8 py-3 cursor-pointer transition-all duration-250 ease-out
    opacity-100 active:translate-y-1
  `;

    const variantClasses = {
        primary: "rounded-2xl",
        secondary: "rounded-full text-amber-900",
    };

    const variantStyles = {
        primary: {
            "--hue": "0deg",
            "--sat": "100%",
            "--bri": "0.4",
            "--con": "0.75",
            "--shadow": "4px",
            color: "white",
            textShadow: "0 1px 5px rgba(0,0,0,0.33)",
            mixBlendMode: "multiply" as const,
        },
        secondary: {
            "--hue": "0deg",
            "--sat": "170%",
            "--bri": "1.6",
            "--con": "2",
            "--shadow": "4px",
            color: "#392b17",
            textShadow: "0 1px 5px rgba(0,0,0,0.33)",
            mixBlendMode: "multiply" as const,
        },
    };

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            style={variantStyles[variant]}
        >
            <div
                className={`absolute inset-0 ${variantClasses[variant]} bg-black opacity-90 transition-all duration-250 ease-out hover:opacity-100 hover:shadow-md active:opacity-100 -z-10`}
                style={{
                    filter: `url(#watercolor) drop-shadow(0 0em 0em rgba(255,255,255,1)) sepia(1) brightness(var(--bri,1)) contrast(var(--con,0.75)) saturate(var(--sat)) hue-rotate(var(--hue)) drop-shadow(0 var(--shadow) 0.25px rgba(0,0,0,0.25))`,
                    transform: "translate(-1px, -1px)",
                    boxShadow: "0 0 0px 0px black",
                }}
            />
            <span className="relative z-10">{children}</span>
        </button>
    );
};

// Card Component
interface CardProps {
    title: string | number;
    subtitle: string;
    colorVariant?:
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 8
        | 9
        | 10
        | 11
        | 12
        | 13
        | 14
        | 15
        | 16
        | 17
        | 18
        | 19
        | 20;
    className?: string;
}

const Card: React.FC<CardProps> = ({
    title,
    subtitle,
    colorVariant = 1,
    className = "",
}) => {
    // const colorStyles = {
    //     1: {
    //         "--hue": "240deg",
    //         "--sat": "130%",
    //         "--con": "1.7",
    //         "--bri": "1.4",
    //     },
    //     2: {
    //         "--hue": "190deg",
    //         "--sat": "400%",
    //         "--con": "1.9",
    //         "--bri": "1.4",
    //     },
    //     3: { "--hue": "150deg", "--sat": "180%", "--con": "2", "--bri": "1.4" },
    //     4: {
    //         "--hue": "90deg",
    //         "--sat": "110%",
    //         "--con": "1.9",
    //         "--bri": "1.4",
    //     },
    // };
    const colorStyles = {
        1: {
            "--hue": "240deg", // Blue
            "--sat": "130%",
            "--con": "1.7",
            "--bri": "1.4",
        },
        2: {
            "--hue": "190deg", // Cyan
            "--sat": "400%",
            "--con": "1.9",
            "--bri": "1.4",
        },
        3: {
            "--hue": "150deg", // Green
            "--sat": "180%",
            "--con": "2",
            "--bri": "1.4",
        },
        4: {
            "--hue": "90deg", // Lime
            "--sat": "110%",
            "--con": "1.9",
            "--bri": "1.4",
        },
        5: {
            "--hue": "60deg", // Yellow
            "--sat": "200%",
            "--con": "1.8",
            "--bri": "1.3",
        },
        6: {
            "--hue": "30deg", // Orange
            "--sat": "250%",
            "--con": "1.7",
            "--bri": "1.4",
        },
        7: {
            "--hue": "0deg", // Red
            "--sat": "180%",
            "--con": "1.9",
            "--bri": "1.4",
        },
        8: {
            "--hue": "330deg", // Pink/Magenta
            "--sat": "200%",
            "--con": "1.8",
            "--bri": "1.4",
        },
        9: {
            "--hue": "300deg", // Purple
            "--sat": "160%",
            "--con": "1.7",
            "--bri": "1.4",
        },
        10: {
            "--hue": "270deg", // Violet
            "--sat": "140%",
            "--con": "1.8",
            "--bri": "1.4",
        },
        11: {
            "--hue": "210deg", // Sky Blue
            "--sat": "300%",
            "--con": "1.6",
            "--bri": "1.5",
        },
        12: {
            "--hue": "120deg", // Emerald
            "--sat": "220%",
            "--con": "2.1",
            "--bri": "1.3",
        },
        13: {
            "--hue": "15deg", // Coral
            "--sat": "180%",
            "--con": "1.8",
            "--bri": "1.4",
        },
        14: {
            "--hue": "45deg", // Gold
            "--sat": "150%",
            "--con": "1.7",
            "--bri": "1.5",
        },
        15: {
            "--hue": "315deg", // Rose
            "--sat": "170%",
            "--con": "1.9",
            "--bri": "1.4",
        },
        16: {
            "--hue": "165deg", // Teal
            "--sat": "250%",
            "--con": "1.8",
            "--bri": "1.4",
        },
        17: {
            "--hue": "75deg", // Chartreuse
            "--sat": "190%",
            "--con": "1.7",
            "--bri": "1.4",
        },
        18: {
            "--hue": "285deg", // Indigo
            "--sat": "130%",
            "--con": "1.9",
            "--bri": "1.3",
        },
        19: {
            "--hue": "345deg", // Crimson
            "--sat": "200%",
            "--con": "1.8",
            "--bri": "1.4",
        },
        20: {
            "--hue": "105deg", // Forest Green
            "--sat": "140%",
            "--con": "2.0",
            "--bri": "1.3",
        },
    };
    return (
        <div
            className={`
        relative flex flex-col justify-center items-center
        p-2 px-8 rounded-3xl text-amber-900 text-xl
        ${className}
      `}
            style={{
                ...colorStyles[colorVariant],
                color: "#392b17cc",
                fontSize: "1.33rem",
                mixBlendMode: "multiply",
            }}
        >
            <div
                className="absolute inset-0 rounded-3xl bg-black opacity-90 transition-all duration-250 ease-out -z-10"
                style={{
                    filter: `url(#watercolor) drop-shadow(0 0em 0em rgba(255,255,255,1)) sepia(1) brightness(var(--bri,1.8)) contrast(var(--con,1)) saturate(var(--sat)) hue-rotate(var(--hue))`,
                    transform: "translate(-1px, -1px)",
                    boxShadow: "0 0 0px 0px black",
                }}
            />
            <h2
                className="text-5xl font-bold uppercase m-0"
                style={{
                    fontFamily: "ui-serif, Georgia, serif",
                    textTransform: "uppercase",
                }}
            >
                {title}
            </h2>
            <p className="m-0">{subtitle}</p>
        </div>
    );
};

// Navigation Blot Component
interface BlotProps {
    children: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
    className?: string;
}

const Blot: React.FC<BlotProps> = ({
    children,
    active = false,
    onClick,
    className = "",
}) => {
    const blotStyle = {
        "--hue": active ? "0deg" : "290deg",
        "--sat": "100%",
        "--con": "1",
        "--bri": "1.5",
    };

    return (
        <div
            onClick={onClick}
            className={`
        relative px-3 py-2 text-left text-xl font-bold cursor-pointer
        transition-all duration-250 ease-out overflow-visible
        ${className}
      `}
            style={{
                ...blotStyle,
                maskImage:
                    "linear-gradient(to right, black calc(100% - 5rem), transparent calc(100% - 0.5rem))",
            }}
        >
            <div
                className={`absolute inset-0 rounded-md bg-black transition-all duration-250 ease-out -z-10 ${
                    active ? "opacity-80" : "opacity-0 hover:opacity-80"
                }`}
                style={{
                    filter: `url(#watercolor2) drop-shadow(0 0em 0em rgba(200,200,200,1)) sepia(1) brightness(var(--bri,1.8)) contrast(var(--con,1)) saturate(var(--sat)) hue-rotate(var(--hue))`,
                    transform: "translate(-1px, -1px)",
                    boxShadow: "0 0 0px 0px black",
                }}
            />
            <span className="relative z-10">{children}</span>
        </div>
    );
};

// Watercolor HR Component
const WatercolorHR: React.FC = () => (
    <div
        className="block h-1 bg-black w-full rounded-full opacity-75"
        style={{
            filter: `url(#watercolor2) drop-shadow(0 0em 0em rgba(200,200,200,1)) sepia(1) brightness(1.25) contrast(1.25) saturate(1.5)`,
            transform: "translate(-1px, -1px)",
        }}
    />
);

// Demo Component
const WatercolorDemo: React.FC = () => {
    const cardData = [
        { title: 71, subtitle: "Tickets Sold", colorVariant: 11 as const },
        { title: "$69", subtitle: "Profit", colorVariant: 7 as const },
        { title: 51, subtitle: "Orders", colorVariant: 13 as const },
        { title: 262, subtitle: "Page Visits", colorVariant: 14 as const },
    ];

    return (
        <div
            className="min-h-screen p-8 sketchnote"
            style={{
                background: `linear-gradient(#fff0cb,#fff0cb), url(https://www.toptal.com/designers/subtlepatterns/uploads/seamless_paper_texture.png)`,
                backgroundBlendMode: "multiply",
                letterSpacing: "0.05em",
                color: "#392b17dd",
            }}
        >
            <WatercolorFilters />

            <div className="max-w-4xl mx-auto text-center space-y-6">
                <div>
                    <h1
                        className="text-4xl font-bold mb-4"
                        style={{
                            fontFamily: "ui-serif, Georgia, serif",
                            fontWeight: 700,
                            margin: 0,
                            color: "inherit",
                        }}
                    >
                        <span
                            className="opacity-60 relative"
                            style={{ textDecoration: "none" }}
                        >
                            <span
                                className="absolute left-0 right-0 top-1/2 h-1 bg-current rounded-full"
                                style={{
                                    filter: `url(#watercolor2) drop-shadow(0 0em 0em rgba(200,200,200,1)) sepia(1) brightness(0.1) contrast(1.5) saturate(2)`,
                                    transform:
                                        "translate(-1px, -1px) rotate(3deg)",
                                }}
                            />
                            Ghibli
                        </span>{" "}
                        Watercolor UI Elements
                    </h1>
                    <p className="mb-6">
                        Because everyone on Twitter is going crazy for Ghibli
                        plagiarism right now!
                    </p>
                </div>

                <WatercolorHR />

                {/* Cards Grid */}
                <div className="flex justify-center items-center gap-4 flex-wrap">
                    {cardData.map((card, index) => (
                        <Card
                            key={index}
                            title={card.title}
                            subtitle={card.subtitle}
                            colorVariant={card.colorVariant}
                        />
                    ))}
                </div>

                {/* Buttons */}
                <div className="flex justify-center items-center gap-4 flex-wrap">
                    <Button variant="secondary">View Attendees</Button>
                    <Button variant="primary">Add Reminder</Button>
                </div>

                <WatercolorHR />

                <p>
                    These are all using custom SVG Filters to look like
                    watercolor drawings
                </p>

                {/* Navigation */}
                <nav className="flex flex-col space-y-0 max-w-xs mx-auto my-8">
                    <Blot active>Overview</Blot>
                    <Blot>Tickets</Blot>
                    <Blot>Registration</Blot>
                </nav>

                <p className="text-sm">
                    Watercolor SVG filter modified from{" "}
                    <a
                        href="https://codepen.io/sevenissimo/details/Kojaqj"
                        className="underline"
                    >
                        Matteo Drera
                    </a>
                </p>
            </div>
        </div>
    );
};

export default WatercolorDemo;
