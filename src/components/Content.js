import React, { useEffect, useState, useCallback } from "react";
import "./Content.css";
import axios from "axios";
import { getUsers } from "../hooks/getUsers";

const API_URL = process.env.REACT_APP_API_URL;

const Content = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState({});
  const [filter, setFilter] = useState("all");
  const userID = localStorage.getItem("userID");
  const token = localStorage.getItem("token");
  const [filtredUser, setFiltredUser] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [newBug, setNewBug] = useState({ title: "", description: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching users
        const userResponse = await getUsers(token);
        setUsers(userResponse);

        // Fetching bugs
        const response = await axios.get(
          `${API_URL}/list/${token}/${filtredUser}`
        );
        if (response.data.result.status === "done") {
          setData(response.data.result.bug);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
        console.error("Erreur lors de la récupération des données :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, filtredUser]);

  const handleActionClick = useCallback(
    async (bug) => {
      try {
        const response = await axios.get(
          `${API_URL}/delete/${token}/${bug.id}`
        );
        if (response.data.result.status === "done") {
          setData((prevData) => prevData.filter((b) => b.id !== bug.id));
          console.log("Bug supprimé");
        }
      } catch (err) {
        console.error("Erreur lors de la suppression du bug :", err);
      }
    },
    [token]
  );

  const handleBugState = useCallback(
    async (e, bug) => {
      const newState = e.target.value;
      try {
        const response = await axios.get(
          `${API_URL}/state/${token}/${bug.id}/${newState}`
        );

        if (response.data.result.status === "done") {
          setData((prevData) =>
            prevData.map((b) =>
              b.id === bug.id ? { ...b, state: newState } : b
            )
          );
        } else {
          alert("Failed to update bug state");
        }
      } catch (err) {
        console.error("Erreur lors de la mise à jour de l'état du bug :", err);
      }
    },
    [token]
  );

  const getStatusStyle = useCallback((state) => {
    switch (state) {
      case "0":
        return { backgroundColor: "#ff4d4d", color: "white" };
      case "1":
        return { backgroundColor: "#4e6eee", color: "white" };
      case "2":
        return { backgroundColor: "#4caf50", color: "white" };
      default:
        return {};
    }
  }, []);

  const filteredData = data.filter((bug) => {
    switch (filter) {
      case "done":
        return bug.state === "2";
      case "pending":
        return bug.state === "1";
      case "not-started":
        return bug.state === "0";
      case "all":
        return true;
      default:
        return true;
    }
  });

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handleUserFilterChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "all") {
      setFiltredUser(0);
    } else {
      setFiltredUser(userID);
    }
  };

  const handleAddBugClick = () => {
    setShowForm(true);
  };

  const handleCancelClick = () => {
    setShowForm(false);
  };

  const handleSaveClick = async () => {
    try {
      // Construct the URL with token and userID
      const url = `${API_URL}/add/${token}/${userID}`;

      // Data to send in the body
      const requestData = {
        title: newBug.title,
        description: newBug.description,
      };

      // Make the POST request
      const response = await axios.post(url, requestData, {
        headers: {
          "Content-Type": "text/plain", // Ensure the server knows you're sending JSON
        },
      });

      // Check response status
      if (response.data.result.status === "done") {
        // Refresh the bug list after successful addition
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `${API_URL}/list/${token}/${filtredUser}`
            );
            if (response.data.result.status === "done") {
              setData(response.data.result.bug);
            } else {
              setError("Failed to fetch data");
            }
          } catch (err) {
            setError("An error occurred while fetching data");
            console.error("Erreur lors de la récupération des données :", err);
          } finally {
            setLoading(false);
          }
        };

        fetchData();
        setShowForm(false);
        console.log("Bug ajouté avec succès");
      } else {
        alert("Échec de l'ajout du bug");
      }
    } catch (err) {
      console.error("Erreur lors de l'ajout du bug :", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBug((prevBug) => ({ ...prevBug, [name]: value }));
  };

  // Calculate the number of bugs in different states
  const inProgressCount = filteredData.filter(
    (bug) => bug.state === "1"
  ).length;
  const treatedCount = filteredData.filter((bug) => bug.state === "2").length;

  return (
    <div className="container">
      {showForm ? (
        <div className="form-container">
          <div className="top-bar">
            <button className="cancel-button" onClick={handleCancelClick}>
              Annuler
            </button>
            <button className="save-button" onClick={handleSaveClick}>
              Sauvegarder
            </button>
          </div>
          <form className="add-bug-form">
            <div className="form-group">
              <label htmlFor="title">Titre</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newBug.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={newBug.description}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="top-bar">
            <div className="summary">
              {filteredData.length} bugs, {inProgressCount} en cours,{" "}
              {treatedCount} traité
            </div>
            <div className="top-bar-links">
              <button
                className={`top-bar-link ${filter === "all" ? "active" : ""}`}
                onClick={() => handleFilterChange("all")}
              >
                Liste complète
              </button>
              <button
                className={`top-bar-link ${
                  filter === "not-started" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("not-started")}
              >
                À traiter
              </button>
              <button
                className={`top-bar-link ${
                  filter === "pending" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("pending")}
              >
                En cours
              </button>
              <button
                className={`top-bar-link ${filter === "done" ? "active" : ""}`}
                onClick={() => handleFilterChange("done")}
              >
                Traité
              </button>
            </div>
            <button className="add-button" onClick={handleAddBugClick}>
              Ajouter
            </button>
            <select
              className="bug-filter"
              value={filtredUser === 0 ? "all" : "my-bugs"}
              onChange={handleUserFilterChange}
            >
              <option value="all">Tous les bugs</option>
              <option value="my-bugs">Mes bugs</option>
            </select>
          </div>
          <div className="table-container">
            <h2>Tableau de Données</h2>
            {loading ? (
              <p>Chargement des données...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Designation</th>
                    <th>Date</th>
                    <th>Nom</th>
                    <th>Etat</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((bug) => (
                    <tr key={bug.id}>
                      <td>{bug.title}</td>
                      <td>
                        {new Date(bug.timestamp * 1000).toLocaleDateString()}
                      </td>
                      <td>{users[bug.user_id]}</td>
                      <td style={getStatusStyle(bug.state)}>
                        <select
                          defaultValue={bug.state}
                          onChange={(e) => handleBugState(e, bug)}
                        >
                          <option value="0">non traité</option>
                          <option value="1">en cours</option>
                          <option value="2">traité</option>
                        </select>
                      </td>
                      <td>
                        <button onClick={() => handleActionClick(bug)}>
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Content;
