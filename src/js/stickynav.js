jQuery(function(){
    var sectionHeader = jQuery('#section-header'),
		sectionContent = jQuery('#section-content');
    
    var navIsSticky = function(){
        	sectionHeader.addClass('nav-scrolling');
        	sectionContent.addClass('nav-scrolling');
    	},
		navIsNotSticky = function(){
        	sectionHeader.removeClass('nav-scrolling');
        	sectionContent.removeClass('nav-scrolling');
    	};
    
    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() >= 65) {
            navIsSticky();
        } else {
            navIsNotSticky();
        }
    });
});