import './public-layout.css';
import { TopNavBar } from '../../organisms/top-nav-bar/top-nav-bar.js';
import { Footer } from '../../organisms/footer/footer.js';

export const PublicLayout = ({ children }) => {
    return `
        <div style="display: flex; flex-direction: column; min-height: 100vh;">
            ${TopNavBar()}
            <main style="flex: 1;">
                ${children}
            </main>
            ${Footer()}
        </div>
    `;
};
