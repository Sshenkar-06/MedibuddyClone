import { createContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({children}) => {
   // const [cartCount,setcartCount] = useState(0);
    const [cartItems,setCartItems] = useState([]);
    const [selectedAddress,setSelectedAddress] = useState({});


  useEffect(()=> {
     const storedCartItems  = localStorage.getItem("cartItems");
     if(storedCartItems){
        setCartItems(JSON.parse(storedCartItems));
     }

     const address = localStorage.getItem("address");
     if(address) {
      setSelectedAddress(JSON.parse(address));
     }
    },[])

    const addToCart = (product) => {
         product = {...product,quantity:1}
         const totalItems = [...cartItems, product];
        setCartItems(totalItems);
        localStorage.setItem("cartItems", JSON.stringify(totalItems));
    }

    const deleteCartItem = (drugCode) => {
       const filteredItems = cartItems.filter((item)=> item.drugCode != drugCode);
       setCartItems(filteredItems);
       localStorage.setItem("cartItems", JSON.stringify(filteredItems));
    }

    const handleQuantity = (drugCode,type) => {
      console.log("before",cartItems);
      let newCartItems
      if(type == 'Increase') {
      newCartItems  =  cartItems.map((item)=> (item.drugCode == drugCode  ? {...item,quantity:item.quantity + 1 } : item))
      }else {
         newCartItems =  cartItems.map((item)=> (item.drugCode == drugCode  ? {...item,quantity:item.quantity - 1 } : item))
      }
      setCartItems(newCartItems);
    }

    const handleAddressSel = (address) => {
      setSelectedAddress(address);
      localStorage.setItem("address",JSON.stringify(address));
    } 

     const order = useMemo(() => {
        const totalMRP = cartItems.reduce((acc, item) => acc + (item.actualPrice * item.quantity), 0);
        //  const totalDiscount = cartItems.reduce((acc,item)=> acc + (item.discountPercentage > 0 ? ((item.actualPrice * item.quantity) * (item.discountPercentage / 100)) : 0),0);
        const totalPrice = cartItems.reduce((acc, item) => acc + (item.discountPrice * item.quantity), 0);
        const totalDiscount = totalMRP - totalPrice;
        return { cartItems, totalMRP, totalDiscount, totalPrice,address:selectedAddress };
      }, [cartItems,selectedAddress]);

      console.log("Order",order);

    return (
        <>
          <CartContext.Provider value={{addToCart,cartCount:cartItems.length,cartItems,handleQuantity,deleteCartItem,order,selectedAddress,handleAddressSel}}>
            {children}
          </CartContext.Provider>
        </>
    )
}

export default CartProvider;