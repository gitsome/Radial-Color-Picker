
var Radial = Radial || {};


var RadialColorPicker;
(function () {

    var options_default = {
        selectedColor: false, // (optional) the selected color coming in if there is one
        container: false, // the element where we should inject
        colors: [],
        colorSelected: $.noop
    };

    RadialColorPicker = function (options_in) {

        var that = this;
        var options = $.extend({}, options_default, options_in, true);

        /*============ PRIVATE VARIABLES AND METHODS ============*/


        /*============ PUBLIC METHODS ============*/

        /*============ INITIALIZATION ============*/

        // build the template
        var $picker = $('<span class="radial-color-picker" style="width:100%; height: 100%; display: inline-block;"></span>');

        // append the template
        options.container.html('').append($picker);

        // build the shapes
        var shapes = [];
        var arc = Radial.shapes.arc({cornerRadius: 0});

        var addColorLevel = function (colors, level, totalLevels) {
            levelCounts[level] = colors.length;
            for(var i=0; i < colors.length; i++) {

                var isOuterLevel = level === totalLevels - 1;

                var inner       = 0.0;
                var outer       = 0.0;
                var angle       = i * (360 / colors.length);
                var arcLength   = (360 / colors.length);

                shapes.push({
                    id: level + '-' + i,
                    path: arc,
                    group: level,
                    groupIndex: i,
                    color: colors[i],
                    stroke: '#fff',
                    strokeWidth: 5,
                    angle: angle,
                    arcLength: arcLength,
                    inner: inner,
                    outer: outer
                });
            }
        };

        var levelCounts = {};
        var hasMultipleLevels = typeof options.colors[0] !== 'string';
        var outerGroups = [];
        var innerGroups = [];
        if(!hasMultipleLevels) {
            addColorLevel(options.colors, 0, 1);
        } else {
            for(var j=0; j < options.colors.length; j++) {
                if(j < options.colors.length - 1) {
                    innerGroups.push(j);
                } else {
                    outerGroups.push(j);
                }
                innerGroups.push(j);
                addColorLevel(options.colors[j], j, options.colors.length);
            }
        }

        // start the workflow
        var radial = new Radial($picker, shapes, {
            padding: 10,
            mousedown: function (d, shape) {
                var color = $.husl.fromHex(d.color);
                var newColor = $.husl.toHex(color[0], (100 - color[1]) * 0.25 + color[1], (100 - color[2]) * 0.25 + color[2]);
                d3.select(shape).style('fill', newColor);
            },
            mouseup: function (d, shape) {
                d3.select(shape).style('fill', d.color);
            },
            mouseover: function (d, shape) {
                var color = $.husl.fromHex(d.color);
                var newColor = $.husl.toHex(color[0], color[1] * 0.4, 0.4 * color[2]);

                shape.parentNode.parentNode.appendChild(shape.parentNode);
                d3.select(shape).style('stroke', newColor);
            },
            mouseout: function (d, shape) {
                d3.select(shape).style('stroke', d.stroke);
                d3.select(shape).style('fill', d.color);
            },
            click: function (d, shape) {
                options.colorSelected(d.color);
            }
        });

        if(!hasMultipleLevels) {

            radial.transform([{
                transforms:[
                    {type: 'custom', configs: {
                        custom: function () {
                            return {
                                arcLength: function (d, i) {
                                    return (360 / levelCounts[d.group]);
                                },
                                angle: function (d, i) {
                                    return d.groupIndex * (360 / levelCounts[d.group]);
                                }
                            };
                        }
                    }},
                ],
                delay: Radial.DELAY_BY_INDEX,
                speed: 300
            }]);

        } else {

            radial.transform([
                {
                    transforms:[
                        {type: 'custom', configs: {
                            custom: function () {
                                return {
                                    inner: function (d, i) {
                                        return (d.group/options.colors.length) * 0.7 + 0.3;
                                    },
                                    outer: function (d, i) {
                                        return ((d.group + 1)/options.colors.length) * 0.7 + 0.3;
                                    }
                                };
                            }
                        }},
                    ],
                    delay: 0,
                    speed: 300
                }
            ]);
        }

    };

    /*============ STATIC METHODS ============*/


})();