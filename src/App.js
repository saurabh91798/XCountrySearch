import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [searchText, setSearchText] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => {
        const data = response.json();
        return data;
      })
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [countries, searchText]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <>
      <div className="main">
        <div className="searchbar">
          <input
            type="text"
            value={searchText}
            onChange={handleSearch}
            placeholder="Search for countries..."
          />
        </div>
        <div className="countries">
          {filteredCountries.map((country, index) => (
            <div key={index} className="countryCard">
              <img src={country.flags.png} alt={country.name.common} />
              <p>{country.name.common}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;