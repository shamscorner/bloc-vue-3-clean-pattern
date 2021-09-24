import { CartInMemoryRepository } from "../../cart/data/CartInMemoryRepository";
import { AddProductToCartUsecase } from "../../cart/domain/usecases/AddProductToCartUsecase";
import { EditQuantityOfCartItemUsecase } from "../../cart/domain/usecases/EditQuantityOfCartItemUsecase";
import { GetCartUsecase } from "../../cart/domain/usecases/GetCartUsecase";
import { RemoveItemFromCartUsecase } from "../../cart/domain/usecases/RemoveItemFromCartUsecase";
import { CartPloc } from "../../cart/presentation/CartPloc";
import { ProductInMemoryRepository } from "../../products/data/ProductInMemoryRepository";
import { GetProductsUsecase } from "../../products/domain/usecases/GetProductsUsecase";
import { ProductsPloc } from "../../products/presentation/ProductsPloc";

function provideProductsPloc(): ProductsPloc {
    const productRepository = new ProductInMemoryRepository();
    const getProductsUsecase = new GetProductsUsecase(productRepository);
    const productsPloc = new ProductsPloc(getProductsUsecase);

    return productsPloc;
}

function provideCartPloc(): CartPloc {
    const cartRepository = new CartInMemoryRepository();
    const getCartUsecase = new GetCartUsecase(cartRepository);
    const addProductToCartUsecase = new AddProductToCartUsecase(cartRepository);
    const removeItemFromCartUsecase = new RemoveItemFromCartUsecase(cartRepository);
    const editQuantityOfCartItemUsecase = new EditQuantityOfCartItemUsecase(cartRepository);
    const cartPloc = new CartPloc(
        getCartUsecase,
        addProductToCartUsecase,
        removeItemFromCartUsecase,
        editQuantityOfCartItemUsecase
    );

    return cartPloc;
}

export const dependenciesLocator = {
    provideProductsPloc,
    provideCartPloc,
};
