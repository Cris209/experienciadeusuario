import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase.config.js";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext"; // Importa el contexto de autenticación
import "../styles/MainPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const MainPage = () => {
  const { user, logout } = useAuth(); // Obtén el usuario y logout directamente del contexto
  const [comments, setComments] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda

  const places = [
    { name: "Parque Fundidora", image: "https://escapadas.mexicodesconocido.com.mx/wp-content/uploads/2020/10/120238810_4103759992984031_8247658761315465946_o.jpg" },
    { name: "Cerro de la Silla", image: "https://somosdenuevoleon.com/wp-content/uploads/CERRO-DE-LA-SILLA-675x675.webp" },
    { name: "Macroplaza", image: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Macroplaza_The_big_square.jpg" },
    { name: "Comidas Doña Nelly", image: "./comidas_doña_nelly.PNG" },
    { name: "Museo MARCO", image: "https://www.101museos.com/cms101/assets/galerias/-achada-noche-300dpi-.jpg" },
  ];

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "comments"));
        const fetchedComments = querySnapshot.docs.map((doc) => doc.data());
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error al obtener comentarios:", error);
      }
    };
    fetchComments();
  }, []);

  const handleComment = async (place, comment, rating, commentId, ratingId) => {
    if (!user) {
      alert("Debes iniciar sesión para comentar");
      return;
    }
    if (!comment && !rating) {
      alert("Debes escribir un comentario o ingresar una calificación");
      return;
    }

    try {
      await addDoc(collection(db, "comments"), {
        place,
        user: user.email,
        comment: comment || null, // Solo guarda el comentario si existe
        rating: rating || null,   // Solo guarda la calificación si existe
        timestamp: new Date(),
      });

      alert("Comentario enviado");

      setComments((prev) => [
        ...prev,
        {
          place,
          user: user.email,
          comment: comment || null,
          rating: rating || null,
          timestamp: new Date(),
        },
      ]);

      // Limpiar los campos de entrada
      document.getElementById(commentId).value = "";
      document.getElementById(ratingId).value = "";
    } catch (error) {
      console.error("Error al guardar el comentario:", error);
    }
  };

  // Filtrar lugares en base a la búsqueda
  const filteredPlaces = places.filter((place) =>
    place.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      {/* Contenedor de encabezado */}
      <div className="header">
        <h1 className="page-title">Bienvenido a Go?</h1>
        <button onClick={logout} className="logout-button">
          Cerrar Sesión
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Buscar lugar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="card-container">
      {filteredPlaces.map((place) => {
          const commentId = `${place.name}-comment`;
          const ratingId = `${place.name}-rating`;

          return (
            <div className="card" key={place.name}>
              <img src={place.image} alt={place.name} className="card-image" />
              <h3 className="card-title">{place.name}</h3>
              <textarea
                id={commentId}
                placeholder="Escribe un comentario"
                className="card-textarea"
              ></textarea>
              <input
                id={ratingId}
                type="number"
                placeholder="Calificación (1-5)"
                min="1"
                max="5"
                className="card-input"
              />
              <button
                onClick={() =>
                  handleComment(
                    place.name,
                    document.getElementById(commentId).value,
                    parseInt(document.getElementById(ratingId).value),
                    commentId,
                    ratingId
                  )
                }
                className="card-button"
              >
                Enviar Comentario
              </button>
              <div className="comments">
                <h4>Comentarios:</h4>
                {comments
                  .filter((c) => c.place === place.name)
                  .map((c, index) => (
                    <p key={index}>
                      <strong>{c.user}:</strong>{" "}
                      {c.comment && c.rating
                        ? `${c.comment} (${c.rating}/5)`
                        : c.comment
                        ? c.comment
                        : c.rating
                        ? `Calificación: ${c.rating}/5`
                        : ""}
                    </p>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainPage;
