/**
 * @param min
 * @param max
 * @returns {number}
 */
export const rangeRandomInt = (min, max) => {
    return Math.floor(Math.random()) * (max - min) + min;
};

/**
 * @param max
 * @returns {number}
 */
export const randomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};