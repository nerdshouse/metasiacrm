import Loader from "./Loader";

const PageLoader = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader show={true} />
    </div>
  );
};
export default PageLoader;
