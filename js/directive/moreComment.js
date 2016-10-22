/**
 * Created by qingyun on 16/10/15.
 */
angular.module('starter')
    .directive('moreComment', ['dataService', function (dataService) {
        return {
            restrict: 'AE',
            scope: {
                data: '='
            },

            template: '<div id="hot-floor" >' +
            '<div class="hot-new-com">热门跟帖</div>'+
            '</div>',

            link: function (scope, ele, attr) {
                    var num = scope.data.commentIds;
                    var newsC = scope.data.comments;
                    var container=document.getElementById('hot-floor');
                    dataService.commentFloor(container,num,newsC);
            }
        };
    }])
    .directive('newComment',['dataService',function (dataService) {
        return{
            restrict: 'AE',
            scope: {
                data: '='
            },
            template:'<div id="new-floor" >' +
            '<div class="hot-new-com">最新跟贴</div>'+
            '</div>',
            link:function (scope) {
                var num=scope.data.commentIds;
                var newsC=scope.data.comments;
                var container=document.getElementById('new-floor');
                dataService.commentFloor(container,num,newsC)
            }
        }
    }])

