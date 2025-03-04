import { queryClient } from '../../shared/api/queryClient';
import { AppThunk } from '../../shared/store';
import {
    MutationObserver,
    useMutation,
    useMutationState,
} from '@tanstack/react-query';
import { authApi } from './api';
import { authSlice } from './auth.slice';

export const loginThunks =
    (login: string, password: string): AppThunk =>
    async (dispatch) => {
        const mutationResult = await new MutationObserver(
            queryClient,
            {
                mutationKey: ['login'],
                mutationFn: authApi.loginUser,
            }
        ).mutate({ login, password });

        console.log('mutationResult', mutationResult);
        if (mutationResult) {
            dispatch(
                authSlice.actions.addUser({
                    userId: mutationResult.id,
                })
            );

            queryClient.setQueriesData(
                authApi.getUserById(mutationResult.id).queryKey,
                mutationResult
            );
            localStorage.setItem('userId', mutationResult.id);
        }

        dispatch(
            authSlice.actions.setError('Password or login incorrect')
        );
    };

export const useLoginLoading = () =>
    useMutation({ mutationKey: ['login'] }).isPending;
