import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Button from '../components/generic/Button';
import Checkbox from '../components/generic/Checkbox';
import Popup from '../components/generic/Popup';
import WorkOrder from '../components/generic/WorkOrderCard';

/* global document */

// keeping the code dry
const tests = [
    { name: 'Button', component: <Button title="test" /> },
    { name: 'Checkbox', component: <Checkbox title="test" value="test" /> },
    {
        name: 'Popup',
        component: (
            <Popup popupValues={jest.fn} userInput={[{ filter: 'test', values: ['test'] }]} activeFilters={{ test: [] }} />
        ),
    },
    {
        name: 'WorkOrder',
        component: (
            <WorkOrder
                description="test"
                color="blue"
                endDate="test"
                name="test"
                startDate="test"
                status="Open"
                type="Maintenance"
            />
        ),
    },
];

tests.forEach(test =>
    it(`${test.name} renders without crashing and matches snapshot`, () => {
        const div = document.createElement('div');
        ReactDOM.render(test.component, div);
        ReactDOM.unmountComponentAtNode(div);
        const tree = renderer.create(test.component).toJSON();
        expect(tree).toMatchSnapshot();
    })
);
