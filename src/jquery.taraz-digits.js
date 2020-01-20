/**
 * Taraz | Digits Plugin v0.9.0 (https://rmanaf.github.io/taraz/)
 * Licensed under MIT (https://github.com/Rmanaf/taraz/blob/master/LICENSE)
 */
; (($) => {
    "use strict";

    if (typeof $.fn.taraz === 'undefined') {
        $.fn.taraz = function (e, o) {
            if (!Array.isArray(e)) {
                e = [e];
            }
            e.forEach((el, i) => {
                $.fn.taraz[el](this, o);
            });
            return this;
        }
    }

    $.fn.taraz.digits = function (_this, options) {

        var _proto = $.fn.taraz.digits;

        var defaults = {
            targets: ["digit", "symbol"],
            symbols: [','],
            selectors: {
                digit: ['.fix-digits'],
                symbol: ['.fix-symbols']
            },
            data: [
                {
                    locale: ['en', 'en_US']
                },
                {
                    locale: ['fa', 'fa_IR'],
                    digit: ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"],
                    symbol: { ',': '،' }
                }
            ]
        };

        var settings = $.extend({}, defaults, options);

        function _rep(s, g, l) {

            var dt = settings.data.find((elem) => {
                if (Array.isArray(elem.locale)) {
                    return elem.locale.indexOf(l) > -1;
                } else {
                    return elem.locale === l;
                }
            });

            if(!dt.hasOwnProperty(g)){
                return s;
            }

            var regex = /-/g;

            switch (g) {
                case 'digit':
                    regex = /[0-9](?![^<]*\>)/g;
                    break;
                case 'symbol':
                    regex = /[,](?![^<]*\>)/g;
                    break;
            }

            return s.replace(regex, (match) => {
                return dt[g][match];
            });

        }

        function lng(l) {
            $('html').attr('lang', l);
            return _proto;
        }

        function reg(g, i) {
        }

        function add(g, i) {

            if (typeof i === "string") {
                settings.selectors[g].push(i);
                return this;
            }

            i.forEach(e => {
                settings.selectors[g].push(e);
            });

            return _proto;

        }

        function _ha(e, a) {
            var attr = $(e).attr(a);
            return typeof attr !== typeof undefined && attr !== false
        }

        function _ude(g, e) {

            // get the document language
            var l = $('html').attr('lang');

            var $e = $(e);

            var $inp = $e.is("input");

            var attrs = ['title', 'value', 'alt'];

            if (_ha(e, "lang")) {
                l = $e.attr('lang');
            }

            attrs.forEach((elem) => {
                var v = $e.attr(elem);
                if (typeof v !== typeof undefined && v !== false) {
                    $e.attr(elem, _rep(v, g, l));
                }
            });

            if ($inp) {
                var v = $e.val();
                $e.val(_rep(v, g, l));
            } else {
                var v = $e.html();
                $e.html(_rep(v, g, l));
            }


        }

        function fix(g, t = null) {

            var sel = settings.selectors[g];

            if (t && typeof t == "object") {
                _ude(g, t);
                return _proto;
            }

            for (var s = 0; s < sel.length; s++) {
                $(sel[s]).each((i, e) => {
                    _ude(g, e);
                });
            }

            return _proto;

        }

        settings.targets.forEach((e, i) => {
            fix(e, _this.hasOwnProperty("jquery") ? null : _this);
        });
    }

    $(document).ready(() => {
        if ($('html').hasClass('auto-fix')) {
            $.fn.taraz("digits");
        }
    });

})(jQuery);