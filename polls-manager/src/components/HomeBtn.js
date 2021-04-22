const HomeBtn = () => {
  return (
    <button
      type="button"
      style={{ width: "10vw" }}
      className="btn btn-success"
      onClick={(e) => {
        window.location.replace("/");
      }}
    >
      Home
    </button>
  );
};

export default HomeBtn;
