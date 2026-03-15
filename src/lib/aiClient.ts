import { loadAISettings } from './aiSettings';

/**
 * Ollama AI Client
 *
 * Provides a TypeScript client for interacting with the Ollama AI server.
 * Handles all communication with the local Ollama instance running on
 * the server at http://192.168.137.96:11434/
 */export interface OllamaConfig {
    baseUrl: string;
    model: string;
    temperature?: number;
    topP?: number;
    topK?: number;
    repeatPenalty?: number;
    numPredict?: number;
}

export interface OllamaGenerateRequest {
    model: string;
    prompt: string;
    stream?: boolean;
    temperature?: number;
    top_p?: number;
    top_k?: number;
    repeat_penalty?: number;
    num_predict?: number;
    context?: number[];
    system?: string;
}

export interface OllamaGenerateResponse {
    model: string;
    response: string;
    created_at: string;
    total_duration: number;
    load_duration: number;
    prompt_eval_count: number;
    prompt_eval_duration: number;
    eval_count: number;
    eval_duration: number;
    context: number[];
}

export interface OllamaChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface OllamaChatRequest {
    model: string;
    messages: OllamaChatMessage[];
    stream?: boolean;
    temperature?: number;
    top_p?: number;
    top_k?: number;
    repeat_penalty?: number;
    num_predict?: number;
}

export interface OllamaChatResponse {
    model: string;
    created_at: string;
    message: OllamaChatMessage;
    done: boolean;
    total_duration?: number;
    load_duration?: number;
    prompt_eval_count?: number;
    prompt_eval_duration?: number;
    eval_count?: number;
    eval_duration?: number;
}

export interface OllamaTagsResponse {
    models: Array<{
        name: string;
        modified_at: string;
        size: number;
        digest: string;
    }>;
}

export class OllamaClient {
    private baseUrl: string;
    private model: string;
    private temperature: number;
    private topP: number;
    private topK: number;
    private repeatPenalty: number;
    private numPredict: number;

    constructor(config: OllamaConfig) {
        this.baseUrl = config.baseUrl;
        this.model = config.model;
        this.temperature = config.temperature ?? 0.7;
        this.topP = config.topP ?? 0.9;
        this.topK = config.topK ?? 40;
        this.repeatPenalty = config.repeatPenalty ?? 1.1;
        this.numPredict = config.numPredict ?? 128;
    }

    /**
     * Check if the Ollama server is accessible
     */
    async isServerHealthy(): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseUrl}/api/tags`);
            return response.status === 200;
        } catch (error) {
            console.error('Ollama server health check failed:', error);
            return false;
        }
    }

    /**
     * Get list of available models
     */
    async listModels(): Promise<string[]> {
        try {
            const response = await fetch(`${this.baseUrl}/api/tags`);
            const data = (await response.json()) as OllamaTagsResponse;
            return data.models?.map(m => m.name) || [];
        } catch (error) {
            console.error('Failed to list models:', error);
            return [];
        }
    }

    /**
     * Generate text using the model (non-streaming)
     */
    async generate(prompt: string, options?: Partial<OllamaGenerateRequest>): Promise<string> {
        try {
            const request: OllamaGenerateRequest = {
                model: this.model,
                prompt,
                stream: false,
                temperature: options?.temperature ?? this.temperature,
                top_p: options?.top_p ?? this.topP,
                top_k: options?.top_k ?? this.topK,
                repeat_penalty: options?.repeat_penalty ?? this.repeatPenalty,
                num_predict: options?.num_predict ?? this.numPredict,
                ...options,
            };

            const response = await fetch(`${this.baseUrl}/api/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });

            if (!response.ok) {
                throw new Error(`Ollama API error: ${response.statusText}`);
            }

            const data = (await response.json()) as OllamaGenerateResponse;
            return data.response;
        } catch (error) {
            console.error('Generation request failed:', error);
            throw error;
        }
    }

    /**
     * Generate text with streaming
     * Returns an async generator that yields response chunks
     */
    async *generateStream(
        prompt: string,
        options?: Partial<OllamaGenerateRequest>
    ): AsyncGenerator<string, void, unknown> {
        try {
            const request: OllamaGenerateRequest = {
                model: this.model,
                prompt,
                stream: true,
                temperature: options?.temperature ?? this.temperature,
                top_p: options?.top_p ?? this.topP,
                top_k: options?.top_k ?? this.topK,
                repeat_penalty: options?.repeat_penalty ?? this.repeatPenalty,
                num_predict: options?.num_predict ?? this.numPredict,
                ...options,
            };

            const response = await fetch(`${this.baseUrl}/api/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });

            if (!response.ok) {
                throw new Error(`Ollama API error: ${response.statusText}`);
            }

            if (!response.body) {
                throw new Error('No response body');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');

                // Process all complete lines
                for (let i = 0; i < lines.length - 1; i++) {
                    if (lines[i].trim()) {
                        try {
                            const json = JSON.parse(lines[i]) as OllamaGenerateResponse;
                            if (json.response) {
                                yield json.response;
                            }
                        } catch {
                            // Invalid JSON, skip
                        }
                    }
                }

                // Keep incomplete line in buffer
                buffer = lines[lines.length - 1];
            }

            // Process remaining buffer
            if (buffer.trim()) {
                try {
                    const json = JSON.parse(buffer) as OllamaGenerateResponse;
                    if (json.response) {
                        yield json.response;
                    }
                } catch {
                    // Invalid JSON, skip
                }
            }
        } catch (error) {
            console.error('Streaming generation failed:', error);
            throw error;
        }
    }

    /**
     * Chat with the model
     */
    async chat(messages: OllamaChatMessage[], options?: Partial<OllamaChatRequest>): Promise<string> {
        try {
            const request: OllamaChatRequest = {
                model: this.model,
                messages,
                stream: false,
                temperature: options?.temperature ?? this.temperature,
                top_p: options?.top_p ?? this.topP,
                top_k: options?.top_k ?? this.topK,
                repeat_penalty: options?.repeat_penalty ?? this.repeatPenalty,
                num_predict: options?.num_predict ?? this.numPredict,
                ...options,
            };

            const response = await fetch(`${this.baseUrl}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });

            if (!response.ok) {
                throw new Error(`Ollama API error: ${response.statusText}`);
            }

            const data = (await response.json()) as OllamaChatResponse;
            return data.message.content;
        } catch (error) {
            console.error('Chat request failed:', error);
            throw error;
        }
    }

    /**
     * Chat with streaming
     * Returns an async generator that yields response chunks
     */
    async *chatStream(
        messages: OllamaChatMessage[],
        options?: Partial<OllamaChatRequest>
    ): AsyncGenerator<string, void, unknown> {
        try {
            const request: OllamaChatRequest = {
                model: this.model,
                messages,
                stream: true,
                temperature: options?.temperature ?? this.temperature,
                top_p: options?.top_p ?? this.topP,
                top_k: options?.top_k ?? this.topK,
                repeat_penalty: options?.repeat_penalty ?? this.repeatPenalty,
                num_predict: options?.num_predict ?? this.numPredict,
                ...options,
            };

            const response = await fetch(`${this.baseUrl}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });

            if (!response.ok) {
                throw new Error(`Ollama API error: ${response.statusText}`);
            }

            if (!response.body) {
                throw new Error('No response body');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');

                // Process all complete lines
                for (let i = 0; i < lines.length - 1; i++) {
                    if (lines[i].trim()) {
                        try {
                            const json = JSON.parse(lines[i]) as OllamaChatResponse;
                            if (json.message && json.message.content) {
                                yield json.message.content;
                            }
                        } catch {
                            // Invalid JSON, skip
                        }
                    }
                }

                // Keep incomplete line in buffer
                buffer = lines[lines.length - 1];
            }

            // Process remaining buffer
            if (buffer.trim()) {
                try {
                    const json = JSON.parse(buffer) as OllamaChatResponse;
                    if (json.message && json.message.content) {
                        yield json.message.content;
                    }
                } catch {
                    // Invalid JSON, skip
                }
            }
        } catch (error) {
            console.error('Streaming chat failed:', error);
            throw error;
        }
    }

    /**
     * Update configuration
     */
    updateConfig(config: Partial<OllamaConfig>): void {
        if (config.temperature !== undefined) this.temperature = config.temperature;
        if (config.topP !== undefined) this.topP = config.topP;
        if (config.topK !== undefined) this.topK = config.topK;
        if (config.repeatPenalty !== undefined) this.repeatPenalty = config.repeatPenalty;
        if (config.numPredict !== undefined) this.numPredict = config.numPredict;
    }
}

/**
 * Create a default Ollama client for LawCraft
 */
export function createOllamaClient(): OllamaClient {
    const aiSettings = loadAISettings();
    const baseUrl = aiSettings.ollamaUrl;
    const model = aiSettings.ollamaModel;

    return new OllamaClient({
        baseUrl,
        model,
        temperature: aiSettings.temperature,
        topP: aiSettings.topP,
        topK: aiSettings.topK,
        repeatPenalty: aiSettings.repeatPenalty,
        numPredict: aiSettings.numPredict,
    });
}

export default OllamaClient;
