/**
 * Created by qingyun on 16/9/26.
 */
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngSanitize'])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    }).config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home/topicList/T1348647853363");
    $stateProvider

        .state('home', {
            abstract: true,
            url: '/home',
            templateUrl: 'temp/home.html'

        })
        .state('home.topicList', {
            url: '/topicList/:id',
            views: {
                'home': {
                    templateUrl: 'temp/list2.html',
                    controller: function ($stateParams, dataService, $scope) {
                        var id = $stateParams.id;

                        dataService.getTopicList.getTopicLists(id).then(function (data) {
                            $scope.items = data.data[id];
                        });
                        $scope.doRefresh = function () {
                            dataService.getTopicList.getTopicLists(id).then(function (data) {
                                $scope.items = data.data[id];
                                $scope.$broadcast('scroll.refreshComplete');
                            });
                        }

                        dataService.getTopicList.setReqState(false);
                        $scope.loadMore = function () {
                            dataService.getTopicList.getNextTopicList(id).then(function (data) {
                                var items = data.data[id];
                                $scope.items = ($scope.items || []).concat(items);
                                $scope.$broadcast('scroll.infiniteScrollComplete');
                                dataService.getTopicList.setReqState(false);
                            })
                        };
                    }
                }
            }

        })
        .state('topicDetail', {
            url: '/topicDetail/:id',
            templateUrl: 'temp/detail.html',
            controller: function ($stateParams, dataService, $scope, $sce) {
                var id = $stateParams.id;
                $scope.id = id;
                console.log($scope.id);
                dataService.getHostComment.getComment(id).then(function (data) {
                    $scope.commentIds = data.data.commentIds;
                    $scope.comments = data.data.comments;
                    $scope.hostcomment = [];
                    var ids = $scope.commentIds;

                    for (var i = 0; i < ids.length; i++) {
                        (ids[i].split(',').length == 1) && ($scope.hostcomment.push($scope.comments[ids[i]]))
                    }
                    $scope.hostcomment.sort(function (x, y) {
                        return x.vote > y.vote ? -1 : 1;
                    })
                    $scope.hostcomment = $scope.hostcomment.slice(0, 3);
                });
                dataService.getTopicDetail.Detail(id).then(function (data) {
                    $scope.news = data.data[id];
                    console.log($scope.news);
                    var REG_img = '<!--IMG#(.*?)?-->';
                    var regExpression = new RegExp(REG_img, 'mg');
                    $scope.htmlBody = (data.data[id].body || '').replace(regExpression, function (a, b) {
                        for (var i = 0; i < data.data[id].img.length; i++) {
                            if (i == b) {
                                b = data.data[id].img[i].src
                            }
                        }
                        return '<img src=' + b + '>';
                    });
                });
            }
        })
        .state('moreComment', {
            url: '/moreComment/:id',
            templateUrl: 'temp/moreComment.html',
            controller: function ($scope, data, newCommentData) {
                $scope.data = data;
                $scope.newCommentData = newCommentData;
                // $scope.moreCommentData=moreCommentData;
            },
            resolve: {
                data: function ($stateParams, dataService) {
                    var id = $stateParams.id;
                    var pro = dataService.getHostComment.getComment(id);
                    return pro.then(function (data) {
                        var commentIds = data.data.commentIds;
                        var comments = data.data.comments;
                        var sss = {
                            commentIds: commentIds,
                            comments: comments
                        };
                        return sss;
                    })
                },
                newCommentData: function ($stateParams, dataService) {
                    var id = $stateParams.id;
                    var pro = dataService.getHostComment.getNewComment(id);
                    return pro.then(function (data) {
                        var commentIds = data.data.commentIds;
                        var comments = data.data.comments;
                        var dataArray = {
                            commentIds: commentIds,
                            comments: comments
                        };
                        return dataArray;
                    })
                }
                // moreCommentData: function ($scope,$stateParams, dataService) {
                //     var id = $stateParams.id;
                //     dataService.getHostComment.setReqState(false);
                //     $scope.loadMore = function () {
                //         var pro = dataService.getHostComment.getMoreComment(id);
                //         return pro.then(function (data) {
                //             var commentIds = data.data.commentIds;
                //             var comments = data.data.comments;
                //             var dataArray = {
                //                 commentIds: commentIds,
                //                 comments: comments
                //             };
                //             return dataArray;
                //         })
                //     }
                // }

            }

        })


    //获取最新跟帖
    // dataService.getHostComment.setReqState(false);
    // dataService.getHostComment.getNewComment(id).then(function (data) {
    //     $scope.newCommentIds = data.data.commentIds;
    //     $scope.newComments = data.data.comments;
    //     $scope.new_comments = [];
    //     var ids = $scope.newCommentIds;
    //     for (var i = 0; i < ids.length; i++) {
    //         (ids[i].split(',').length == 1) && ($scope.new_comments.push($scope.newComments[ids[i]]))
    //     }
    //     console.log($scope.newCommentIds)
    // });
    // dataService.getHostComment.setReqState(false);
    //
    // $scope.loadMore = function () {
    //     ($scope.state != 0) && (dataService.getHostComment.getMoreComment(id).then(function (data) {
    //         var itemIds = data.data.commentIds;
    //         var items = data.data.comments;
    //
    //         var itemMore = [];
    //         var ids = itemIds;
    //         $scope.state = ids.length;
    //         for (var i = 0; i < ids.length; i++) {
    //             (ids[i].split(',').length == 1) && (itemMore.push(items[ids[i]]))
    //         }
    //         $scope.new_comments = ($scope.new_comments||[]).concat(itemMore);
    //         $scope.$broadcast('scroll.infiniteScrollComplete');
    //         dataService.getHostComment.setReqState(false);
    //     }))
    // };

    // }


});
// .state('home', {
//     url: '/',
//     templateUrl: 'temp/list2.html'
// })
// $urlRouterProvider.otherwise('/')

