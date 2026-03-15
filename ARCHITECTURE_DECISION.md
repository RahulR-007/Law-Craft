# 🏗️ Architecture Decision: Ollama Server Configuration

**Date**: March 15, 2026  
**Decision**: Use Friend's Laptop as Dedicated Ollama Server  
**Status**: ✅ RECOMMENDED

---

## 📊 Current Setup Analysis

### Your Laptop (10.1.216.43:11434)
```
Model: llama3.2:1b
Size: 1.23 GB
Quality: Good (basic explanations)
Speed: Medium (79.82s first load)
Use Case: Development/Testing
```

### Friend's Laptop (192.168.137.96:11434)
```
Model: llama3.1:8b ⭐ MUCH BETTER
Size: 4.92 GB
Quality: Excellent (detailed, professional)
Speed: Medium (first load), then faster
Use Case: PRODUCTION (best choice!)
```

---

## 🎯 Recommendation: Use Friend's Server (192.168.137.96)

### Why Friend's Laptop is Better

| Factor | Your Laptop | Friend's Laptop | Winner |
|--------|-------------|-----------------|--------|
| **Model Quality** | llama3.2:1b (basic) | llama3.1:8b (8B params) | 🏆 Friend's |
| **Model Size** | 1.23 GB | 4.92 GB | 🏆 Friend's |
| **Legal Doc Capability** | Fair | Excellent | 🏆 Friend's |
| **Response Detail** | Short | Comprehensive | 🏆 Friend's |
| **Professional Use** | ❌ No | ✅ Yes | 🏆 Friend's |

**For LawCraft AI**, you **absolutely should use friend's server** with llama3.1:8b

---

## 🔧 Configuration Change Required

### Current (Wrong - Using Your Laptop)
```python
# ❌ NOT RECOMMENDED FOR PRODUCTION
url = "http://10.1.216.43:11434/api/generate"
model = "llama3.2:1b"
```

### Recommended (Using Friend's Server)
```python
# ✅ RECOMMENDED FOR PRODUCTION
url = "http://192.168.137.96:11434/api/generate"
model = "llama3.1:8b"
```

---

## 📝 Files to Update

### 1. Update `ollama_client.py`
Change default URL and model:
```python
def __init__(
    self,
    base_url: str = "http://192.168.137.96:11434",  # ← Friend's server
    model: str = "llama3.1:8b",  # ← Better model
    ...
)
```

### 2. Update `.env` or `vite.config.ts`
```bash
VITE_OLLAMA_URL=http://192.168.137.96:11434
VITE_OLLAMA_MODEL=llama3.1:8b
```

### 3. Update TypeScript `aiClient.ts`
```typescript
const DEFAULT_OLLAMA_URL = "http://192.168.137.96:11434";
const DEFAULT_MODEL = "llama3.1:8b";
```

---

## ✅ Architecture Decision

```
┌─────────────────────────────────────────────────────┐
│              Law-Craft AI Application                │
│         (Your Laptop - React + TypeScript)           │
└────────────────────┬────────────────────────────────┘
                     │
                     │ HTTP Requests
                     │ (requests.post)
                     │
                     ▼
         ┌───────────────────────────┐
         │  Friend's Ollama Server    │
         │  192.168.137.96:11434      │
         │  llama3.1:8b (8B params)   │
         │  4.92 GB, Professional     │
         └───────────────────────────┘
```

### Benefits:
✅ Better AI responses (8B model vs 1B)  
✅ Longer documents supported  
✅ Legal reasoning capability  
✅ Professional quality output  
✅ Friend can run server continuously  
✅ Your laptop stays free for development  

---

## 🚀 Implementation Steps

### Step 1: Update ollama_client.py
```python
def __init__(
    self,
    base_url: str = "http://192.168.137.96:11434",  # Changed!
    model: str = "llama3.1:8b",  # Changed!
    ...
):
```

### Step 2: Update Example Usage
```python
if __name__ == "__main__":
    client = OllamaClient(
        base_url="http://192.168.137.96:11434",  # Friend's server
        model="llama3.1:8b"  # Better model
    )
```

### Step 3: Update vite.config.ts
```typescript
export default defineConfig({
  define: {
    'import.meta.env.VITE_OLLAMA_URL': JSON.stringify(
      'http://192.168.137.96:11434'
    ),
    'import.meta.env.VITE_OLLAMA_MODEL': JSON.stringify(
      'llama3.1:8b'
    ),
  },
})
```

### Step 4: Test with Updated Config
```bash
python ollama_client.py
```

---

## ⚠️ Important Notes

### Network Requirements
- Both laptops must be on **same WiFi network** ✅
- Friend's laptop must **keep running** ✅
- IP `192.168.137.96` must be **stable** (static IP recommended)

### Performance
- First request: ~60-90 seconds (normal)
- Subsequent: 15-30 seconds (faster than 1B model)
- Better responses: More detailed, professional quality

### Fallback Strategy
Keep your laptop config as **backup**:
```python
PRIMARY_URL = "http://192.168.137.96:11434"      # Friend's (production)
FALLBACK_URL = "http://10.1.216.43:11434"        # Your laptop (backup)
```

---

## 📋 Decision Summary

| Aspect | Decision |
|--------|----------|
| **Primary Server** | Friend's Laptop (192.168.137.96) |
| **Model** | llama3.1:8b (8B parameters) |
| **Your Laptop** | Keep as development/fallback |
| **Client Role** | Your machine (React + Python) |
| **Server Role** | Friend's machine (Ollama runner) |

---

## ✨ Next Actions

1. ✅ Get friend's **static IP** (or set it up)
2. ✅ Confirm friend's **Ollama stays running**
3. ✅ Update `ollama_client.py` defaults
4. ✅ Update environment variables
5. ✅ Test with updated config
6. ✅ Document the setup for team

**Ready to update the files?** 🚀
