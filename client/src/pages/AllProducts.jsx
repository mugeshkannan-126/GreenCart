import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard';

const AllProducts = () => {

    const {products , searchQuery} = useAppContext();
    const [filteredProducts , setFilteredProducts] = useState([]);

    useEffect(()=> {
        if(searchQuery.length > 0 ) {
            setFilteredProducts(
                products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
            )
        }
        else {
            setFilteredProducts(products);
        }
    } , [products , searchQuery])

  return (
    <div className='mt-12 flex flex-col'>
        <div className='flex flex-col items-end w-max'> 
           <p className='text-2xl font-medium uppercase'>All products</p>
           <div className='w-16 h-0.5 bg-primary rounded-full'>
           </div>
        </div>

            <div className='mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-4 lg:gap-6'>
                {filteredProducts.filter((product) => product.inStock).map((product) => (
                    <div key={product._id} className='min-w-0'>
                        <ProductCard product={product} />
                    </div>
                ))}

            </div>
    </div>
  )
}

export default AllProducts
