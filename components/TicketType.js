import "../styles/Tickettype.module.scss";

function TicketType(props) {
  // funktioner der tæller op eller ned alt efter hvor mange billetter man har valgt
  const increaseVIP = () => {
    props.setCounterVIP((count) => count + 1);
  };

  const decreaseVIP = () => {
    if (props.counterVIP > 0) {
      props.setCounterVIP((count) => count - 1);
    }
  };

  const increaseREG = () => {
    props.setCounterREG((count) => count + 1);
  };

  const decreaseREG = () => {
    if (props.counterREG > 0) {
      props.setCounterREG((count) => count - 1);
    }
  };

  return (
    <section className="tickettype">
      <div className="ticket" id="vip-ticket">
        <div className="extra-heading">
          <p>Ticket type</p>
          <p>Price</p>
          <p>Total</p>
        </div>
        <div className="border">
          <div className="gold">
            <p> VIP</p>
          </div>
          <div className="orange">
            <p> 1299,-</p>
          </div>
          <div className="white">
            <p> {props.counterVIP * 1299},-</p>
          </div>
        </div>
        <div className="counter">
          {/* funktionerne kaldes ved onClick-event */}
          <button onClick={decreaseVIP} className="counterBtn">
            -
          </button>
          <span>{props.counterVIP}</span>
          <button onClick={increaseVIP} className="counterBtn">
            +
          </button>
        </div>
      </div>
      <div className="ticket" id="reg-ticket">
        <div className="border">
          <div className="cobber">
            <p> STANDARD</p>
          </div>
          <div className="orange">
            <p> 799,-</p>
          </div>
          <div className="white">
            <p> {props.counterREG * 799},-</p>
          </div>
        </div>
        <div className="counter">
          <button onClick={decreaseREG} className="counterBtn">
            -
          </button>
          <span>{props.counterREG}</span>
          <button onClick={increaseREG} className="counterBtn">
            +
          </button>
        </div>
      </div>
    </section>
  );
}

export default TicketType;
