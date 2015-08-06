

var RadialColorPicker = RadialColorPicker || {};

var startDemo;
(function () {

    startDemo = function () {

        var lightColors = [];
        var lighterColors = [];
        for(var i=0; i < 360; i = i + 60) {
            lightColors.push($.husl.toHex(i, 76, 80));
            lighterColors.push($.husl.toHex(i, 50, 50));
        }

        $('button').click(function () {

            var picker = new RadialColorPicker({container: $('.target1'), colors: lightColors});
            var picker2 = new RadialColorPicker({container: $('.target2'), colors: lighterColors});

        });

    };

})();