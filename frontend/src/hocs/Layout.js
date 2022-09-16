import React, {Fragment, useEffect} from 'react';
import Nav from '../components/Navbar'
import { load_user, checkAuthenticated } from '../actions/auth';
import { connect } from 'react-redux';

const Layout = ({children, checkAuthenticated, load_user}) => {
    useEffect(() => {
        checkAuthenticated();
        load_user();
    }, []);

    return(
        <Fragment>
            <Nav />
            {children}
        </Fragment>
    );
};

export default connect(null, {checkAuthenticated,load_user}) (Layout);

