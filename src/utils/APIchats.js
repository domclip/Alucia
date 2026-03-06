import axios from "axios"

let api = axios.create({
  baseURL: "http://localhost:5000"
})

export async function chamarChatGPT(perguntaPreparada, isArbiter) {
 let resp = await api.post("/chatgpt", {pergunta: perguntaPreparada, isArbiter: isArbiter})
  return resp.data
}

export async function chamarGrok(perguntaPreparada, isArbiter) {
  let resp = await api.post("/grok", {pergunta: perguntaPreparada, isArbiter: isArbiter})
   return resp.data
 }

 export async function chamarGemini(perguntaPreparada, isArbiter) {
  let resp = await api.post("/gemini", {pergunta: perguntaPreparada, isArbiter: isArbiter})
   return resp.data
 }
 export async function chamarDeepseek(perguntaPreparada, isArbiter) {
  let resp = await api.post("/deepseek", {pergunta: perguntaPreparada, isArbiter: isArbiter})
   return resp.data
 }

