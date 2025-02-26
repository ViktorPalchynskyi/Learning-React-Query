import {
    infiniteQueryOptions,
    queryOptions,
} from '@tanstack/react-query';
import { jsonApiInstance } from '../../shared/api/apiInstance';

export type PaginatedResult<T> = {
    data: T[];
    next: number | null;
    prev: number | null;
    items: number;
    pages: number;
    first: number;
    last: number | null;
};

export type TodoDto = {
    id: string;
    text: string;
    done: boolean;
    userId: string;
};

// Прокидывай AbortSignal чтобы React Query отменял запрос, если пользователь уходил со страницы
export const todoListApi = {
    baseKey: 'task',
    getTodoListQueryOptions: () => {
        return queryOptions({
            queryKey: [todoListApi.baseKey, 'list'],
            queryFn: (meta) =>
                jsonApiInstance<TodoDto[]>(`/tasks`, {
                    signal: meta.signal,
                }),
        });
    },

    getTodoListInfinityQueryOptions: () => {
        return infiniteQueryOptions({
            queryKey: [todoListApi.baseKey, 'list'],
            queryFn: (meta) =>
                jsonApiInstance<PaginatedResult<TodoDto>>(
                    `/tasks?_page=${meta.pageParam}&_per_page=10`,
                    {
                        signal: meta.signal,
                    }
                ),
            initialPageParam: 1,
            getNextPageParam: (result) => result.next,
            select: (result) =>
                result.pages.flatMap((page) => page.data),
        });
    },
    createTodo: (data: TodoDto) => {
        return jsonApiInstance<TodoDto>('/tasks', {
            method: 'POST',
            json: data,
        });
    },
    updateTodo: (id: string, data: Partial<TodoDto>) => {
        return jsonApiInstance<TodoDto>(`/tasks/${id}`, {
            method: 'PATCH',
            json: data,
        });
    },
    deleteTodo: (id: string) => {
        console.log('here', id)
        return jsonApiInstance(`/tasks/${id}`, {
            method: 'DELETE',
        });
    },
};
