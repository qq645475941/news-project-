/**
 * Created by qingyun on 16/9/26.
 */
angular.module('starter')
    .directive('navBar', ['dataService', function (dataService) {
        return {
            restrict: 'E',
            templateUrl: 'temp/navBar.html',
            link: function (scope, ele, attr) {
                dataService.getTopic().then(function (data) {
                    scope.items = data.data.tList;
                });
                ele.on('click', '.item-bar a', function (e) {
                    var a = e.target;
                    $(this).parent().parent().find('a').removeClass('checked');
                    angular.element(a).addClass('checked');
                    var navBar = $(ele).find('.navBar');
                    var left = window.innerWidth / 2 - a.offsetLeft - 160;

                    if (left > 0) {
                        left = 0;
                    }
                    navBar.css({left: left + 'px'});
                })
            }
        }
    }]);