import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mocks pour fetch et req/res
global.fetch = vi.fn()

function createRes() {
  return {
    statusCode: 0,
    body: null,
    status(code) { this.statusCode = code; return this },
    json(obj) { this.body = obj; return this }
  }
}

// --- Test products.js ---
import productsHandler from '../api/products.js'

describe('productsHandler', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('renvoie 200 et les produits si backend OK', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ([{ id: 1, title: 'Veste en cuir noire femme' }])
    })
    const req = {}
    const res = createRes()
    await productsHandler(req, res)
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual([{ id: 1, name: 'Veste en cuir noire femme' }])
  })

  it('renvoie erreur backend', async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 500 })
    const req = {}
    const res = createRes()
    await productsHandler(req, res)
    expect(res.statusCode).toBe(500)
    expect(res.body.error).toMatch(/Erreur côté backend/)
  })
})

// --- Test auth/register.js ---
import registerHandler from '../api/auth/register.js'

describe('registerHandler', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('refuse méthode non POST', async () => {
    const req = { method: 'GET' }
    const res = createRes()
    await registerHandler(req, res)
    expect(res.statusCode).toBe(405)
  })

  it('crée un compte si backend OK', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, email: 'a@a.com' })
    })
    const req = { method: 'POST', body: { email: 'a@a.com' } }
    const res = createRes()
    await registerHandler(req, res)
    expect(res.statusCode).toBe(201)
    expect(res.body.email).toBe('a@a.com')
  })

  it('renvoie erreur backend', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ message: 'Erreur' })
    })
    const req = { method: 'POST', body: { email: 'a@a.com' } }
    const res = createRes()
    await registerHandler(req, res)
    expect(res.statusCode).toBe(400)
    expect(res.body.error).toBe('Erreur')
  })
})

// --- Test auth/connection.js ---
import connectionHandler from '../api/auth/connection.js'

describe('connectionHandler', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('refuse méthode non POST', async () => {
    const req = { method: 'GET' }
    const res = createRes()
    await connectionHandler(req, res)
    expect(res.statusCode).toBe(405)
  })

  it('connexion OK', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'jwt' })
    })
    const req = { method: 'POST', body: { email: 'a@a.com', password: 'x' } }
    const res = createRes()
    await connectionHandler(req, res)
    expect(res.statusCode).toBe(200)
    expect(res.body.token).toBe('jwt')
  })

  it('connexion erreur', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ message: 'Identifiants invalides' })
    })
    const req = { method: 'POST', body: { email: 'a@a.com', password: 'x' } }
    const res = createRes()
    await connectionHandler(req, res)
    expect(res.statusCode).toBe(401)
    expect(res.body.error).toBe('Identifiants invalides')
  })
})