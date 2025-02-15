import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../shared/api/queryClient';
import { TodoList } from '../modules/todoList/TodoList';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <TodoList />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
