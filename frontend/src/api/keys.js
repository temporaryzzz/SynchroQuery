export const keys = {
    projects: {
        all: ['projects'],
        list: (userId) => [...keys.projects.all, 'list', userId].filter(Boolean),
        detail: (id) => [...keys.projects.all, 'detail', id],
        tasks: (projectId) => [...keys.projects.all, 'tasks', projectId], // Зависимые данные
    },
    user: {
        all: ['user'],
        info: () => [...keys.user.all, 'info'],
    },
    tasks: {
        all: ['tasks'],
        detail: (id) => [...keys.tasks.all, 'detail']
    }
}