const getUserInputFilters = (object, key) => {
    const userInputFilters = [];
    const doSearch = obj => {
        if (typeof obj === 'object') {
            Object.keys(obj).forEach(objKey => {
                if (objKey === key) {
                    userInputFilters.push({ filter: obj[objKey], values: obj.values });
                } else {
                    doSearch(obj[objKey]);
                }
            });
        }
    };

    doSearch(object);

    if (userInputFilters.length === 0) return null;
    return userInputFilters;
};

export default class FilterParser {
    constructor(filters, data) {
        this.filters = filters;
        this.data = data;
    }

    getReactFilters = () => {
        if (this.filters) {
            return Object.keys(this.filters).map(title => {
                const userInputFilters = getUserInputFilters(this.filters[title], 'ask');
                return { title, userInput: userInputFilters };
            });
        }
    };

    getFilteredResults = selectedFilters => {};
}
