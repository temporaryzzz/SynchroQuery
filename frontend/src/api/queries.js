import { api } from './client'
import { keys } from './keys'

export const queries = {
    projects: {
        list: (userId) => ({
            queryKey: keys.projects.list(userId),
            queryFn: () => api.get('/projects').then(r => r.data),
            enabled: !!userId,
        }),
        tasks: (projectId) => ({
            queryKey: keys.projects.tasks(projectId),
            queryFn: () => api.get(`/tasks?projectId=${projectId}`).then(r => r.data),
            enabled: !!projectId, // ❗ Не делать запрос, если нет ID
        })
    },
    user: {
        info: () => ({
            queryKey: keys.user.info(),
            queryFn: () => api.get('/user').then(r => r.data),
        })
    }
}