import Image from "next/image";

export default function Participants() {
    return (
        <div className="flex -space-x-[0.6rem] max-sm:hidden">
            <div className="size-8">
                <Image
                    className="shrink-0 ring-background rounded-full ring-2"
                    src="https://res.cloudinary.com/dlzlfasou/image/upload/v1745407308/participant-01_fhwvxn.png"
                    width={32}
                    height={32}
                    alt="Avatar 01"
                />
            </div>
            <div className="size-8">
                <Image
                    className="shrink-0 ring-background rounded-full ring-2"
                    src="https://res.cloudinary.com/dlzlfasou/image/upload/v1745407308/participant-02_jl473r.png"
                    width={32}
                    height={32}
                    alt="Avatar 02"
                />
            </div>
            <div className="size-8">
                <Image
                    className="shrink-0 ring-background rounded-full ring-2"
                    src="https://res.cloudinary.com/dlzlfasou/image/upload/v1745407308/participant-03_dyfplu.png"
                    width={32}
                    height={32}
                    alt="Avatar 03"
                />
            </div>
            <div className="size-8">
                <Image
                    className="shrink-0 ring-background rounded-full ring-2"
                    src="https://res.cloudinary.com/dlzlfasou/image/upload/v1745407308/participant-04_mumzou.png"
                    width={32}
                    height={32}
                    alt="Avatar 04"
                />
            </div>
        </div>
    );
}
