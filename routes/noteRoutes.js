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

// Middleware to protect routes - require login for all /notes routes 
function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.redirect('/auth/login'); // redirect to login page if not authenticated
  }
  next();
}

router.use(requireAuth); // apply authentication middleware to all routes below this line

router.get('/', listNotes);
router.get('/new', redirectToNewNote);
router.get('/:id/edit', redirectToEditNote);
router.get('/:id/delete', redirectToDeleteNote);

router.post('/', createNewNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
