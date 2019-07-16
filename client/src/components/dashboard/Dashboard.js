import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProducts } from "../../actions/productActions";
import Spinner from "../common/Spinner";
import { CardGroup, Card } from "react-bootstrap";

//Component to render all the products on the clothes page
class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProducts();
  }

  render() {
    const { user } = this.props.auth;
    const { products, loading } = this.props.product;

  

    let dashboardContent;

    if (products === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = products.map(product => {
        return (
          // <div>
          //   <h1>{product.name}</h1>
          //   <h4>{product.description}</h4>
          // </div>
          <div className="col-lg-6">
            <CardGroup className="mb-5">
              <Card>
                {/* <Card.Img variant="top" src={product.image} /> */}
                <Card.Img
                  variant="top"
                  // src={require(image)}
                  // src="C:\projects\e-commerce\MERN-eCommerce\client\src\components\dashboard\images\image-1.jpg"
                  alt="Not working"
                />
                {/* {product.image} */}
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Rs {product.price}</small>
                </Card.Footer>
              </Card>
            </CardGroup>
          </div>
        );
      });
    }

    return (
      <div className="container">
        <div className="dashboard">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4">Dashboard</h1>
              </div>
            </div>
            <div className="row">
              {/* <div className="col-lg-12">
                <CardGroup>{dashboardContent}</CardGroup>
              </div> */}
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProducts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProducts }
)(Dashboard);