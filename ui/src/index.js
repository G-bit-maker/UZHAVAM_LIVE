import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style/common.scss"

import { Provider } from "react-redux";
import store from "./store";

import Login from './Pages/login'
import SignUp from './Pages/signUp'
//import Profile from './Component/profile'
import Dashboard from './Admin/dashboard'
import UserDashboard from './User/UserDashboard'
import OrderList from './User/OrderListPage'
import OrderDetail from './User/OrderDetailPage'
import CartPage from './User/CartPage'
import Checkout from './User/Checkoutpage'
import ViewProducts from './Admin/viewProduct'
import AddProduct from './Admin/addProduct'
import UpdateTags from './Admin/updateTags'
import Users from './Admin/userList'
import AddUser from './Admin/addUser'
import reportWebVitals from './reportWebVitals';

import session from "./session"
import Thankyou from './User/Thankyou';
import profile from './User/profile';
import OrderListForAdmin from './Admin/OrderListForAdmin';
import excelImport from './Admin/excelImport';

const LoginRoute =()=>{
  const jwt = session.getCookie("TOKEN")
  const userType = session.getCookie("UserType")
  return (
        <Route
            render={
                props => {
                    if (jwt && userType === "Admin") {
                      window.location = "/Dashboard";
                    } else if(jwt){
                      window.location = "/User/Dashboard";
                    }else {
                      return <Login {...props} />;
                    }
                }
            }
        />
    );
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
      <Route exact path="/" component={Login} /> 
       {/* <Route exact path="/login" component={Login} />  */}
       <LoginRoute path="/login" />
       <Route exact path="/signUp" component={SignUp} /> 
      {/*  <Route exact path="/profile" component={Profile} />  */}
       <Route exact path="/User/Dashboard" component={UserDashboard} /> 
       <Route exact path="/Dashboard" component={Dashboard} /> 
       <Route exact path="/Profile/:id" component={profile} /> 
       <Route exact path="/ViewProduct" component={ViewProducts} /> 
       <Route exact path="/ViewOrders" component={OrderListForAdmin} />  
       <Route exact path="/EditProduct/:id" component={AddProduct} /> 
       <Route exact path="/AddProduct" component={AddProduct} /> 
       <Route exact path="/ExcelSheetImport" component={excelImport} /> 
       <Route exact path="/AddUser" component={AddUser} /> 
       <Route exact path="/EditUser/:id" component={AddUser} /> 
       <Route exact path="/Attributes" component={UpdateTags} /> 
       <Route exact path="/ViewUser" component={Users} /> 
       <Route exact path="/Orders" component={OrderList} /> 
       <Route exact path="/OrderDetail/:id" component={OrderDetail} /> 
       <Route exact path="/Thankyou/:id" component={Thankyou} /> 
       <Route exact path="/Cart" component={CartPage} /> 
       <Route exact path="/Checkout" component={Checkout} /> 
       </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
