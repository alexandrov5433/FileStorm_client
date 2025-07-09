
function verticalDropdownPositionAdjuster(
    ul: HTMLUListElement
) {
    if (!ul) return;

    const isUlVisible = ul.checkVisibility();

    if (!isUlVisible) return;

    const ulRect = ul.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const ulTop = ulRect.top;
    const ulBottom = ulRect.bottom;

    if (ulBottom > viewportHeight) {
        ul.style.translate = '0 -50%';
    } else if ((ulTop / viewportHeight) * 100 < 25) {
        ul.style.translate = '0 50%';
    }
}

function hideAndBlurDropdown(ul: HTMLUListElement | null, dropdownMainButton: HTMLButtonElement | null) {
    // if statement removed in order to improve function execution speed - can be felt!
    // if (!ulDropdownRef.current) return;
    ul?.classList?.remove('show');
    ul?.blur();
    dropdownMainButton?.blur();
}

export {
    verticalDropdownPositionAdjuster,
    hideAndBlurDropdown
};