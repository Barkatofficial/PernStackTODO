const pool = require("../database/db")


//routes todos/add
exports.addTodo = async (req, res) => {
      try {
        console.log(req.body)
        const { todo_name,todo_description,u_id} = req.body;
        const newTodo = await pool.query(
          "INSERT INTO todo (todo_name,todo_description,u_id) VALUES($1,$2,$3) RETURNING *",
          [todo_name,todo_description,u_id]
        );
        res.json(newTodo.rows[0]);
      } catch (err) {
        console.error(err.message);
      }
}


//routes /todos
exports.getTodos = async (req, res) => {
    try {
      // const allTodos = await pool.query("SELECT * FROM todo order by t_id desc");
      const { id } = req.params;
      const allTodos = await pool.query("SELECT * FROM todo WHERE u_id = $1",[id]);
      res.json(allTodos.rows);
    } catch (err) {
      console.error(err.message);
    }
};
  

// get a todo
//routes /todos/:id
exports.getTodo = async (req, res) => {
  console.log("hited get todo")
    try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM todo WHERE t_id = $1", [
        id
      ]);
      res.json(todo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
};


//update a todo
//routes /todos/:id

exports.updateTodo = async (req, res) => {
    try {
      const { id } = req.params;
      const { todo_name,todo_description } = req.body;
      const updateTodo = await pool.query(
        "UPDATE todo SET todo_description = $1,todo_name = $2 WHERE t_id = $3",
        [todo_description,todo_name, id]
      );
      res.json("Todo was updated!");
    } catch (err) {
      console.error("update errror",err.message);
    }
  };


//delete a todo
//routes /todos/:id
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE t_id = $1", [
      id
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
};

