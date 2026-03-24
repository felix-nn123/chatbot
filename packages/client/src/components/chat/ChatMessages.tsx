import React from 'react';
import ReactMarkdown from 'react-markdown';

type props = {
   messages: {
      content: string;
      role: 'user' | 'bot';
   }[];
};

const ChatMessages = ({ messages }: props) => {
   const onCopy = (e: React.ClipboardEvent<HTMLDivElement>) => {
      const selection = window.getSelection()?.toString().trim();
      if (selection) {
         e.preventDefault();
         e.clipboardData.setData('text/pain', selection);
      }
   };

   return (
      <div>
         {messages.map((msg, index) => (
            <div
               onCopy={onCopy}
               key={index}
               className={
                  msg.role === 'user'
                     ? 'text-right text-green-800'
                     : 'text-left'
               }
            >
               <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
         ))}
      </div>
   );
};

export default ChatMessages;
