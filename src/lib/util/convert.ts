/**
 * Contertes the given bytes in gigabytes.
 * @param bytes Bytes to convert.
 * @param toFixed Number of digits after the decimal point. Method used: Number.toFixed() 
 * @returns The string representation of the converted result.
 */
function bytesToGigabytes(bytes: number, toFixed: number) {
    return (bytes / 1024 / 1024 / 1024).toFixed(toFixed);
}

/**
 * Contertes the given bytes in megabytes.
 * @param bytes Bytes to convert.
 * @param toFixed Number of digits after the decimal point. Method used: Number.toFixed() 
 * @returns The string representation of the converted result.
 */
function bytesToMegabytes(bytes: number, toFixed: number) {
    return (bytes / 1024 / 1024).toFixed(toFixed);
}

export {
    bytesToGigabytes,
    bytesToMegabytes
};