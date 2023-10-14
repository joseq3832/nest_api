import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userCreated = await this.prisma.user.create({
      data: createUserDto,
    })
    return userCreated
  }

  async findAll() {
    const users = await this.prisma.user.findMany()
    return users
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    })
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.prisma.user.update({
      data: updateUserDto,
      where: {
        id,
      },
    })
    return updatedUser
  }

  async remove(id: number) {
    const removedUser = await this.prisma.user.delete({
      where: {
        id,
      },
    })
    return removedUser
  }
}
