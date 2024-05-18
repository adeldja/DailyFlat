import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const TodoItem = ({ todo }) => {
  const updateTodo = async (todoId, completed) => {
    try {
      // Récupérer la todo dans la collection todos.
      const currentTodo = doc(db, 'todos', todoId);
      // Mettre à jour la todo dans la collection todos avec le completed.
      await updateDoc(currentTodo, { completed: completed });
    } catch (err) {
      console.error('UpdateTodoError ->', err);
    }
  }

  const deleteTodo = async todoId => {
    try {
      // Récupérer la todo dans la collection todos.
      const currentTodo = doc(db, 'todos', todoId);
      // Supprimer la todo dans la collection todos.
      await deleteDoc(currentTodo);
    } catch (err) {
      console.error('DeleteTodoError ->', err);
    }
  }

  return (
    <li key={todo.id}>
      {todo.name} - {todo.completed ? 'À Refaire' : ' À Cuisiner'}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => updateTodo(todo.id, !todo.completed)}
      />
      <button onClick={() => deleteTodo(todo.id)}>Supprimer</button>
    </li>
  );
}

export default TodoItem;
