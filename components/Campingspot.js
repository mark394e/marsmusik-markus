import React, { useRef, useEffect } from "react";
import "../styles/Campingspot.module.scss";
import configData from "../config.json";
import { Roboto } from "@next/font/google";
import { Shrikhand } from "@next/font/google";

const shrikhand = Shrikhand({ subsets: ["latin"], weight: "400" });

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

function Campingspot(props) {
  const ref = useRef(null);

  // vi bruger useeffect så vi kun henter data én gang. Det forhindre React i at lave et infinite loop af re-renders.
  useEffect(() => {
    const campingspot = ref.current;

    // Hvis værdien af available-spots er mindre end antallet af valgte billetter skal fullybooked-klassen tilføjes.
    if (props.data.available < props.ticketAmount || props.data.available <= 0) {
      campingspot.classList.add("fullybooked");
      campingspot.style.pointerEvents = "none";
    } else {
      campingspot.classList.remove("fullybooked");
      campingspot.style.pointerEvents = "auto";
    }
  });

  function clickedCamping() {
    ref.current.classList.add("pickedCamping");
    props.setPickedCamping(props.data.area);
    props.setShowPickedCamping(true);

    // kalder funktionen reserveSpot() med campingspot-area og antal billetter som parameter
    reserveSpot({
      area: props.data.area,
      amount: props.ticketAmount,
    });

    // sætter tiden på timeren til at være 300000ms (5min) fra nu (Date.now()).
    props.setTimer(Date.now() + 300000);
    props.setShowTimer(true);
  }

  // sender en PUT-request til vores back-end der sender et reservations-id tilbage
  function reserveSpot(payload) {
    fetch(`${configData.url}/reserve-spot`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      // gemmer id'et (repsonse) i et state
      .then((response) => props.setReserveID(response.id))
      .catch((err) => console.error(err));
  }

  return (
    <>
      <section className="campingSection">
        <div className="campingspotwrapper" ref={ref}>
          <button onClick={clickedCamping}>
            <div className="campingspot">
              <h3
                style={{
                  textTransform: "uppercase",
                  fontFamily: `${shrikhand.style.fontFamily}`,
                  fontSize: "0.9rem",
                }}
              >
                {props.data.area}
              </h3>
            </div>
            <div className="available">
              <p>
                <span>{props.data.available}</span> spots left
              </p>
            </div>{" "}
          </button>
        </div>
      </section>
    </>
  );
}

export default Campingspot;
