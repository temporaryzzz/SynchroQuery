import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { api } from './client'
import { keys } from './keys'

export function useCreateProjectMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (newProject) => api.post('/projects', newProject).then(r => r.data),

        onSuccess: (newProject) => {
            // 1. Мгновенно добавляем проект в кеш списка (оптимистичное обновление)
            queryClient.setQueryData(
                keys.projects.list(),
                (old) => old ? [newProject, ...old] : [newProject]
            )

            // 2. Гарантируем синхронизацию с сервером (фоновый рефетч)
            queryClient.invalidateQueries({ queryKey: keys.projects.list() })
        },
    })
}

export function useCreateTaskMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (newTask) => api.post('/tasks', newTask).then(r => r.data),

        onSuccess: (newTask, variables) => {
            // variables.projectId передается при вызове мутации
            queryClient.setQueryData(
                keys.projects.tasks(variables.projectId),
                (old) => old ? [newTask, ...old] : [newTask]
            )
            queryClient.invalidateQueries({ queryKey: keys.projects.tasks(variables.projectId) })
        },
    })
}