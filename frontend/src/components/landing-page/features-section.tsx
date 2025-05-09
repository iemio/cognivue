// import { Check } from "lucide-react";
// import { Badge } from "@/components/ui/badge";

// function FeaturesSection() {
//     return (
//         <div className="w-full">
//             <div className="container mx-auto">
//                 <div className="flex gap-4 py-20 lg:py-40 flex-col items-center">
//                     <div>
//                         <Badge>Features</Badge>
//                     </div>
//                     <div className="flex gap-2 flex-col items-center">
//                         <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
//                             Something new!
//                         </h2>
//                         <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground">
//                             Managing a small workflow today is already tough.
//                         </p>
//                     </div>
//                     <div className="flex gap-10 pt-12 flex-col w-full">
//                         <div className="grid grid-cols-2 lg:grid-cols-3 gap-10">
//                             <div className="flex flex-row gap-6 items-start">
//                                 <Check className="w-4 h-4 mt-2 text-primary" />
//                                 <div className="flex flex-col gap-1">
//                                     <p>Fast and reliable</p>
//                                     <p className="text-muted-foreground text-sm">
//                                         We&apos;ve made it fast and reliable.
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="flex flex-row gap-6 items-start">
//                                 <Check className="w-4 h-4 mt-2 text-primary" />
//                                 <div className="flex flex-col gap-1">
//                                     <p>Fast and reliable</p>
//                                     <p className="text-muted-foreground text-sm">
//                                         We&apos;ve made it fast and reliable.
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="flex flex-row gap-6 items-start">
//                                 <Check className="w-4 h-4 mt-2 text-primary" />
//                                 <div className="flex flex-col gap-1">
//                                     <p>Beautiful and modern</p>
//                                     <p className="text-muted-foreground text-sm">
//                                         We&apos;ve made it beautiful and
//                                         modernxyzabcdefghijklmnopqrstuv.
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="flex flex-row gap-6 items-start">
//                                 <Check className="w-4 h-4 mt-2 text-primary" />
//                                 <div className="flex flex-col gap-1">
//                                     <p>Easy to use</p>
//                                     <p className="text-muted-foreground text-sm">
//                                         We&apos;ve made it easy to use and
//                                         understand.
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="flex flex-row gap-6 items-start">
//                                 <Check className="w-4 h-4 mt-2 text-primary" />
//                                 <div className="flex flex-col gap-1">
//                                     <p>Fast and reliable</p>
//                                     <p className="text-muted-foreground text-sm">
//                                         We&apos;ve made it fast and reliable.
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="flex flex-row gap-6 items-start">
//                                 <Check className="w-4 h-4 mt-2 text-primary" />
//                                 <div className="flex flex-col gap-1">
//                                     <p>Beautiful and modern</p>
//                                     <p className="text-muted-foreground text-sm">
//                                         We&apos;ve made it beautiful and modern.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export { FeaturesSection };
import {
    Cpu,
    Fingerprint,
    Pencil,
    Settings2,
    Sparkles,
    Zap,
} from "lucide-react";
import { Badge } from "../ui/badge";

export function FeatureSection() {
    return (
        <section className="py-12 md:py-20">
            <div className="mx-auto max-w-5xl space-y-4 px-6 md:space-y-8">
                {/* <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-balance text-4xl font-medium lg:text-5xl">
                        The foundation for creative teams management
                    </h2>
                    <p>
                        Lyra is evolving to be more than just the models. It
                        supports an entire to the APIs and platforms helping
                        developers and businesses innovate.
                    </p>
                </div> */}

                <div className="flex items-center justify-center">
                    <Badge>Features</Badge>
                </div>
                <div className="flex gap-2 flex-col items-center">
                    <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
                        Something new!
                    </h2>

                    <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground">
                        Managing a small workflow today is already tough.
                    </p>
                </div>
                <div className="relative mx-auto grid max-w-2xl lg:max-w-4xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Zap className="size-4" />
                            <h3 className="text-sm font-medium">Faaast</h3>
                        </div>
                        <p className="text-sm">
                            It supports an entire helping developers and
                            innovate.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Cpu className="size-4" />
                            <h3 className="text-sm font-medium">Powerful</h3>
                        </div>
                        <p className="text-sm">
                            It supports an entire helping developers and
                            businesses.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Fingerprint className="size-4" />

                            <h3 className="text-sm font-medium">Security</h3>
                        </div>
                        <p className="text-sm">
                            It supports an helping developers businesses.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Pencil className="size-4" />

                            <h3 className="text-sm font-medium">
                                Customization
                            </h3>
                        </div>
                        <p className="text-sm">
                            It supports helping developers and businesses
                            innovate.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Settings2 className="size-4" />

                            <h3 className="text-sm font-medium">Control</h3>
                        </div>
                        <p className="text-sm">
                            It supports helping developers and businesses
                            innovate.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Sparkles className="size-4" />

                            <h3 className="text-sm font-medium">
                                Built for AI
                            </h3>
                        </div>
                        <p className="text-sm">
                            It supports helping developers and businesses
                            innovate.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
