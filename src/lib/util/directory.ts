
/**
 * Joins all elements from the given array in one path string with "/" as a separator.
 * @param parts The parts which must be joined in a whole path.
 * @returns The joined path string.
 */
function buildDirectoryPath(parts: Array<string|number>): string {
    return parts.join('/');
}

/**
 * Compares (!=) the elements of two arrays without using coercion.
 * @param arrOne The first array to compare against the second.
 * @param arrTwo The second array to compare against the first.
 * @returns true if all elements on all indexes are equal, otherwise false.
 */
function compareArrays(arrOne: any[], arrTwo: any[]) {
    for (let i = 0; i < arrOne.length; i++) {
        if (arrOne[i] != arrTwo[i]) return false;
    }
    return true;
}

export {
    buildDirectoryPath,
    compareArrays
};