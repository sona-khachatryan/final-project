import React, {useEffect, useState} from 'react';
import './SearchDropdown.css';
import {useSelector} from 'react-redux';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
const CustomSearch = () => {
   const [searchValue, setSearchValue] = useState('');
   const [filteredOptions, setFilteredOptions] = useState([]);
   const [isDropdownVisible, setIsDropdownVisible] = useState(false);
   const places = useSelector(state => state.places.allPlaces);
   const pathname = usePathname();

   useEffect(() => {
      setSearchValue('');
      setIsDropdownVisible(false);
   }, [pathname]);

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
         />
         {isDropdownVisible && (
            <div className="dropdown">
               <ul className="dropdown-list">
                  {filteredOptions.map((option) => (
                     <li key={option.id} className="dropdown-item">
                        <Link href={`/map/${option.id}`} className="dropdown-link">
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
