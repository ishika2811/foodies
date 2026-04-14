package in.ishikag.foodiesapi.service;

import in.ishikag.foodiesapi.io.CartRequest;
import in.ishikag.foodiesapi.io.CartResponse;

public interface CartService {

    CartResponse addToCart(CartRequest request);

    CartResponse getCart();

    void clearCart();

    CartResponse removeFromCart(CartRequest cartRequest);
}
