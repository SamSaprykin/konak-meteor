import NetWorthCalculator from '../../components/NetWorthCalculator.jsx';

Template.networth.onRendered(function() {
    const template = this;
    let currentLanguage = 'en';
    
    // Function to render the React component
    function renderCalculator(language = 'en') {
        const element = template.find('.react-container');
        if (element) {
            window.ReactContainer.render(NetWorthCalculator, element, { language });
        }
    }
    
    // Initial render
    renderCalculator(currentLanguage);
    
    // Language toggle functionality
    template.$('.language-btn').on('click', function(e) {
        e.preventDefault();
        const selectedLang = $(this).data('lang');
        
        // Update button states
        template.$('.language-btn').removeClass('active btn-primary').addClass('btn-outline-primary');
        $(this).removeClass('btn-outline-primary').addClass('btn-primary active');
        
        // Re-render with new language
        currentLanguage = selectedLang;
        renderCalculator(currentLanguage);
    });
    
    // Set initial active language button
    template.$('.language-btn[data-lang="en"]').removeClass('btn-outline-primary').addClass('btn-primary active');
});

Template.networth.onDestroyed(function() {
    const element = this.find('.react-container');
    if (element) {
        window.ReactContainer.unmount(element);
    }
});
