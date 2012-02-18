// Breadcrumb support for jQuery wizard Plugin. Should be included 
// after the main plugin file. 
// Authors: Tero Teelahti (http://teelahti.fi)
// 
// http://github.com/teelahti/jquery.wizard

//
// Licensed under the MIT licenses:
// http://www.opensource.org/licenses/mit-license.php
(function( $ ){

    var settings, 
        root,
        targetData,
        doc = $(document);

    function pageCreated(event, data) {
        var li = $("<li>").data(targetData, data.index).html(data.title);
        
        if(!root.find("li").size()) {
            li.addClass(ns("-active"));
        }
        
        root.append(li);
        
        // Navigate when breadcrumb is clicked
        li.click(function(e) {
            // Create navigating context
            var cssClass = ns("-active"),
                ctx = { 
                    currentPage: root.find("li." + cssClass).data(targetData), 
                    targetPage : li.data(targetData) 
            };
            
            doc.trigger(ns("/navigate"), ctx);
        });
    }
    
    function navigating(event, data) {
        var cssClass = ns("-active");
            
        root.find("li").removeClass(cssClass).each(function(){
            var page = $(this);
            if(page.data(targetData) === data.targetPage) {
                page.addClass(cssClass);
            }
        });
    }

    function ns(name) {
        /// Prepend configured namespace to given name. 
        return settings.namespace + name;
    }    

    $.fn.wizard.initializeBreadcrumb = function(options) {
        settings = options;
      
        root = $("<ul>");
        $(settings.breadcrumb).append(root);
      
        targetData = ns("-targetpage");
      
        // subscribe to wizard page created event
        doc.on(ns("/pagecreated"), pageCreated);
        
        // subscribe to wizard navigating event
        doc.on(ns("/navigated"), navigating);
    };
        
})( jQuery );
