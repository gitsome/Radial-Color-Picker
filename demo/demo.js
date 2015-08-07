
var RadialColorPicker = RadialColorPicker || {};

var startDemo;
(function () {

    startDemo = function () {

        var lightColors = [];
        for(var i=0; i < 360; i = i + 60) {
            lightColors.push($.husl.toHex(i, 76, 80));
        }

        var darkColors = [[],[]];
        shift = 0;
        for(var i = shift; i < 360 + shift; i = i + 45) {
            darkColors[0].push($.husl.toHex(i%360, 100, 85));
            darkColors[1].push($.husl.toHex(i%360, 100, 60));
        }

        $('.single-color-set').click(function () {
            var picker1 = new RadialColorPicker({container: $('.target1'), colors: lightColors});
        });

        $('.double-color-set').click(function () {
            var picker2 = new RadialColorPicker({container: $('.target2'), colors: darkColors});
        });

    };

})();