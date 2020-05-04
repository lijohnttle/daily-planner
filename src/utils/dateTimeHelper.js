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