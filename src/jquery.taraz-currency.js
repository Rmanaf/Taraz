/**
 * Taraz | Currency Plugin v0.9.0 (https://rmanaf.github.io/taraz/)
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

  $.fn.taraz.currency = function (_this, options) {

    var _proto = $.fn.taraz.currency;

    var defaults = {
      selectors: ['.fix-currency']
    }

    var settings = $.extend({}, defaults, options);

    function _rmsep(txt) {
      return txt.replace(/,/g, '');
    }

    function _ude(e) {

      var _regex;

      _regex = new RegExp('(-?[0-9]+)([0-9]{3})');

      var $e = $(e);
      var txt = $e.text();
      var $inp = $e.is("input");

      if ($inp) {
        txt = $e.val();
        var plch = $e.attr("placeholder");
        if (plch != null && plch.length > 0) {
          plch = _rmsep(plch);

          while (_regex.test(plch)) {
            plch = plch.replace(_regex, '$1,$2');
          }
          $e.attr("placeholder", plch);
        }
      }


      txt = _rmsep(txt);

      while (_regex.test(txt)) {
        txt = txt.replace(_regex, '$1,$2');
      }

      if (!$inp) {
        $e.text(txt);
      } else {
        $e.val(txt);
      }

    }

    function fix(s = null) {
      var temp;

      if (s) {
        if (typeof s == "string") {
          temp = settings.selectors;
          settings.selectors = [s];
        } else if (typeof s == "object") {
          _ude(s[0]);
          return _proto;
        }
      }

      settings.selectors.forEach((s) => {
        $(s).each((i, e) => {
          _ude(e);
        });
      });

      if (s) {
        settings.selectors = temp;
      }

      return _proto;

    }

    fix(_this.hasOwnProperty("jquery") ? null : _this);

  }

  $(document).ready(() => {
    if ($('html').hasClass('auto-fix')) {
      $.fn.taraz("currency");
    }
  });

})(jQuery);