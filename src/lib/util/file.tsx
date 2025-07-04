import type { ReactNode } from "react";
import PDFIcon from "../svgComponent/PDFIcon";
import PictureIcon from "../svgComponent/PictureIcon";
import ZipIcon from "../svgComponent/ZipIcon";
import ArchiveIcon from "../svgComponent/ArchiveIcon";
import WordIcon from "../svgComponent/WordIcon";
import PowerPointIcon from "../svgComponent/PowerPointIcon";
import ExcelIcon from "../svgComponent/ExcelIcon";
import ExeIcon from "../svgComponent/ExeIcon";
import DirectoryIcon from "../svgComponent/DirectoryIcon";
import AudioIcon from "../svgComponent/AudioIcon";
import TextIcon from "../svgComponent/TextIcon";
import UnknownFileIcon from "../svgComponent/UnknownFileIcon";

/**
 * Returns the appropriate SGV icon React element according to the given MimeType. The MimeType is matched with a case-insensitive ("i" flag) RegExp. If the mimeType argument equals "directory" the icon element for a diectory is retured. Otherwise, if there is no match at all, the icon element for an unknown file is returned.
 * @param mimeType The MimeType of the file.
 */
function getIconElement(mimeType: string): ReactNode {
    if (mimeType === 'directory') {
        return <DirectoryIcon/>;
    }
    const componentLib = {
        'application\/pdf': <PDFIcon/>,
        '^image\/.*$': <PictureIcon/>,
        'application\/msword': <WordIcon/>,
        'application\/.*excel.*': <ExcelIcon/>,
        'application\/.*archive.*': <ArchiveIcon/>,
        'application\/.*zip.*': <ZipIcon/>,
        '^text\/.*$': <TextIcon/>,
        '^audio\/.*$': <AudioIcon/>,
        '^video\/.*$': <TextIcon/>,
        'application\/.*powerpoint.*': <PowerPointIcon/>,
        'application\/.*executable.*': <ExeIcon/>,
 
    };
    for (let [regexStr, component] of Object.entries(componentLib)) {
        if (new RegExp(regexStr, 'i').test(mimeType)) return component;
    }
    return <UnknownFileIcon/>;
}

/**
 * Formats the given bytes in to a string. The units are either MB or GB, depending on the bytes given.
 * @param bytes The size of the file in bytes.
 * @returns A string with the formated size. E.g. "23 MB"
 */
function getFormatedFileSize(bytes: number): string {
    let units = 'MB' // MB; GB
    let size = bytes / 1024 / 1014;
    if (size >= 1014) {
        size /= 1014;
        units = 'GB';
    }
    let sizeStr = size.toFixed(2);
    if (sizeStr.endsWith('.00')) {
        sizeStr = sizeStr.substring(0, sizeStr.indexOf('.'));
    }
    return `${sizeStr} ${units}`;
}

/**
 * Formats the given time into a string.
 * @param time The time in milliseconds.
 * @returns The formated time.
 */
function getFormatedDate(time: number): string {
    if ((typeof time) != 'number') {
        time = Number(time) || 0;
    }
    const formater = new Intl.DateTimeFormat('en-GB', {
        day: "numeric",
        month: "short",
        year: "numeric",
        minute: "2-digit",
        hour: "2-digit",
    });
    return formater.format(time);
}

function extractFileNameUntilExtention(fileName: string) {
    return fileName.slice(0, fileName.lastIndexOf('.'));
}

function extractFileExtention(fileName: string) {
    return fileName.slice(fileName.lastIndexOf('.'));
}

export {
    getIconElement,
    getFormatedFileSize,
    getFormatedDate,
    extractFileNameUntilExtention,
    extractFileExtention
};