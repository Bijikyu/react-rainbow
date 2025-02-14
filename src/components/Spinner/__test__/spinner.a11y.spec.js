import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { axe } from 'jest-axe';
import Spinner from '..';

describe('<Spinner/>', () => {
    it('should be accessible', async () => {
        expect.assertions(1);
        const html = ReactDOMServer.renderToString(<Spinner />);
        const results = await axe(html);
        expect(results).toHaveNoViolations();
    });
});
