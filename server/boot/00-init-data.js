'use strict';



module.exports = function (app) {
  var Note = app.models.Note;

  function loadDefaults() {
    console.error('Creating default notes');

    var notes = [
      {
        title: 'Note title 1',
        body: 'Body 1'
      }, {
        title: 'Note title 2',
        body: 'Body 2'
      }
    ];

    notes.forEach(function (note) {
      Note.create(note, function (err) {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  loadDefaults();
};
