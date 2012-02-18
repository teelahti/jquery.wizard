// jQuery wizard Plugin
// Authors: Tero Teelahti (http://teelahti.fi)
// 
// http://github.com/teelahti/jquery.wizard

//
// Licensed under the MIT licenses:
// http://www.opensource.org/licenses/mit-license.php
(function( $ ){

  $.fn.wizard= function(options) { 
      /// Converts given elements to pages that may be navigated with
      /// auto-generated back/forward buttons. Publishes navigation 
      /// information for example for breadcrumb use. 
      /// The feature set of this plugin is close to existing jquery.formwizard
      /// plugin, but that project is not actively maintained and it 
      /// is too complex to use for my own taste.
      
    var naviClick, 
        i = 0, 
        wizardPageClass = "wizard-page";
      
    // Create some defaults, extending them with any options that were provided
    // var settings = $.extend( {
    //  namespace         : 'wizard',
    //  cssClasses: { page: "wizard-page", buttonsContainer: "wizard-buttons" }
    //}, options);      
      
    // TODO: Extend with options for class etc.
    // TODO: Add configurable namespace, also through options
    // TODO: Add separate jquery.wizardBreadcrumb plugin to write breadcrumb.
    // TODO: Add support for html5 form validate and jquery.validate
    // TODO: Add support for browser back/forward navigation
    // TODO: Use jquery UI only if it is referenced, otherwise use plain jquery animation
        
      function pub(name, data) {
          $(document).trigger("wizard" + "/" + name, data);
      }
      
    // Init, show only first page
    this.hide().eq(0).show();

    naviClick = function(e) {
        /// Event handler for navigation back/forward clicks
        var button = $(this), 
            navigateTo = button.data("wizard-navigate-to"),
            toRight = navigateTo === "back",
            page = button.closest("." + wizardPageClass ),
            next = toRight ? page.prev("fieldset") : page.next("fieldset"),
            duration = 300,
            index = page.data["wizard-page-index"],
            publishContext = { 
                currentPage : index, 
                targetPage : toRight ? index + 1 : index - 1 
            };

        e.preventDefault();
        
        // Publish with some context
        publishContext.currentPage = index;
        
        pub("navigating", publishContext);
        
        // Hide current page
        page.hide("slide", { direction: toRight ? "right" : "left" }, duration);
        
        // show next page after current has disappeared
        setTimeout(function() {
            next.show("slide", { direction: toRight ? "left" : "right" }, duration);
        }, duration);
    };        
      
    return this.each(function() {

        var $this = $(this), 
          buttons = $("<div/>").addClass("wizard-buttons"),
          buttonForward = $("<button>Forward</button>"),
          buttonBack = $("<button>Back</button>").data("wizard-navigate-to", "back");
        
        // decorate page container
        $this.data("wizard-page-index", i).addClass(wizardPageClass);
        
        buttonForward.click(naviClick);
        buttonBack.click(naviClick);
        
        // Add navigation buttons
        if(i) {
            buttons.append(buttonBack);
        }
        
        buttons.append(buttonForward);
        
        $this.append(buttons);
        
        // Publish page creation for listeners for e.g. breadcrumb use
        pub("pagecreated", { index: i, title: $this.attr("title")});
        i++;
    });
  };
})( jQuery );
​