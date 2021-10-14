import * as faker from 'faker/locale/pt_BR';
import * as Knex from 'knex';
import { IOrder } from 'modules/database/interfaces/order';
import { IS_DEV } from 'settings';

export async function seed(knex: Knex): Promise<void> {
  if (!IS_DEV) return;

  const orders = await knex
    .count()
    .from('Order')
    .first();

  if (Number(orders.count) !== 1) return;

  for (let x = 0; x < 100; x++) {
    const title = faker.commerce.productName();
    const userId = 1;
    const description = 'Descrição do Produto';
    const amount = faker.random.number();
    const price = faker.random.number();

    const order: IOrder = {
      userId,
      title,
      description,
      amount,
      price,
      createdDate: new Date(),
      updatedDate: new Date()
    };

    await knex.insert(order).into('Order');
  }
}
