import React, { Component } from "react";
import styled from "styled-components";
import Title from "./Title";
import { ProductConsumer } from "../context";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import comingsoon from "./comingsoon";
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbdata:null
    };
  }

  componentDidMount(){
    if(this.props.match.params?.id) {
      fetch("http://localhost:5000/Product/"+this.props.match.params.id)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState(
            {
              dbdata: result
            }
          );
        },
        (error) => {
          console.log(error);
        }
      )
    }


  };
  render() {
    //const { _id,productName, img, inCart } = this.state.dbdata
    const { _id,title,price,image,info, inCart } = this.state.dbdata || {};
    return (
    <React.Fragment>
      <div className="services">
      <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3 py-5">
        <div className="card">
        <Title title="Your Selection" />
          <ProductConsumer>
            {value => {
              return (
                <div
                  className="img-container p-5"
                  onClick={() => value.handleDetail(_id)}
                >
                  <Link to="/details">
                    <img src={image} alt="" className="card-img-top" />
                  </Link>
                  <Link to='/comingsoon' className='btn-mobile'>
                  <button
                    className="cart-btn"
                    onclick="comingsoon()"
                    // disabled={inCart ? true : false}
                    // onClick={() => {
                    //   value.addToCart(_id);
                    //   value.openModal(_id);
                    // }}
                  >
                    {inCart ? (
                      <p className="text-capitalize mb-0" disabled>
                        in cart
                      </p>
                    ) : (
                      <i className="fas fa-cart-plus" />
                    )}
                  </button>
                  </Link>
                </div>
              );
            }}
          </ProductConsumer>
          <div className="card-footer d-flex justify-content-between" >
          <h5 className="text-blue font-italic mb-0">
              <span className="font-bold-italic mr-1"></span>
              {title}
            </h5>
            <h5 className="text-blue font-italic mb-0">
              <span className="font-bold-italic mr-1">Rs:</span>
              {price}
            </h5>
          </div>
          <div className="card-footer d-flex justify-content-between">
            {/* <p className="align-self-center mb-0">{title}</p>
            <h5 className="align-self-center mb-0">Price : ${price}</h5> */}
            <h5 className="font-italic mb-0">
              <span className="mr-1">Description: </span>
              {info}
            </h5>
          </div>
        </div>

      </ProductWrapper>
      </div>
      </React.Fragment>
      
    );
  }
}

const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 1s linear;
  }
  .card-footer {
    background: transparent;
    border-top: transparent;
    transition: all 1s linear;
  }
  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .card-footer {
      background: rgba(247, 247, 247);
    }
  }
  .img-container {
    position: relative;
    overflow: hidden;
  }
  .card-img-top {
    transition: all 1s linear;
  }
  .img-container:hover .card-img-top {
    transform: scale(1.2);
  }
  .cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all 1s ease-in-out;
  }
  .img-container:hover .cart-btn {
    transform: translate(0, 0);
  }
  .cart-btn:hover {
    color: var(--mainBlue);
    cursor: pointer;
  }
`;

export default  withRouter(Product);