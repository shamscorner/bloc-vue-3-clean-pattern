import { DataError } from "../../../common/domain/DataError";
import { Either } from "../../../common/domain/Either";
import { Cart } from "../entities/Cart";
import { CartRepository } from "../repositories/CartRepository";

export class GetCartUsecase {
  private cartRepository: CartRepository;

  constructor(cartRepository: CartRepository) {
    this.cartRepository = cartRepository;
  }

  execute(): Promise<Either<DataError, Cart>> {
    return this.cartRepository.get();
  }
}
