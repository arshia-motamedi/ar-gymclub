import React from 'react'; 
import './SearchBox.css'; 
import { FaSearch } from 'react-icons/fa'; 
 
export default function SearchBar({ searchTerm, setSearchTerm }) { 
  return ( 
    <div className='search-body'> 
    <div className='wrapper-inputs'> 
      <FaSearch id='search-icon' /> 
      <input 
        className='search-input' 
        placeholder='Search...' 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      /> 
    </div> 
    </div> 
  ); 
}