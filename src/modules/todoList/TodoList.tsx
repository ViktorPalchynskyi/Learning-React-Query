import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { todoListApi } from './api';
import { useState } from 'react';
import classNames from 'classnames';

export function TodoList() {
    const [page, setPage] = useState(1);
    const {
        data: todoItems,
        error,
        isPending,
        isPlaceholderData
    } = useQuery({
        queryKey: ['tasks', 'list', { page }],
        queryFn: (meta) => todoListApi.getTodoList({ page }, meta),
        placeholderData: keepPreviousData,
    });

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>error: {JSON.stringify(error)}</div>;
    }

    return (
        <div className="p-5 mx-auto max-w[1200] mt-10">
            <h1 className="text-3xl font-bold underline">TodoList</h1>
            <div
                className={classNames('flex flex-col gap-4 mt-5', {
                    'opacity-50': isPlaceholderData,
                })}
            >
                {todoItems.data.map(({ id, text }) => (
                    <div
                        className="border border-slate-300 rounded p-3"
                        key={id}
                    >
                        {text}
                    </div>
                ))}
            </div>

            <div className="flex gap-2 mt-4">
                <button
                    onClick={() =>
                        setPage((prev) => Math.max(prev - 1, 1))
                    }
                    className="p-3 rounded border border-teal-500"
                >
                    prev
                </button>
                <button
                    onClick={() =>
                        setPage((prev) =>
                            Math.min(prev + 1, todoItems.pages)
                        )
                    }
                    className="p-3 rounded border border-teal-500"
                >
                    next
                </button>
            </div>
        </div>
    );
}
