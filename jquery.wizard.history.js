// History navigation (back/forward) support for jQuery wizard Plugin. 
// Should be included after the main plugin file. 
//
// Takes a dependency to history.js plugin found at: 
// https://github.com/balupton/history.js
// 
// 
// Authors: Tero Teelahti (http://teelahti.fi)
// 
// http://github.com/teelahti/jquery.wizard
//
// Licensed under the MIT licenses:
// http://www.opensource.org/licenses/mit-license.php
(function( $ ){

    var History,
        settings, 
        doc = $(document);

    function navigating(event, data) {
        var page = data.targetPage + 1;
        // TODO: Find real title
        History.pushState(data, "Page " + page, "?page=" + page); 
    }
    
    function historyPop() {
        console.log("HistoryPop");
        // Note: We are using History.getState() instead of event.state
        var state = History.getState(); 
        
        // History.log(State.data, State.title, State.url); 
        doc.trigger(ns("/navigate"), state.data);
    }

    function ns(name) {
        /// Prepend configured namespace to given name. 
        return settings.namespace + name;
    }    

    $.fn.wizard.initializeHistory = function(options) {
        settings = options;
        
        // Capital H on purpose
        History = window.History;
        
        if(!History) {
            throw new Error("History.js is not included. jquery.wizard.history.js takes a dependency to jquery.history.js");
        }
        
        // Bind to StateChange Event.
        // Note: We are using statechange instead of popstate.
        History.Adapter.bind(window, 'statechange', historyPop);        
                  
        // subscribe to wizard navigating event to be able to 
        // store navigation to history stack. 
        doc.on(ns("/navigated"), navigating);
    };
        
})( jQuery );
