import { useQuery } from '@tanstack/react-query';
import { authApi } from './api';
import { useAppSelector } from '../../shared/store';
import { authSlice } from './auth.slice';

export function useUser() {
    const userId = useAppSelector(authSlice.selectors.userId);

    return useQuery({
        ...authApi.getUserById(userId),
        enabled: Boolean(userId),
    });
}
