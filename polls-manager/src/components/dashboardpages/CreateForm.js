import { useState } from "react";
import Service from "../Service";
import Clipboard from "../Clipboard";
import HomeBtn from "../HomeBtn";
import "../stylesheets/Register.css";
import "../stylesheets/CreateForm.css";

const CreateForm = () => {
  var storedate;
  const rectify = 19800;
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
    setStarttime(starttime - rectify);
  };

  const handleEndtime = (e) => {
    const begantime = e.target.value;
    const hrs = begantime.split(":")[0];
    const mins = begantime.split(":")[1];
    const endtime = Number(hrs) * 3600 + Number(mins) * 60;
    setEndtime(endtime - rectify);
  };

  const handleInputs = (e, i) => {
    const noSpecial = /[^a-zA-Z0-9 ]/;
    if (noSpecial.test(e.target.value)) {
      alert("Special Characters Not Allowed!!");
      e.target.value = e.target.value.slice(0, -1);
    } else {
      const values = [...field];
      values[i] = e.target.value.replaceAll(" ", "_");
      setField(values);
    }
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
                className="input-control input-control-create"
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
            <b>Schedule Date:</b>
            <input
              type="date"
              className="input-control input-control-create"
              required
              onChange={handleStartdate}
            />
          </div>
          <div>
            <b>Schedule Time:</b>
            <input
              type="time"
              className="input-control input-control-create"
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
              className="input-control input-control-create"
              placeholder="Enter the verfication type"
              required
              onChange={(e) => setVCriteria(e.target.value)}
            />
          </div>
        </div>
      );
    }
  };

  const DisplayField = () => {
    var fieldArray = [];
    var type;
    for (var i = 1; i <= val; i++) {
      fieldArray.push(field[i]);
    }
    if (multicheck) {
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
      ts: checked
        ? startdate + starttime
        : Math.floor(new Date().getTime() / 1000),
      deadline: enddate + endtime,
      anonymity: anon,
      scheduled: checked,
      radio: !multicheck,
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
      <div
        style={{
          display: "flex",
          background:
            "linear-gradient(293deg, rgba(235,144,110,1) 33%, rgba(255,216,177,1) 66%, rgba(255,229,180,1) 99%)",
          minHeight: "90vh",
        }}
      >
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
                className="input-control input-control-create"
                placeholder="Enter Poll Title"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <label>
                <input
                  type="checkbox"
                  defaultChecked={anon}
                  onChange={() => (anon ? setAnon(false) : setAnon(true))}
                />{" "}
                <b>Anonymity</b>
              </label>
              <label>
                <input
                  type="checkbox"
                  defaultChecked={checked}
                  onChange={() =>
                    checked ? setChecked(false) : setChecked(true)
                  }
                />{" "}
                <b>Scheduled</b>
              </label>
            </div>

            {HandleAnonmity()}

            {HandleSchedule()}

            <div>
              <b>End Date :</b>
              <input
                type="date"
                className="input-control input-control-create"
                onChange={handleEnddate}
                required
              />
            </div>

            <div>
              <b>End Time : </b>
              <input
                type="time"
                className="input-control input-control-create "
                onChange={handleEndtime}
                required
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <label>
                <input
                  type="checkbox"
                  defaultChecked={multicheck}
                  onChange={() =>
                    multicheck ? setMulticheck(false) : setMulticheck(true)
                  }
                />{" "}
                <b>Multi-Candidate Selection</b>
              </label>
            </div>

            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <label>
                <b> Value: {val} </b>
                <input
                  type="range"
                  min="2"
                  max="20"
                  id="myRange"
                  value={val}
                  onChange={sliderange}
                />{" "}
              </label>
            </div>
            {Handlefield()}

            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <HomeBtn />
              <button
                type="submit"
                className="btn btn-success"
                style={{ width: "10vw" }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          background:
            "linear-gradient(293deg, rgba(235,144,110,1) 33%, rgba(255,216,177,1) 66%, rgba(255,229,180,1) 99%)",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
          alignItems:"center"
        }}
      >
        <div style={{width:"50%"}}>
        <Clipboard text={text} />
        </div>
        <HomeBtn />
        
      </div>
    );
  }
};

export default CreateForm;
