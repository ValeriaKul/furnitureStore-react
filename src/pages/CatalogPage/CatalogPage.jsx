import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Filter from "../../components/Filter/Filter";
import Info from "../../components/Info/Info";
import Product from "../../components/Product/Product";
import styles from "./catalogpage.module.css";
import productService from "../../services/products";

const CatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [gridView, setGridView] = useState(true);
  const [sort, setSort] = useState('price');


  useEffect(() => {
    productService.getProducts().then((res) => {
      setProducts(res.data.sort((a,b) => a.price - b.price));
    });
  }, []);

  useEffect(()=> {
    // sort function
    if (sort === 'price') {
      const sortedByPrice = [...products].sort((a,b) => a.price - b.price);
      setProducts(sortedByPrice);
    } else {
      const sortedByDate = [...products].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
      setProducts(sortedByDate)
    }
  },[sort])


  return (
    <div>
      <Breadcrumbs title="Shop" />
      <Filter setGridView={setGridView} sort={sort} setSort={setSort}/>
      <div className={styles["products-wrapper"]}>
        {products.map((product) => {
          return (
            <Product
              key={product._id}
              img={product.img}
              title={product.title}
              price={product.price}
              date = {product.createdAt}
              id = {product._id}
              gridView={gridView}
            />
          );
        })}
      </div>
      <Info />
    </div>
  );
};

export default CatalogPage;
