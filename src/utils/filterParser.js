import _ from 'lodash';
import has from 'lodash/has';
import Query from 'query';
import moment from 'moment';

export default class FilterParser {
    constructor(filters) {
        this.filters = filters;
    }

    getUserInputFilters = title => {
        const object = this.filters[title];
        const userInputFilters = [];
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

    getReactFilters = () => {
        if (this.filters) {
            return Object.keys(this.filters).map(title => {
                const userInputFilters = this.getUserInputFilters(title);
                return { title, userInput: userInputFilters };
            });
        }
    };

    getFilteredResults = (selectedFilters, data) => {
        let filteredData = _.cloneDeep(data);

        if (!_.isEmpty(selectedFilters)) {
            Object.keys(selectedFilters).forEach(filter => {
                const definedFilter = this.replaceAskWithUserInput(filter, selectedFilters[filter]);
                filteredData = Query.query(filteredData, definedFilter);
            });
        }

        return filteredData;
    };

    replaceAskWithUserInput(title, filter) {
        const definedFilter = _.cloneDeep(this.filters[title]);
        const searchAsk = obj => {
            if (typeof obj === 'object') {
                Object.keys(obj).forEach(key => {
                    if (obj[key].ask) {
                        if (key !== 'StartDate') {
                            obj[key] = { $in: filter[key] || [] };
                        } else {
                            obj[key] = {
                                $cb: orderStartDate => {
                                    const selectedDate = has(filter, `${key}[0]`) ? moment(filter[key][0]) : moment();
                                    const orderDate = moment(orderStartDate, 'DD-MM-YYYY HH:mm:ss');
                                    return orderDate.isAfter(selectedDate);
                                },
                            };
                        }
                    } else {
                        searchAsk(obj[key]);
                    }
                });
            }
        };
        searchAsk(definedFilter);

        return definedFilter;
    }
}
