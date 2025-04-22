import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartProduct from './CartProduct';
import Card from './Card';
import Filter from './Filter';
import SearchBar from './SearchBar';
import './Products.css';
import { Typography, Button } from '@mui/material';
import data from './ProductsItemsData';
 
export default function Products() {
  const [products] = useState(data); // تمام محصولات
  const [shoppingCart, setShoppingCart] = useState([]);
  const [filter, setFilter] = useState(''); // ذخیره وضعیت فیلتر
  const [searchTerm, setSearchTerm] = useState(''); // عبارت جستجو
  const [currentPage, setCurrentPage] = useState(1); // صفحه فعلی
  const itemsPerPage = 8; // تعداد محصولات در هر صفحه

  // تابع اطلاع‌رسانی
  const notify = (message, type = "info") => {
    toast(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      type,
    });
  };

  // تغییر فیلتر
  const handleFilterChange = (category) => {
    setFilter(category);
  };

  // محصولات فیلتر شده براساس فیلتر و عبارت جستجو
  const filteredProducts = products
    .filter((product) => {
      if (!filter) return true; // اگر فیلتری انتخاب نشده
      return product.category === filter || (filter === 'under30' && product.price < 30);
    })
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // محاسبه تعداد صفحات
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const addProductToCart = (productId) => {
    const isProductInCart = shoppingCart.some((product) => product.id === productId);
    if (!isProductInCart) {
      const mainProduct = products.find((product) => product.id === productId);
      setShoppingCart((prevState) => [...prevState, { ...mainProduct, quantity: 1 }]);
      notify("Product added to cart!", "success");
    } else {
      notify("This product is already in the cart.", "warning");
    }
  };

  const emptyShoppingCart = () => {
    setShoppingCart([]);
    notify("Cart has been emptied.", "info");
  };

  const removeProductFromCart = (productId) => {
    const newShoppingCart = shoppingCart.filter((product) => product.id !== productId);
    setShoppingCart(newShoppingCart);
    notify("Product removed from cart.", "info");
  };

  const shoppingHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://argymregister-default-rtdb.firebaseio.com/users.json', {
        method: 'POST',
        body: JSON.stringify(shoppingCart),
      });
      if (response.ok) {
        notify("Order placed successfully!", "success");
        emptyShoppingCart();
      } else {
        notify("Failed to place order. Please try again.", "error");
      }
    } catch (error) {
      notify("An error occurred while placing the order.", "error");
    }
  };

  const updateQuantity = (productId, quantity) => {
    setShoppingCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId ? { ...product, quantity } : product
      )
    );
  };

  const calculateTotalPrice = () => {
    return shoppingCart.reduce((total, product) => {
      const finalPrice = (product.price || 0) * (product.quantity || 1);
      return total + finalPrice;
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className='productsss'>
      <Typography variant='h4' style={{ marginTop: '30px', textAlign: 'center' }}>
        Supplement Store
      </Typography>

      <div className='find-product'>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Filter onFilterChange={handleFilterChange} />
      </div>

      <div className='grid-container'>
        {currentProducts.map((product) => (
          <Card key={product.id} product={product} onAddProduct={addProductToCart} />
        ))}
      </div>
      <div className='pagination animated'>
  <Button
    onClick={handlePreviousPage}
    disabled={currentPage === 1}
    style={{ color: 'white', fontWeight: 'bold' }}
  >
    &lt; Previous
  </Button>
  <span style={{ color: 'white', fontWeight: 'bold' }}>
    Page {currentPage} of {totalPages}
  </span>
  <Button
    onClick={handleNextPage}
    disabled={currentPage === totalPages}
    style={{ color: 'white', fontWeight: 'bold' }}
  >
    Next &gt;
  </Button>
</div>


      <section className='container content-section'>
        <h2 className='section-header'>SHOPPING CART</h2>
        <div className='cart-row'>
          <span className='cart-item cart-header cart-column'>ITEM</span>
          <span className='cart-price cart-header cart-column'>PRICE</span>
          <span className='cart-quantity cart-header cart-column'>Quantity</span>
          <span className='cart-quantity cart-header cart-column action'>Action</span>
        </div>
        <div className='cart-items'>
          {shoppingCart.length > 0 ? (
            shoppingCart.map((product) => (
              <CartProduct
                key={product.id}
                {...product}
                onRemove={removeProductFromCart}
                onUpdateQuantity={updateQuantity}
              />
            ))
          ) : (
            <p className='empty-cart-message'>Your shopping cart is empty.</p>
          )}
        </div>
      </section>

      <div className='buttons'>
        <Button className='buttons-end' variant="contained" color="error" onClick={emptyShoppingCart}>
          Empty Cart
        </Button>
        <Button  className='buttons-end'  variant="contained" color="primary">
          Total Price: ${totalPrice.toFixed(2)}
        </Button>
        <Button  className='buttons-end'  variant="contained" color="success" onClick={shoppingHandler}>
          Shop
        </Button>
      </div>

      <ToastContainer />
    </div>
  );
}
