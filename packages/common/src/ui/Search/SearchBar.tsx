import { useState } from "react";
import { SearchIcon } from "../../icons";
import { Spinner } from "../Spinner";
import { SearchOverlay } from "./SearchOverlay";

export const SearchBar = ({ className = "", isLoading = false }) => {
  const [value, setValue] = useState("");
  return (
    <div
      className={[
        "ic f r z-10 text-gray-600 bg-dark-100 outline-1 outline outline-gray-300 transition duration-200 ease-in-out focus-within:text-gray-900 rounded-lg",
        className,
      ].join(" ")}
    >
      <div className="my-auto px-3">
        <SearchIcon />
      </div>
      <input
        className="outline-none py-1.5 bg-inherit"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className={["my-auto px-3", value ? "" : "opacity-0"].join(" ")}>
        <Spinner size={18} />
      </div>

      {value && (
        <SearchOverlay>
          <h4 className="my-auto">Sorry, we are workign on this.</h4>
        </SearchOverlay>
      )}
    </div>
  );
};
