function Divider({ margin = 7 }) {
  return (
    <div
      id="divider"
      style={{
        margin: `${margin}px 0px ${margin}px 0px`,
        borderTop: "solid 1px #ebebeb ",
      }}
    />
  );
}

export default Divider;
