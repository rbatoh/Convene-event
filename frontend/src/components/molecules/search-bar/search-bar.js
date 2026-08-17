import './search-bar.css';
import { Icon } from '../../atoms/icon/icon.js';

export const SearchBar = () => {
    return `
        <div class="search-bar">
            ${Icon({ name: 'search', className: 'search-icon' })}
            <input type="text" placeholder="Search events...">
        </div>
    `;
};
