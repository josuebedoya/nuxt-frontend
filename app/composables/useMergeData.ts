const useMergeData = (data: object, completeData: object): Record<string, any> => {
    if (!data || !completeData) return {};

    const merged: Record<string, any> = {...data};

    for (const key in completeData) {
        if (!(key in data)) {
            merged[key] = completeData[key];
        } else {
            const dataVal = (data as any)[key];
            const completeVal = (completeData as any)[key];

            const bothAreObjects =
                typeof dataVal === 'object' &&
                dataVal !== null &&
                !Array.isArray(dataVal) &&
                typeof completeVal === 'object' &&
                completeVal !== null &&
                !Array.isArray(completeVal);

            if (bothAreObjects) {
                merged[key] = useMergeData(dataVal, completeVal);
            }
        }
    }

    return merged;
};

export default useMergeData;
