import './badge.css';
export const Badge = ({ text, type = 'featured', className = '' }) => {
    return `<div class="badge badge-${type} ${className}">${text}</div>`;
};
