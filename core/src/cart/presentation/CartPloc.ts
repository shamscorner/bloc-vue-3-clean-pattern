import { DataError } from '../../common/domain/DataError';
import { Ploc } from '../../common/presentation/Ploc';
import { Product } from '../../products/domain/entities/Product';
import { Cart } from '../domain/entities/Cart';
import { AddProductToCartUsecase } from '../domain/usecases/AddProductToCartUsecase';
import { EditQuantityOfCartItemUsecase } from '../domain/usecases/EditQuantityOfCartItemUsecase';
import { GetCartUsecase } from '../domain/usecases/GetCartUsecase';
import { RemoveItemFromCartUsecase } from '../domain/usecases/RemoveItemFromCartUsecase';
import { cartInitialState, CartItemState, CartState } from './CartState';

export class CartPloc extends Ploc<CartState> {
  constructor(
    private getCartUsecase: GetCartUsecase,
    private addProductToCartUsecase: AddProductToCartUsecase,
    private removeItemFromCartUsecase: RemoveItemFromCartUsecase,
    private editQuantityOfCartItemUsecase: EditQuantityOfCartItemUsecase
  ) {
    super(cartInitialState);

    this.loadCart();
  }

  closeCart() {
    this.changeState({ ...this.state, open: false });
  }

  openCart() {
    this.changeState({ ...this.state, open: true });
  }

  async removeCartItem(item: CartItemState) {
    const result = await this.removeItemFromCartUsecase.execute(item.id);

    result.fold(
      (error) => this.changeState(this.handleError(error)),
      (cart) => this.changeState(this.mapToUpdatedState(cart))
    );
  }

  async editQuantityCartItem(item: CartItemState, quantity: number) {
    const result = await this.editQuantityOfCartItemUsecase.execute(
      item.id,
      quantity
    );

    result.fold(
      (error) => this.changeState(this.handleError(error)),
      (cart) => this.changeState(this.mapToUpdatedState(cart))
    );
  }

  async addProductToCart(product: Product) {
    const result = await this.addProductToCartUsecase.execute(product);

    result.fold(
      (error) => this.changeState(this.handleError(error)),
      (cart) => this.changeState(this.mapToUpdatedState(cart))
    );
  }

  private async loadCart() {
    const result = await this.getCartUsecase.execute();

    result.fold(
      (error) => this.changeState(this.handleError(error)),
      (cart) => this.changeState(this.mapToUpdatedState(cart))
    );
  }

  mapToUpdatedState(cart: Cart): CartState {
    const formatOptions = { style: 'currency', currency: 'EUR' };

    return {
      kind: 'UpdatedCartState',
      open: this.state.open,
      totalItems: cart.totalItems,
      totalPrice: cart.totalPrice.toLocaleString('es-ES', formatOptions),
      items: cart.items.map((cartItem) => {
        return {
          id: cartItem.id,
          image: cartItem.image,
          title: cartItem.title,
          price: cartItem.price.toLocaleString('es-ES', formatOptions),
          quantity: cartItem.quantity,
        };
      }),
    };
  }

  private handleError(error: DataError): CartState {
    switch (error.kind) {
      case 'UnexpectedError': {
        return {
          open: this.state.open,
          kind: 'ErrorCartState',
          error: 'Sorry, an error has ocurred. Please try later again',
        };
      }
    }
  }
}
