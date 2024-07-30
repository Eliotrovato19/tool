import ItemList from "./ItemList";

const Content = ({ items,  handleDelete }) => {
  return (
    <>
      {items.length ? (
        <ItemList
          items={items}
           handleDelete={handleDelete}
        />
      ) : (
        <p style={{ marginTom: "2rem" }}> empty </p>
      )}
    </>
  );
};

export default Content;
