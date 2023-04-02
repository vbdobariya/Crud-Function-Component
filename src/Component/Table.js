import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { userDelete, userEdit, userIndex } from "../Redux/Action";
import axios from "axios";

function Rtable(props) {
  const [userData, setUserData] = useState([]);

  useEffect(() => setUserData(props.tableData), [props.tableData]);

  useEffect(() => {
    getTableData();
  }, []);

  const getTableData = () => {
    axios
      .get("http://localhost:5000/users/get")
      .then((res) => {
        setUserData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error");
      });
  };

  const EditRow = (dat, i, r) => {
    props.navigate(`/edit/${i._id}`);
  };

  const DeleteRow = (dat, i, r) => {
    axios
      .delete(`http://localhost:5000/users/delete/${i._id}`)
      .then((res) => {
        console.log(res.data);
        getTableData();
      })
      .catch((err) => {
        console.log("Error");
      });
  };

  const GoBack = () => {
    props.navigate("/");
  };

  const onSearch = (e) => {
    if (e.target.value === "") {
      setUserData(props.tableData);
    } else {
      const searchData = userData.filter(
        (Item) =>
          Item.fname.includes(e.target.value) ||
          Item.mname.includes(e.target.value) ||
          Item.lname.includes(e.target.value)
      );
      setUserData(searchData);
    }
  };

  const column = [
    {
      title: "FIRST NAME",
      dataIndex: "fname",
      key: "fname",
    },
    {
      title: "MIDDLE NAME",
      dataIndex: "mname",
      key: "mname",
    },
    {
      title: "LAST NAME",
      dataIndex: "lname",
      key: "lname",
    },
    {
      title: "GENDER",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "COUNTRY",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "CITY",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "LANGUAGE",
      dataIndex: "language",
      key: "language",
      render: (r) => <>{r + ""}</>,
    },
    {
      title: "GAME",
      dataIndex: "game",
      key: "game",
      render: (r) => <>{r + ""}</>,
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      render: (dat, i, r) => (
        <>
          <EditOutlined
            style={{ color: "blue" }}
            onClick={() => EditRow(dat, i, r)}
          />
          <DeleteOutlined
            style={{ color: "red", marginLeft: 3 }}
            onClick={() => DeleteRow(dat, i, r)}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <label style={{ color: "blue" }}>
        <u>
          <b>Search TableData :</b>
        </u>
      </label>
      <input
        style={{ margin: 10, marginleft: 20 }}
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e)}
      />
      <br />
      <Table
        dataSource={userData}
        columns={column}
        pagination={{ pageSize: 10 }}
      />
      <button onClick={GoBack}>Go Back</button>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    tableData: state.data,
    uEdit: state.UserEdit,
    uIndex: state.UserIndex,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    userDelete: (data) => dispatch(userDelete(data)),
    userEdit: (data) => dispatch(userEdit(data)),
    userIndex: (data) => dispatch(userIndex(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rtable);
