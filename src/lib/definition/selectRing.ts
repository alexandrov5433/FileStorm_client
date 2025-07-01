import type { CheckedEntityActionPayload } from "./checkedEntitiesOptionsTypes";

export type SelectorManipulationObject = {
    entity: CheckedEntityActionPayload,
    check: () => void,
    uncheck: () => void
};