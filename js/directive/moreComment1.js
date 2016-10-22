/**
 * Created by qingyun on 16/10/15.
 */

/*
 *  这则匹配 ng-repeat='' 等号后面的字符串  item in data
 *  var ss= '/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/';
 *
 *     var _floorString = attr.ngFloor;
 var _floorArray = _floorString.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)$/);
 console.log(_floorArray);
 * */
angular.module('starter')
    .directive('ngFloor', ['dataService', function (dataService) {
        return {
            restrict: 'A',
            scope: {
                'data': '='

            },
            templateUrl: 'temp/moreComment1.html',
            transclude: true,
            // template:'<div>{{commentIds}}</div>',
            link: function (scope, ele, attr) {
                // console.log(ele[0]);
                var element = ele[0];
                var scId = scope.data;
                console.log(scId);
                scope.commentIds = scId.commentIds;
                scope.comments = scId.comments;
                floor(scope.commentIds, scope.comments, scope, ele);
                function floor(array, con, scope, ele) {
                    for (var i = 0; i < array.length; i++) {
                        var _container=ele.find('.com-container')[i];
                        var ss = array[i].split(',');
                        if (ss.length >1) {
                            for (var j = 0; j < ss.length; j++) {
                                con[ss[j]].user.nickname = con[ss[j]].user.nickname || '火星网友';
                                con[ss[j]].user.avatar = con[ss[j]].user.avatar || 'img/ionic.png';
                                scope.item = con[ss[j]];
                            }
                        }else {
                            con[ss[0]].user.nickname = con[ss[0]].user.nickname || '火星网友';
                            con[ss[0]].user.avatar = con[ss[0]].user.avatar || 'img/ionic.png';
                            scope.item = con[ss[0]];
                        }
                        _container.insertAdjacentHTML('afterend',_container.outerHTML);
                    }
                }
                
                
            }

        };
    }]);