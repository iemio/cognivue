import Image from "next/image";
import { Button } from "@/components/ui/button"; // update this path based on your project

const initialParticipants = [
    {
        name: "abc",
        avatarURL:
            "https://res.cloudinary.com/dlzlfasou/image/upload/v1745407308/participant-01_fhwvxn.png",
    },
    {
        name: "def",
        avatarURL:
            "https://res.cloudinary.com/dlzlfasou/image/upload/v1745407308/participant-02_jl473r.png",
    },
    {
        name: "ghi",
        avatarURL:
            "https://res.cloudinary.com/dlzlfasou/image/upload/v1745407308/participant-03_dyfplu.png",
    },
    {
        name: "jkl",
        avatarURL:
            "https://res.cloudinary.com/dlzlfasou/image/upload/v1745407308/participant-04_mumzou.png",
    },
];

export default function Participants() {
    const maxVisible = 3;
    const visibleParticipants = initialParticipants.slice(0, maxVisible);
    const extraCount = initialParticipants.length - maxVisible;

    return (
        <div className="flex -space-x-[0.6rem] max-sm:hidden">
            {visibleParticipants.map((participant, index) => (
                <div key={index} className="size-8">
                    <Image
                        className="shrink-0 ring-secondary rounded-full ring-2"
                        src={participant.avatarURL}
                        width={32}
                        height={32}
                        alt={`Avatar ${index + 1}`}
                    />
                </div>
            ))}

            {extraCount > 0 && (
                <Button
                    variant="secondary"
                    className="bg-secondary text-muted-foreground ring-secondary hover:bg-secondary hover:text-foreground flex size-8 items-center justify-center rounded-full text-[0.75rem] ring-2"
                    size="icon"
                >
                    +{extraCount}
                </Button>
            )}
        </div>
    );
}
