import styled from "styled-components";
import { SearchOutlined, ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 60px;
  background-color:rgba(0, 0, 0, 0.0);
  `;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.div`
  font-size: 14px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.div`
  font-weight: bolder;
  font-size: 35px;
  cursor:pointer;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  color: teal;
  font-weight: bold;
`;

const Navbar = () => {
  const quantity = useSelector(state => state.cart.cartQty);
  const user = useSelector(state => state.user.currentUser);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/login")
    navigate(0);
  }
  return (
    <div>
      <Container>
        <Wrapper>
          <Left>
            <Language>EN</Language>
            <SearchContainer>
              <Input placeholder="Search" />
              <SearchOutlined style={{ color: "gray", fontSize: 16 }} />
            </SearchContainer>
          </Left>
          <Center>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <Logo>BUYME.</Logo>
            </Link>
          </Center>
          <Right>

            {!(user == null) &&
              <Link to="/cart">
                <MenuItem>
                  <Badge badgeContent={quantity} color="primary">
                    <ShoppingCart color="action" />
                  </Badge>
                </MenuItem>
              </Link>}

            {location.pathname == '/register' ?
              (<Link to="/login" style={{ textDecoration: 'none' }}>
                <MenuItem >SIGN IN</MenuItem>
              </Link>) :
              (
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <MenuItem >REGISTER</MenuItem>
                </Link>
              )
            }

            {!(user == null) &&
              <MenuItem onClick={() => { handleSignOut() }}>SIGN OUT</MenuItem>
            }
          </Right>
        </Wrapper>
      </Container>
    </div>
  );
};

export default Navbar;
