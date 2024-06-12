import { useEffect, useRef, useState } from "react";
import "./App.css";
import Pills from "./components/Pills";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestion, setSearchSuggestion] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());
  const inputRef = useRef();

  const fetchUser = async () => {
    if (searchTerm.trim() === "") {
      setSearchSuggestion([]);
      return;
    }

    const resposne = await fetch(
      `https://dummyjson.com/users/search?q=${searchTerm}`
    );

    const data = await resposne.json();
    setSearchSuggestion(data);
  };

  useEffect(() => {
    fetchUser();
  }, [searchTerm]);

  const handleSelectUser = (user) => {
    setSelectedUser([...selectedUser, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearchTerm("");
    setSearchSuggestion([]);
    inputRef.current.focus();
  };

  const handleRemoveUser = (user) => {
    const filterUser = selectedUser.filter((item) => item.id !== user.id);
    setSelectedUser(filterUser);

    const updatedEmails = new Set(selectedUserSet);
    updatedEmails.delete(user.email);
    setSelectedUserSet(updatedEmails);
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      selectedUser.length > 0
    ) {
      const lastuser = selectedUser[selectedUser.length - 1];
      handleRemoveUser(lastuser);
      setSearchSuggestion([]);
    }
  };

  return (
    <div className="user-search-container">
      <div className="user-search-input">
        {selectedUser.map((user) => {
          return (
            <Pills
              key={user.email}
              image={user.image}
              text={`${user.firstName} ${user.lastName}`}
              onClick={() => handleRemoveUser(user)}
            />
          );
        })}
        {/* input field with search suggestion */}
        <div>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search For A User..."
            onKeyDown={handleKeyDown}
          />
          {/* search suggestion */}
          <ul className="suggestions-list">
            {searchSuggestion?.users?.map((user, index) =>
              !selectedUserSet.has(user.email) ? (
                <li key={user.email} onClick={() => handleSelectUser(user)}>
                  <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </li>
              ) : (
                <></>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
