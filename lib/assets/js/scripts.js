//Footer On Bottom
function footerOnBottom() {
    var windowHeight = jQuery(window).height();
    var footerHeight = jQuery('.footer').height();
    var pageHeight = jQuery('#page-content').height();
    if(windowHeight > footerHeight + pageHeight) {
        jQuery('#page-content').css('min-height', windowHeight - footerHeight + 'px');
        jQuery('#page-content').css('height', windowHeight - footerHeight + 'px');
        return true;
    }
    return false;
}
footerOnBottom();
window.onresize = function() {
    footerOnBottom();
};