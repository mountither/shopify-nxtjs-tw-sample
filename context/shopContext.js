import { createContext, useState, useContext, useEffect } from "react";
import { createCheckout, updateCheckout } from "../lib/shopify";

const CartContext = createContext();

const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const [cartOpen, setCartOpen] = useState(false);

  const [checkoutId, setCheckoutId] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState("");

  useEffect(() => {
    if (localStorage.checkout_id) {
      const cartObj = JSON.parse(localStorage.checkout_id);

      if (cartObj[0].id) {
        setCart([cartObj[0]]);
      } else if (cartObj[0].length > 0) {
        setCart(...[cartObj[0]]);
      }

      setCheckoutId(cartObj[1].id);
      setCheckoutUrl(cartObj[1].webUrl);
    }
  }, []);

  const addToCart = async (newItem) => {
    setCartOpen(true);
    if (cart.length === 0) {
      setCart([newItem]);
      const checkout = await createCheckout(
        newItem.id,
        newItem.variantQuantity
      );

      setCheckoutId(checkout.id);
      setCheckoutUrl(checkout.webUrl);

      localStorage.setItem("checkout_id", JSON.stringify([newItem, checkout]));
    } else {
      let newCart = [...cart];

      cart.map((item) => {
        if (item.id === newItem.id) {
          item.variantQuantity++;
          newCart = [...cart];
        } else {
          newCart = [...cart, newItem];
        }
      });

      setCart(newCart);

      const newCheckout = await updateCheckout(checkoutId, newCart);
      localStorage.setItem(
        "checkout_id",
        JSON.stringify([newCart, newCheckout])
      );
    }
  };

  const removeCartItem = async (itemToRemoveID) => {
    const updatedCart = cart.filter(item => item.id !== itemToRemoveID);

    setCart(updatedCart);

    const newCheckout = await updateCheckout(checkoutId, updatedCart);

    localStorage.setItem("checkout_id", JSON.stringify([updatedCart, newCheckout]));

    if(cart.length === 1){
        setCartOpen(false)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        setCartOpen,
        addToCart,
        removeCartItem,
        checkoutUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

export default ShopProvider;
