import React, { useState, useEffect } from "react";
import "aframe";
import Modal from "react-modal";
import CompShowData from "./ShowData";
import "../css/portafolio.css";

const AFrameaScene = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [clickMessages, setClickMessages] = useState([]);
  const [portafolioData, setPortafolioData] = useState([]);
  const [clickBoton, setClickBoton] = useState(0);
  const [clickedButtons, setClickedButtons] = useState([]);
  const radius = 3;

  useEffect(() => {
    fetchPortafolio();
  }, []);

  const fetchPortafolio = async () => {
    try {
      const response = await fetch("http://localhost:3001/portafolio");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPortafolioData(data);
    } catch (error) {
      console.error("Error fetching portafolio:", error);
    }
  };

  const formatFecha = (fecha) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(fecha).toLocaleDateString("es-ES", options);
  };

  const handleClick = (message, buttonIndex) => {
    // Verificar si el botón clickeado ya ha sido clickeado antes
    if (!clickedButtons.includes(buttonIndex)) {
      // Agregar el botón clickeado al registro
      setClickedButtons((prevClickedButtons) => [
        ...prevClickedButtons,
        buttonIndex,
      ]);
      // Agregar el nuevo mensaje manteniendo los mensajes anteriores
      setClickMessages((prevMessages) => [
        ...prevMessages,
        { message, positionX: prevMessages.length + 1 }, // Calcular la posición X
      ]);
    }
  };

  const handleSobreMi = () => {
    setClickBoton(1);
    const sobreMiData = portafolioData
      .map((item) => `Sobre mí:\n${item.sobreMi}`)
      .join("\n\n");
    handleClick(sobreMiData, 1);
  };

  const handleFormacion = () => {
    setClickBoton(2);
    const formacionData = portafolioData
      .flatMap((item) =>
        item.formacion.map(
          (info) =>
            `Institución: ${info.institucion}\nTítulo: ${
              info.titulo
            }\nFecha de inicio: ${formatFecha(
              info.fechaInicio
            )}\nFecha de fin: ${formatFecha(info.fechaFin)}`
        )
      )
      .join("\n\n");
    handleClick(formacionData, 2);
  };

  const handleExperienciaLaboral = () => {
    setClickBoton(3);
    const experienciaLaboralData = portafolioData
      .flatMap((item) =>
        item.experienciaLaboral.map(
          (info) =>
            `Empresa: ${info.empresa}\nDescripción: ${
              info.descripcion
            }\nFecha de inicio: ${formatFecha(
              info.fechaInicio
            )}\nFecha de fin: ${formatFecha(info.fechaFin)}`
        )
      )
      .join("\n\n");
    handleClick(experienciaLaboralData, 3);
  };

  const handleCompetencias = () => {
    setClickBoton(4);
    const competenciasData = portafolioData
      .map((item) => `Competencias:\n${item.competencias}`)
      .join("\n\n");
    handleClick(competenciasData, 4);
  };

  const handleIdiomas = () => {
    setClickBoton(5);
    const idiomasData = portafolioData
      .flatMap((item) =>
        item.idiomas.map(
          (info) => `Idioma: ${info.idioma}\nNivel: ${info.nivel}`
        )
      )
      .join("\n\n");
    handleClick(idiomasData, 5);
  };

  const handleMasInformacion = () => {
    setClickBoton(6);
    const masInformacionData = portafolioData
      .map((item) => `Más información:\n${item.masInformacion}`)
      .join("\n\n");
    handleClick(masInformacionData, 6);
  };

  const handleContacto = () => {
    setClickBoton(7);
    const datosPersonalesData = portafolioData
      .map((item) => {
        const datos = item.datosPersonales;
        return `Datos personales:\nNombre: ${datos.nombre}\nApellidos: ${datos.apellidos}\nEmail: ${datos.email}\nTeléfono: ${datos.telefono}`;
      })
      .join("\n\n");
    handleClick(datosPersonalesData, 7);
  };

  const handleActualizar = () => {
    setClickBoton(8);
    setModalIsOpen(true);
  };

  const handleVolver = () => {
    setClickBoton(9);
  };

  useEffect(() => {
    function getRandomColor() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
    document.querySelectorAll("a-box").forEach(function (box) {
      var color = getRandomColor();
      box.setAttribute("color", color);
    });
  }, []);

  // useEffect(() => {
  //   const sceneContainer = document.querySelector("#escena");
  //   if (clickBoton === 1) {
  //     setTimeout(() => {
  //       sceneContainer.setAttribute("animation", {
  //         property: "rotation",
  //         to: "0 140 0",
  //         dur: 1000,
  //       });
  //     }, 1000);
  //   }
  // }, [clickBoton]);

  const calculatePosition = (index, totalMessages) => {
    const angleStep = (2 * Math.PI) / totalMessages;
    const angle = index * angleStep;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    return { x, z };
  };

  return (
    <div className="aframe-container">
      <a-scene cursor="rayOrigin: mouse">
        <a-sky
          position="0 0 0"
          particle-system="preset: dust; particleCount: 5000"
        ></a-sky>

        <a-sky color="#000" />
        {/* <a-entity
          id="modelo"
          position="0 0 2"
          gltf-model="../imagenes/glb/nave.glb"
          play-all-model-animations
          animation-mixer
        /> */}

        <a-entity id="menu" position="0 2.2 -3" scale="0.2 0.2 0.2">
          {[
            { text: "Sobre mí", handler: handleSobreMi },
            { text: "Formación", handler: handleFormacion },
            {
              text: "Experiencia laboral",
              handler: handleExperienciaLaboral,
            },
            { text: "Competencias", handler: handleCompetencias },
            { text: "Idiomas", handler: handleIdiomas },
            { text: "Más Información", handler: handleMasInformacion },
            { text: "Contacto", handler: handleContacto },
            { text: "Actualizar datos", handler: handleActualizar },
          ].map((button, index) => (
            <a-entity
              key={index}
              geometry="primitive: box; width: 5; height: 1; depth: 0.5"
              position={`0 0 0`}
              onClick={button.handler}
              animation__position={`property: position; to: 0 ${
                -index * 1.4
              } -1; dur: 2000`}
              animation__rotation="property: rotation; to: 0 180 0; dur: 2000"
            >
              <a-text
                font="Roboto-Regular-msdf.json"
                value={button.text}
                rotation="0 180 0"
                position="0 0 -0.26"
                align="center"
                width="10"
              ></a-text>
            </a-entity>
          ))}
        </a-entity>

        {clickMessages.map((msg, index) => {
          const angle = (index / clickMessages.length) * 2 * Math.PI; // Ángulo según el índice
          const x = radius * Math.cos(angle);
          const z = radius * Math.sin(angle);
          return (
            <a-entity
              key={index}
              position={`${x} 1.7 ${z}`} // Utilizar las coordenadas calculadas
              rotation={`0 ${-90 - (index * 360) / clickMessages.length} 0`} // Alinear los mensajes con la circunferencia
              align="center"
            >
              <a-text
                font="Roboto-Regular-msdf.json"
                value={msg.message}
                align="center"
                width="2"
              ></a-text>
            </a-entity>
          );
        })}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <CompShowData />
        </Modal>
        {/* {clickBoton === 8 && <CompShowData />} */}
      </a-scene>
    </div>
  );
};

export default AFrameaScene;
