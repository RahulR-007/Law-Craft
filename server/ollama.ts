export type OllamaRole = 'system' | 'user' | 'assistant'

export interface OllamaChatMessage {
    role: OllamaRole
    content: string
}

export interface OllamaChatRequest {
    model: string
    messages: OllamaChatMessage[]
    stream?: boolean
    options?: Record<string, unknown>
}

export interface OllamaChatResponse {
    model: string
    created_at: string
    message: {
        role: 'assistant'
        content: string
    }
    done: boolean
}

export interface OllamaTagsResponse {
    models: Array<{ name: string; size: number }>
}

export const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434'
export const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.1:8b'

export async function ollamaHealth(baseUrl: string = OLLAMA_BASE_URL): Promise<boolean> {
    try {
        const res = await fetch(`${baseUrl}/api/tags`)
        return res.ok
    } catch {
        return false
    }
}

export async function ollamaTags(baseUrl: string = OLLAMA_BASE_URL): Promise<OllamaTagsResponse> {
    const res = await fetch(`${baseUrl}/api/tags`)
    if (!res.ok) throw new Error(`Ollama tags failed: HTTP ${res.status}`)
    return (await res.json()) as OllamaTagsResponse
}

export async function ollamaChat(
    messages: OllamaChatMessage[],
    {
        baseUrl = OLLAMA_BASE_URL,
        model = OLLAMA_MODEL,
        options,
    }: { baseUrl?: string; model?: string; options?: Record<string, unknown> } = {}
): Promise<string> {
    const payload: OllamaChatRequest = {
        model,
        messages,
        stream: false,
        options,
    }

    const res = await fetch(`${baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })

    if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(`Ollama chat failed: HTTP ${res.status} ${text}`)
    }

    const data = (await res.json()) as OllamaChatResponse
    return data.message?.content ?? ''
}
