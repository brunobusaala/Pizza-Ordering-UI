import React, { useEffect, useState } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { hover } from "@testing-library/user-event/dist/hover";
import { useNavigate } from "react-router-dom";

const DeletePizza = () => {
  let [pizza, setPizza] = useState([]);
  let [status, setStatus] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    axios.get("https://localhost:7098/Api/Pizza").then((response) => {
      setPizza(response.data);
    });
  }, [pizza]);

  const handleEdit = () => {
    navigate("/editpizza");
  };

  const Delete = async (pizzas) => {
    let { id } = pizzas;
    try {
      await axios.delete(`https://localhost:7098/Api/Pizza/DeletePizza${id}`);

      setStatus("success");
      setTimeout(() => {
        setStatus("");
      }, 1100);
    } catch (error) {
      setStatus("fail");
      setTimeout(() => {
        setStatus("");
      }, 1100);
    }
  };

  return (
    <div>
      {status === "success" && (
        <Alert variant="success">Deleted Successfully!</Alert>
      )}
      {status === "fail" && (
        <Alert variant="danger">Operation unsuccessfull!</Alert>
      )}

      <Table bordered variant="white">
        <thead>
          <tr>
            <th>Guid</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        {pizza.map((pizzas) => {
          let { id, sizeID, name, description, price, imageName } = pizzas;
          return (
            <tbody key={id}>
              <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{price}</td>
                <td>{imageName}</td>
                <td className="btn">
                  <Button onClick={handleEdit} className="btn btn-secondary">
                    Edit
                  </Button>
                </td>
                <td className="btns">
                  <Button
                    onClick={() => Delete(pizzas)}
                    className="btn btn-danger"
                  >
                    Del
                  </Button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
};

export default DeletePizza;
