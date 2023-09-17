import express from 'express'
import cors from 'cors'
import { v4 as uuid } from 'uuid'

const app = express()

app.use(express.json())
app.use(cors({origin: '*'}))

interface Lixo {
  id: string
  nome: string
  bairro: string
  tipo: string
  reciclavel: boolean
  organico: boolean
  radioativo: boolean
}

const lixos: Lixo[] = []

app.get('/lixos', (request, response) => {
  return response.json(lixos)
})

app.post('/lixos', (request, response) => {
  const { nome, bairro, tipo, reciclavel, organico, radioativo } = request.body

  const lixo = { id: uuid(), nome, bairro, tipo, reciclavel, organico, radioativo }

  lixos.push(lixo)

  return response.json(lixo)
})

app.put('/lixos/:id', (request, response) => {
  const { id } = request.params
  const { nome, bairro, tipo, reciclavel, organico, radioativo } = request.body

  const lixoIndex = lixos.findIndex((lixo) => lixo.id === id)

  if(lixoIndex < 0) {
    return response.status(404).json({error: 'Lixo not found'})
  }

  const lixo = { id, bairro, nome, tipo, reciclavel, organico, radioativo }
  lixos[lixoIndex] = lixo

  return response.json(lixo)
})

app.delete('/lixos/:id', (request, response) => {
  const { id } = request.params

  const lixoIndex = lixos.findIndex((lixo) => lixo.id === id)

  if(lixoIndex < 0) {
    return response.status(404).json({error: 'Lixo not found'})
  }

  lixos.splice(lixoIndex, 1)
  return response.status(204).send()
})

app.listen('3333', () => {
  console.log('API rodando com sucesso na porta 3333!')
})