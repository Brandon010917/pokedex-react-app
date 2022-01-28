//Logo
import logo from "../assets/images/pokemon-logo.png";

//Animated
import { Animated } from "react-animated-css";

//Components
import UserForm from "../components/UserName/UserForm";

const UserName = () => {
  return (
    <div className="user-form min-h-screen p-8">
      <div className="max-w-lg">
        <Animated
          animationIn="zoomInDown"
          animationInDuration={2000}
          isVisible={true}
        >
          <img src={logo} alt="Logo Pokemon" className="block mb-6" />
        </Animated>
        <Animated
          animationIn="zoomInUp"
          animationInDuration={2000}
          isVisible={true}
        >
          <UserForm />
        </Animated>
      </div>
    </div>
  );
};

export default UserName;
