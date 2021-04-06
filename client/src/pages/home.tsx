import Layout from "../components/Layout/Layout";
import {Route, Switch} from "react-router-dom";
import Sidebar from "../components/SideBar/Sidebar";
import {AppWrapper} from '../App.style';
import Feed from "./feed";
import Shop from "./shop";
import ProductDetails from "./productDetails";
import Cart from './Cart';
import {Toaster} from 'react-hot-toast';


const Home:React.FC = () => {

   
    return(
        <Layout>
            <AppWrapper>
                    <Sidebar/>
                    <Toaster position="top-center"/>
                <Switch>
                    <Route exact path="/" component={Feed}/>
                    <Route path="/shop" component={Shop} exact />
                    <Route path="/shop/:id" component={ProductDetails}/>
                    <Route path="/cart" component={Cart}/>
                </Switch>
                    
        </AppWrapper>
        </Layout>
    )

}

export default Home;