'use client';

import React, {useEffect, useState} from 'react';
import './SearchDropdown.css';
import {useSelector} from 'react-redux';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

function CustomSearch() {
   const [searchValue, setSearchValue] = useState('');
   const [filteredOptions, setFilteredOptions] = useState([]);
   const [isDropdownVisible, setIsDropdownVisible] = useState(false);
   const [pallete, setPallete] = useState({});
   const places = useSelector(state => state.places.allPlaces);
   const pathname = usePathname();
   const mode = useSelector(state => state.theme.mode);

   useEffect(() => {
      setSearchValue('');
      setIsDropdownVisible(false);
   }, [pathname]);

   useEffect(() => {
      if(mode === 'dark') {
         setPallete({
            'border-color': '#482E5B',
            'background-color': '#482E5B',
            'color': '#E8E6E6',});
      } else {
         setPallete({
            'border-color': '#5f4c70',
            'background-color': '#5f4c70',
            'color': '#E8E6E6',});
      }
   }, [mode]);

   const handleSearchChange = (event) => {
      const value = event.target.value;
      setIsDropdownVisible(value !== '');
      setSearchValue(value);
      setFilteredOptions(places.filter(option =>
         option.title.toLowerCase().includes(value.toLowerCase())
      ));
   };




   return (
      <div className="search-container">
         <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="search-input"
            style={pallete}
         />
         {isDropdownVisible && (
            <div className="dropdown">
               <ul className="dropdown-list">
                  {filteredOptions.map((option) => (
                     <li key={option.id} className="dropdown-item">
                        <Link href={`/map/${option.id}`} className="dropdown-link" style={{display: 'block'}}>
                           {option.title}
                        </Link>
                     </li>
                  ))}
               </ul>
            </div>
         )}
      </div>
   );
};

export default CustomSearch;
