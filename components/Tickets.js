import TicketType from "./TicketType";
import Campingspot from "./Campingspot";
import TicketHolderREG from "./TicketHolderREG";
import TicketHolderVIP from "./TicketHolderVIP";
import "../styles/Tickets.module.scss";
import "../styles/Campingspot.module.scss";
import Extras from "./Extras";

function Tickets(props) {
  // her plusser vi den vaælgte mængde af reg biletter med vip billetter for at få en samlet billet mængde
  // - det skal bla. bruges til at tjekke om der er nok ledige camping spots
  const ticketAmount = props.counterREG + props.counterVIP;

  const ticketholdersREG = Array.from({ length: props.counterREG }, (_, index) => {
    return (
      <TicketHolderREG
        key={index}
        ticketHolderArr={props.ticketHolderArr}
        ticketHolders={props.ticketHolders}
        setTicketHolders={props.setTicketHolders}
      ></TicketHolderREG>
    );
  });

  const ticketholdersVIP = Array.from({ length: props.counterVIP }, (_, index) => {
    return (
      <TicketHolderVIP
        key={index}
        ticketHolderArr={props.ticketHolderArr}
        ticketHolders={props.ticketHolders}
        setTicketHolders={props.setTicketHolders}
      ></TicketHolderVIP>
    );
  });

  // fjerner disabledBtn klassen fra continueBtn hvis der er valgt en eller flere billetter.
  if (ticketAmount > 0) {
    document.querySelector(".continueBtn").classList.remove("disabledShowCamping");
  }

  function sendExtras() {
    console.log("does this run???");
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
          {/* sender data videre ind i component */}
          <TicketType
            setCounterVIP={props.setCounterVIP}
            setCounterREG={props.setCounterREG}
            counterREG={props.counterREG}
            counterVIP={props.counterVIP}
          ></TicketType>
          {/* showCamping state sættes til true for at få vist campingspots. 
          Knappen fjernes når statet ikke længere er false */}
          {!props.showCamping && (
            <button
              onClick={() => props.setShowCamping(true)}
              className="continueBtn disabledShowCamping"
            >
              Continue
            </button>
          )}
          <div className="camping-wrapper">
            {/*  */}
            {/* det her skal forklares bedre !!! */}
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
          {/* knap der får besked på at vise ticketholder når der trykkes på den */}
          {props.showCamping && !props.showTicketHolder && (
            <button onClick={sendExtras} className="continueBtn">
              Continue
            </button>
          )}
          {/* hvad sker der herunder ???? */}
          {props.showTicketHolder ? (
            <>
              <h3>Please fill out each ticketholder</h3>
              {ticketholdersVIP} {ticketholdersREG}
            </>
          ) : null}
          {props.showTicketHolder && !props.showPaymentForm && (
            <button onClick={() => props.setShowPaymentForm(true)} className="continueBtn">
              Continue
            </button>
          )}
        </div>
      </section>
    </>
  );
}

export default Tickets;
