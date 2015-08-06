
var RadialColorPicker = RadialColorPicker || {};

var startDemo;
(function () {

    startDemo = function () {

        var lightColors = [];
        for(var i=0; i < 360; i = i + 60) {
            lightColors.push($.husl.toHex(i, 76, 80));
        }

        var darkColors = [[],[]];
        for(var i=0; i < 360; i = i + 45) {
            darkColors[0].push($.husl.toHex(i, 100, 75));
            darkColors[1].push($.husl.toHex(i, 100, 55));
        }

        $('button').click(function () {

            var picker = new RadialColorPicker({container: $('.target1'), colors: lightColors});
            var picker2 = new RadialColorPicker({container: $('.target2'), colors: darkColors});

        });

    };

})();