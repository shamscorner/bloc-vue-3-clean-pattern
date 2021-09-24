import { DataError } from "../../../common/domain/DataError";
import { Either } from "../../../common/domain/Either";
import { EitherAsync } from "../../../common/domain/EitherAsync";
import { Cart } from "../entities/Cart";
import { CartRepository } from "../repositories/CartRepository";

export class EditQuantityOfCartItemUsecase {
  private cartRepository: CartRepository;

  constructor(cartRepository: CartRepository) {
    this.cartRepository = cartRepository;
  }

  async execute(
    itemId: string,
    quantity: number
  ): Promise<Either<DataError, Cart>> {
    const cartResult = EitherAsync.fromPromise(this.cartRepository.get());

    return cartResult
      .flatMap(async (cart) => {
        const editedCart = cart.editItem(itemId, quantity);

        const saveResult = await this.cartRepository.save(editedCart);

        return saveResult.map(() => editedCart);
      })
      .run();
  }
}
