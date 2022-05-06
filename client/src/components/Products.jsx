import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const Products = ({ category, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category
            ? `${process.env.REACT_APP_BACKEND_HOST}api/products?category=${category}`
            : `${process.env.REACT_APP_BACKEND_HOST}api/products`
        );
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [category]);

  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, category, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) => {
        [...prev].sort((a, b) => a.createdAt - b.createdAt);
      });
    } else if (sort === "asc") {
      setFilteredProducts((prev) => {
        [...prev].sort((a, b) => a.price - b.price);
      });
    } else {
      setFilteredProducts((prev) => {
        [...prev].sort((a, b) => b.price - a.price);
      });
    }
  }, [sort]);
  return (
    <Container>
      {category
        ? filteredProducts.map((item) => {
            return <Product item={item} key={item.id} />;
          })
        : products.slice(0,8).map((item) => {
            return <Product item={item} key={item.id} />;
          })}
    </Container>
  );
};

export default Products;
