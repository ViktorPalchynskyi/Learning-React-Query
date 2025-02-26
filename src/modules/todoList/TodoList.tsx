import { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import useTodoList from './useTodoList';

export function TodoList() {
    const { error, todoItems, isLoading, cursor } = useTodoList();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>error: {JSON.stringify(error)}</div>;
    }

    return (
        <div className="p-5 mx-auto max-w[1200] mt-10">
            <h1 className="text-3xl font-bold underline">TodoList</h1>
            <div className={classNames('flex flex-col gap-4 mt-5')}>
                {todoItems?.map(({ id, text }) => (
                    <div
                        className="border border-slate-300 rounded p-3"
                        key={id}
                    >
                        {text}
                    </div>
                ))}
            </div>
            {cursor}
        </div>
    );
}
