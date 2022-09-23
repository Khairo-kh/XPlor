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
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            className="input"
            type="text"
            value={searchValue}
            onChange={queryChangeHandler}
          />
        </label>
        <input className="submit" type="submit" value="Submit" />
      </form>

      {searchType === "signature" && <TransactionDetails />}

      {searchType === "address" && <AccountOverview />}
    </>
  );
}
