import { Repository } from 'typeorm';
import { BaseEntity } from './base.entity';
import { plainToInstance } from 'class-transformer';
import { UserDto } from 'src/users/user.dto';

export class MysqlBaseService<Entity extends BaseEntity, Dto> {
  constructor(protected repo: Repository<Entity>) {}
  async save(userDto: Dto): Promise<any> {
    const saveUser = await this.repo.save(userDto as any);
    return plainToInstance(UserDto, saveUser, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, userDto: Dto): Promise<{ result: string }> {
    const updateUser = await this.repo.update(id, userDto as any);
    return { result: 'success' };
  }

  async findOne(id: string): Promise<any> {
    const foundUser = await this.repo.findOne({
      where: {
        id: id as any,
      },
    });
    if (foundUser === null) {
      return null;
    }
    return plainToInstance(UserDto, foundUser, {
      excludeExtraneousValues: true,
    });
  }

  async deleteById(id: string): Promise<{ result: string }> {
    const deleteResult = await this.repo.softDelete(id);
    return { result: 'success' };
  }
}
