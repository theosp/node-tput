// refs:
// http://wiki.bash-hackers.org/scripting/terminalcodes
// http://mywiki.wooledge.org/BashFAQ/037
(function () { 

    // load modules {{{
    var exec = require('child_process').exec;
    // }}}

    // vars {{{
    var terminal_escape_codes = {
            bold: '',
            default: '',
            background: {},
            foreground: {}
        };
    // }}}

    // functions {{{
    var getTerminalEscapeCode = function (tput_arguments, reference) {
        if (typeof tput_arguments !== 'undefined' || typeof reference !== 'undefined') {
            var place_to_store_output = terminal_escape_codes;

            reference = reference.split('.'); 

            for (var i = 0; i < reference.length - 1; i++) {
                var property = reference[i];
            
                place_to_store_output = place_to_store_output[property];
            }

            exec("tput " + tput_arguments, function (error, stdout, stderr) {
                place_to_store_output[reference[reference.length - 1]] = stdout;
            });
        }
    };
    // }}}
    
    getTerminalEscapeCode("setaf 0", "foreground.black");
    getTerminalEscapeCode("setaf 1", "foreground.red");
    getTerminalEscapeCode("setaf 2", "foreground.green");
    getTerminalEscapeCode("setaf 3", "foreground.yellow");
    getTerminalEscapeCode("setaf 4", "foreground.blue");
    getTerminalEscapeCode("setaf 5", "foreground.purple");
    getTerminalEscapeCode("setaf 6", "foreground.cyan");
    getTerminalEscapeCode("setaf 7", "foreground.white");
    getTerminalEscapeCode("setaf 9", "foreground.default");

    getTerminalEscapeCode("setab 0", "background.black");
    getTerminalEscapeCode("setab 1", "background.red");
    getTerminalEscapeCode("setab 2", "background.green");
    getTerminalEscapeCode("setab 3", "background.yellow");
    getTerminalEscapeCode("setab 4", "background.blue");
    getTerminalEscapeCode("setab 5", "background.purple");
    getTerminalEscapeCode("setab 6", "background.cyan");
    getTerminalEscapeCode("setab 7", "background.white");
    getTerminalEscapeCode("setab 9", "background.default");

    getTerminalEscapeCode("bold", "bold");

    getTerminalEscapeCode("sgr0", "default");
})();

// vim:ft=javascript:fdm=marker:fmr={{{,}}}:
