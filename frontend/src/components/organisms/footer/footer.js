import './footer.css';
export const Footer = () => {
    return `
        <footer class="footer">
            <div class="footer-container">
                <a href="#/" class="footer-logo" style="text-decoration: none; cursor: pointer;">
                    Convene
                </a>
                <nav class="footer-links">
                    <a href="#" class="footer-link">Privacy Policy</a>
                    <a href="#" class="footer-link">Terms of Service</a>
                    <a href="#" class="footer-link">Cookies</a>
                    <a href="#" class="footer-link">Support</a>
                </nav>
                <div class="footer-copyright">
                    © 2026 Convene Architecture. All rights reserved.
                </div>
            </div>
        </footer>
    `;
};
