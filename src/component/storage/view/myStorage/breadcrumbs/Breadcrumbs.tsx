import './breadcrumbs.sass';

import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../lib/redux/reduxTypedHooks';
import { setDirPath } from '../../../../../lib/redux/slice/directory';

export default function Breadcrumbs() {
    const dispatch = useAppDispatch();
    const { dirPath } = useAppSelector(state => state.directory);

    const breadcrumbsMainContainerRef = useRef<HTMLElement>(null);
    const breadcrumbsDropdownRef = useRef(null);
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
    const [hiddenCount, setHiddenCount] = useState(0);

    const hiddenItems = dirPath.slice(0, hiddenCount);
    const visibleItems = dirPath.slice(hiddenCount);

    useEffect(() => {
        calculateVisibleItems();
        window.addEventListener('resize', calculateVisibleItems);
        return () => window.removeEventListener('resize', calculateVisibleItems);
    }, [dirPath]);

    function goToTargetDir(directoryId: number) {
        let dirIndexInDirPath = 0;
        for (let i = 0; i < dirPath.length; i++) {
            const cur = dirPath[i];
            if (cur[0] == directoryId) {
                dirIndexInDirPath = i;
            }
        }

        const targetDirPath = dirPath.slice(0, dirIndexInDirPath + 1);
        dispatch(setDirPath(targetDirPath));
    }

    function calculateVisibleItems() {
        const mainContainerWidth = breadcrumbsMainContainerRef.current!.offsetWidth || 0;
        const breadcrumbsDropdownWidth = (breadcrumbsDropdownRef.current! as HTMLElement)?.offsetWidth || 28;
        // about 28px for the ... dropdown menu
        const items = itemRefs.current;
        let itemsTotalWidth = breadcrumbsDropdownWidth;
        let allVisibleItems = dirPath.length;

        for (let i = dirPath.length - 1; i >= 0; i--) {
            const item = items[i];
            if (!item) continue;
            itemsTotalWidth += item.offsetWidth + 34;
            // about 34px for padding from breadcrumb li element and from it´s ::before
            if (itemsTotalWidth > mainContainerWidth - 10) {
                allVisibleItems = dirPath.length - i - 1;
                break;
            }
        }

        setHiddenCount(Math.max(0, dirPath.length - allVisibleItems - 1));
    }

    return (
        <section ref={breadcrumbsMainContainerRef} id="breadcrumbs-main-container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {hiddenItems.length > 0 && (
                        <li ref={breadcrumbsDropdownRef} className="breadcrumb-item dropdown">
                            <span
                                className="dropdown-toggle"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                ...
                            </span>
                            <ul className="dropdown-menu custom-dropdown">
                                {hiddenItems.map(([id, name]) => (
                                    <li key={id}>
                                        <a className="dropdown-item" onClick={() => goToTargetDir(id)}>
                                            {name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    )}
                    {visibleItems.map(([id, name], index) => (
                        <li
                            key={id}
                            ref={(el) => { itemRefs.current[hiddenCount + index] = el }}
                            className={`breadcrumb-item visible-item${index === visibleItems.length - 1 ? ' active' : ''
                                }`}
                            aria-current={index === visibleItems.length - 1 ? 'page' : undefined}
                            onClick={() => goToTargetDir(id)}
                        >
                            {name}
                        </li>
                    ))}
                </ol>
            </nav>
        </section>
    );
}