/**
 * Ollama Integration Helper
 * 
 * Provides utilities for communicating with the Ollama AI server
 * at http://192.168.137.96:11434 with error handling and streaming support
 */

export interface OllamaRequestOptions {
    baseUrl?: string;
    model?: string;
    temperature?: number;
    topP?: number;
    topK?: number;
    repeatPenalty?: number;
    numPredict?: number;
    timeout?: number;
}

export interface OllamaStreamEvent {
    model: string;
    created_at: string;
    response: string;
    done: boolean;
    context?: number[];
    total_duration?: number;
    load_duration?: number;
    prompt_eval_count?: number;
    prompt_eval_duration?: number;
    eval_count?: number;
    eval_duration?: number;
}

import { loadAISettings } from './aiSettings';

// Default configuration fallback
const DEFAULT_CONFIG = {
    baseUrl: 'http://192.168.137.96:11434',
    model: 'llama3.1:8b',
    temperature: 0.7,
    topP: 0.9,
    topK: 40,
    repeatPenalty: 1.1,
    numPredict: 512,
    timeout: 300000, // 5 minutes for longer document generation
};

function getActiveConfig(options: OllamaRequestOptions = {}) {
    const aiSettings = loadAISettings();
    return {
        baseUrl: options.baseUrl || aiSettings.ollamaUrl || DEFAULT_CONFIG.baseUrl,
        model: options.model || aiSettings.ollamaModel || DEFAULT_CONFIG.model,
        temperature: options.temperature ?? aiSettings.temperature ?? DEFAULT_CONFIG.temperature,
        topP: options.topP ?? aiSettings.topP ?? DEFAULT_CONFIG.topP,
        topK: options.topK ?? aiSettings.topK ?? DEFAULT_CONFIG.topK,
        repeatPenalty: options.repeatPenalty ?? aiSettings.repeatPenalty ?? DEFAULT_CONFIG.repeatPenalty,
        numPredict: options.numPredict ?? aiSettings.numPredict ?? DEFAULT_CONFIG.numPredict,
        timeout: options.timeout ?? aiSettings.timeout ?? DEFAULT_CONFIG.timeout,
    };
}

/**
 * Generate text using Ollama - non-streaming version
 */
export async function generateText(
    prompt: string,
    options: OllamaRequestOptions = {}
): Promise<string> {
    const config = getActiveConfig(options);

    try {
        const response = await fetch(
            `${config.baseUrl}/api/generate`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: config.model,
                    prompt,
                    stream: false,
                    temperature: config.temperature,
                    top_p: config.topP,
                    top_k: config.topK,
                    repeat_penalty: config.repeatPenalty,
                    num_predict: config.numPredict,
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data.response || '';
    } catch (error) {
        console.error('Ollama generation error:', error);
        throw new Error(`Failed to generate text: ${error instanceof Error ? error.message : String(error)}`);
    }
}

/**
 * Generate text using Ollama - streaming version
 * Yields chunks as they arrive
 */
export async function* generateTextStream(
    prompt: string,
    options: OllamaRequestOptions = {}
): AsyncGenerator<string, void, unknown> {
    const config = getActiveConfig(options);

    try {
        const response = await fetch(
            `${config.baseUrl}/api/generate`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: config.model,
                    prompt,
                    stream: true,
                    temperature: config.temperature,
                    top_p: config.topP,
                    top_k: config.topK,
                    repeat_penalty: config.repeatPenalty,
                    num_predict: config.numPredict,
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const reader = response.body?.getReader();
        if (!reader) {
            throw new Error('Response body is not readable');
        }

        const decoder = new TextDecoder();
        let buffer = '';

        try {
            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');

                for (let i = 0; i < lines.length - 1; i++) {
                    const line = lines[i].trim();
                    if (line) {
                        try {
                            const event: OllamaStreamEvent = JSON.parse(line);
                            if (event.response) {
                                yield event.response;
                            }
                        } catch (e) {
                            // Skip malformed JSON
                            console.warn('Failed to parse stream event:', line);
                        }
                    }
                }

                buffer = lines[lines.length - 1];
            }

            // Process any remaining buffer
            if (buffer.trim()) {
                try {
                    const event: OllamaStreamEvent = JSON.parse(buffer);
                    if (event.response) {
                        yield event.response;
                    }
                } catch (e) {
                    console.warn('Failed to parse final stream event:', buffer);
                }
            }
        } finally {
            reader.releaseLock();
        }
    } catch (error) {
        console.error('Ollama streaming error:', error);
        throw new Error(
            `Failed to stream text: ${error instanceof Error ? error.message : String(error)}`
        );
    }
}

/**
 * Check if Ollama server is healthy
 */
export async function checkServerHealth(
    baseUrl?: string
): Promise<boolean> {
    const config = getActiveConfig({ baseUrl });
    try {
        const response = await fetch(`${config.baseUrl}/api/tags`, {
            method: 'GET',
            timeout: 5000,
        } as RequestInit);
        return response.ok;
    } catch (error) {
        console.error('Ollama server health check failed:', error);
        return false;
    }
}

/**
 * Get available models from Ollama server
 */
export async function getAvailableModels(
    baseUrl?: string
): Promise<Array<{ name: string; size: number }>> {
    const config = getActiveConfig({ baseUrl });
    try {
        const response = await fetch(`${config.baseUrl}/api/tags`);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        return (
            data.models?.map((m: any) => ({
                name: m.name,
                size: m.size,
            })) || []
        );
    } catch (error) {
        console.error('Failed to get available models:', error);
        return [];
    }
}

/**
 * Enhanced generate with retry logic
 */
export async function generateWithRetry(
    prompt: string,
    maxRetries: number = 3,
    options: OllamaRequestOptions = {}
): Promise<string> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            return await generateText(prompt, options);
        } catch (error) {
            lastError = error as Error;
            console.warn(
                `Generation attempt ${attempt + 1} failed, retrying...`,
                lastError.message
            );

            // Wait before retrying (exponential backoff)
            await new Promise((resolve) =>
                setTimeout(resolve, 1000 * Math.pow(2, attempt))
            );
        }
    }

    throw (
        lastError ||
        new Error('Failed to generate text after multiple attempts')
    );
}

/**
 * Format a legal prompt for document generation
 */
export function buildLegalPrompt(
    documentType: string,
    userPrompt: string,
    partyInfo?: {
        partyName1?: string;
        partyName2?: string;
        amount?: string;
        date?: string;
        [key: string]: any;
    }
): string {
    const basePrompt = `You are a professional legal document generator creating a ${documentType}.
  
User's specific requirements:
${userPrompt}

${partyInfo
            ? `
Context information:
${Object.entries(partyInfo)
                .filter(([, value]) => value)
                .map(([key, value]) => `- ${key}: ${value}`)
                .join('\n')}
`
            : ''
        }

Generate the ${documentType} following legal best practices:
1. Use clear, professional legal language
2. Include all necessary clauses and provisions
3. Structure the document logically
4. Ensure legal validity and enforceability
5. Include appropriate legal disclaimers and notices
6. Make the document comprehensive yet understandable

Generate only the document content, no preamble.`;

    return basePrompt;
}

export default {
    generateText,
    generateTextStream,
    checkServerHealth,
    getAvailableModels,
    generateWithRetry,
    buildLegalPrompt,
    DEFAULT_CONFIG,
};
