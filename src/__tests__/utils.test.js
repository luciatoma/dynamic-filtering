import FilterParser from '../utils/filterParser';
import {
    workOrdersMock,
    filtersMock,
    expectedFilters,
    expectedFilterUserInput,
    activeFilter1,
    activeFilter2,
    expectedResult,
} from '../__mocks__/data';

const filterParser = new FilterParser(filtersMock);

it('renturns the correct filters', () => {
    const filtersToRender = filterParser.getReactFilters();
    expect(filtersToRender).toEqual(expectedFilters);
});

it('returns the correct user input filters', () => {
    const userInput1 = filterParser.getUserInputFilters('Filter1');
    expect(userInput1).toBe(null);
    const userInput2 = filterParser.getUserInputFilters('Filter2');
    expect(userInput2).toEqual(expectedFilterUserInput);
});

it('renturns the correct result for simple filter', () => {
    const result1 = filterParser.getFilteredResults(activeFilter1, workOrdersMock);
    expect(result1).toEqual(expectedResult);
});

it('renturns the correct result for complex filter', () => {
    const result1 = filterParser.getFilteredResults(activeFilter2, workOrdersMock);
    expect(result1).toEqual(expectedResult);
});
