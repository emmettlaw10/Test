import logo from "../../images/logo.png"
import './Header.css'
const Header = () => {
    return (
        <div className={"container"}>
            <img src={logo} alt={"Idea Theorem Logo"}/>
        </div>
    );
}
export default Header