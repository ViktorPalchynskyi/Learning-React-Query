import { useInfiniteQuery } from '@tanstack/react-query';
import { todoListApi } from './api';
import { useCallback, useRef } from 'react';

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

export default function useTodoList() {
    const {
        data: todoItems,
        error,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
    } = useInfiniteQuery({
        ...todoListApi.getTodoListInfinityQueryOptions(),
    });
    const cursorRef = useIntersection(() => {
        fetchNextPage();
    });

    const cursor = (
        <div className="flex gap-2 mt-4" ref={cursorRef}>
            {!hasNextPage && <div>No data</div>}
            {isFetchingNextPage && <div>Loading...</div>}
        </div>
    );

    return {
        error,
        todoItems,
        isLoading,
        cursor,
        refetch,
    };
}
