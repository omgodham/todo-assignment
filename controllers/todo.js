const Todo = require("../models/todo");

exports.addTodo = async (req, res) => {
  const todo = new Todo(req.body);
  todo
    .save()
    .then((response) => {
      if (response) return res.status(200).json(response);

      return res.status(404).json({ message: "Todo addition failed" });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Internal Server Error" });
    });
};

exports.getTodos = (req, res) => {
  Todo.find()
    .then((response) => {
      if (response) return res.status(200).json(response);

      return res.status(404).json({ message: "Todo not found" });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Internal Server Error" });
    });
};

exports.updateTodo = (req, res) => {
  Todo.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, useFindAndModify: false }
  )
    .then((response) => {
      if (response) return res.status(200).json(response);

      return res.status(404).json({ message: "Todo updation failed" });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Internal Server Error" });
    });
};
exports.deleteTodo = (req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then((response) => {
      if (response)
        return res.status(200).json({ msg: "Deleted successfully" });
      else return res.status(500).json({ message: "Todo deletion failed" });
    })
    .catch((error) => {
      return res.status(500).json({ message: "Internal Server Error" });
    });
};
