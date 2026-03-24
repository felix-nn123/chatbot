import { useEffect, useRef, useState } from 'react';

import TypingIndicator from './TypingIndicator';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

type Message = {
   content: string;
   role: 'user' | 'bot';
};

const Chatbox = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [errors, setErrors] = useState<string | null>(null);
   const [isBotTyping, setIsBotTyping] = useState(false);
   const formRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages]);

   return (
      <div className="w-full max-w-md mx-auto">
         <div className="w-full h-96 p-4 mb-4 border-2 rounded-lg overflow-y-auto flex flex-col gap-2">
            <ChatMessages messages={messages} />
            {isBotTyping && <TypingIndicator />}

            {errors && <p className="text-red-500 mt-2">{errors}</p>}
            <div ref={formRef} />
         </div>

         <ChatInput
            setIsBotTyping={setIsBotTyping}
            setErrors={setErrors}
            setMessages={setMessages}
         />
      </div>
   );
};

export default Chatbox;
