
var RadialColorPicker = RadialColorPicker || {};

var startDemo;
(function () {

    startDemo = function () {

        var lightColors = [];
        for(var i=0; i < 360; i = i + 60) {
            lightColors.push($.husl.toHex(i, 76, 80));
        }



        $('.single-color-set').click(function () {
            var picker1 = new RadialColorPicker({container: $('.target1'), colors: lightColors});
        });

        $('.double-color-set').click(function () {
            var darkColors = [[],[]];
            for(var i = 0; i < 360 + 0; i = i + 45) {
                darkColors[0].push($.husl.toHex(i%360, 100, 85));
                darkColors[1].push($.husl.toHex(i%360, 100, 60));
            }
            var picker2 = new RadialColorPicker({
                container: $('.target2'),
                colors: darkColors,
                colorSelected: function (color) {
                    console.log("COLOR:", color);
                }
            });
        });

    };

})();