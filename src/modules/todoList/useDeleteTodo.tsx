import { useMutation, useQueryClient } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import React from 'react';
import { todoListApi } from './api';

export function useDeleteTodo() {
    const queryClient = useQueryClient();
    const deleteTodoMutation = useMutation({
        mutationFn: todoListApi.deleteTodo,
        onSettled() {
            queryClient.invalidateQueries({
                queryKey: [todoListApi.baseKey],
            });
        },
    });

    const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const text = String(formData.get('text') ?? '');
        console.log('text', { formData, text });
        deleteTodoMutation.mutate({
            id: nanoid(),
            text,
            done: false,
            userId: '1',
        });

        e.currentTarget.reset();
    };

    return { handleDelete, isPanding: deleteTodoMutation.isPending };
}
