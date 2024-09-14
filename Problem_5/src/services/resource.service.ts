import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';  // Correct the path
import { Resource } from '../entities/Resource';

export class ResourceService {
  private resourceRepository: Repository<Resource>;

  constructor() {
    this.resourceRepository = AppDataSource.getRepository(Resource);
  }

  async create(data: Partial<Resource>): Promise<Resource> {
    const resource = this.resourceRepository.create(data);
    return await this.resourceRepository.save(resource);
  }

  async findAll(): Promise<Resource[]> {
    return await this.resourceRepository.find();
  }

  async findOne(id: number): Promise<Resource | undefined> {
    const resource = await this.resourceRepository.findOne({ where: { id } });
    return resource || undefined;
  }

  async update(id: number, data: Partial<Resource>): Promise<Resource | undefined> {
    await this.resourceRepository.update(id, data);
    const updatedResource = await this.resourceRepository.findOne({ where: { id } });
    return updatedResource ?? undefined; 
  }
  

  async delete(id: number): Promise<void> {
    await this.resourceRepository.delete(id);
  }
}
