const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all the notes: GET "/api/notes/fetchallnotes" , login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  //using fetchuser middleware to get user details
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

// ROUTE 2: Add a new note: POST "/api/notes/addnote" ,login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("desc", "Desc must be at least 5 chracters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //using fetchuser middleware to get user details
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    try {
      //writing Notes to database
      const newNote = await Notes.create({
        title: req.body.title,
        desc: req.body.desc,
        tag: req.body.tag,
        user: req.user.id,
      });
      res.json(newNote);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Update an existing note: PUT "/api/notes/updatenote" ,login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  //using fetchuser middleware to get user details
  const { title, desc, tag } = req.body;
  try {
    // Create a new note
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (desc) {
      newNote.desc = desc;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Making the code hackproof
    // Find the note and update it
    let note = await Notes.findById(req.params.id); //we get the id from the endpoint
    // checking if the note exists of not
    if (!note) {
      return res.status(404).send("Note not found");
    }

    // Checking if the user updating the note is authorised or note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorised User");
    }

    // If the note exists and the user is valid then we can update the note
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: Delete an existing note: DELETE "/api/notes/deletenote" ,login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  //using fetchuser middleware to get user details

  try {
    // Making the code hackproof
    // Find the note and delete it
    let note = await Notes.findById(req.params.id); //we get the id from the endpoint
    // checking if the note exists of not
    if (!note) {
      return res.status(404).send("Note not found");
    }

    // Checking if the user deleting the note is authorised or note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorised User");
    }

    // If the note exists and the user is valid then we can delete the note
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "This note has been deleted", note: note });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
