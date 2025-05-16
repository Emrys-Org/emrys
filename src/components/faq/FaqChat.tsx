import { useEffect, useRef, useState } from 'react';
import { SolidButton } from '../buttons/SolidButton';

type Message = {
  id: number;
  text: string;
  isUser: boolean;
};

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
  }
];

export default function FaqChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "👋 Hi there! I'm Emrys Assistant. How can I help you today?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [suggestedQuestions, setSuggestedQuestions] = useState(faqData.map(item => item.question));
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    
    setTimeout(() => {
      const faqItem = faqData.find(item => 
        item.question.toLowerCase() === question.toLowerCase()
      );
      
      if (faqItem) {
        addMessage(faqItem.answer, false);
      } else {
        handleCustomQuestion(question);
      }
      
      // Reset suggested questions after answering
      setSuggestedQuestions(faqData.map(item => item.question));
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    addMessage(inputValue, true);
    handleCustomQuestion(inputValue);
    setInputValue('');
  };

  const handleCustomQuestion = (question: string) => {
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
          <h3 className="font-medium">Emrys FAQ Assistant</h3>
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
            <div ref={messagesEndRef} />
          </div>
          
          {messages.length === 1 && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(question)}
                    className="text-sm bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-gray-700 transition-colors"
                  >
                    {question}
                  </button>
                ))}
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
            />
            <SolidButton type="submit" color="accent" className="px-4">
              Send
            </SolidButton>
          </div>
        </form>
      </div>
    </div>
  );
} 