# jquery.wizard #

Converts given elements to pages that may be navigated with auto-generated back/forward buttons. Publishes navigation information for listeners to use. The feature set of this plugin is close to existing [jquery.formwizard](https://github.com/thecodemine/formwizard) plugin, but that project is not very active and it has gotten a bit too complex for my own taste.

### Key principles of this plugin: ###
- Gradual enhancement: the original source should be usable without this plugin
- Simplicity: too many options will kill you
- Modularity. JS should remain clean and understandable.

## .wizard(options) ##

Options: 

- **namespace**: The namespace to use for all HTML5 data attributes and all CSS classes. Default is 'wizard'.
- **breadcrumb**: The jQuery selector to find the breadcrumb container. Breadcrumb is automatically created inside this element at runtime. 
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

When breadcrumb is used the following format HTML is inserted into given container. 

    <ul>
        <li>Title 1</li>
        <li class="wizard-breadcrumb-active">Title 2</title>
        <li>Title 3</li>
    </ul>

Breadcrumb titles are the ones collected from wizard page's title attributes.

### Sample CSS styles ###

Wizard adds CSS classes for all pages and their states. Names with default namespace are: wizard-page, wizard-page-hidden, wizard-page-visible. These styles can be used to create CSS3 animations for page changes. See samples/css/samples.css for very basic slide out animation.