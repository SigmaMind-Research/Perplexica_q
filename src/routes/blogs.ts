import express, { Request, Response } from 'express';
import db from '../db/index';
import { blogs, blogmessages } from '../db/schema';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

const router = express.Router();

// Zod validation schema
const publishSchema = z.object({
  title: z.string().min(1),
  imageUrl: z.string().url(),
  focusMode: z.string().min(1),
  userId: z.string().uuid().optional(),
  chatId: z.string().min(1),
  messages: z.array(
    z.object({
      id: z.string(),
      role: z.enum(['assistant', 'user']),
      content: z.string(),
      imageUrl: z.string().nullable().optional(),
      metadata: z.any().optional(),
    })
  ),
});

router.post('/publish', async (req: Request, res: Response) => {
  try {
    const parsed = publishSchema.parse(req.body);

    const {
      title,
      imageUrl,
      userId,
      chatId,
      messages,
    } = parsed;

    // Generate blog ID
    const blogId = uuidv4();

    // Insert into blogs table
    await db.insert(blogs).values({
      id: blogId,
      title,
      userId,
      imageUrl,
      createdAt: new Date().toISOString(),
    });

    // Prepare messages
    const blogMessagesPayload = messages.map((msg) => ({
      blogId,
      messageId: msg.id,
      content: msg.content,
      imageUrl: msg.imageUrl || null,
      role: msg.role,
      metadata: msg.metadata ? JSON.stringify(msg.metadata) : null,
    }));

    // Insert all messages
    await db.insert(blogmessages).values(blogMessagesPayload);

    return res.status(200).json({ success: true, blogId });
  } catch (error: any) {
    console.error('[BLOG_PUBLISH_ERROR]', error);
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
