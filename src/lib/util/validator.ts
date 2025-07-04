
/**
 * Checks if the given string, is a valid file/directory name. 
 * @param value String to validate.
 * @returns True if the value is valid, false otherwise.
 */
function validateFileAndDirName(value: string) {
    if (!value) return false;
    return !new RegExp('\\\\|/|:|\\*|\\?|\"|<|>|\\|').test(value);
}

export {
    validateFileAndDirName
};