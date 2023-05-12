const express = require("express");
const {
  addTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo");
const router = express.Router();

router.post("/todos", addTodo);
router.get("/todos", getTodos);
router.put("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);

module.exports = router;
