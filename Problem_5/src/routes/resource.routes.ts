import { Router } from 'express';
import { ResourceService } from '../services/resource.service';

const router = Router();
const resourceService = new ResourceService();

router.post('/', async (req, res) => {
  try {
    const resource = await resourceService.create(req.body);
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.get('/', async (req, res) => {
  try {
    const resources = await resourceService.findAll();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const resource = await resourceService.findOne(parseInt(req.params.id, 10));
    if (resource) {
      res.status(200).json(resource);
    } else {
      res.status(404).json({ message: 'Resource not found' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
  try {
    const resources = await resourceService.findAll();
    if (resources.length === 0) {
      res.status(404).json({ message: 'No resources found' });
    } else {
      res.json(resources);
    }
  } catch (error) {
    console.error('Error retrieving resources:', error);
    res.status(500).json({ error: 'Error retrieving resources', details: error });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const resource = await resourceService.update(parseInt(req.params.id, 10), req.body);
    if (resource) {
      res.status(200).json(resource);
    } else {
      res.status(404).json({ message: 'Resource not found' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await resourceService.delete(parseInt(req.params.id, 10));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export { router as ResourceRouter };
