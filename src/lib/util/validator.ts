
/**
 * Checks if the given string, is a valid file/directory name. 
 * @param value String to validate.
 * @returns True if the value is valid, false otherwise.
 */
function validateFileAndDirName(value: string) {
    return !value.match('\\\\|/|:|\\*|\\?|\"|<|>|\\|');
}

export {
    validateFileAndDirName
};