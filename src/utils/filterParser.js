import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';
import Query from 'query';
import moment from 'moment';
/**
 * Class for filtering results and dealing with the filters
 *
 * @export
 * @class FilterParser
 */
export default class FilterParser {
    constructor(filters) {
        this.filters = filters;
    }

    /**
     * Parses the filter definition for "ask" types
     *
     * @memberof FilterParser
     * @param {string} title
     * @returns {Array[Object]}
     */
    getUserInputFilters = title => {
        const object = this.filters[title];
        const userInputFilters = [];

        // recursively search the object for nested "ask"s
        const doSearch = (obj, parentKey) => {
            if (typeof obj === 'object') {
                Object.keys(obj).forEach(objKey => {
                    if (objKey === 'ask') {
                        userInputFilters.push({ filter: parentKey, values: obj.values });
                    } else {
                        doSearch(obj[objKey], objKey);
                    }
                });
            }
        };

        doSearch(object);

        if (userInputFilters.length === 0) return null;
        return userInputFilters;
    };

    /**
     * Returns the defined filters for easy rendering
     *
     * @memberof FilterParser
     * @returns {Array[Object]}
     */
    getReactFilters = () => {
        if (this.filters) {
            return Object.keys(this.filters).map(title => {
                const userInputFilters = this.getUserInputFilters(title);
                return { title, userInput: userInputFilters };
            });
        }
        return false;
    };

    /**
     * Filters and returns the results based on the given filters
     *
     * @memberof FilterParser
     * @param {Object} selectedFilters
     * @param {Array[Object]} data
     */
    getFilteredResults = (selectedFilters, data) => {
        let filteredData = cloneDeep(data);

        if (!isEmpty(selectedFilters)) {
            Object.keys(selectedFilters).forEach(filter => {
                // the filter is complex and empty, don't filter
                if (isEmpty(selectedFilters[filter]) && this.getUserInputFilters(filter)) return filteredData;
                // replace the "ask" objects with the data selected by the user
                const definedFilter = this.replaceAskWithUserInput(filter, selectedFilters[filter]);
                filteredData = Query.query(filteredData, definedFilter);
            });
        }

        return filteredData;
    };

    /**
     * Replaces all the "ask" objects with the values selected so the query module can parse it
     *
     * @param {string} title
     * @param {Object} filter
     * @returns
     * @memberof FilterParser
     */
    replaceAskWithUserInput = (title, filter) => {
        // clone it to avoid modifying the source
        const definedFilter = cloneDeep(this.filters[title]);
        const searchAsk = obj => {
            if (typeof obj === 'object') {
                Object.keys(obj).forEach(key => {
                    if (obj[key].ask) {
                        // it's a date, provide a function for filtering
                        if (key === 'StartDate') {
                            obj[key] = {
                                $cb: orderStartDate => {
                                    const selectedDate = filter[key]
                                        ? moment(filter[key], 'DD-MM-YYYY')
                                        : moment().startOf('day'); // set it to the beginning of the day because you can only select a date
                                    const orderDate = moment(orderStartDate, 'DD-MM-YYYY HH:mm:ss');
                                    return orderDate.isSameOrAfter(selectedDate);
                                },
                            };
                        } else {
                            obj[key] = { $in: filter[key] || [] };
                        }
                    } else {
                        searchAsk(obj[key]);
                    }
                });
            }
        };
        searchAsk(definedFilter);

        return definedFilter;
    };
}
