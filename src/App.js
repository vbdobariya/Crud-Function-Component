import "./index.css";
import React, { useState } from "react";
import { Checkbox } from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
import { userSubmit, userDelete, userEdit, userIndex } from "./Redux/Action";
import { Modal, Button } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

const App = (props) => {
  const myData = useParams();
  const [data, setData] = useState({
    fname: "",
    mname: "",
    lname: "",
    gender: "",
    country: "",
    city: "",
    language: [],
    game: [],
  });
  const [userData, setUserData] = useState([]);
  const [index, setIndex] = useState("");
  const [errors, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [inputModal, setInputModal] = useState({ text: "" });
  const [isInputModal, setIsInputModal] = useState({ text: "" });

  useEffect(() => setIndex(props.uIndex), [props.uIndex]);
  useEffect(() => setUserData(props.tableData), [props.tableData]);
  useEffect(
    () =>
      setData({
        fname: "",
        mname: "",
        lname: "",
        gender: "",
        country: "",
        city: "",
        language: [],
        game: [],
      }),
    []
  );
  useEffect(() => {
    if (myData?.id) {
      axios
        .get("http://localhost:5000/users/get")
        .then((res) => {
          const Dataa = res.data.filter((item) => item._id === myData.id);
          console.log("res.data",res.data);
          console.log("dataa",Dataa);
          setData(Dataa[0]);
          setIndex(myData?.id);
        })
        .catch((err) => {
          console.log("Error");
        });
    }else{
      setIndex("");
    }
  }, []);

  const getTableData = async () => {
    await axios
      .get("http://localhost:5000/users/get")
      .then((res) => {
        setUserData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error");
      });
  };

  const hendleOnChange = (e, language) => {
    const languageData = JSON.parse(JSON.stringify(data.language || []));
    const gameData = JSON.parse(JSON.stringify(data.game || []));
    if (language === "language") {
      if (e.target.checked) {
        languageData.push(e.target.name);
      } else {
        const index = data.language.indexOf(e.target.name);
        languageData.splice(index, 1);
      }
      setData({
        ...data,
        language: languageData,
      });
    } else if (language === "game") {
      if (e.target.checked) {
        gameData.push(e.target.name);
      } else {
        const index = data.game.indexOf(e.target.name);
        gameData.splice(index, 1);
      }
      setData({
        ...data,
        game: gameData,
      });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const formvalidation = (name, value) => {
    switch (name) {
      case "fname":
        if (!value) {
          return "*FirstName is required !";
        } else {
          return "";
        }
      case "mname":
        if (!value) {
          return "*MiddleName is required !";
        } else {
          return "";
        }
      case "lname":
        if (!value) {
          return "*LastName is required !";
        } else {
          return "";
        }
      case "gender":
        if (!value) {
          return "*Gender is required !";
        } else {
          return "";
        }
      case "country":
        if (!value) {
          return "*Country is required !";
        } else {
          return "";
        }
      case "city":
        if (!value) {
          return "*City is required !";
        } else {
          return "";
        }
    }
  };
console.log("index---->",index);
  const hendleOnSubmit = () => {
    let errors = {};
    let object = data;
    Object.keys(object).forEach((key) => {
      const error = formvalidation(key, object[key]);
      if (error && error.length > 0) {
        errors[key] = error;
      }
    });
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    } else {
      setError({});
    }
    if (index === "") {
      axios
        .post("http://localhost:5000/users/create", data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log("err");
        });
    } else {
      axios
        .put(`http://localhost:5000/users/${index}`, data)
        .then((res) => {
          console.log(res.data);
          setIndex("");
        })
        .catch((err) => {
          console.log("err");
        });
    }
    getTableData();
    setData({
      fname: "",
      mname: "",
      lname: "",
      gender: "",
      country: "",
      city: "",
      language: [],
      game: [],
    });
  };

  const table = () => {
    props.navigate("/Rtable");
  };

  const showModal = () => {
    setModalOpen(true);
  };

  const modalChange = (e) => {
    setInputModal({ ...inputModal, [e.target.name]: e.target.value });
  };

  const handleOk = (e) => {
    setModalOpen(false);
    setIsInputModal({ ...inputModal, [e.target.name]: e.target.value });
    setInputModal({ text: "" });
  };

  const handleCancel = () => {
    setModalOpen(false);
    inputModal.reset();
  };

  return (
    <>
      <div className="main">
        <div className="container">
          <h2>{isInputModal.text}</h2>
          <div style={{ margin: 10, marginleft: 20 }}>
            <label>
              <b>First Name : </b>
            </label>
            <input
              type="text"
              name="fname"
              placeholder="Enter Your First Name"
              autoComplete="off"
              value={data?.fname}
              onChange={(e) => hendleOnChange(e)}
            />
            <span style={{ color: "red" }}>{errors && errors.fname}</span>
            <br />
            <label>
              <b>Middle Name : </b>
            </label>
            <input
              type="text"
              name="mname"
              placeholder="Enter Your middle Name"
              autoComplete="off"
              value={data?.mname}
              onChange={(e) => hendleOnChange(e)}
            />
            <span style={{ color: "red" }}>{errors && errors.mname}</span>
            <br />
            <label>
              <b>Last Name : </b>
            </label>
            <input
              type="text"
              name="lname"
              placeholder="Enter Your last Name"
              autoComplete="off"
              value={data?.lname}
              onChange={(e) => hendleOnChange(e)}
            />
            <span style={{ color: "red" }}>{errors && errors.lname}</span>
            <br />
            <lable>
              <b> Select Your Gender : </b>
            </lable>
            <br />
            <label> Male </label>
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              checked={data?.gender === "male"}
              onChange={(e) => hendleOnChange(e)}
            />
            <label> Female </label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              checked={data?.gender === "female"}
              onChange={(e) => hendleOnChange(e)}
            />
            <label> Other </label>
            <input
              type="radio"
              name="gender"
              id="other"
              value="other"
              checked={data?.gender === "other"}
              onChange={(e) => hendleOnChange(e)}
            />
            <span style={{ color: "red" }}>{errors && errors.gender}</span>
            <br />
            <lable>
              <b> Select Your Country : </b>
            </lable>
            <select
              type="selected"
              name="country"
              onChange={(e) => hendleOnChange(e)}
            >
              <option value="" selected={data?.country === ""}>
                Select Your Country
              </option>
              <option value="India" selected={data?.country === "India"}>
                India
              </option>
              <option value="Malaysia" selected={data?.country === "Malaysia"}>
                Malaysia
              </option>
              <option value="Russia" selected={data?.country === "Russia"}>
                Russia
              </option>
              <option
                value="New Zelend"
                selected={data?.country === "New Zelend"}
              >
                New Zelend
              </option>
            </select>
            <span style={{ color: "red" }}>{errors && errors.country}</span>
            <br />
            <label>
              <b> Select Your City : </b>
            </label>
            <select
              type="selected"
              name="city"
              onChange={(e) => hendleOnChange(e)}
            >
              <option value="" selected={data?.city === ""}>
                Select Your City
              </option>
              <option value="Rajkot" selected={data?.city === "Rajkot"}>
                Rajkot
              </option>
              <option value="Surat" selected={data?.city === "Surat"}>
                Surat
              </option>
              <option value="Bharuch" selected={data?.city === "Bharuch"}>
                Bharuch
              </option>
              <option value="Talala" selected={data?.city === "Talala"}>
                Talala
              </option>
            </select>
            <span style={{ color: "red" }}>{errors && errors.city}</span>
            <br />
            <label>
              <b> Select Your Language (Optional) : </b>
            </label>
            <br />
            <Checkbox
              type="checkbox"
              name="English"
              value="English"
              onChange={(e) => hendleOnChange(e, "language")}
              checked={data?.language?.includes("English")}
            />
            English
            <Checkbox
              type="checkbox"
              name="Hindi"
              value="Hindi"
              onChange={(e) => hendleOnChange(e, "language")}
              checked={data?.language?.includes("Hindi")}
            />
            Hindi
            <Checkbox
              type="checkbox"
              name="Gujrati"
              value="Gujrati"
              onChange={(e) => hendleOnChange(e, "language")}
              checked={data?.language?.includes("Gujrati")}
            />
            Gujrati
            <br />
            <label>
              <b> Select Your Favourite Game (Optional) : </b>
            </label>
            <br />
            <Checkbox
              type="checkbox"
              name="BGMI"
              value="BGMI"
              onChange={(e) => hendleOnChange(e, "game")}
              checked={data?.game?.includes("BGMI")}
            />
            BGMI
            <Checkbox
              type="checkbox"
              name="GTA 5"
              value="GTA 5"
              onChange={(e) => hendleOnChange(e, "game")}
              checked={data?.game?.includes("GTA 5")}
            />
            GTA 5
            <Checkbox
              type="checkbox"
              name="Inside"
              value="Inside"
              onChange={(e) => hendleOnChange(e, "game")}
              checked={data?.game?.includes("Inside")}
            />
            Inside
            <br />
            <button className="btn" onClick={() => hendleOnSubmit()}>
              Submit
            </button>
            <button className="btn" onClick={table}>
              Table
            </button>
            <br />
            <Button
              type="primary"
              style={{ marginTop: 10 }}
              onClick={showModal}
            >
              Open Modal
            </Button>
            <Modal
              title="Input Modal"
              open={modalOpen}
              onOk={(e) => handleOk(e)}
              onCancel={handleCancel}
            >
              <input
                autoComplete="off"
                type="text"
                placeholder="Text Here..."
                name="text"
                value={inputModal.text}
                onChange={(e) => modalChange(e)}
              />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    tableData: state.data,
    uEdit: state.UserEdit,
    uIndex: state.UserIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userSubmit: (data) => dispatch(userSubmit(data)),
    userDelete: (data) => dispatch(userDelete(data)),
    UserEdit: (data) => dispatch(userEdit(data)),
    UserIndex: (data) => dispatch(userIndex(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
