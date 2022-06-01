const CheckSelector = ({ items, selectedItems, onChange }) => {
  return (
    <div className="flex w-full flex-col">
      {items.map((item) => (
        <label
          className="flex items-center cursor-pointer whitespace-nowrap"
          htmlFor={item._id}
          key={item._id}
        >
          <input
            type="checkbox"
            name={item.slug}
            id={item._id}
            onChange={onChange}
            checked={selectedItems.includes(item._id)}
            className="mr-2 accent-primary-500"
          />
          {item.name}
        </label>
      ))}
    </div>
  );
};
export default CheckSelector;
