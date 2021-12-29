const ProductOptions = ({ name, values, selectedOptions, optionsHandler }) => {
  return (
    <fieldset className="mt-3">
      <legend className="text-xl font-semibold">{name}</legend>
      <div className="inline-flex items-center flex-wrap">
        {values.map((value) => {
          const id = `option-${name}-${value}`;
          const checked = selectedOptions[name] === value;

          return (
            <label key={id} htmlFor={id}>
              <input
                className="sr-only"
                type="radio"
                id={id}
                name={`option-${name}`}
                value={value}
                checked={checked}
                onChange={()=> optionsHandler(name, value)}
              />
              <div
                className={`p-2 mt-3 text-lg rounded-full block cursor-pointer mr-3  transition-opacity hover:transition-opacity hover:duration-500 duration-500 ${
                  checked
                    ? "text-white bg-gray-900"
                    : "text-gray-900 bg-gray-200 hover:opacity-50"
                }`}
              >
                <span className="px-2">{value}</span>
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};

export default ProductOptions;
