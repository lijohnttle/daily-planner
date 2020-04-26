const pad = n => (`00${n}`).slice(-2);

export const msToHHmm = (ms) => {
    const second = Math.floor(ms / 1000);
    const minute = Math.floor(second / 60);
    const hour = Math.floor(minute / 60);

    return `${pad(hour)}:${pad(minute)}`;
};