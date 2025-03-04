import classNames from 'classnames';
import useTodoList from './useTodoList';
import { useCreateTodo } from './useCreateTodo';
import { useDeleteTodo } from './useDeleteTodo';
import { useToggleTodo } from './useToggleTodo';

export function TodoList() {
    const { error, todoItems, isLoading, cursor } = useTodoList();
    const { handleCreate, isPanding } = useCreateTodo();
    const { handleDelete, getIspanding } = useDeleteTodo();
    const { toggleTodo } = useToggleTodo();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>error: {JSON.stringify(error)}</div>;
    }

    return (
        <div className="p-5 mx-auto max-w[1200] mb-10">
            <h1 className="text-3xl font-bold underline mb-5">
                TodoList
            </h1>

            <form className="flex gap-2 mb-5" onSubmit={handleCreate}>
                <input
                    type="text"
                    name="text"
                    className="rounded p-2 border border-teal-500"
                />
                <button
                    disabled={isPanding}
                    className="rounded p-2 border border-teal-500 disabled:opacity-50 cursor-pointer"
                >
                    Create
                </button>
            </form>

            <div className={classNames('flex flex-col gap-4 mt-5')}>
                {todoItems?.map(({ id, text, done }) => (
                    <div
                        className="border border-slate-300 rounded p-3 flex justify-between"
                        key={id}
                    >
                        <input
                            type="checkbox"
                            className="cursor-pointer"
                            checked={done}
                            onChange={() => toggleTodo(id, done)}
                        />

                        {text}
                        <button
                            disabled={getIspanding(id)}
                            onClick={() => handleDelete(id)}
                            className="text-rose-500 font-bold disabled:text-rose-300 cursor-pointer"
                            type="button"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
            {cursor}
        </div>
    );
}
