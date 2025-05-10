import { Permissions } from "@/lib/enums/permission";
import { UserType, VuespaceWithMembersType } from "@/types/api.type";
import { useEffect, useMemo, useState } from "react";

const usePermissions = (
    user: UserType | undefined,
    vuespace: VuespaceWithMembersType | undefined
) => {
    const [permissions, setPermissions] = useState<Permissions[]>([]);

    useEffect(() => {
        if (user && vuespace) {
            const member = vuespace.members.find(
                (member) => member.userId === user._id
            );
            if (member) {
                // Map string permissions to Enums
                const mappedPermissions = member.role.permissions
                    .map(
                        (perm) => Permissions[perm as keyof typeof Permissions]
                    )
                    .filter(Boolean); // Remove undefined values

                setPermissions(mappedPermissions);
            }
        }
    }, [user, vuespace]);

    return useMemo(() => permissions, [permissions]);
};

export default usePermissions;
