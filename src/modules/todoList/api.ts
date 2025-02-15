const BASE_URL = 'http://localhost:3000';

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
    getTodoList: (
        { page }: { page: number },
        { signal }: { signal: AbortSignal }
    ) => {
        return fetch(`${BASE_URL}/tasks?_page=${page}&_per_page=10`, {
            signal,
        }).then((res) => res.json() as Promise<PaginatedResult<TodoDto>>);
    },
};
