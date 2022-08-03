const express = require('express');
const {addTodo , getTodos ,getTodo ,updateTodo , deleteTodo} = require('../controller/todo_controller')


// const router = express.Router({ mergeParams: true });
const router = express.Router();

//routes
router.route('/:id').get(getTodos);
router.route('/add').post(addTodo);
router.route('/:id')
      .put(updateTodo)
      .delete(deleteTodo);
router.route('/single/:id').get(getTodo)

module.exports = router;
