import { useMutation, useQueryClient } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import React from 'react';
import { todoListApi } from './api';

export function useCreateTodo() {
    const queryClient = useQueryClient();
    const createTodoMutation = useMutation({
        mutationFn: todoListApi.createTodo,
        async onSettled() {
            await queryClient.invalidateQueries({
                queryKey: [todoListApi.baseKey],
            });
        },
    });

    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const text = String(formData.get('text') ?? '');
        console.log('text', { formData, text });
        createTodoMutation.mutate({
            id: nanoid(),
            text,
            done: false,
            userId: '1',
        });

        e.currentTarget.reset();
    };

    return { handleCreate, isPanding: createTodoMutation.isPending };
}
