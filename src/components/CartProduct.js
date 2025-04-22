import React, { useState } from 'react'; 
 
export default function CartProduct(props) { 
    const { title, img, price, id } = props;  
 
    const [quantity, setQuantity] = useState(1); 
    const [pricing, setPricing] = useState(price); 
 
    // useEffect(() => { 
    //     setPricing(price * quantity); 
    //     onUpdateQuantity(id, quantity);  
    // }, [quantity, price, id, onUpdateQuantity]); 
 
    const removeProductFromCart = () => { 
        props.onRemove(id, quantity);  
    }; 
 
    const addClickHandler = () => { 
        const newQuantity = quantity + 1; 
        setQuantity(newQuantity); 
        setPricing(price * newQuantity); 
        props.onUpdateQuantity(id, newQuantity)   
    }; 
 
    const minusClickHandler = () => { 
        if (quantity <= 1) { 
            removeProductFromCart();  
        } else { 
            const newQuantity = quantity - 1; 
            setQuantity(newQuantity); 
            setPricing(price * newQuantity); 
            props.onUpdateQuantity(id, newQuantity) 
        } 
    }; 
 
    const finalPrice = price * quantity 
     
  return ( 
      <div class="cart-row"> 
          <div class="cart-item cart-column"> 
          <img class="cart-item-image" src={img} alt="image.alt" width={100} height={100} /> 
              <span class="cart-item-title">{title}</span> 
          </div> 
          <span class="cart-price cart-column">${finalPrice.toFixed(2)}</span> 
          <div className="cart-quantity"> 
          <button className="btn-minus" onClick= {minusClickHandler}>-</button> 
          <span className="quantity cart-column">{quantity}</span> 
          <button className="btn-plus" 
          onClick= {addClickHandler}>+</button> 
          </div> 
          <div class="cart-quantity cart-column"> 
              <button class="btn btn-danger" type="button" 
              onClick={() => removeProductFromCart(props.id)}>REMOVE</button> 
          </div> 
      </div> 
    ) 
}