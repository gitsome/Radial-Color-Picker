
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

        var addColorLevel = function (colors, level, totalLevels) {
            levelCounts[level] = colors.length;
            for(var i=0; i < colors.length; i++) {
                shapes.push({
                    id: level + '-' + i,
                    path: arc,
                    group: level,
                    groupIndex: i,
                    color: colors[i],
                    stroke: '#fff',
                    strokeWidth: 5,
                    angle: 0,
                    arcLength: 0,
                    inner: (level/totalLevels)* 0.7 + 0.3,
                    outer: ((level + 1)/totalLevels)* 0.7 + 0.3
                });
            }
        };

        var levelCounts = {};
        if(typeof options.colors[0] === 'string') {
            addColorLevel(options.colors, 0, 1);
        } else {
            for(var j=0; j < options.colors.length; j++) {
                addColorLevel(options.colors[j], j, options.colors.length);
            }
        }

        // start the workflow
        var radial = new Radial(options.container, shapes, {});

        radial.transform([{
            transforms:[
                {type: 'custom', configs: {
                    custom: function () {
                        return {
                            arcLength: function (d, i) {
                                return (360 / levelCounts[d.group]);
                            },
                            angle: function (d, i) {
                                console.log("group index:", d.groupIndex);
                                return d.groupIndex * (360 / levelCounts[d.group]);
                            }
                        };
                    }
                }},
            ],
            delay: Radial.DELAY_BY_INDEX,
            speed: 400
        }]);

    };

    /*============ STATIC METHODS ============*/


})();