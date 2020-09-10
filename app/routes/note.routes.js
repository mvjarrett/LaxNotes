module.exports = (app) => {
  const notes = require('../controllers/note.controller.js');

  app.get('/', notes.home)

  app.get('/about', notes.about)

  app.get('/new', notes.form)

  app.post('/notes', notes.create);

  app.get('/notes', notes.findAll);

  app.get('/notes/:noteId', notes.findOne);

  app.put('/notes/:noteId', notes.update)

  app.delete('/notes/:noteId', notes.delete)

  app.get('/notes/delete/:noteId', notes.delete)

  app.get('/notes/edit/:noteId', notes.editForm)

}

