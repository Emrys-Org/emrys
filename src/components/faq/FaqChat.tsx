import { SpinnerIcon } from '@hyperlane-xyz/widgets';
import { useEffect, useRef, useState } from 'react';
import { checkUAgentHealth, fetchProtocolInfo, fetchProtocolsList } from '../../services/uAgentService';
import { SolidButton } from '../buttons/SolidButton';

type Message = {
  id: number;
  text: string;
  isUser: boolean;
};

// Standard FAQ data for basic questions
const faqData = [
  {
    question: "What is Emrys?",
    answer: "Emrys is a powerful cross-chain bridge that enables you to transfer tokens between different blockchains with minimal fees and maximum security. We use our own forked version of SVM & IBC implementation."
  },
  {
    question: "Which chains are supported?",
    answer: "We currently support bridging between Ethereum, Avalanche, Polygon, BSC, and Solana. We're constantly working to add more chains to our network."
  },
  {
    question: "How do fees work?",
    answer: "Fees vary depending on the source and destination chains. When you initiate a transfer, you'll see a detailed breakdown of all fees involved before confirming the transaction."
  },
  {
    question: "Is Emrys secure?",
    answer: "Yes, security is our top priority. Emrys uses advanced cryptographic techniques and has undergone rigorous security audits. Our protocol is designed to provide maximum security for your cross-chain transfers."
  },
  {
    question: "What tokens can I bridge?",
    answer: "You can bridge native tokens (like ETH, AVAX) and popular standards like USDC and USDT. More tokens are being added regularly."
  },
  {
    question: "How long do transfers take?",
    answer: "Transfer times vary depending on the chains involved. Most transfers complete within a few minutes, but some may take longer depending on network conditions."
  },
  {
    question: "What is Walrus storage?",
    answer: "Walrus is our decentralized storage solution that securely stores transaction data across multiple networks. It ensures your cross-chain transaction data remains secure, immutable, and easily accessible at all times."
  },
  {
    question: "How does Walrus work?",
    answer: "Walrus utilizes a distributed network to store encrypted fragments of your transaction data across multiple nodes. This ensures data permanence, security, and rapid retrieval regardless of which blockchain you're accessing it from."
  },
  {
    question: "What technology powers this chat assistant?",
    answer: "This chat assistant is powered by fetch.ai uAgents, an advanced AI framework that enables intelligent, autonomous interactions. The uAgents technology allows for context-aware responses and intelligent query handling."
  }
];

export default function FaqChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "👋 Hi there! I'm Emrys Assistant powered by fetch.ai uAgents. How can I help you today?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [suggestedQuestions, setSuggestedQuestions] = useState(faqData.map(item => item.question));
  const [protocolNames, setProtocolNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uAgentAvailable, setUAgentAvailable] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check uAgent availability on component mount
  useEffect(() => {
    const checkAgent = async () => {
      try {
        const isHealthy = await checkUAgentHealth();
        setUAgentAvailable(isHealthy);
        
        if (isHealthy) {
          const protocolsData = await fetchProtocolsList();
          // Convert the protocols object to an array of names
          const names = Object.values(protocolsData.protocols);
          setProtocolNames(names);
          
          // Add protocol-related suggested questions
          setSuggestedQuestions(prev => [
            ...prev,
            "Tell me about Solana",
            "What is SVM?",
            "Explain IBC"
          ]);
        }
      } catch (error) {
        console.error("Error checking uAgent:", error);
        setUAgentAvailable(false);
      }
    };
    
    checkAgent();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleQuestionClick = (question: string) => {
    addMessage(question, true);
    processQuestion(question);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    addMessage(inputValue, true);
    processQuestion(inputValue);
    setInputValue('');
  };

  const processQuestion = async (question: string) => {
    setIsLoading(true);
    
    // First check if it's a standard FAQ question
    const faqItem = faqData.find(item => 
      item.question.toLowerCase() === question.toLowerCase()
    );
    
    if (faqItem) {
      setTimeout(() => {
        addMessage(faqItem.answer, false);
        setIsLoading(false);
      }, 500);
      return;
    }
    
    // If uAgent is available, try to get blockchain protocol information
    if (uAgentAvailable) {
      try {
        // Extract potential protocol name from question
        const words = question.toLowerCase().split(/\s+/);
        const potentialProtocols = words.filter(word => 
          word.length > 2 && !["what", "how", "is", "are", "the", "a", "an", "and", "or", "but", "for", "with", "about", "tell", "me", "explain", "works"].includes(word)
        );
        
        for (const term of potentialProtocols) {
          try {
            const info = await fetchProtocolInfo(term);
            addMessage(info, false);
            setIsLoading(false);
            return;
          } catch (error) {
            continue;
          }
        }
        
        // If no specific protocol found, handle as a general question
        handleGeneralQuestion(question);
      } catch (error) {
        console.error("Error processing with uAgent:", error);
        handleGeneralQuestion(question);
      }
    } else {
      // Fall back to basic keyword matching if uAgent isn't available
      handleGeneralQuestion(question);
    }
  };

  const handleGeneralQuestion = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    
    // Simple keyword matching
    if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi')) {
      addMessage("👋 Hello! How can I help you with Emrys today?", false);
    } else if (lowerQuestion.includes('thank')) {
      addMessage("You're welcome! Let me know if you have any other questions about Emrys.", false);
    } else if (
      lowerQuestion.includes('bridge') || 
      lowerQuestion.includes('transfer') || 
      lowerQuestion.includes('send')
    ) {
      addMessage("Emrys makes it easy to bridge tokens between chains. Just click 'Start Bridging' at the top and select your preferred network.", false);
    } else if (
      lowerQuestion.includes('walrus') || 
      lowerQuestion.includes('storage') || 
      lowerQuestion.includes('store')
    ) {
      addMessage("Emrys uses Walrus decentralized storage to securely store your transaction data across multiple networks. This ensures your data remains secure, immutable, and easily accessible regardless of which blockchain you're using.", false);
    } else if (
      lowerQuestion.includes('fetch') || 
      lowerQuestion.includes('agent') || 
      lowerQuestion.includes('uagent') ||
      lowerQuestion.includes('ai') ||
      lowerQuestion.includes('chat')
    ) {
      addMessage("This chat assistant is powered by fetch.ai uAgents technology, which provides intelligent, context-aware interactions. It allows me to understand your questions and provide relevant information about Emrys.", false);
    } else {
      // Try to find the most relevant FAQ
      const relevantFaqs = faqData.filter(item => {
        const q = item.question.toLowerCase();
        // Check if any words from the question are in the FAQ question
        return lowerQuestion.split(' ').some(word => 
          word.length > 3 && q.includes(word)
        );
      });
      
      if (relevantFaqs.length > 0) {
        addMessage(relevantFaqs[0].answer, false);
      } else {
        addMessage("I don't have specific information about that yet. You might want to check out our documentation or contact support for more details.", false);
      }
    }
    
    setIsLoading(false);
  };

  const addMessage = (text: string, isUser: boolean) => {
    setMessages(prev => [...prev, { 
      id: prev.length + 1, 
      text, 
      isUser 
    }]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden">
      <div className="flex flex-col h-96">
        <div className="flex items-center p-3 bg-primary-500 text-white">
          <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
          <h3 className="font-medium">
            Emrys FAQ Assistant 
            <span className="text-xs opacity-75 ml-2">
              (Powered by fetch.ai uAgents{uAgentAvailable ? ' - Connected' : ' - Offline'})
            </span>
          </h3>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser 
                      ? 'bg-accent-500 text-white rounded-br-none' 
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2 p-3 bg-gray-100 rounded-lg rounded-bl-none">
                  <SpinnerIcon className="h-5 w-5 text-primary-500" />
                  <span className="text-sm text-gray-600">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {messages.length === 1 && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.slice(0, 5).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(question)}
                    className="text-sm bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-gray-700 transition-colors"
                  >
                    {question}
                  </button>
                ))}
                <button
                  onClick={() => handleQuestionClick("What is Walrus storage?")}
                  className="text-sm bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-gray-700 transition-colors"
                >
                  What is Walrus storage?
                </button>
                {uAgentAvailable && (
                  <button
                    onClick={() => handleQuestionClick("Tell me about blockchain technologies")}
                    className="text-sm bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-gray-700 transition-colors"
                  >
                    Blockchain technologies
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Ask me anything about Emrys..."
              className="flex-1 py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              disabled={isLoading}
            />
            <SolidButton type="submit" color="accent" className="px-4" disabled={isLoading}>
              {isLoading ? <SpinnerIcon className="h-5 w-5" /> : 'Send'}
            </SolidButton>
          </div>
        </form>
      </div>
    </div>
  );
} 