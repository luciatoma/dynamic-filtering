import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import App from '../components/App';

/* global document */

it('renders without crashing and matches snapshot', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
});
