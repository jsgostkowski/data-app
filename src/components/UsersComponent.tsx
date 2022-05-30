import React, { useEffect, useState } from "react";
import axios from "axios";

export const UsersComponent = () => {
  const [userData, setUserData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResult, setFilteredResults] = useState<any[]>([]);
  console.log(searchTerm);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      setUserData(response.data);
    });
  }, []);

  const seatchValue = (value: any) => {
    setSearchTerm(value);
    if (searchTerm !== "") {
      const filteredData = userData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(userData);
    }
  };

  return (
    <div>
      <input
        placeholder="search"
        onChange={(e) => seatchValue(e.target.value)}
      ></input>

      {searchTerm.length > 1
        ? filteredResult.map((item) => {
            return (
              <div>
                {item.name}
                <br />
                {item.email}
                <br />
                {item.username}
              </div>
            );
          })
        : userData.map((item) => {
            return (
              <div>
                {item.email}
                <br />
                {item.name}
              </div>
            );
          })}
    </div>
  );
};
