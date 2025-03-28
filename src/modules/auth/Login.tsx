import { useDispatch } from 'react-redux';
import { loginThunks, useLoginLoading } from './login-thunk';
import { useAppSelector } from '../../shared/store';
import { authSlice } from './auth.slice';

export function Login() {
    const dispatch = useDispatch();
    const loginError = useAppSelector(authSlice.selectors.loginError);
    const isLoading = useLoginLoading();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        dispatch(
            loginThunks(
                formData.get('login')?.toString() ?? '',
                formData.get('password')?.toString() ?? ''
            )
        );
    };

    return (
        <div className="p-5 border border-slate-500 rounded-lg container mx-auto mt-10">
            <form
                className="flex flex-col gap-5"
                onSubmit={handleSubmit}
            >
                <h1 className="text-bold text-xl">Login</h1>
                <input
                    className="p-5 rounded border border-slate-500"
                    name="login"
                ></input>
                <input
                    className="p-5 rounded border border-slate-500"
                    name="password"
                ></input>

                {loginError && (
                    <div className="bg-rose-500 text-white p-3 rounded">
                        {loginError}
                    </div>
                )}

                <button
                    disabled={isLoading}
                    className="p-5 rounded bg-teal-500 text-white disabled:bg-slate-300 disabled:bg-stale-300"
                    type="submit"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
