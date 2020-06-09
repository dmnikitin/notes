/* globals localStorage */

const getFromLocalStorage = () => {
    try {
        const parsed = JSON.parse(localStorage.getItem('notes') || '{}');
        const storage = parsed;
        if (parsed === null) {
            return undefined;
        }
        if (!parsed.hasOwnProperty('notes')) {
            storage.notes = [{
            name: 'cofveve', date: '31.12.2018', priority: false, location: 'Minsk, Belarus', content: "Infamous Trump's tweet", index: Date.now(), tags: { value: '', label: '' },
            }];
        }
        if (!parsed.hasOwnProperty('tags')) {
            storage.tags = [{ value: 'important', label: 'Important' }, { value: 'personal', label: 'Personal' }];
        }
        if (!parsed.hasOwnProperty('active')) {
            storage.active = { activeNote: -1, activeTag: { value: 'allNotes', label: 'All Notes' } };
        }
        return storage;
    } catch (err) {
        console.log(err);
    }
    return undefined;
};


const saveToLocalStorage = (value) => {
    try {
        localStorage.setItem('notes', JSON.stringify(value));
    } catch (err) {
        console.log(err);
    }
};

export { getFromLocalStorage, saveToLocalStorage };
