import express from 'express'
import cors from 'cors'
import multer from 'multer'
import { renderDocx } from './docxExport'
import { ollamaChat, ollamaHealth, ollamaTags, OLLAMA_BASE_URL, OLLAMA_MODEL } from './ollama'

const app = express()

app.use(cors())
app.use(express.json({ limit: '4mb' }))

const upload = multer({ storage: multer.memoryStorage() })

app.get('/api/health', async (_req, res) => {
    const ok = await ollamaHealth()
    res.json({ ok, ollamaBaseUrl: OLLAMA_BASE_URL, model: OLLAMA_MODEL })
})

app.get('/api/models', async (_req, res) => {
    try {
        const data = await ollamaTags()
        res.json({ ok: true, models: data.models ?? [] })
    } catch (e: any) {
        res.status(500).json({ ok: false, error: e?.message ?? 'Failed to fetch models' })
    }
})

app.post('/api/chat', async (req, res) => {
    try {
        const { messages, systemPrompt } = req.body as {
            systemPrompt?: string
            messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>
        }

        if (!Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ ok: false, error: 'messages[] required' })
        }

        const finalMessages = systemPrompt
            ? [{ role: 'system' as const, content: systemPrompt }, ...messages]
            : messages

        const answer = await ollamaChat(finalMessages)
        res.json({ ok: true, answer })
    } catch (e: any) {
        res.status(500).json({ ok: false, error: e?.message ?? 'Chat failed' })
    }
})

function estimatePages(text: string): number {
    // Rough heuristic: ~2500 chars per page for 12pt Times New Roman with margins
    const chars = text.replace(/\s+/g, ' ').trim().length
    return Math.max(1, Math.ceil(chars / 2500))
}

async function generateMinPages(prompt: string, minPages: number): Promise<string> {
    let output = ''
    let safety = 0

    while (estimatePages(output) < minPages && safety < 6) {
        const continuationPrompt =
            output.length === 0
                ? `${prompt}\n\nIMPORTANT: Write a complete, well-formatted legal document. Aim for at least ${minPages} pages of content. Use clear headings, numbered sections, and professional legal tone.`
                : `Continue the SAME document from where you left off. Do not repeat. Add more sections and details until the document is at least ${minPages} pages.\n\nDOCUMENT SO FAR:\n${output.slice(-4000)}`

        const chunk = await ollamaChat([
            {
                role: 'system',
                content:
                    'You are a professional legal drafting assistant. Produce polished legal language, structured headings, and consistent formatting.'
            },
            { role: 'user', content: continuationPrompt },
        ])

        output = `${output}${output ? '\n\n' : ''}${chunk}`
        safety++
    }

    return output
}

app.post('/api/document/generate', async (req, res) => {
    try {
        const { prompt, minPages } = req.body as { prompt: string; minPages?: number }
        if (!prompt || typeof prompt !== 'string') {
            return res.status(400).json({ ok: false, error: 'prompt required' })
        }

        const text = await generateMinPages(prompt, Math.max(1, minPages ?? 5))
        res.json({ ok: true, text, pages: estimatePages(text) })
    } catch (e: any) {
        res.status(500).json({ ok: false, error: e?.message ?? 'Document generation failed' })
    }
})

app.post('/api/document/export-docx', upload.none(), async (req, res) => {
    try {
        const title = (req.body?.title as string) || 'Generated Document'
        const content = (req.body?.content as string) || ''
        if (!content) return res.status(400).json({ ok: false, error: 'content required' })

        const buffer = await renderDocx(title, content)
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        res.setHeader('Content-Disposition', `attachment; filename="${title.replace(/[^a-z0-9\-_ ]/gi, '').slice(0, 60) || 'document'}.docx"`)
        res.send(buffer)
    } catch (e: any) {
        res.status(500).json({ ok: false, error: e?.message ?? 'DOCX export failed' })
    }
})

const port = Number(process.env.PORT || 8787)
app.listen(port, () => {
    console.log(`[Law-Craft API] listening on http://localhost:${port}`)
    console.log(`[Law-Craft API] Ollama: ${OLLAMA_BASE_URL} model=${OLLAMA_MODEL}`)
})
