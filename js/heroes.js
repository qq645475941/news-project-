function HeroService($q, $http) {


  var offset = 0;
  var size = 10;
  var id;

  var isRequesting = false;

  this.getHeroes = function () {
    var url = '/163/getSubDocPic?from=toutiao&fn=1&prog=LMA1&passport=&devId=xoedrIW%2B3Rt4l8pUvGdOEKpf1EYb5T9gRf4fBOGROoFb3mnQy%2F8LrNIu7bfDsCH%2B&offset=' + offset + '&size='
      + size + '&version=15.1&spever=false&net=wifi&lat=34qUv%2FiF8%2BeVafFPTTydOQ%3D%3D&lon=J3FWwuNJ4%2FX4l6tN03aQxg%3D%3D&ts=1474183347&sign=8gjKE6Eq98IRhHe3q%2B%2FWkspM8xdvXbcOMDCWpbUFa4548ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore';


    return $http.get(url)
  }

  /**
   * 获取下 10(size)条数据
   */
  this.getNext = function () {

    if (!isRequesting) {
      isRequesting = true;
      offset += size;
      return this.getHeroes();
    }
  }

  this.getNewDetail = function (id) {
    var detailUrl = '/163detail/' + id + '/full.html';
    return $http.get(detailUrl);
  }


  this.setReqState = function (state) {
    isRequesting = state;
  }
  this.getHero = function (id) {
    return heroesPromise.then(function (heroes) {
      for (var i = 0; i < heroes.length; i++) {
        if (heroes[i].id === id) return heroes[i];
      }
    });
  };
}

angular.module('starter')
  .service('heroService', HeroService)
  .controller('newes', ['heroService', '$scope', function (heroService, $scope) {
    $scope.items = [];

    heroService.getNext().then(function (data) {
      var items = data.data.tid;
      $scope.items = items;

    })
    heroService.setReqState(false);
    $scope.loadMore = function () {
      heroService.getNext().then(function (data) {
        var items = data.data.tid;
        $scope.items = $scope.items.concat(items);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        heroService.setReqState(false);
      })
    };

    $scope.share = function(){}
    $scope.edit = function(){}

  }])

