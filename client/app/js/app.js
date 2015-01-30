'use strict';

var app = angular.module('starterApp', ['ngMaterial', 'ngResource', 'lbServices']);

app.config(function ($mdThemingProvider) {

  // Use the 'brown' theme - override default 'blue' theme
  $mdThemingProvider.theme('default')
    .primaryColor('indigo')
    .accentColor('pink');

});

app.controller('AppCtrl', function ($scope, $mdSidenav, $mdBottomSheet, $mdToast, Note) {

  var allNotes = [];

  $scope.selected = null;
  $scope.notes = allNotes;
  $scope.selectNote = selectNote;
  $scope.toggleSidenav = toggleSideNav;
  $scope.showActions = showActions;

  loadNotes();

  function loadNotes() {
    Note.find(function(notes){
      allNotes = notes;
      $scope.notes = [].concat(notes);
      $scope.selected = notes[0];
    });
  }

  function toggleSideNav(name) {
    $mdSidenav(name).toggle();
  }

  function selectNote(note) {
    $scope.selected = angular.isNumber(note) ? $scope.notes[note] : note;
    $scope.toggleSidenav('left');
  }

  function showActions($event) {

    $mdBottomSheet.show({
      parent: angular.element(document.getElementById('content')),
      template: '<md-bottom-sheet class="md-list md-has-header">' +
      '<md-subheader>Note Actions</md-subheader>' +
      '<md-list>' +
      '<md-item ng-repeat="item in vm.items">' +
      '<md-button ng-click="vm.performAction(item)">{{item.name}}</md-button>' +
      '</md-item>' +
      '</md-list>' +
      '</md-bottom-sheet>',
      bindToController: true,
      controllerAs: "vm",
      controller: ['$mdBottomSheet', NoteSheetController],
      targetEvent: $event
    });

    function NoteSheetController($mdBottomSheet) {
      this.items = [
        {name: 'Share', icon: 'share'},
        {name: 'Delete', icon: 'delete'}
      ];
      this.performAction = function (action) {
        $mdBottomSheet.hide(action);
        $mdToast.show(
          $mdToast.simple()
            .content('You clicked ' + action.name)
            .position('bottom center right')
            .hideDelay(3000)
        );
      };
    }
  }


});
