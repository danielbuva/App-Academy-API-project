function Divider({ margin = 0, color = "#ebebeb", ...props }) {
  return (
    <div
      id="divider"
      style={{
        margin: `${margin}px 0px ${margin}px 0px`,
        borderTop: `solid 1px ${color}`,
        ...props,
      }}
    />
  );
}

export default Divider;
