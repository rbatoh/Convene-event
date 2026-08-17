import './button.css';
export const Button = ({ text, variant = 'primary', className = '', onClick = '' }) => {
    const onClickAttr = onClick ? `onclick="${onClick}"` : '';
    return `<button class="btn btn-${variant} ${className}" ${onClickAttr}>${text}</button>`;
};
