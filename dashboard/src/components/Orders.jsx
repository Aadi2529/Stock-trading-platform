import { useEffect, useState } from "react";
import axios from "axios";

const Orders = ({ refreshTrigger }) => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/trade/orders/${userId}`
        );
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err.message);
      }
    };

    fetchOrders();
  }, [userId, refreshTrigger]);

  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <p>No orders placed yet.</p>
      </div>
    );
  }

  return (
    <div className="text-white">

      <h2 className="text-2xl font-semibold mb-6">
        Orders ({orders.length})
      </h2>

      <div className="bg-[#1e293b] border border-gray-700 rounded-xl overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-[#0f172a] border-b border-gray-700">
            <tr className="text-left text-gray-400">
              <th className="p-4">Instrument</th>
              <th className="p-4">Qty</th>
              <th className="p-4">Price</th>
              <th className="p-4">Type</th>
              <th className="p-4">Realized P&L</th>
              <th className="p-4">Time</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b border-gray-800 hover:bg-white/5 transition"
              >
                <td className="p-4 font-medium">
                  {order.symbol}
                </td>

                <td className="p-4">
                  {order.quantity}
                </td>

                <td className="p-4">
                  ₹{Number(order.price).toFixed(2)}
                </td>

                <td
                  className={`p-4 font-semibold ${
                    order.type === "BUY"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {order.type}
                </td>

                <td
                  className={`p-4 font-semibold ${
                    order.realizedProfit >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  ₹{Number(order.realizedProfit || 0).toFixed(2)}
                </td>

                <td className="p-4 text-gray-400 text-xs">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
};

export default Orders;