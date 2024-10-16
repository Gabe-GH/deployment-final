import Image from "next/image";

const Searchbar = () => {
  return (
    <div className="relative flex w-4/5 mx-auto xl:w-3/4">
      <input
        className="input-ghost-primary input max-w-full" // Add left and right padding
        placeholder="Search"
      />
      <span className="absolute inset-y-0 right-4 inline-flex items-center">
        {" "}
        {/* Adjust right margin */}
        <Image width={20} height={20} src="/search.svg" alt="search icon" />
      </span>
    </div>
  );
};

export default Searchbar;
