import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Products = () => {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch("https://fakestoreapi.com/products");
            if (componentMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
                // console.log(filter);
            }

            return () => {
                componentMounted = false
            };
        };

        getProducts();
    }, []);

    const Loading = () => {
        return <>Loading ...</>
    };

    const filterProduct = (cat)=>{
        const updateList = data.filter((x)=>x.category === cat);
        setFilter(updateList);
    }

    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-5 pb-5">
                    <button className="btn btn-outline-dark me-2" onClick={()=>setFilter(data)}>All</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct()}>DEPARTEMEN OPERASI 1B</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct()}>DEPARTEMEN OPERASI 2B</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct()}>DEPARTEMEN OPERASI III</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct()}>DEPARTEMEN OPERASI 1V</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct()}>DEPARTEMEN OPERASI V</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct()}>DEPARTEMEN OPERASI VI</button>
                </div>

                {
                    filter.map((product) => {
                        return (
                            <>
                                <div className="col-md-3">
                                    <div>
                                        <div class="card h-100 text-center p-4" key={product.id}>
                                            <img src={product.image} class="card-img-top" alt={product.title} height="250px" />
                                            <div class="card-body">
                                                <h5 class="card-title">{product.title.substring(0,12)}</h5>
                                                <p class="card-text">${product.price}</p>
                                                <NavLink to={`product.id/${product.id}`} class="btn btn-primary">Buy Now</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </>
        )
    }

    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className='display-6 fw-bolder text center'>Latest Products</h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    )

}


export default Products;