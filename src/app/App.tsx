import { Login } from '../modules/auth/Login';
import { useUser } from '../modules/auth/use-user';
import { TodoList } from '../modules/todoList/TodoList';

export function App() {
    const user = useUser();

    if (user.isLoading) {
        return <div>Loading</div>;
    }

    if (user.data) {
        return <TodoList />;
    }

    return <Login />;
}
