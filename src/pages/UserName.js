//Logo
import logo from "../assets/images/pokemon-logo.png";

//Animated
import { Animated as Animation } from "react-animated-css";

//Components
import UserForm from "../components/UserName/UserForm";

const UserName = () => {
  return (
    <div className="user-form min-h-screen p-8">
      <div className="max-w-lg">
        <Animation
          animationIn="zoomInDown"
          animationInDuration={2000}
          isVisible={true}
        >
          <img src={logo} alt="Logo Pokemon" className="block mb-6" />
        </Animation>
        <Animation
          animationIn="zoomInUp"
          animationInDuration={2000}
          isVisible={true}
        >
          <UserForm />
        </Animation>
      </div>
    </div>
  );
};

export default UserName;
