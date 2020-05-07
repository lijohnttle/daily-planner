const timeMod = (value, mod) => ((value % mod) + mod) % mod;

export const pad = n => (`00${n}`).slice(-2);

export const msToHHmm = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${pad(hours)}:${pad(minutes)}`;
};

export const convertHoursAndMinutesToMs = (hours, minutes) => {
    return hours * 60 * 60 * 1000 + minutes * 60 * 1000;
};

export const getHours = (ms) => Math.floor(ms / 1000 / 60 / 60);
export const getMinutes = (ms) => Math.floor((ms / 1000 / 60) % 60);
export const getMsFromHours = (hours) => hours * 60 * 60 * 1000;
export const getMsFromMinutes = (minutes) => minutes * 60 * 1000;
export const incrementHours = (ms) => (ms + getMsFromHours(1)) % getMsFromHours(24);
export const decrementHours = (ms) => timeMod(ms - getMsFromHours(1), getMsFromHours(24));
export const incrementMinutes = (ms) => (ms + getMsFromMinutes(1)) % getMsFromHours(24);
export const decrementMinutes = (ms) => timeMod(ms - getMsFromMinutes(1), getMsFromHours(24));