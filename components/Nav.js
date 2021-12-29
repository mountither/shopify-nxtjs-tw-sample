import Link from "next/link";
import { useCart } from "../context/shopContext";
import CartDrawer from "./CartDrawer";

const Nav = () => {

    const {cart, cartOpen, setCartOpen} = useCart();


    let carQuantity = 0;

    cart.map(item => {
        return (carQuantity += item?.variantQuantity)
    })


  return (
    <header className="border-b sticky top-0 z-20 bg-white ">
      <div className="flex items-center justify-between max-w-6xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl">
        <Link href="/" passHref>
          <a className="cursor-pointer">
            <span className="text-lg pt-1 font-bold">Sample eCommerce</span>
          </a>
        </Link>
        <a className="text-md font-bold cursor-pointer" onClick={()=> setCartOpen(true)}>
            Cart ({carQuantity})
        </a>
        <CartDrawer cart={cart}/>
      </div>
    </header>
  );
};

export default Nav;
