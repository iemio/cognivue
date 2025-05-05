"use client";
import { AchievementCard } from "@/components/personal/achievement/card";

export default function Page() {
    return (
        <div className="justify-center items-center flex flex-col h-screen w-screen bg-gray-100">
            <AchievementCard
                title="Admin"
                description="Complete system control"
                claimed={true}
            />
        </div>
    );
}
