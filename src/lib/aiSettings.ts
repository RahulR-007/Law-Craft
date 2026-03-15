/**
 * AI Settings Configuration
 * 
 * Stores and manages AI model settings for LawCraft
 */

export interface AISettings {
    // Server configuration
    ollamaUrl: string;
    ollamaModel: string;

    // Model parameters
    temperature: number;
    topP: number;
    topK: number;
    repeatPenalty: number;
    numPredict: number;

    // System prompt for legal AI
    systemPrompt: string;

    // UI preferences
    streamResponses: boolean;
    showTokenCount: boolean;

    // Advanced
    timeout: number;
    retryAttempts: number;
}

export const DEFAULT_AI_SETTINGS: AISettings = {
    ollamaUrl: 'http://192.168.137.96:11434',
    ollamaModel: 'llama3.1:8b',
    temperature: 0.7,
    topP: 0.9,
    topK: 40,
    repeatPenalty: 1.1,
    numPredict: 256,
    systemPrompt: `You are Alice, a professional legal AI assistant specializing in legal documents, contracts, and legal guidance. You provide accurate, helpful, and professional legal information while always emphasizing that you provide general information only and do not constitute legal advice. For important legal matters, always recommend consulting with a qualified attorney.`,
    streamResponses: true,
    showTokenCount: false,
    timeout: 30000,
    retryAttempts: 3,
};

/**
 * Get AI settings from localStorage
 */
export function loadAISettings(): AISettings {
    try {
        const stored = localStorage.getItem('lawcraft_ai_settings');
        if (stored) {
            const parsed = JSON.parse(stored);
            return {
                ...DEFAULT_AI_SETTINGS,
                ...parsed,
            };
        }
    } catch (error) {
        console.error('Failed to load AI settings:', error);
    }
    return DEFAULT_AI_SETTINGS;
}

/**
 * Save AI settings to localStorage
 */
export function saveAISettings(settings: Partial<AISettings>): AISettings {
    try {
        const current = loadAISettings();
        const updated = {
            ...current,
            ...settings,
        };
        localStorage.setItem('lawcraft_ai_settings', JSON.stringify(updated));
        return updated;
    } catch (error) {
        console.error('Failed to save AI settings:', error);
        return loadAISettings();
    }
}

/**
 * Reset AI settings to defaults
 */
export function resetAISettings(): AISettings {
    try {
        localStorage.removeItem('lawcraft_ai_settings');
    } catch (error) {
        console.error('Failed to reset AI settings:', error);
    }
    return DEFAULT_AI_SETTINGS;
}

/**
 * Validate AI settings
 */
export function validateAISettings(settings: Partial<AISettings>): {
    valid: boolean;
    errors: string[];
} {
    const errors: string[] = [];

    if (settings.temperature !== undefined) {
        if (settings.temperature < 0 || settings.temperature > 2) {
            errors.push('Temperature must be between 0 and 2');
        }
    }

    if (settings.topP !== undefined) {
        if (settings.topP < 0 || settings.topP > 1) {
            errors.push('Top P must be between 0 and 1');
        }
    }

    if (settings.topK !== undefined) {
        if (settings.topK < 0 || settings.topK > 100) {
            errors.push('Top K must be between 0 and 100');
        }
    }

    if (settings.repeatPenalty !== undefined) {
        if (settings.repeatPenalty < 0 || settings.repeatPenalty > 2) {
            errors.push('Repeat Penalty must be between 0 and 2');
        }
    }

    if (settings.numPredict !== undefined) {
        if (settings.numPredict < 1 || settings.numPredict > 2048) {
            errors.push('Num Predict must be between 1 and 2048');
        }
    }

    if (settings.ollamaUrl !== undefined) {
        if (!/^https?:\/\/.+/.test(settings.ollamaUrl)) {
            errors.push('Ollama URL must be a valid HTTP(S) URL');
        }
    }

    if (settings.timeout !== undefined) {
        if (settings.timeout < 1000 || settings.timeout > 120000) {
            errors.push('Timeout must be between 1000ms and 120000ms');
        }
    }

    if (settings.retryAttempts !== undefined) {
        if (settings.retryAttempts < 0 || settings.retryAttempts > 10) {
            errors.push('Retry Attempts must be between 0 and 10');
        }
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}

export default DEFAULT_AI_SETTINGS;
