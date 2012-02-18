# jquery.wizard #

Converts given elements to pages that may be navigated with auto-generated back/forward buttons. Publishes navigation information for listeners to use. The feature set of this plugin is close to existing [jquery.formwizard](https://github.com/thecodemine/formwizard) plugin, but that project is not very active and it has gotten a bit too complex for my own taste.

### Key principles of these plugins: ###
- Gradual enhancement: the original source should be usable without this plugin
- Simplicity: too many options will kill you

## .wizard(options) ##

Options: 

- **namespace**: The namespace to use for all HTML5 data attributes and all CSS classes. Default is 'wizard'.
- **breadcrumb**: The jQuery selector to find the breadcrumb container. Breadcrumb is automatically created inside this element at runtime. 
- **slideDuration**: When jQuery UI is included, this is the duration (ms) of the left/right slide that is used in page transitions.
- **texts**: buttonNext: Next button text; buttonPrevious: Previous button text

Example:
    $("form > fieldset").wizard( { 
        namespace: "random-wizard", 
        breadcrumb: "#breadcrumb",
        texts: {
            buttonNext: "Go to next page",
            buttonPrevious: "Go to previous page"
        }
    } );

### Generated button format ###

### Generated breadcrumb format ###