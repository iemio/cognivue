import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useData = (vuespaceId: string) =>
    useQuery({
        queryKey: ["GET_DATA", vuespaceId],
        queryFn: async () => {
            const { data } = await axios.get(
                `http://localhost:8000/workflow/load/${vuespaceId}`
            );
            return data;
        },
    });
