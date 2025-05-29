export type Chunk = {
    id: number,
    owner: number,
    name: string,
    relative_file_path: string,
    created_on: number,
    size_bytes: number,
    mime_type: string,
    share_option: 'PRIVATE' | 'SHARE_WITH_ALL_WITH_LINK' | 'SHARE_WITH_USER'
    share_link: string
};