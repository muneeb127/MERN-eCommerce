import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProducts } from "../../actions/productActions";
import Spinner from "../common/Spinner";

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
      dashboardContent = <h1>Helloo</h1>;
    }

    return (
      <div className="container">
        <div className="dashboard">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4">Dashboard</h1>
                {dashboardContent}
              </div>
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
