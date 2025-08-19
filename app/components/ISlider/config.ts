/**
 * You must add an array with values in the map function
 * @returns {Array}
 */

export default function CsTailwind(properties: Object) {
    const safelist = [
        Object.entries(properties).map(([key, value]) => {
            const isCustom = typeof value === 'string' || key === 'custom';
            const isCero = key.toString() === "0";

            return `${!isCero && !isCustom ? `${key}:` : ''}${isCustom ? `${value}` : `basis-1/${value}`}`
        })
    ].flat(); // Join Arrays

    return safelist;
};