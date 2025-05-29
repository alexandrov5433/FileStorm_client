
/**
 * Joins all elements from the given array in one path string with "/" as a separator.
 * @param parts The parts which must be joined in a whole path.
 * @returns The joined path string.
 */
function buildDirectoryPath(parts: Array<string|number>): string {
    return parts.join('/');
}

export {
    buildDirectoryPath
};