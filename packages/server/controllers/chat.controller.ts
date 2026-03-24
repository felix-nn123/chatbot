import type { Request, Response } from 'express';
import { chatService } from '../services/chat.service';
import z from 'zod';

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required')
      .max(1000, 'Prompt is too long'),
   conversationId: z.string().optional(),
});

export const chatControllers = {
   sendmessage: async (req: Request, res: Response) => {
      try {
         // platform.openai.com/docs/models
         console.log('Received request body:', req.body);
         const parseResult = chatSchema.safeParse(req.body);
         if (!parseResult.success) {
            res.status(400).json({ error: 'please provide a valid prompt' });
            return;
         }

         const { prompt, conversationId } = req.body;

         const response = await chatService.sendMessage(
            prompt,
            conversationId || ''
         );

         res.json({ response: response.message });
      } catch (error) {
         console.error('Error generating haiku:', error);
         res.status(500).send({ error: 'Failed to generate haiku' });
      }
   },
};
