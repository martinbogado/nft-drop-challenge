
import Footer from "../Footer/Footer";

const Layout: React.FC = ({ children }) => {
    return(
        <>
            { children }
            <Footer />
        </>
    )
}

export default Layout