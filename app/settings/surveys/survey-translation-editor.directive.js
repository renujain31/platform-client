module.exports = SurveyTranslationEditor;

SurveyTranslationEditor.$inject = [];
function SurveyTranslationEditor() {
    return {
        restrict: 'E',
        scope: {
            activeLanguage: '=',
            survey:'=',
            defaultLanguage:'='
        },
        controller: SurveyTranslationEditorController,
        template: require('./survey-translation-editor.html')
    };
}

SurveyTranslationEditorController.$inject = ['$scope', 'ModalService','_'];
function SurveyTranslationEditorController($scope, ModalService, _) {
    $scope.openField = openField;

    function openField(field, task) {
        $scope.activeTask = task;
        if (!field.translations[$scope.activeLanguage]) {
            field.translations[$scope.activeLanguage] = {}
        }
        $scope.translateField = field;
        ModalService.openTemplate('<field-translation-editor></field-translation-editor>', 'translations.translate_field', '', $scope, true, true);
    }
}