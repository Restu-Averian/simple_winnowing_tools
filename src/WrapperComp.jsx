import { Typography } from "antd";

const WrapperComp = ({ children, title, style }) => {
  return (
    <div
      style={{
        background: "white",
        padding: 10,
        borderRadius: 10,
        ...style,
      }}
    >
      {title && (
        <Typography.Title level={3} strong>
          {title}
        </Typography.Title>
      )}

      {children}
    </div>
  );
};
export default WrapperComp;
