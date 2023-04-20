import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import './blackLink.css'

import {
    BrowserRouter as Router,
    Route,
    Routes, Navigate,
} from 'react-router-dom'
import {useSelector} from "react-redux";
import styled from "styled-components";
import SubCategory from "./pages/SubCategory";
import AccibilityPage from "./pages/AccibilityPage";

const Container = styled.div`
  height: 100%;
  width: 100%;
`

const App = () => {
    const user = useSelector(state => state.user.currentUser)

  return(
    <>
        <Container>
            <Router forceRefresh={true}>
                <Routes>
                    <Route exact path="/" element={
                        <Home />
                    }
                    />
                    <Route exact path="/subCategory/:subCategoryName" element={
                        <SubCategory />
                    }
                    />
                    <Route path="/products/:category" element={
                        <ProductList />
                    }
                    />
                    <Route path="/product/:productName" element={
                        <Product />
                    }
                    />
                    <Route path="/cart" element={
                        <Cart />
                    }
                    />
                    <Route path="/login" element={
                        user ? <Navigate to={'/'}/> : <Login />
                    }
                    />
                    <Route path="/register" element={
                        user ? <Navigate to={'/'}/> : <Register />
                    }
                    />
                    <Route path="/accessibility" element={
                        <AccibilityPage />
                    }
                    />
                </Routes>
            </Router>
        </Container>
    </>
  )
};

export default App;