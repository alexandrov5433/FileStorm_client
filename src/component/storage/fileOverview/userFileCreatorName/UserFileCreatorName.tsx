import { useEffect, useState } from "react";
import { getUsernameRequest } from "../../../../lib/action/userDataRequest";
import fetcher from "../../../../lib/action/fetcher";

export default function UserFileCreatorName({
    ownerId
}: {
    ownerId: number
}) {
    const [name, setName] = useState('Loading...');

    useEffect(() => {
        if (!ownerId) return;
        getFileCreator(ownerId);
    }, [ownerId]);

    async function getFileCreator(ownerId: number) {
        const res = await fetcher(getUsernameRequest(ownerId));
        if (res.status === 200) {
            setName(res.payload as string);
        } else {
            setName('FileStorm User');
        }
    }
    
    return (
        <span title={name}>
            {name}
        </span>
    );
}