import axios from "axios";

const BASE_URL ="http://localhost:5000/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmFlNzYxOGNhM2NhMzU4MjQxMDhmMyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NzMxOTMzMzEsImV4cCI6MTY3MzQ1MjUzMX0.C5UVEpSB-WyMINO61V5UfOFgHq-ybdV39SGIArnRzrI"
export const publicRequest = axios.create({
    baseURL:BASE_URL
})

export const userRequest = axios.create({
    baseURL:BASE_URL,
    header:{token:`Bearer ${TOKEN}`}
})