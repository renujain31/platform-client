module.exports = ShareMenuDirective;

ShareMenuDirective.$inject = [];
function ShareMenuDirective() {
    return {
        restrict: 'E',
        scope: {
            filters: '=',
            surveyId: '=',
            postId: '='
        },
        replace: true,
        controller: ShareMenuController,
        template: require('./share-menu.html')
    };
}

ShareMenuController.$inject = [
    '$scope',
    '$rootScope',
    '$routeParams',
    'Util',
    '$window'
];
function ShareMenuController(
    $scope,
    $rootScope,
    $routeParams,
    Util,
    $window
) {

    $scope.loading = false;
    $scope.shareUrl = Util.currentUrl();
    $scope.canExport = canExport;

    activate();

    function activate() {
        // If we are in a post action menu
        // Then we have to change the url to ensure that when
        // selected from either the map or timeline view for
        // an individual post that the URL is correct
        if ($scope.postId) {
            $scope.shareUrl = $window.location.origin + '/posts/' + $scope.postId;
        }

        if ($scope.surveyId) {
            $scope.shareUrl = $window.location.origin + '/posts/create/' + $scope.surveyId;
        }

        $scope.shareUrlEncoded = encodeURIComponent($scope.shareUrl);
    }
    // Check if current view is exportable based on URI
    function canExport() {
        // UCHAGUZI only: guests cannot export
        if (!$rootScope.currentUser || $window.location.href.indexOf('post') > 0) {
            return false;
        }
        return true;
    }
}
