const workOrdersMock = [
    {
        Id: 'uniqwo1',
        Name: 'WO-0001',
        Status: 'Open',
        Type: 'Installation',
        StartDate: '22-04-2016 13:00:00',
        EndDate: '22-04-2016 14:00:00',
        Color: 'Red',
        Description: 'Install new KoelKast SF-123',
    },
    {
        Id: 'uniqwo2',
        Name: 'WO-0002',
        Status: 'In Progress',
        Type: 'Maintenance',
        StartDate: '22-04-2016 14:00:00',
        EndDate: '22-04-2016 15:00:00',
        Color: 'Green',
        Description: 'Check freon on split-system',
    },
];

const filtersMock = {
    Filter1: { $and: { Status: 'Open', Color: 'Red' } },
    Filter2: {
        $and: { Status: 'Open', Type: { ask: true, values: ['Installation', 'Maintenance', 'Malfunction'] } },
    },
};

const expectedFilters = [
    { title: 'Filter1', userInput: null },
    { title: 'Filter2', userInput: [{ filter: 'Type', values: ['Installation', 'Maintenance', 'Malfunction'] }] },
];

const expectedFilterUserInput = [{ filter: 'Type', values: ['Installation', 'Maintenance', 'Malfunction'] }];

const activeFilter1 = { Filter1: {} };
const activeFilter2 = { Filter2: { Type: ['Installation'] } };

const expectedResult = [
    {
        Color: 'Red',
        Description: 'Install new KoelKast SF-123',
        EndDate: '22-04-2016 14:00:00',
        Id: 'uniqwo1',
        Name: 'WO-0001',
        StartDate: '22-04-2016 13:00:00',
        Status: 'Open',
        Type: 'Installation',
    },
];

export { workOrdersMock, filtersMock, expectedFilters, expectedFilterUserInput, activeFilter1, activeFilter2, expectedResult };
