import "../styles/basket.module.scss";
import { useState, useEffect } from "react";

function Basket(props) {
  const [showVIPTicket, setShowVIPTicket] = useState(false);
  const [showREGTicket, setShowREGTicket] = useState(false);

  // conster der definere hva de forskellige priser på biletter er
  const priceVIP = 1299;
  const priceREG = 799;

  return (
    <section className="basket">
      <h3>Your cart:</h3>
      <h4>Tickets:</h4>
      <ul>
        {showVIPTicket && (
          <li>
            {/* her henter vi vores contervip ind som er sat til at tælle hvor mange 
          biletter der er valgt og gange det valgte billettal med pricevip som er sat til en bestemt pris 
          for så at få en total værdi af de valgte biletter lagt sammen  */}
            {props.counterVIP}x VIP - Price: {props.counterVIP * priceVIP}
          </li>
        )}
        {showREGTicket && (
          <li>
            {props.counterREG}x Standard - Price: {props.counterREG * priceREG}
          </li>
        )}
      </ul>
      <h4>Camping: Svartheim</h4>
      <ul>
        <li>extra product</li>
        <li>extra product</li>
        <li>extra product</li>
      </ul>

      <h3>Total: 1200,-</h3>
    </section>
  );
}

export default Basket;