"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

;

(function ($) {
  'use strict';

  var methods = {
    init: function init(options) {
      var settings = $.extend({
        btnSelector: '[data-tabs]',
        onShow: function onShow() {}
      }, options);
      var $tabButtons = this.find(settings.btnSelector);
      var tabsData = {};
      if ($tabButtons.length === 0) return;
      $tabButtons.each(function () {
        tabsData[$(this).data('tabs')] = {
          button: $(this),
          content: $('#' + $(this).data('tabs')),
          activated: false
        };
      });

      if (this.find(settings.btnSelector + '.active').data('tabs')) {
        methods.show(this.find(settings.btnSelector + '.active').data('tabs'), tabsData, settings);
      } else {
        methods.show(this.find(settings.btnSelector).first().data('tabs'), tabsData, settings);
      }

      $tabButtons.on('click', function () {
        methods.show($(this).data('tabs'), tabsData, settings);
        return false;
      });
    },
    show: function show(tabId, tabsData, settings) {
      for (var i in tabsData) {
        if (tabsData.hasOwnProperty(i)) {
          tabsData[i].content.hide();
          tabsData[i].button.removeClass('active');
        }
      }

      if (tabId in tabsData) {
        tabsData[tabId].content.show();
        tabsData[tabId].button.addClass('active');

        if (tabsData[tabId].activated === false) {
          for (var j in tabsData) {
            if (tabsData.hasOwnProperty(j)) {
              tabsData[j].activated = j === tabId;
            }
          }

          settings.onShow(tabsData[tabId].content);
        }
      }
    }
  };

  $.fn.customTabs = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (_typeof(method) === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('The method named ' + method + ' does not exist for jQuery.customTabs');
    }
  };
})(jQuery);