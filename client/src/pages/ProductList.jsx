import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcemnent";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 5px;
  margin-right: 20px;
`;

const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2];

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("new");


  const handleFilter = (e) => {
    const val = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: val,
    });
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{category.toUpperCase()}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products</FilterText>
          <Select name="color" onChange={handleFilter}>
            <Option disabled>Color</Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>

          <Select name="size" onChange={handleFilter}>
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="new">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="des">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>

      {category ?
        <Products category={category} filters={filters} sort={sort} /> :
        <Products filters={filters} sort={sort} />
      }

      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
