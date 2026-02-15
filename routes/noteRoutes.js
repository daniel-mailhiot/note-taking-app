import express from "express";
import {
  listNotes,
  createNewNote,
  updateNote,
  deleteNote,
  redirectToNewNote,
  redirectToEditNote,
  redirectToDeleteNote
} from "../controllers/noteController.js";

const router = express.Router();

router.get('/', listNotes);
router.get('/new', redirectToNewNote);
router.get('/:id/edit', redirectToEditNote);
router.get('/:id/delete', redirectToDeleteNote);

router.post('/', createNewNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
