/**
 * Created by qingyun on 16/9/27.
 */
angular.module('starter')
    .directive('navCard', ['dataService', function (dataService) {
        return {
            restrict: 'A',
            link: function (scope, ele, attr) {
                var span = $(ele).find('span');
                var topicPage = $(ele).next();

                ele.on('click', function (e) {
                    span.hasClass('checked') ?
                        (
                            span.removeClass('checked'),
                                topicPage.css({top: -700 + 'px'})
                        ) : (
                        span.addClass('checked'),
                            topicPage.removeClass('press'),
                            topicPage.css({top:44 + 'px'})
                    )
                });
                $(topicPage).on('touchstart','li',function () {
                    var startT=Date.now(),endT,elapseT;
                    $(this).on('touchend',function () {
                        endT=Date.now();
                        elapseT=endT-startT;
                        if(elapseT>1000){
                            console.log('dddddd')
                            $(topicPage).addClass('press');
                        }
                        $(this).off('touchend')
                    });
                    
                });
                $(topicPage).on('touchstart', 'i', function () {
                    var idx = $(this).parent().attr('data-topicIdx');
                    scope.items.splice(idx,1);
                    scope.$apply();
                })
            }
        }
    }]);