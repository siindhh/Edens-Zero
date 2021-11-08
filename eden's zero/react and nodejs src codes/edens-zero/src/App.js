import React, { component } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Review from './components/pages/Review';
import SignUp from './components/pages/SignUp';
import Footer from './components/Footer';
// import ProductList from "./components/ProductList";
import Product from "./components/Product";
import Details from "./components/Details";
import Default from "./components/Default";
import Cart from "./components/Cart/Cart";
import Modal from "./components/Modal";
import comingsoon from './components/comingsoon';

function App() {
  return (
    <>
      <React.Fragment>
        <Navbar />
        <Switch>
        <Route exact path="/" component={Product} />
        <Route exact path="/productDetail/:id" component={Product} />
          <Route path="/details" component={Details} />
          <Route path="/cart" component={Cart} />
          <Route path='/review' component={Review} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/comingsoon' component={comingsoon}/>
          <Route component={Default} />
        </Switch>
        <Modal />
         <Footer />
      </React.Fragment>
    </>
  );
}

export default App;