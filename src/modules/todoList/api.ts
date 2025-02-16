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
};

// Прокидывай AbortSignal чтобы React Query отменял запрос, если пользователь уходил со страницы
export const todoListApi = {
    getTodoListQueryOptions: ({ page }: { page: number }) => {
        return queryOptions({
            queryKey: ['tasks', 'list', { page }],
            queryFn: (meta) =>
                jsonApiInstance<PaginatedResult<TodoDto>>(`/tasks?_page=${page}&_per_page=10`, {
                    signal: meta.signal,
                }),
        });
    },
    getTodoListInfinityQueryOptions: () => {
        return infiniteQueryOptions({
            queryKey: ['tasks', 'list'],
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
};
