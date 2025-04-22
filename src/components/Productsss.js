import React, { useState } from 'react'; 
import { useUserContext } from '../Register/UserContext'; 
import { ToastContainer, toast } from "react-toastify"; 
import CartProduct from './CartProduct'; 
import Card from './Card'; 
import './Products.css'; 
import data from './productItemsData'; 
import SearchBar from '../SearchBar/SearchBar'; 
 
 
export default function Products() { 
  const [products] = useState(data); 
  const [shoppingCart, setShoppingCart] = useState([]); 
  const [filter, setFilter] = useState('all'); 
  const [searchTerm, setSearchTerm] = useState('');  
  const { user } = useUserContext(); 
 
  const [currentPage, setCurrentPage] = useState(1); // صفحه فعلی 
  const itemsPerPageArray = [12, 9]; 
 
  const notify = (message, type = "info") => { 
    toast(message, { 
      position: "top-right", 
      autoClose: 3000, // مدت زمان نمایش (میلی‌ثانیه) 
      hideProgressBar: false, 
      closeOnClick: true, 
      pauseOnHover: true, 
      draggable: true, 
      type, 
    }); 
  }; 
 
  const addProductToCart = (productId) => { 
    const isProductInCart = shoppingCart.some((product) => product.id === productId); 
    if (!isProductInCart) { 
      let mainProduct = products.find(product => product.id === productId); 
      setShoppingCart(prevState => [...prevState, { ...mainProduct, quantity: 1 }]); 
      // Add product to cart logic 
      notify("Product added to cart!", "success"); 
    } else { 
      notify("This product is already in the cart.", "warning"); 
    } 
  }; 
 
 
  const emptyShoppingCart = () => { 
    setShoppingCart([]); 
  }; 
 
  const removeProductFromCart = (productId) => { 
    let newShoppingCart = shoppingCart.filter(product => product.id !== productId); 
    setShoppingCart(newShoppingCart); 
  }; 
 
  const shoppingHandler = async (event, products) => { 
    event.preventDefault(); 
 
    const filteredProducts = products.map(product => ({ 
      title: product.title, 
      price: product.price, 
      quantity: product.quantity, 
    })); 
     
    const userInfo = { 
      userName: user, // اضافه کردن userName به اطلاعات ارسال‌شده 
      filteredProducts 
    }; 
 
  try { 
    fetch('https://vapornestproduct-default-rtdb.firebaseio.com/orders.json', { 
      method: 'POST', 
      body: JSON.stringify(userInfo), 
    }).then(response => { 
      if (response.ok) { 
        notify("Your order has been placed. Our team will contact you soon.", "success"); 
      } else { 
        notify("Failed to place the order. Please try again.", "error"); 
      } 
    }); 
  } catch (error) { 
    notify("An error occurred while placing your order.", "error"); 
  } 
 
  emptyShoppingCart(); 
}; 
 
 
 
 
const updateQuantity = (productId, quantity) => { 
  setShoppingCart(prevCart => prevCart.map(product =>  
    product.id === productId ? { ...product, quantity } : product 
  )); 
}; 
 
const calculateTotalPrice = () => {
    return shoppingCart.reduce((total, product) => {
      const finalPrice = (product.price || 0) * (product.quantity || 1);
      return total + finalPrice;
    }, 0);
  };
 
const totalPrice = calculateTotalPrice(); 
 
const filteredProducts = products 
.filter(product => { 
  if (filter === 'all') return true; 
  if (filter === 'pod') return product.category === 'pod'; 
  if (filter === 'vape') return product.category === 'vape'; 
  if (filter === 'under30') return product.price < 30; 
    return true; 
  }) 
  .filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) 
  ); 
 
    // محاسبه تعداد صفحات 
  const totalPages = itemsPerPageArray.length; // دو صفحه 
 
  // محاسبه اندیس شروع و پایان برای هر صفحه 
  const startIndex = itemsPerPageArray 
    .slice(0, currentPage - 1) 
    .reduce((acc, num) => acc + num, 0); 
  const endIndex = startIndex + itemsPerPageArray[currentPage - 1]; 
 
  const currentProducts = filteredProducts.slice(startIndex, endIndex); 
 
  const handleNextPage = () => { 
    if (currentPage < totalPages) { 
      setCurrentPage((prevPage) => prevPage + 1); 
    } 
  }; 
 
  const handlePreviousPage = () => { 
    if (currentPage > 1) {setCurrentPage((prevPage) => prevPage - 1); 
    } 
  }; 
 
  return ( 
    <div className='allProduct'> 
      <div className='find-product'> 
      <span className='searchbar'> 
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> 
      </span> 
        <select className='filter-button' onChange={(e) => setFilter(e.target.value)} value={filter}> 
          <option value="all">Filter</option> 
          <option value="pod">Pods</option> 
          <option value="vape">Vapes</option> 
          <option value="under30">Below 30$</option> 
        </select> 
      </div> 
      <div className="grid-container"> 
        {currentProducts.map(product => ( 
          <Card key={product.id} product={product} onAddProduct={addProductToCart} /> 
        ))} 
      </div> 
 
      {/* صفحه‌بندی */} 
      <div className="pagination"> 
        <button onClick={handlePreviousPage} disabled={currentPage === 1}> 
          &lt;  
        </button> 
        <span>Page {currentPage} of {totalPages}</span> 
        <button onClick={handleNextPage} disabled={currentPage === totalPages}> 
           &gt; 
        </button> 
      </div> 
 
      <section className="container content-section"> 
        <h2 className="section-header">SHOPPING CART</h2> 
        <div className="cart-row"> 
          <span className="cart-item cart-header cart-column">ITEM</span> 
          <span className="cart-price cart-header cart-column">PRICE</span> 
          <span className="cart-quantity cart-header cart-column">quantity</span> 
          <span className="cart-quantity cart-header cart-column">Doing</span> 
        </div> 
        <div className="cart-items"> 
        {shoppingCart.length > 0 ? ( 
            shoppingCart.map(product => ( 
                <CartProduct 
                    key={product.id} 
                    {...product} 
                    onRemove={removeProductFromCart} 
                    onUpdateQuantity={updateQuantity} 
                /> 
            )) 
        ) : ( 
            <p className="empty-cart-message">Your shopping cart is empty.</p> 
        )} 
        </div> 
     
 
 
      </section> 
      <div className='buttons'> 
        <button className="btn-shop" type="button" onClick={(e) => shoppingHandler(e, shoppingCart)}> 
          Shop 
        </button> 
        <button className="btn-total" type="button"> 
          Total Price: ${totalPrice.toFixed(2)} 
        </button> 
        <button className="btn-empty" type="button" onClick={emptyShoppingCart}> 
          Empty Cart 
        </button> 
      </div> 
 
       
      <ToastContainer/> 
    </div> 
  ); 
}