import { useState } from "react";
import Service from "../Service";
import Clipboard from "../Clipboard";
import "../stylesheets/Register.css";
import "../stylesheets/CreateForm.css";

const CreateForm = () => {
  var radio;
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
  const [text, setText] = useState("$$$NULL$$$");
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
  };

  const Handlefield = () => {
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
                className="input-control"
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

  const HandleSchedule = () => {
    if (checked) {
      return (
        <div>
          <div>
            <input
              type="date"
              className="input-control"
              required
              onChange={handleStartdate}
            />
          </div>
          <div>
            <input
              type="time"
              className="input-control"
              required
              onChange={handleStarttime}
            />
          </div>
        </div>
      );
    }
  };

  const HandleAnonmity = () => {
    if (!anon) {
      return (
        <div>
          <div>
            <input
              type="text"
              className="input-control"
              placeholder="Enter the verfication type"
              required
              onChange={(e) => setVCriteria(e.target.value)}
            />
          </div>
        </div>
      );
    }
  };

  if (multicheck) {
    radio = 0;
  } else {
    radio = 1;
  }

  const DisplayField = () => {
    var fieldArray = [];
    var type;
    for (var i = 1; i <= val; i++) {
      fieldArray.push(field[i]);
    }
    if (radio === 0) {
      type = "checkbox";
    } else {
      type = "radio";
    }

    return (
      <div>
        {fieldArray.map((i, count) => {
          return (
            <div key={count} className="formLabel">
              <input type={type} disabled="disabled" />{" "}
              <label className="formFont">{i}</label>
            </div>
          );
        })}
      </div>
    );
  };

  const VerifyField = () => {
    if (!anon) {
      return (
        <div>
          <label className="formLabel">Verification Criteria</label>
          {" : "}
          <label className="formLabel">{vCriteria}</label>
        </div>
      );
    }
    return null;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const user = {
      userName: window.localStorage.getItem("polls-manager-system-G22-user"),
      pollName: title,
      verificationCriteria: vCriteria,
      ts:
        checked
          ? startdate + starttime
          : Math.floor(new Date().getTime() / 1000),
      deadline: enddate + endtime,
      anonymity: anon,
      scheduled: checked,
      radio: radio,
      optionsCount: val,
      options: field,
    };

    Service.createPoll(user).then((resp) => {
      if (resp.data.response !== 0) {
        setText(resp.data.response);
      } else {
        alert("Poll Creation Failed!! Retry..");
      }
    });
  };

  if (text === "$$$NULL$$$") {
    return (
      <div style={{ display: "flex" }}>
        <div className="mainDiv formDisplay">
          <h1 className="formLabel">{title}</h1>
          <label className="formLabel">{DisplayField()}</label>
          {VerifyField()}
          <label className="formLabel">
            Start Time :{" "}
            {checked
              ? String(new Date((startdate + starttime) * 1000))
              : String(new Date())}
          </label>
          <label className="formLabel">
            End Time :{" "}
            {enddate + endtime
              ? String(new Date((enddate + endtime) * 1000))
              : String(new Date(new Date().getTime() + 3600000))}
          </label>
        </div>
        <div className="mainDiv formControl">
          <form onSubmit={(e) => submitHandler(e)}>
            <div>
              <input
                type="text"
                className="input-control"
                placeholder="Enter Poll Title"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <input
                type="checkbox"
                defaultChecked={anon}
                onChange={() => (anon ? setAnon(false) : setAnon(true))}
              />{" "}
              Anonymity
              <input
                type="checkbox"
                defaultChecked={checked}
                onChange={() =>
                  checked ? setChecked(false) : setChecked(true)
                }
              />{" "}
              Scheduled
            </div>

            {HandleAnonmity()}

            {HandleSchedule()}

            <div>
              <input
                type="date"
                className="input-control"
                onChange={handleEnddate}
                required
              />
            </div>

            <div>
              <input
                type="time"
                className="input-control"
                onChange={handleEndtime}
                required
              />
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

            <div>
              <label> Value:{val}</label>
              <input
                type="range"
                min="2"
                max="8"
                id="myRange"
                value={val}
                onChange={sliderange}
              />
            </div>
            {Handlefield()}

            <div>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return <Clipboard text={text} />;
  }
};

export default CreateForm;
