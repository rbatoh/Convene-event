import './input.css';
export const Input = ({ type = 'text', placeholder = '', className = '' }) => {
    return `<input type="${type}" placeholder="${placeholder}" class="input-base ${className}">`;
};
