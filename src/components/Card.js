import React from 'react' 
import './Card.css' 
import { CardMedia, Button } from '@mui/material'; 
 
export default function Card({ product, onAddProduct }) { 
 
  const clickHandler = (id) => { 
    console.log(id); 
    onAddProduct(id); 
  }; 
 
  return ( 
    <div className="card"> 
      <CardMedia className='img' component="img" height="140" image={product.img}  
      alt={product.title}/> 
      <div className="container"> 
        <h4 className='title'><b>{product.title}</b></h4> 
        <p className='description'>{product.des}</p> 
        <Button onClick={() => clickHandler(product.id)}>Add to Cart</Button> 
        <span className='price-style'> 
          ${product.price}.00 
        </span> 
      </div> 
    </div> 
  ); 
}