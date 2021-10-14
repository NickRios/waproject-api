import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { IOrder } from 'modules/database/interfaces/order';
import { Order } from 'modules/database/models/order';

import { OrderRepository } from '../repositories/order';
import { UserRepository } from '../repositories/user';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository, private userRepository: UserRepository) {}

  public async save(model: IOrder, currentUser: ICurrentUser): Promise<Order> {
    if (model.id) return this.update(model);
    return this.create(model, currentUser);
  }

  public async remove(orderId: number, currentUser: ICurrentUser): Promise<void> {
    const order = await this.orderRepository.findById(orderId);
    const user = await this.userRepository.findById(currentUser.id);

    if (!order) {
      throw new NotFoundException('not-found');
    }

    if (user.isSysAdmin()) {
      throw new BadRequestException('not-allowed-remove-sysAdmin');
    }

    return this.orderRepository.remove(orderId);
  }

  private async create(model: IOrder, currentUser: ICurrentUser): Promise<Order> {
    const { id } = await this.userRepository.findById(currentUser.id);
    model.userId = id;

    const order = await this.orderRepository.insert(model);

    return order;
  }

  private async update(model: IOrder): Promise<Order> {
    const order = await this.orderRepository.findById(model.id);

    if (!order) throw new NotFoundException('not-found');

    return this.orderRepository.update({ ...order, ...model });
  }
}
