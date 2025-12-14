import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SocketContext from "../context/SocketContext";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3002/allOrders", token ? { headers: { Authorization: `Bearer ${token}` } } : {})
      .then((res) => {
        setAllOrders(res.data);
      })
      .catch((err) => {
        console.warn("Failed to fetch orders:", err.message);
      });
  }, []);

  useEffect(() => {
    const handleLocal = (e) => {
      const order = e.detail;
      setAllOrders((prev) => [order, ...prev]);
    };

    window.addEventListener("localOrderCreated", handleLocal);
    return () => window.removeEventListener("localOrderCreated", handleLocal);
  }, []);

  // Socket updates for real-time orders
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return;

    const currentUser = JSON.parse(localStorage.getItem("user") || "null");

    const handleOrderCreated = (order) => {
      // If order has userId and it doesn't match current user, ignore
      if (order.userId && currentUser && String(order.userId) !== String(currentUser.id)) return;
      setAllOrders((prev) => [order, ...prev]);
    };

    const handleOrderUpdated = (order) => {
      if (order.userId && currentUser && String(order.userId) !== String(currentUser.id)) return;
      setAllOrders((prev) => prev.map((o) => (o._id === order._id ? order : o)));
    };

    socket.on("orderCreated", handleOrderCreated);
    socket.on("orderUpdated", handleOrderUpdated);

    return () => {
      socket.off("orderCreated", handleOrderCreated);
      socket.off("orderUpdated", handleOrderUpdated);
    };
  }, [socket]);

  if (allOrders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>

          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders">
      <h3 className="title">Orders ({allOrders.length})</h3>
      <div className="order-table table-responsive">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Mode</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order, index) => {
            const modeClass = order.mode === "BUY" ? "buy-mode" : "sell-mode";
            const status = order.status || "PENDING";
            return (
              <tr key={order._id || index}>
                <td>{order.name}</td>
                <td>{order.qty}</td>
                <td>{Number(order.price).toFixed(2)}</td>
                <td className={modeClass}>{order.mode}</td>
                <td className={status === "EXECUTED" ? "status-executed" : "status-pending"}>
                  {status === "EXECUTED" ? "Executed" : "Pending"}
                </td>
              </tr>
            );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
