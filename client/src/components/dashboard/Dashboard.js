import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProducts } from "../../actions/productActions";
import Spinner from "../common/Spinner";
import { CardGroup, Card } from "react-bootstrap";
import "./dashboard.css";

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
          <div className="col-lg-4">
            <CardGroup className="mb-5">
              <Card>
                <Card.Img
                  className="product-image"
                  variant="top"
                  src={
                    "http://localhost:5000/" + product.image.replace(/\\/, "/")
                  }
                  alt="Sorry! The image can not be displayed"
                />
                {/* {product.image} */}
                <Card.Body>
                  <Card.Title style={{ fontSize: 30 }}>
                    {product.name}
                  </Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted" style={{ fontSize: 20 }}>
                    Rs {product.price}
                  </small>
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
                <h1 className="display-4 mb-5">Dashboard</h1>
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
