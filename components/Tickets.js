import { useState, useEffect } from "react";
import TicketType from "./TicketType";
import Campingspot from "./Campingspot";
import TicketHolderREG from "./TicketHolderREG";
import TicketHolderVIP from "./TicketHolderVIP";
import "../styles/Tickets.module.scss";
import "../styles/Campingspot.module.scss";
import Extras from "./Extras";

function Tickets(props) {
  const ticketAmount = props.counterREG + props.counterVIP;

  const [sentTickets, setSentTickets] = useState(null);

  useEffect(() => {
    // fjerner disabledShowCamping-class fra continueBtn hvis der er valgt en eller flere billetter.
    if (ticketAmount > 0) {
      document.querySelector(".continueBtn").classList.remove("disabledShowCamping");
    } else if (ticketAmount == 0) {
      document.querySelector(".continueBtn").classList.add("disabledShowCamping");
      document.querySelector(".continueBtn").classList.remove("disabledShowPayment");
      document.querySelector(".continueBtn").classList.remove("disabledShowTicketholders");
    }

    // fjerner disabledShowPayment-class fra continueBtn hvis antallet af billetter stemmer overens med antallet af afsendte ticketholders.
    if (sentTickets === ticketAmount) {
      document.querySelector(".continueBtn").classList.remove("disabledShowPayment");
    }

    // fjerner disabledShowTicketholders-class fra continueBtn hvis pickedCamping-state ikke længere er "null"
    if (props.pickedCamping != null) {
      document.querySelector(".continueBtn").classList.remove("disabledShowTicketholders");
    }
  }, [ticketAmount, sentTickets, props.pickedCamping]);

  const ticketholdersREG = Array.from({ length: props.counterREG }, (element, index) => {
    return (
      <TicketHolderREG
        key={index}
        ticketHolderArr={props.ticketHolderArr}
        ticketHolders={props.ticketHolders}
        setTicketHolders={props.setTicketHolders}
        sentTickets={sentTickets}
        setSentTickets={setSentTickets}
      ></TicketHolderREG>
    );
  });

  const ticketholdersVIP = Array.from({ length: props.counterVIP }, (element, index) => {
    return (
      <TicketHolderVIP
        key={index}
        ticketHolderArr={props.ticketHolderArr}
        ticketHolders={props.ticketHolders}
        setTicketHolders={props.setTicketHolders}
        sentTickets={sentTickets}
        setSentTickets={setSentTickets}
      ></TicketHolderVIP>
    );
  });

  function sendExtras() {
    props.setExtras([
      {
        greencamping: props.counterGreenCamp,
        prebuildTwo: props.counterPrebuildTwo,
        prebuildThree: props.counterPrebuildThree,
      },
    ]);
    props.setShowTicketHolder(true);
  }

  return (
    <>
      <section className="around">
        <div className="ticketholder">
          <h3>Select your tickets</h3>
          <TicketType
            setCounterVIP={props.setCounterVIP}
            setCounterREG={props.setCounterREG}
            counterREG={props.counterREG}
            counterVIP={props.counterVIP}
          ></TicketType>
          {!props.showCamping && (
            <button
              onClick={() => props.setShowCamping(true)}
              className="continueBtn disabledShowCamping"
            >
              Continue
            </button>
          )}
          <div className="camping-wrapper">
            {props.showCamping && (
              <>
                <h3>Pick a campingsite</h3>
                <p>
                  <span className="fat"> 99,-</span>for one area
                </p>
                <div className="campingspot-container">
                  {props.campingspot.map((spot) => (
                    <Campingspot
                      data={spot}
                      key={spot.area}
                      ticketAmount={ticketAmount}
                      setPickedCamping={props.setPickedCamping}
                      pickedCamping={props.pickedCamping}
                      showPickedCamping={props.showPickedCamping}
                      setShowPickedCamping={props.setShowPickedCamping}
                      reserveID={props.reserveID}
                      setReserveID={props.setReserveID}
                      setShowTimer={props.setShowTimer}
                      setTimer={props.setTimer}
                    ></Campingspot>
                  ))}
                </div>
                <div className="extra-placement">
                  <Extras
                    counterGreenCamp={props.counterGreenCamp}
                    counterPrebuildTwo={props.counterPrebuildTwo}
                    counterPrebuildThree={props.counterPrebuildThree}
                    setCounterGreenCamp={props.setCounterGreenCamp}
                    setCounterPrebuildTwo={props.setCounterPrebuildTwo}
                    setCounterPrebuildThree={props.setCounterPrebuildThree}
                    showExtras={props.showExtras}
                    setShowPaymentForm={props.setShowPaymentForm}
                    extras={props.extras}
                    setExtras={props.setExtras}
                    showPaymentForm={props.showPaymentForm}
                  ></Extras>
                </div>
              </>
            )}
          </div>
          {props.showCamping && !props.showTicketHolder && (
            <button onClick={sendExtras} className="continueBtn disabledShowTicketholders">
              Continue
            </button>
          )}
          {props.showTicketHolder ? (
            <>
              <h3>Please fill out each ticketholder</h3>
              {ticketholdersVIP} {ticketholdersREG}
            </>
          ) : null}
          {props.showTicketHolder && !props.showPaymentForm && (
            <button
              onClick={() => props.setShowPaymentForm(true)}
              className="continueBtn disabledShowPayment"
            >
              Continue
            </button>
          )}
        </div>
      </section>
    </>
  );
}

export default Tickets;
