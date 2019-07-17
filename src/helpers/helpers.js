const regexMarkdown = (string, openTag, closeTag) => {
    const finalRegexp = /<parsed>|<\/parsed>/g;
    const undoReg3 = new RegExp(`${openTag}|${closeTag}*>`, 'g');
    const fullStringInsideParsed = new RegExp(`^(?<=<parsed>)${openTag}.*${closeTag}(?=</parsed>)$`, 'g');
    const regexpForParsedContent = new RegExp(`(?=<parsed>).*(?<=</parsed>)`, 'g');
    const regexpForTagOutsideParsed = new RegExp(`${openTag}.*(?=<parsed>).*(?<=</parsed>)`, 'g');
    const regexpForBothTagsInsideParsed = new RegExp(`(?=<parsed>).*${openTag}.*${closeTag}.*(?<=</parsed>)`, 'g');
    const regexpForTagRightAfterParsed = new RegExp(`.*<parsed>${openTag}.*</parsed>.*${closeTag}.*`, 'g');
    const regexpForTagInsideParsed = new RegExp(`(?=<parsed>).+${openTag}.*(?<=</parsed>).*${closeTag}`, 'g');
    if (string.match(fullStringInsideParsed)) {
        const [first] = string.match(fullStringInsideParsed);
        const substrTrimmed = first.replace(undoReg3, '');
        return string.replace(string, substrTrimmed);
    }
    if (string.match(regexpForBothTagsInsideParsed)) {
        let first;
        const [x] = string.match(regexpForTagInsideParsed);
        const [y] = string.match(regexpForBothTagsInsideParsed);
        if (string.match(regexpForTagInsideParsed)) {
            first = x;
        } else {
            first = y;
        }
        const substrTrimmed = first.replace(undoReg3, '');
        return string.replace(first, `${openTag}${substrTrimmed}${closeTag}`).replace(finalRegexp, '');
    }
    if (string.match(regexpForTagInsideParsed)) {
        const [first] = string.match(regexpForParsedContent)[0];
        const substrTrimmed = first.replace(undoReg3, '');
        const clearedParsed = string.match(regexpForParsedContent)[0];
        if (string.match(regexpForTagRightAfterParsed)) {
            return string.replace(clearedParsed, `${substrTrimmed}${openTag}`).replace(finalRegexp, '');
        }
        return string.replace(clearedParsed, `${openTag}${substrTrimmed}`).replace(finalRegexp, '');
    }
    if (string.match(regexpForTagOutsideParsed)) {
        const [first] = string.match(regexpForTagOutsideParsed);
        const [second] = first.match(regexpForParsedContent);
        return string.replace(second, `${closeTag}${second}${openTag}`).replace(finalRegexp, '');
    }
    const [first] = string.match(regexpForParsedContent);
    return string.replace(first, `${openTag}${first}${closeTag}`).replace(finalRegexp, '');
};

const compareStrings = (a, b) => {
    let string1 = a;
    let string2 = b;
    const regexp = /<.*>|<\/.*>/g;
    const stringToArray = string => string.match(/<.*?>|<\/.*?>|./g);
    let string3 = '';
    if (regexp.test(string1)) {
        string1 = stringToArray(string1);
    }
    string2 = stringToArray(string2);
    if (string1.length < string2.length) {
        [string1, string2] = [string2, string1];
    }
    if (!Array.isArray(string2)) return string1.join('');
    for (let i = 0; i < string1.length || i < string2.length; i++) {
        if (string2[i] === undefined || string1[i] === undefined) {
            const returnedString = string1[i] === undefined
                ? string3 += string2[i]
                : string3 += string1[i];
            return returnedString;
        } else {
            if (string1[i] === string2[i]) {
                string3 += string1[i]
            } else {
                if (string2[i] === '<parsed>' || string2[i] === '</\parsed>') {
                    if (/<.*[^parsed]>/.test(string1[i])) {
                        string3 += string1[i];
                        string2.unshift('');
                    } else {
                        string3 += string2[i];
                        string1.unshift('');
                    }
                } else {
                    string3 += string1[i];
                    string2.unshift('');
                }
            }
        }
    }
    return string3;
};

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
    regexMarkdown,
    compareStrings,
    arraySort,
    today,
    notePreviewDate,
};
