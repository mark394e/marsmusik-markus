import "../styles/Ticketholder.module.scss";
import { useRef } from "react";
import { useState } from "react";

function TicketHolderVIP(props) {
  const ticketHolderForm = useRef(null);
  const [txt, setTxt] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();

    // vi benytter spread-operator for at tilføje flere objekter til vores state-array
    props.setTicketHolders((current) => [
      ...current,
      {
        fullname: ticketHolderForm.current.elements.fullname.value,
        email: ticketHolderForm.current.elements.email.value,
        tickettype: "VIP",
      },
    ]);
    setSent(true);
    props.setSentTickets((current) => current + 1);
  }

  if (sent) {
    return (
      <>
        <div className="thankyou">
          <h2>Thank you!</h2>
          <p>- info sent</p>
        </div>
      </>
    );
  }

  // validate name
  const onInputChange = (e) => {
    const { value } = e.target;

    const re = /^[A-ø a-ø]+$/;
    if (value === "" || re.test(value)) {
      setTxt(value);
    }
  };

  return (
    <>
      <div className="formticketholder">
        <h3>VIP ticket</h3>
        <form id="ticketholderform" onSubmit={submit} ref={ticketHolderForm}>
          <label htmlFor="fullname">
            {" "}
            Full name
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Fullname"
              required
              onChange={onInputChange}
              value={txt}
            />
          </label>
          <label htmlFor="email">
            E-mail
            <input
              type="email"
              id="email"
              name="email"
              placeholder="abc@gmail.com"
              aria-describedby="hint-mail"
              required
            />
            <span className="error" id="err-mail" aria-live="assertive">
              Type in your email address
            </span>
          </label>
          <button className="submitBtn">Submit</button>
        </form>
      </div>
    </>
  );
}

export default TicketHolderVIP;
