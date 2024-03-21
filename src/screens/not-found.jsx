import Link from "../components/link";

function NotFoundScreen() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div>
        Sorry... nothing here. <Link to="/">Go home</Link>
      </div>
    </div>
  );
}

// eslint-disable-next-line import/prefer-default-export
export { NotFoundScreen };
