import { QueryClient } from '@tanstack/vue-query'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60, // 1 минута данные считаются свежими
            retry: 1,
            refetchOnWindowFocus: true,
        },
    },
})