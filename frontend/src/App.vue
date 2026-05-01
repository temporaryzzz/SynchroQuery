<script setup>
import { ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { queries } from './api/queries'
import { useCreateProjectMutation } from './api/mutations'

// --- 1. Загрузка данных (Query) ---
const { data: user } = useQuery(queries.user.info())
const { data: projects, isLoading, isError } = useQuery(() => queries.projects.list(user.value?.id))

// --- 2. Мутация (Create) ---
const { mutate: createProject, isPending } = useCreateProjectMutation()
const newTitle = ref('')

const handleAdd = () => {
  if (!newTitle.value.trim()) return
  
  createProject({
    title: newTitle.value,
    status: 'new',
    createdAt: new Date().toISOString()
  }, {
    onSuccess: () => { newTitle.value = '' } // Очистить поле после успеха
  })
}
</script>

<template>
  <div style="padding: 2rem; font-family: sans-serif;">
    <h1>🚀 Projects</h1>
    
    <!-- Форма добавления -->
    <form @submit.prevent="handleAdd" style="margin-bottom: 1rem; display: flex; gap: 10px;">
      <input v-model="newTitle" placeholder="Название проекта..." />
      <button type="submit" :disabled="isPending">
        Добавить
      </button>
    </form>

    <!-- Список проектов -->
    <div v-if="isLoading">Загрузка данных...</div>
    <div v-else-if="isError">Ошибка загрузки! Проверь консоль.</div>
    
    <ul v-else style="list-style: none; padding: 0;">
      <li 
        v-for="project in projects" 
        :key="project.id"
        style="border: 1px solid #ddd; padding: 10px; margin-bottom: 8px; border-radius: 6px; display: flex; column-gap: 5px; justify-content: center;"
      >
        <strong>{{ project.title }}</strong> 
        <span style="background: #eee; padding: 2px 6px; border-radius: 4px; font-size: 0.8em;">
          {{ project.status }}
        </span>
      </li>
    </ul>
  </div>
</template>