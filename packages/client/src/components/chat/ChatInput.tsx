import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button } from '../ui/button';
import { FaArrowUp } from 'react-icons/fa';

import popSound from '@/assets/sounds/pop.mp3';
import notificationSound from '@/assets/sounds/notification.mp3';

const popAudio = new Audio(popSound);
popAudio.volume = 0.5;

const notificationAudio = new Audio(notificationSound);
notificationAudio.volume = 0.5;

type props = {
   setIsBotTyping: React.Dispatch<React.SetStateAction<boolean>>;
   setErrors: React.Dispatch<React.SetStateAction<string | null>>;
   setMessages: React.Dispatch<
      React.SetStateAction<{ content: string; role: 'user' | 'bot' }[]>
   >;
};

type FormData = {
   prompt: string;
};

type ChatResponse = {
   response: string;
};

const ChatInput = ({ setIsBotTyping, setErrors, setMessages }: props) => {
   const conversationId = useRef(crypto.randomUUID());
   const { register, handleSubmit, reset, formState } = useForm<FormData>();

   const onSubmit = async ({ prompt }: FormData) => {
      try {
         setIsBotTyping(true);
         setErrors(null);
         setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);
         popAudio.play();

         const { data } = await axios.post<ChatResponse>('/api/chat', {
            prompt,
            conversationId: conversationId.current,
         });
         setMessages((prev) => [
            ...prev,
            { content: data.response, role: 'bot' },
         ]);
         notificationAudio.play();
         setIsBotTyping(false);
      } catch (error) {
         console.error(error);
         setErrors('An error occurred while processing your request.');
         setIsBotTyping(false);
      } finally {
         setIsBotTyping(false);
      }
      reset({ prompt: '' });
   };

   return (
      <form
         onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
               e.preventDefault();
               handleSubmit(onSubmit)();
            }
         }}
         onSubmit={handleSubmit(onSubmit)}
         className="w-full flex flex-col border-2 p-4 rounded-lg"
      >
         <textarea
            {...register('prompt', {
               required: true,
               maxLength: 1000,
               validate: (value) => value.trim().length > 0,
            })}
            className="w-full h-24 p-2 border-0 outline-0 resize-none"
            placeholder="Ask me anything..."
            maxLength={1000}
            autoFocus
         ></textarea>
         <Button
            disabled={!formState.isValid}
            className="mt-2 self-end rounded-full w-9 h-9 pointer"
         >
            <FaArrowUp />
         </Button>
      </form>
   );
};

export default ChatInput;
