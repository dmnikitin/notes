const getDate = (date) => {
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const formattedMonth = (`0${mm}`).slice(-2);
    const formattedDay = (`0${dd}`).slice(-2);
    const yyyy = date.getFullYear();
    return `${formattedDay}.${formattedMonth}.${yyyy}`;
};

const today = getDate(new Date());

const notePreviewDate = (date, value) => {
    const x = date.split('.');
    let returnedVal;
    const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    if (value === 'day') {
        returnedVal = `${x[0]}`;
    } else if (value === 'month') {
        returnedVal = `${monthArray[x[1] - 1]}`;
    } else if (value === 'year') {
        returnedVal = `${x[2]}`;
    }
    return returnedVal;
};

const arraySort = array => array
    .sort((a, b) => a.index < b.index)
    .sort((a, b) => (a.priority === b.priority) ? 0 : a.priority ? -1 : 1);

export {
    arraySort,
    today,
    notePreviewDate,
};
