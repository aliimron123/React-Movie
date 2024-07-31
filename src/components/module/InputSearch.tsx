import React, { FormEventHandler } from "react";

interface IProps {
  OnSubmit: FormEventHandler<HTMLFormElement>;
  query: string;
  setQuery: (val: any) => void;
}

const InputSearch: React.FC<IProps> = ({ OnSubmit, setQuery, query }) => {
  return (
    <form onSubmit={OnSubmit} className="flex w-full gap-4" name="form">
      <input
        type="search"
        value={query}
        onChange={setQuery}
        placeholder="Enter title of movie"
        className="w-full cursor-pointer rounded-full border border-gray-500 bg-white p-2 pl-4 text-base outline-none focus:border-blue-200 focus:outline-blue-700"
      />
      <button
        type="submit"
        className="w-28 cursor-pointer rounded-full border bg-blue-500 p-2 text-white hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default InputSearch;
