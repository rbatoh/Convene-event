import './icon.css';
export const Icon = ({ name, className = '' }) => {
    return `<span class="material-symbols-outlined icon ${className}">${name}</span>`;
};
