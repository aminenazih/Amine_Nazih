import express from 'express';
import { DataSource } from 'typeorm';
import path from 'path';
import { ResourceRouter } from './routes/resource.routes';
import { Resource } from './entities/Resource';

// Initialize Express app
const app = express();
const PORT =  Number(process.env.PORT) || 3000;
app.use(express.json());

// Create DataSource for SQLite
const AppDataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  entities: [path.join(__dirname, 'entities/*.js')],  // Adjust path if needed
  synchronize: true,
  logging: true
});

// Initialize the database connection
AppDataSource.initialize().then(() => {
  console.log("Database connected successfully");

  // Setup routes
  app.use('/resources', ResourceRouter);

  // Add the test insert endpoint
  app.post('/test-insert', async (req, res) => {
    try {
      const resourceRepository = AppDataSource.getRepository(Resource);
      const newResource = resourceRepository.create({
        name: 'Test Resource',
        description: 'This is a test resource'
      });
      const savedResource = await resourceRepository.save(newResource);
      res.json(savedResource);
    } catch (error) {
      res.status(500).json({ error: 'Error inserting test data', details: error });
    }
  });

  // Start the server
  app.listen(PORT,  '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error("Error during DataSource initialization", error);
});
