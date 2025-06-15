import RegisterForm from "../molecules/RegisterForm";
import ImageWithOverlay from "../molecules/ImageWithOverlay";
import imgSrc from "../../assets/Banner.jpeg";

const RegistrationPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-smaller-heading mb-2">LET'S GET YOU STARTED!</h2>
          <h1 className="text-block-title mb-6">Create an Account</h1>
          <RegisterForm />
        </div>
      </div>
      <div className="w-full md:w-1/2 h-screen p-5 hidden md:block">
        <ImageWithOverlay imageSrc={imgSrc} altText="Homepage product banner" />
      </div>
    </div>
  );
};

export default RegistrationPage;
