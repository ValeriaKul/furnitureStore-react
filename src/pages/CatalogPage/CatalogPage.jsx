import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Filter from "../../components/Filter/Filter";
import Info from "../../components/Info/Info";
import Product from "../../components/Product/Product";
import styles from "./catalogpage.module.css";
import productService from "../../services/products";
import ReactPaginate from "react-paginate";

const CatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [gridView, setGridView] = useState(true);
  const [sort, setSort] = useState("price");
  const [productsOffset, setProductsOffset] = useState(0); //Число, начиная с которого нужно начать показ товара
  const [forcePage, setForcePage] = useState(0);

  const productsPerPage = 5; //количество товаров на странице
  const endOffset = productsOffset + productsPerPage; //число, до которого надо показывать товары
  console.log(`Loading items from ${productsOffset} to ${endOffset}`);
  const currentProducts = products.slice(productsOffset, endOffset); // массив товаров, который отображается на 1 странице
  const pageCount = Math.ceil(products.length / productsPerPage); //количество страниц

  const handlePageClick = (event) => {
    const newOffset = (event.selected * productsPerPage) % products.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setForcePage(event.selected);
    setProductsOffset(newOffset);
  };

  useEffect(() => {
    productService.getProducts().then((res) => {
      setProducts(res.data.sort((a, b) => a.price - b.price));
    });
  }, []);

  useEffect(() => {
    // sort function
    if (sort === "price") {
      const sortedByPrice = [...products].sort((a, b) => a.price - b.price);
      setProducts(sortedByPrice);
    } else {
      const sortedByDate = [...products].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setForcePage(0);
      setProducts(sortedByDate);
    }
  }, [sort]);

  return (
    <div>
      <Breadcrumbs title="Shop" />
      <Filter setGridView={setGridView} sort={sort} setSort={setSort} />
      <div className={styles["products-wrapper"]}>
        {currentProducts.map((product) => {
          return (
            <Product
              key={product._id}
              img={product.img}
              title={product.title}
              price={product.price}
              date={product.createdAt}
              id={product._id}
              gridView={gridView}
            />
          );
        })}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel=""
        renderOnZeroPageCount={null}
        containerClassName={styles["pagination-wrapper"]}
        pageLinkClassName={styles["pagination-page"]}
        nextClassName={styles["pagination-next"]}
        activeLinkClassName={styles["pagination-active"]}
      />
      <Info />
    </div>
  );
};

export default CatalogPage;
