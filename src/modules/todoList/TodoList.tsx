import { useInfiniteQuery } from '@tanstack/react-query';
import { todoListApi } from './api';
import { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';

export function TodoList() {
    const [enabled, setEnable] = useState(false);
    const {
        data: todoItems,
        error,
        isLoading,
        status,
        fetchStatus,
        isPlaceholderData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        enabled,
        ...todoListApi.getTodoListInfinityQueryOptions(),
    });
    const cursorRef = useIntersection(() => {
        fetchNextPage();
    });

    console.log({ status, fetchStatus });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>error: {JSON.stringify(error)}</div>;
    }

    return (
        <div className="p-5 mx-auto max-w[1200] mt-10">
            <h1 className="text-3xl font-bold underline">TodoList</h1>
            <button onClick={() => setEnable((e) => !e)}>
                Toggle enabled
            </button>
            <div
                className={classNames('flex flex-col gap-4 mt-5', {
                    'opacity-50': isPlaceholderData,
                })}
            >
                {todoItems?.map(({ id, text }) => (
                    <div
                        className="border border-slate-300 rounded p-3"
                        key={id}
                    >
                        {text}
                    </div>
                ))}
            </div>

            <div className="flex gap-2 mt-4" ref={cursorRef}>
                {!hasNextPage && <div>No data</div>}
                {isFetchingNextPage && <div>Loading...</div>}
            </div>
        </div>
    );
}

export function useIntersection(onItersect: () => void) {
    const unsibscribe = useRef(() => {});

    return useCallback((el: HTMLDivElement | null) => {
        const observer = new IntersectionObserver((enteries) => {
            enteries.forEach((intersection) => {
                if (intersection.isIntersecting) {
                    onItersect();
                }
            });
        });

        if (el) {
            observer.observe(el);
            unsibscribe.current = () => observer.disconnect;
        } else {
            unsibscribe.current();
        }
    }, []);
}
