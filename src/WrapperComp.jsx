const WrapperComp = ({ children }) => {
  return (
    <div
      style={{
        background: "white",
        padding: 10,
        borderRadius: 10,
      }}
    >
      {children}
    </div>
  );
};
export default WrapperComp;
