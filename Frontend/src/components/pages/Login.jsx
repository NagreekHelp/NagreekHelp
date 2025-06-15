import LoginForm from "../molecules/LoginForm"
import ImageWithOverlay from "../molecules/ImageWithOverlay";
import imgSrc from "../../assets/Banner.jpeg";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-smaller-heading mb-2">LET'S LOG IN!</h2>
          <h1 className="text-block-title mb-6">Log In Your Account</h1>
          <LoginForm />
        </div>
      </div>
      <div className="w-full md:w-1/2 h-screen p-5 hidden md:block">
        <ImageWithOverlay imageSrc={imgSrc} altText="Homepage product banner" />
      </div>
    </div>
  );
};

export default LoginPage;