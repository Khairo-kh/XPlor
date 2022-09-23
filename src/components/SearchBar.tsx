import base58 from "bs58";
import React from "react";
import useQueryStore from "stores/useQueryStore";
import AccountOverview from "./AccountOverview";
import TransactionDetails from "./TransactionDetails";

export default function SearchBar() {
  const { setQuery, setType, searchType, searchValue } = useQueryStore(
    (state) => state
  );

  // Set searched value to state
  function queryChangeHandler(e: any) {
    const { value } = e.target;
    setQuery(value || "");
  }

  // Set search type to address or signature
  function handleSubmit(e: any) {
    // prevent default form submit behavior
    e.preventDefault();

    // make sure search query has a value
    if (!!searchValue) {
      // decoding base58 encoded address/signature
      const decoded = base58.decode(searchValue);
      // if length is 32 then it's a wallet address
      // if length is 64 then we have a signature
      if (decoded.length === 32) {
        setQuery(searchValue);
        setType("address");
      } else if (decoded.length === 64) {
        setQuery(searchValue);
        setType("signature");
      } else {
        console.log("Input not correct");
      }
      e.preventDefault();
    }
  }

  // Show search input and the result
  return (
    
      <div className="w-15/16 flex  mt-5 mx-auto justify-center">
        <form onSubmit={handleSubmit} className=" w-full">
          <input
            placeholder="Search transactions, programs, blocks"
            className=" outline-none p-3   w-4/6 relative"
            style={{ color: "black" }}
            type="text"
            value={searchValue}
            onChange={queryChangeHandler}
          />

          <input
            className="bg-green-500  p-3 mt-5 border-none cursor-pointer"
            type="submit"
            value="Submit"
          />
        </form>

      {searchType === "signature" && <TransactionDetails />}

      {searchType === "address" && <AccountOverview />}
      </div>
    
  );
}
