import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoListApi } from './api';

export function useToggleTodo() {
    const queryClient = useQueryClient();

    const updateTodoMutation = useMutation({
        mutationFn: async (newTodo: {
            id: string;
            done: boolean;
        }) => {
            console.log('Mutation started:', newTodo);
            const result = await todoListApi.updateTodo(newTodo);
            console.log('Mutation finished:', result);
            return result;
        },
        onMutate: async (newTodo) => {
            console.log('onMutate start:', newTodo);

            await queryClient.cancelQueries({
                queryKey: [todoListApi.baseKey],
            });

            console.log('Queries cancelled');

            const previousTodos = queryClient.getQueryData(
                todoListApi.getTodoListQueryOptions().queryKey
            );

            console.log('Previous todos:', previousTodos);
            console.log(
                'todoListApi.getTodoListQueryOptions().queryKey',
                todoListApi.getTodoListQueryOptions().queryKey
            );

            queryClient.setQueryData(
                todoListApi.getTodoListQueryOptions().queryKey,
                (old) => {
                    console.log('Old data before update:', old);

                    if (!Array.isArray(old)) {
                        console.error(
                            'Old data is not an array:',
                            old
                        );
                        return old; // Возвращаем старые данные без изменений
                    }

                    return old.map((todo) =>
                        todo.id === newTodo.id
                            ? { ...todo, ...newTodo }
                            : todo
                    );
                }
            );

            console.log('Optimistic update applied');

            return { previousTodos };
        },
        onError: (_, __, context) => {
            if (context) {
                queryClient.setQueryData(
                    todoListApi.getTodoListQueryOptions().queryKey,
                    context.previousTodos
                );
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [todoListApi.baseKey],
            });
        },
    });

    const toggleTodo = (id: string, done: boolean) => {
        console.log('toggleTodo');
        updateTodoMutation.mutate({
            id,
            done: !done,
        });
    };

    return {
        toggleTodo,
    };
}
