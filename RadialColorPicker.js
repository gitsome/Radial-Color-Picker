
var Radial = Radial || {};


var RadialColorPicker;
(function () {

    var options_default = {
        selectedColor: false, // (optional) the selected color coming in if there is one
        container: false, // the element where we should inject
        colors: []
    };

    RadialColorPicker = function (options_in) {

        var that = this;
        var options = $.extend({}, options_default, options_in, true);

        /*============ PRIVATE VARIABLES AND METHODS ============*/


        /*============ PUBLIC METHODS ============*/

        /*============ INITIALIZATION ============*/

        // build the template
        var $picker = $('<span class="radial-color-picker"></span>');

        // build the shapes
        var shapes = [];
        var arc = Radial.shapes.arc({cornerRadius: 0});
        for(var i=0; i < options.colors.length; i++) {
            shapes.push({
                id: i,
                path: arc,
                color: options.colors[i],
                stroke: '#fff',
                strokeWidth: 5,
                angle: 0,
                arcLength: 0,
                inner: 0.5,
                outer: 1.0
            })
        }

        // load the initial transforms

        // start the workflow
        var radial = new Radial(options.container, shapes, {});

        radial.transform([{
            transforms:[
                {type: 'custom', configs: {
                    custom: function () {
                        return {
                            arcLength: (360 / options.colors.length),
                            angle: function (d, i) {
                                return i * (360 / options.colors.length);
                            }
                        };
                    }
                }},
            ],
            delay: Radial.DELAY_BY_INDEX,
            speed: 300
        }]);

    };

    /*============ STATIC METHODS ============*/


})();