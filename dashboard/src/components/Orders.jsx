import { useEffect, useState, useMemo } from "react";
import axios from "axios";

const Orders = ({ refreshTrigger }) => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const userId = useMemo(() => localStorage.getItem("userId"), []);
  const token = useMemo(() => localStorage.getItem("token"), []);

  useEffect(() => {

    if (!userId || !BACKEND_URL) return;

    const controller = new AbortController();

    const fetchOrders = async () => {

      try {

        setLoading(true);

        const res = await axios.get(
          `${BACKEND_URL}/trade/orders/${userId}`,
          {
            headers: token
              ? { Authorization: `Bearer ${token}` }
              : {},
            signal: controller.signal
          }
        );

        setOrders(res.data || []);
        setError(null);

      } catch (err) {

        if (err.name !== "CanceledError") {
          setError("Failed to fetch orders");
        }

      } finally {

        setLoading(false);

      }

    };

    fetchOrders();

    return () => controller.abort();

  }, [userId, refreshTrigger, BACKEND_URL, token]);



  /* ===== Sort Latest First ===== */

  const sortedOrders = useMemo(() => {

    return [...orders].sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    );

  }, [orders]);



  /* ===== Loading UI ===== */

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-6 w-40 bg-gray-700 rounded"></div>
        <div className="h-64 bg-[#1e293b] rounded-xl"></div>
      </div>
    );
  }



  /* ===== Error UI ===== */

  if (error) {
    return (
      <div className="text-red-400 bg-red-500/10 p-4 rounded-lg border border-red-500/30">
        {error}
      </div>
    );
  }



  /* ===== Empty State ===== */

  if (sortedOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <p className="text-lg">No orders yet</p>
        <p className="text-sm mt-2">
          Start trading to see your activity here
        </p>
      </div>
    );
  }



  return (

    <div className="text-white space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <h2 className="text-xl sm:text-2xl font-semibold">
          Orders ({sortedOrders.length})
        </h2>

      </div>



      {/* Table */}

      <div className="bg-[#1e293b] border border-gray-700 rounded-xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="min-w-[700px] w-full text-sm">

            <thead className="bg-[#0f172a] border-b border-gray-700 sticky top-0">

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

              {sortedOrders.map((order) => {

                const pnl = order.realizedProfit || 0;

                const pnlColor =
                  pnl >= 0 ? "text-green-400" : "text-red-400";

                const orderColor =
                  order.type === "BUY"
                    ? "text-green-400"
                    : "text-red-400";

                const formattedTime = order.createdAt
                  ? new Date(order.createdAt).toLocaleString()
                  : "-";

                return (

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

                    <td className={`p-4 font-semibold ${orderColor}`}>
                      {order.type}
                    </td>

                    <td className={`p-4 font-semibold ${pnlColor}`}>
                      ₹{Number(pnl).toFixed(2)}
                    </td>

                    <td className="p-4 text-gray-400 text-xs whitespace-nowrap">
                      {formattedTime}
                    </td>

                  </tr>

                );

              })}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

};

export default Orders;