import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:2777',
    headers: { 'Content-Type': 'application/json' },
})