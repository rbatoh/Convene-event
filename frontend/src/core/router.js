export const Router = (routes) => {
    const render = () => {
        let hash = window.location.hash || '#/';
        
        // Strip query params or trailing slashes for simple matching if needed
        const path = hash.split('?')[0];

        // Find the route component
        const renderComponent = routes[path] || routes['404'] || (() => '<h1>404 Not Found</h1>');

        // Render to app container
        const appContainer = document.querySelector('#app');
        if (appContainer) {
            appContainer.innerHTML = renderComponent();
        }
        
        // Scroll to top on route change
        window.scrollTo(0, 0);
    };

    // Listen to hash changes
    window.addEventListener('hashchange', render);

    // Initial render
    window.addEventListener('DOMContentLoaded', render);
    
    // In case DOM is already loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        render();
    }
};
