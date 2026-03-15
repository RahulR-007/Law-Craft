export const BACKEND_BASE_URL = (() => {
    // In dev, Vite proxy can point /api to backend.
    // In prod, you can set VITE_BACKEND_URL or deploy backend alongside.
    return (import.meta as any).env?.VITE_BACKEND_URL || ''
})()

export type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string }

export async function backendHealth(): Promise<{ ok: boolean; ollamaBaseUrl?: string; model?: string }> {
    const r = await fetch(`${BACKEND_BASE_URL}/api/health`)
    if (!r.ok) throw new Error('Backend health check failed')
    return r.json()
}

export async function backendModels(): Promise<string[]> {
    const r = await fetch(`${BACKEND_BASE_URL}/api/models`)
    if (!r.ok) throw new Error('Failed to fetch models')
    const data = await r.json()
    return (data.models || []).map((m: any) => m.name).filter(Boolean)
}

export async function backendChat(messages: ChatMessage[], systemPrompt?: string): Promise<string> {
    const r = await fetch(`${BACKEND_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, systemPrompt }),
    })
    const data = await r.json().catch(() => ({}))
    if (!r.ok) throw new Error(data?.error || 'Chat failed')
    return data.answer
}

export async function backendGenerateDocument(prompt: string, minPages = 5): Promise<{ text: string; pages: number }> {
    const r = await fetch(`${BACKEND_BASE_URL}/api/document/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, minPages }),
    })
    const data = await r.json().catch(() => ({}))
    if (!r.ok) throw new Error(data?.error || 'Document generation failed')
    return { text: data.text, pages: data.pages }
}

export async function backendExportDocx(title: string, content: string): Promise<Blob> {
    const form = new FormData()
    form.set('title', title)
    form.set('content', content)

    const r = await fetch(`${BACKEND_BASE_URL}/api/document/export-docx`, {
        method: 'POST',
        body: form,
    })
    if (!r.ok) {
        const data = await r.json().catch(() => ({}))
        throw new Error(data?.error || 'DOCX export failed')
    }
    return r.blob()
}
