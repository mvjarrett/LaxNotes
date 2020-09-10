const Note = require('../models/note.model');

//=============================================================
// TODO: refactor this entire file with the following setup:==
//=============================================================
// const funcs = {
//   create(req, res) {
//     // some stuff
//   },

//   findAll(req,res) {
//     //some stuff
//   }
// }

// export default funcs;


//create and save new note
exports.create = (req, res) => {
  //validate request
  if(!req.body.content) {
    return res.status(400).send({
      message: 'Your note cannot be empty! Write some content!'
    })
  };

  //create a note
  const note = new Note({
    title: req.body.title || 'Untitled Note',
    content: req.body.content
  });

  //Save note to db
  note.save()
  .then(data => {
    res.redirect('/notes');
  }).catch(err => {
    res.status(500).send({
      message: err.message || "An error occured while creating the note"
    });
  });
};

//retrieve all notes from the db
exports.findAll = (req, res) => {
  Note.find()
  .then(notes => {
    res.render('index', {notes: notes});
    res.send(notes)
  }).catch(err => {
    res.status(500).send({
      message: err.message || "An error occured while retrieving notes"
    });
  });
};

//find a single note with an ID
exports.findOne = (req, res) => {
  Note.findById(req.params.noteId)
  .then(notes => {
    res.render('fullNote', {note: notes});
    if(!note) {
      return res.stats(404).send({
        message: "Note not found under ID " + req.params.noteId
      })
    }
    res.send(note);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "Note not found under ID " + req.params.noteId
      });
    }
    return res.status(500).send({
      message: "Error retrieving note with id " + req.params.noteId
    });
  });
};

//load edit page with data from one specific note
exports.editForm = (req, res) => {
  Note.findById(req.params.noteId)
  .then(notes => {
    res.render('edit', {note: notes});
    if(!note) {
      return res.stats(404).send({
        message: "Note not found under ID " + req.params.noteId
      })
    }
    res.send(note);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "Note not found under ID " + req.params.noteId
      });
    }
    return res.status(500).send({
      message: "Error retrieving note with id " + req.params.noteId
    });
  });
};

//update a note identified by its ID in the request
exports.update = (req, res) => {
  if(!req.body.content) {
    return res.status(400).send({
      message: "Note body cannot be empty!"
    });
  }
  //find note and update it with the request body
  Note.findByIdAndUpdate(req.params.noteId, {
    title: req.body.title || "Untitled Note",
    content: req.body.content
  }, {new: true})
  .then(note => {
    res.redirect("/notes");
    if(!note) {
      return res.status(404).send({
        message: "Note not found with id " + req.params.noteId
      });
    }
    res.send(note);
  }).catch(err => {
    if(err.kind === 'ObjectID') {
      return res.status(404).send({
        message: "Note not found with id " + req.params.noteId
      });
    }
    return res.status(500).send({
      message: "Error updating note with id " + req.params.noteId
    })
  })
};

//delete a note via ID
exports.delete = (req, res) => {
  Note.findByIdAndRemove(req.params.noteId)
  .then(note => {
    if(!note) {
      return res.status(404).send({
        message: "Note not found with id " + req.params.noteId
      });
    }
    res.redirect("/notes");
}).catch(err => {
  if(err.kind === 'ObjectId' || err.name === 'NotFound') {
    return res.status(404).send({
      message: "Note not found with id " + req.params.noteId
    });
  }
  return res.status(500).send({
    message: "Could not delete note with id " + req.params.noteId
  });
});
};

exports.home = (req, res) => {
  res.redirect("/notes")
  };


exports.about = (req, res) => {
    res.render("about")
    };

exports.form = (req, res) => {
  res.render('newNote');
}