import { useState } from "react";

const CreateForm = () => {
  const [val, setval] = useState(4);
  const sliderange = (e) => {
    setval(e.target.value);
  };
  return (
    <div
      className="createform"
      style={{ height: "100%", backgroundColor: "green" }}
    >
      <div className="titlepoll">
        <form>
          <h2>Title</h2>
          <input type="text" placeholder="Enter the poll title" />
        </form>
      </div>
      <div className="checkbox-obuttons">
        <form>
          <input type="checkbox" name="choice" value="Anonymity" /> Anonymity
          <input type="checkbox" name="choice" value="Schedule" /> Scheduled
        </form>
      </div>
      <div className="date-in">
        <input type="date" />
      </div>
      <div className="time-in">
        <input type="time" />
      </div>
      <div className="range-in">
        <input
          type="range"
          min="2"
          max="8"
          className="slider"
          id="myRange"
          onChange={sliderange}
        />
        <p> Value:{val}</p>
      </div>
      <div className="button-n">
        <input type="button" value="submit" />
      </div>
    </div>
  );
};

export default CreateForm;
