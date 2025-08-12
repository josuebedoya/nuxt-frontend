// Aplica configuración a un ítem
function mergeConfigForItem(
    itemKey: string,
    sectionConfig: Record<string, any>,
    defaultConfig: Record<string, any>
): Record<string, any> {
    return {
        ...defaultConfig,
        ...(sectionConfig[itemKey] || {}),
    };
}

// Estrategia 1: item-by-item (estructura plana)
function mergeSection(
    sectionData: Record<string, any>,
    sectionConfig: Record<string, any>,
    defaultConfig: Record<string, any>
): Record<string, any> {
    const result: Record<string, any> = {};

    for (const itemKey in sectionData) {
        result[itemKey] = mergeConfigForItem(itemKey, sectionConfig, defaultConfig);
    }

    return result;
}

// Función principal
function useMergeData(
    sourceData: Record<string, any>,
    configData: Record<string, any>,
    allToAll: boolean = false,
    globalDefaults: Record<string, any> = {}
): Record<string, any> {
    const mergedResult: Record<string, any> = {};

    for (const sectionKey in sourceData) {
        const sectionData = sourceData[sectionKey];
        const sectionConfig = configData[sectionKey] || {};
        const defaultConfig = sectionConfig.default || globalDefaults;

        const isPlainObject =
            typeof sectionData === 'object' &&
            sectionData !== null &&
            !Array.isArray(sectionData);

        if (isPlainObject) {
            const mergedSection =  mergeSection(sectionData, sectionConfig, defaultConfig)


            if (allToAll) {
                mergedResult[sectionKey] = mergedSection;
            } else {
                Object.assign(mergedResult, mergedSection);
            }
        } else if (!allToAll) {
            mergedResult[sectionKey] = {
                ...defaultConfig,
                ...(sectionConfig[sectionKey] || {}),
            };
        }
    }

    return mergedResult;
}

export default useMergeData;
