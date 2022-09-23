import { Layout } from 'react-admin';
import MyAppBar from './MyAppBar';
// import MySidebar from './MySidebar';
// import MyMenu from './MyMenu';

const MyLayout = props => <Layout
    {...props}
    appBar={MyAppBar}
    // sidebar={MySidebar}
    // menu={MyMenu}
/>;

export default MyLayout;