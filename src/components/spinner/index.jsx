import "./styles.scss";

function Spinner() {
  return <div>loading...</div>;
}

function FullPageSpinner() {
  return (
    <div className="full-page-spinner">
      <Spinner />
    </div>
  );
}

export { FullPageSpinner, Spinner };
