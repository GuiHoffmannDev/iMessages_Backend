import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.post('/login', async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: 'Username is missing' });
  }

  const user = await prisma.user.findUnique({ where: { username } });
  if (user) {
    return res.json(user);
  }

  try {
    const user = await prisma.user.create({
      data: {
        username,
        name: username,
      },
    });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: 'Error creating a new user' });
  }
});

export default router;
