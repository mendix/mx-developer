import React from 'react';
import { render } from '@testing-library/react';

import Footer from '../index';

describe('MxFooter', () => {
    it('should render correctly', () => {
        const { container } = render(<Footer />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
    