const express = require("express");
const profile = require("../middleware/profile");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

router.get("/notesall", profile, async (req, res) => {
  //   console.log("Hello from the server");
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

router.post(
  "/addnote",
  profile,
  [
    // Validate fields
    body("title", "Title should contain at least 3 characters").isLength({
      min: 3,
    }),
    body(
      "description",
      "Description must be at least 10 characters long and not empty"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    //   console.log("Hello from the server");

    const { title, description, tag } = req.body;
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const new_note = await note.save();
      res.json(new_note);
    } catch (error) {
        
    }
  }
);

router.put(
  "/updatenote/:id",
  profile,
  [
    body("title", "Title should contain at least 3 characters").isLength({
      min: 3,
    }),
    body(
      "description",
      "Description must be at least 10 characters long and not empty"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;

    try {
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      // const note = req.params.id;
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not found!");
      }

      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed!");
      }

      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json(note);
    } catch (error) {}
  }
);

router.delete(
  "/deletenote/:id",
  profile,
  [
    body("title", "Title should contain at least 3 characters").isLength({
      min: 3,
    }),
    body(
      "description",
      "Description must be at least 10 characters long and not empty"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    try {
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      // const note = req.params.id;
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not found!");
      }

      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed!");
      }

      note = await Notes.findByIdAndDelete(req.params.id);
      res.json({ Success: "The Note has been deleted successfully!" });
    } catch (error) {}
  }
);

module.exports = router;
