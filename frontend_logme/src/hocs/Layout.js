import React, {Fragment} from 'react';
import Nav from '../components/Navbar'

const Layout = ({children}) => (
    <Fragment>
        <Nav />
        {children}
    </Fragment>
);

export default Layout;