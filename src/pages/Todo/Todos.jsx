import { useContext, useEffect, useState } from "react";
import { db } from "../../../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import TodoItem from "../../components/Todo/TodoItem";
import { AuthContext } from "../../provider/AuthProvider";
import '../../assets/Todo/Todo.css';

const Todos = () => {
    const [todoToAdd, setTodoToAdd] = useState('');
    const [todos, setTodos] = useState([]);

    const { state: { userInfos } } = useContext(AuthContext);

    const getTodosFromFirestore = async () => {
        const collectionTodos = collection(db, 'todos');
        const datas = await getDocs(collectionTodos);

        setTodos(datas.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }

    const addTodo = async () => {
        await addDoc(collection(db, 'todos'), {
            name: todoToAdd,
            userId: userInfos.uid,
            completed: false
        })
        .then(() => setTodoToAdd(''))
        .catch(err => console.log(err));
    }

    useEffect(() => {
        getTodosFromFirestore();
    }, [todos]);

    return (
        <div className="todos-container">
            <h1>Todos</h1>
            <label>
                Nom du plat : 
            </label>
            <input type="text" value={todoToAdd} onChange={e => setTodoToAdd(e.target.value)} />

            <button
                onClick={() => addTodo()}
                disabled={null === todoToAdd || todoToAdd?.length === 0}
                className="add-button"
            >
                Ajouter
            </button>

            <ul className="todo-list">
                {todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </ul>
        </div>
    );
}

export default Todos;
