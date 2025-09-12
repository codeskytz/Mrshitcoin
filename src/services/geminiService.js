import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  constructor() {
    this.apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    this.genAI = null;
    this.model = null;
    this.chat = null;
    this.initialize();
  }

  initialize() {
    try {
      if (!this.apiKey) {
        throw new Error('Gemini API key not found');
      }
      
      this.genAI = new GoogleGenerativeAI(this.apiKey);
      this.model = this.genAI.getGenerativeModel({ 
        model: 'gemini-2.0-flash',
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
        ],
      });
    } catch (error) {
      console.error('Failed to initialize Gemini AI:', error);
    }
  }

  startChat(history = []) {
    try {
      if (!this.model) {
        throw new Error('Gemini model not initialized');
      }

      const systemPrompt = `You are Mr Shitcoin's AI assistant, a professional cryptocurrency trading mentor specializing in meme coins. You are knowledgeable, helpful, and focused on providing valuable trading insights, market analysis, and educational content about cryptocurrency trading, particularly meme coins.

Key characteristics:
- Professional yet approachable tone
- Focus on cryptocurrency and meme coin trading
- Provide practical, actionable advice
- Share market insights and trading strategies
- Help users understand risk management
- Promote Mr Shitcoin's courses and services when relevant
- Keep responses concise but informative
- Use emojis sparingly and professionally

Always prioritize user safety and responsible trading practices. Never provide specific financial advice, but offer educational content and general strategies.`;

      this.chat = this.model.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: systemPrompt }]
          },
          {
            role: 'model',
            parts: [{ text: 'I understand. I\'m Mr Shitcoin\'s AI assistant, ready to help with cryptocurrency and meme coin trading questions. How can I assist you today?' }]
          },
          ...history
        ],
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 2048,
        }
      });
      
      return this.chat;
    } catch (error) {
      console.error('Failed to start chat:', error);
      throw error;
    }
  }

  async sendMessage(message, onProgress = null) {
    try {
      if (!this.chat) {
        this.startChat();
      }

      const result = await this.chat.sendMessageStream(message);
      
      let fullResponse = '';
      
      if (onProgress) {
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          fullResponse += chunkText;
          onProgress(fullResponse);
        }
      } else {
        const response = await result.response;
        fullResponse = response.text();
      }
      
      return {
        text: fullResponse,
        timestamp: new Date().toISOString(),
        success: true
      };
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Handle specific error types
      if (error.message?.includes('API_KEY_INVALID')) {
        throw new Error('Invalid API key. Please check your configuration.');
      } else if (error.message?.includes('QUOTA_EXCEEDED')) {
        throw new Error('API quota exceeded. Please try again later.');
      } else if (error.message?.includes('MODEL_NOT_FOUND')) {
        throw new Error('AI model not available. Please try again later.');
      } else if (error.message?.includes('SAFETY')) {
        throw new Error('Message blocked by safety filters. Please rephrase your question.');
      }
      
      throw new Error('Failed to get AI response. Please try again.');
    }
  }

  async regenerateLastResponse(onProgress = null) {
    try {
      if (!this.chat) {
        throw new Error('No active chat session');
      }

      // Get the last user message from history
      const history = await this.chat.getHistory();
      const lastUserMessage = [...history].reverse().find(msg => msg.role === 'user');
      
      if (!lastUserMessage) {
        throw new Error('No previous message to regenerate');
      }

      // Send the same message again
      return await this.sendMessage(lastUserMessage.parts[0].text, onProgress);
    } catch (error) {
      console.error('Error regenerating response:', error);
      throw error;
    }
  }

  getChatHistory() {
    try {
      return this.chat?.getHistory() || [];
    } catch (error) {
      console.error('Error getting chat history:', error);
      return [];
    }
  }

  clearChat() {
    this.chat = null;
    this.startChat();
  }

  // Validate and sanitize user input
  sanitizeInput(input) {
    if (typeof input !== 'string') {
      throw new Error('Input must be a string');
    }
    
    // Remove excessive whitespace
    input = input.trim().replace(/\s+/g, ' ');
    
    // Check length limits
    if (input.length === 0) {
      throw new Error('Input cannot be empty');
    }
    
    if (input.length > 4000) {
      throw new Error('Input too long. Please keep messages under 4000 characters.');
    }
    
    // Remove potentially harmful content
    const suspiciousPatterns = [
      /javascript:/gi,
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /on\w+\s*=/gi
    ];
    
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(input)) {
        throw new Error('Invalid input detected');
      }
    }
    
    return input;
  }

  // Rate limiting (simple in-memory implementation)
  static rateLimitMap = new Map();
  
  checkRateLimit(userId = 'anonymous', limit = 10, windowMs = 60000) {
    const now = Date.now();
    const userKey = `rate_limit_${userId}`;
    
    if (!GeminiService.rateLimitMap.has(userKey)) {
      GeminiService.rateLimitMap.set(userKey, { count: 1, resetTime: now + windowMs });
      return true;
    }
    
    const userData = GeminiService.rateLimitMap.get(userKey);
    
    if (now > userData.resetTime) {
      // Reset the counter
      userData.count = 1;
      userData.resetTime = now + windowMs;
      return true;
    }
    
    if (userData.count >= limit) {
      throw new Error(`Rate limit exceeded. Please wait ${Math.ceil((userData.resetTime - now) / 1000)} seconds.`);
    }
    
    userData.count++;
    return true;
  }

  // Get conversation starters
  getConversationStarters() {
    return [
      "What are the best strategies for trading meme coins?",
      "How do I identify promising meme coin projects?",
      "What's the current market sentiment for crypto?",
      "Can you explain risk management in crypto trading?",
      "How do I analyze meme coin charts?",
      "What tools do you recommend for crypto trading?",
      "Tell me about Mr Shitcoin's trading courses",
      "How do I manage emotions while trading?"
    ];
  }
}

const geminiServiceInstance = new GeminiService();
export default geminiServiceInstance;