import Card from "../Admin/Card";

const Modal = ({ visible, setVisible, children, className }) => {
  return (
    <>
      {visible && (
        <div className="fixed inset-0 z-10 flex justify-center items-center">
          <div
            className="fixed inset-0 bg-primary-100/75 z-10 flex justify-center items-center"
            onClick={() => setVisible((state) => !state)}
          />
          <Card className={`z-20 ${className}`}>{children}</Card>
        </div>
      )}
    </>
  );
};
export default Modal;
