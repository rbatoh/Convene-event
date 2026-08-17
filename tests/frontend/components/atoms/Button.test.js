import { describe, it, expect } from 'vitest';
import { Button } from '../../../../frontend/src/components/atoms/button/button.js';

describe('Button component', () => {
    it('should render a primary button with text', () => {
        const html = Button({ text: 'Click Me' });
        expect(html).toContain('Click Me');
        expect(html).toContain('btn-primary');
    });

    it('should render a secondary button with custom class', () => {
        const html = Button({ text: 'Cancel', variant: 'secondary', className: 'mt-2' });
        expect(html).toContain('Cancel');
        expect(html).toContain('btn-secondary');
        expect(html).toContain('mt-2');
    });

    it('should include onClick handler if provided', () => {
        const html = Button({ text: 'Submit', onClick: 'submitForm()' });
        expect(html).toContain('onclick="submitForm()"');
    });
});
