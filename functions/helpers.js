export function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function getYesterdayString () {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() -1);

    const dateString = yesterday.toISOString().slice(0, 10);
    return dateString;
}