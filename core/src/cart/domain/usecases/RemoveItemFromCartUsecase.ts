import { DataError } from "../../../common/domain/DataError";
import { Either } from "../../../common/domain/Either";
import { EitherAsync } from "../../../common/domain/EitherAsync";
import { Cart } from "../entities/Cart";
import { CartRepository } from "../repositories/CartRepository";

export class RemoveItemFromCartUsecase {
  private cartRepository: CartRepository;

  constructor(cartRepository: CartRepository) {
    this.cartRepository = cartRepository;
  }

  async execute(itemId: string): Promise<Either<DataError, Cart>> {
    const cartResult = EitherAsync.fromPromise(this.cartRepository.get());

    return cartResult
      .flatMap(async (cart) => {
        const editedCart = cart.removeItem(itemId);

        const saveResult = await this.cartRepository.save(editedCart);

        return saveResult.map(() => editedCart);
      })
      .run();
  }
}
