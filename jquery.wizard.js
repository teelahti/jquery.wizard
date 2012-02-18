// jQuery wizard Plugin
// Authors: Tero Teelahti (http://teelahti.fi)
// 
// http://github.com/teelahti/jquery.wizard

//
// Licensed under the MIT licenses:
// http://www.opensource.org/licenses/mit-license.php
(function( $ ){

  $.fn.wizard = function(options) { 
      /// Converts given elements to pages that may be navigated with
      /// auto-generated back/forward buttons. Publishes navigation 
      /// information for example for breadcrumb use. 
      /// The feature set of this plugin is close to existing jquery.formwizard
      /// plugin, but that project is not actively maintained and it 
      /// is too complex to use for my own taste.
      
    var i = 0, 
        pages = this,
        indexData = "-page-index",
        cssClasses = { 
            page: "-wizard-page" 
        },
        settings = $.extend( {
            // The namespace used on all data-attributes and CSS classes
            namespace : "wizard",
            
            breadcrumb : null,
            
            texts : {
              buttonNext : "Next",
              buttonPrevious : "Previous"
            },
            
            // When animating pages, duration of slide out and slide in 
            // animation
            slideDuration : 300
        }, options),
        doc = $(document);
              
    // TODO: Add support for html5 form validate and jquery.validate (separate plugin jquery.wizard.validate)
    // TODO: Add support for browser back/forward navigation (separate plugin jquery.wizard.browsernavigation)
    
    // Give same settings to breadcrumb, after this it can continue 
    // autonomously.
    if($.fn.wizard.initializeBreadcrumb) {
        $.fn.wizard.initializeBreadcrumb(settings);   
    }
    
    function ns(name) {
        /// Prepend configured namespace to given name. 
        return settings.namespace + name;
    }
    
    function pub(name, data) {
        /// Publish a message to listeners. Pub name is always namespaced. 
        doc.trigger(ns("/" + name), data);
    }
    
    function button(text) {
        return $("<button/>").html(text);
    }
    
    function indexFilter(index) {
        return function() {
            return $(this).data(ns(indexData)) === index;
        };
    }
    
    function navigate(event, data, page, next) {
        var toRight = data.currentPage < data.targetPage;
        
        // Do not navigate if page is the same
        if(data.currentPage === data.targetPage) {
            return;
        }
        
        // If page and next are given use them (internal use), if not 
        // find them (external use through breadcrumb navi or similar)
        if(!page) {
            page = pages.filter(indexFilter(data.currentPage)).eq(0);
            next = pages.filter(indexFilter(data.targetPage)).eq(0);
        }
        
        // Use a littlebit prettier navigation if jquery UI is in use
        if($.ui) {
            // Hide current page
            page.hide("slide", { direction: toRight ? "right" : "left" }, settings.slideDuration);
            
            // show next page after current has disappeared
            setTimeout(function() {
                next.show("slide", { direction: toRight ? "left" : "right" }, settings.slideDuration);
            }, settings.slideduration);
        }
        else {
            page.hide();
            next.show();
        }  
        
        pub("navigated", data);
    }

    function naviClick(e) {
        /// Event handler for navigation back/forward clicks
        var button = $(this), 
            navigateTo = button.data(ns("-navigate-to")),
            toRight = navigateTo === "back",
            pageSelector = "." + ns(cssClasses.page),
            page = button.closest(pageSelector),
            next = toRight ? page.prev(pageSelector) : page.next(pageSelector),
            index = page.data(ns(indexData)),
            publishContext = { 
                currentPage : index, 
                targetPage : toRight ? index - 1 : index + 1 
            };

        e.preventDefault();
        
        // Publish with some context
        publishContext.currentPage = index;
        
        navigate(null, publishContext, page, next);
    }
    
    // Init, show only first page
    pages.hide().eq(0).show();
    
    // Listen navigate events from outside
    doc.on(ns("/navigate"), navigate);
    
    return this.each(function() {

        var $this = $(this), 
          buttons = $("<div/>").addClass(ns("-buttons")),
          buttonForward = button(settings.texts.buttonNext),
          buttonBack = button(settings.texts.buttonPrevious).data(ns("-navigate-to"), "back");
        
        // decorate page container
        $this.data(ns(indexData), i).addClass(ns(cssClasses.page));
        
        buttonForward.click(naviClick);
        buttonBack.click(naviClick);
        
        // Add navigation buttons
        if(i) {
            buttons.append(buttonBack);
        }
        
        if(i < (pages.size() - 1)) {
            buttons.append(buttonForward);
        }
        
        $this.append(buttons);
        
        // Publish page creation for listeners for e.g. breadcrumb use
        pub("pagecreated", { index: i, title: $this.attr("title")});
        i++;
    });
  };
})( jQuery );