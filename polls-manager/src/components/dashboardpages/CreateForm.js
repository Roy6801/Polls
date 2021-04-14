import { useState } from "react";
import Service from "../Service";

const CreateForm = () => {
  var multi;
  var storedate;
  const [anon, setAnon] = useState(true);
  const [checked, setChecked] = useState(false);
  const [multicheck, setMulticheck] = useState(false);
  const [title, setTitle] = useState("");
  const [vCriteria, setVCriteria] = useState("");
  const [starttime, setStarttime] = useState();
  const [endtime, setEndtime] = useState();
  const [startdate, setStartdate] = useState();
  const [enddate, setEnddate] = useState();
  const [field, setField] = useState([{ value: null }]);
  const [val, setval] = useState(4);
  const sliderange = (e) => {
    setval(e.target.value);
  };

  const handleStartdate = (e) => {
    const begandate = new Date(e.target.value);
    storedate = begandate.getTime();
    const startdate = Math.floor(storedate / 1000);
    setStartdate(startdate);
  };

  const handleEnddate = (e) => {
    const begandate = new Date(e.target.value);
    storedate = begandate.getTime();
    const enddate = Math.floor(storedate / 1000);
    setEnddate(enddate);
  };

  const handleStarttime = (e) => {
    const begantime = e.target.value;
    const hrs = begantime.split(":")[0];
    const mins = begantime.split(":")[1];
    const starttime = Number(hrs) * 3600 + Number(mins) * 60;
    setStarttime(starttime);
  };

  const handleEndtime = (e) => {
    const begantime = e.target.value;
    const hrs = begantime.split(":")[0];
    const mins = begantime.split(":")[1];
    const endtime = Number(hrs) * 3600 + Number(mins) * 60;
    setEndtime(endtime);
  };

  const handleInputs = (e, i) => {
    const values = [...field];
    values[i] = e.target.value;
    setField(values);
    console.log(values);
  };

  const handlefield = () => {
    var fieldArray = [];
    for (var i = 1; i <= val; i++) {
      fieldArray.push(i);
    }
    return (
      <div>
        {fieldArray.map((i) => {
          return (
            <div key={i}>
              <input
                type="text"
                required
                placeholder={i + " : Choice"}
                onChange={(e) => handleInputs(e, i)}
              />
            </div>
          );
        })}
      </div>
    );
  };
  const handleSchedule = () => {
    if (checked) {
      return (
        <div>
          <div className="date-in">
            <input type="date" onChange={handleStartdate} />
          </div>
          <div className="time-in">
            <input type="time" onChange={handleStarttime} />
          </div>
        </div>
      );
    }
  };

  const handleAnonmity = () => {
    if (!anon) {
      return (
        <div>
          <div>
            <input
              type="text"
              placeholder="Enter the verfication type"
              onChange={(e) => setVCriteria(e.target.value)}
            />
          </div>
        </div>
      );
    }
  };

  if (multicheck) {
    multi = 1;
  } else {
    multi = 0;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const user = {
      userName: window.localStorage.getItem("polls-manager-system-G22-user"),
      pollName: title,
      verificationCriteria: vCriteria,
      ts: startdate + starttime,
      deadline: enddate + endtime,
      anonymity: anon,
      scheduled: checked,
      radio: multi,
      optionsCount: val,
      options: field,
    };

    Service.createPoll(user).then((resp) => {
      console.log(resp);
    });
  };

  return (
    <div
      className="createform"
      style={{ height: "100%", backgroundColor: "green" }}
    >
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="titlepoll">
          <h2>Title</h2>
          <input
            type="text"
            placeholder="Enter the poll title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="checkbox-obuttons">
          <input
            type="checkbox"
            defaultChecked={anon}
            onChange={() => (anon ? setAnon(false) : setAnon(true))}
          />{" "}
          Anonymity
          <input
            type="checkbox"
            defaultChecked={checked}
            onChange={() => (checked ? setChecked(false) : setChecked(true))}
          />{" "}
          Scheduled
        </div>

        {handleAnonmity()}

        {handleSchedule()}

        <div className="date-in">
          <input type="date" onChange={handleEnddate} required />
        </div>

        <div className="time-in">
          <input type="time" onChange={handleEndtime} required />
        </div>

        <div>
          <input
            type="checkbox"
            defaultChecked={multicheck}
            onChange={() =>
              multicheck ? setMulticheck(false) : setMulticheck(true)
            }
          />
          Multi-Candidate Selection
        </div>

        <div className="range-in">
          <label> Value:{val}</label>
          <input
            type="range"
            min="2"
            max="8"
            className="slider"
            id="myRange"
            value={val}
            onChange={sliderange}
          />
        </div>
        {handlefield()}

        <div className="button-n">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
