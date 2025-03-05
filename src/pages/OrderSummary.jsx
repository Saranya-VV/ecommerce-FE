import { useSelector } from "react-redux";
import "./OrderSummary.css"; // Import a CSS file for custom styling

const OrderSummary = () => {
  const userId = useSelector((state) => state.user);
  const orderDetails = useSelector((state) => state.product?.paymentInfo);

  if (!orderDetails?.orders || orderDetails.orders.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="order-summary">
      <h2 className="summary-title">Order Summary</h2>
      {orderDetails.orders.map((order) => (
        <div key={order.id} className="order-card">
          <h3 className="order-id">Order ID: {order.sessionId}</h3>
          <p className="order-status">
            Status: {orderDetails.success ? "Paid" : "Unpaid"}
          </p>
          <p className="order-amount">
            Payment Amount: ${order.totalAmount / 100}
          </p>

          <div className="items-list">
            {order.lineItems.map((item) => (
              <div key={item.id} className="item-card">
                <img
                  className="item-image"
                  src={item.price_data?.product_data?.images?.[0]}
                  alt="productImg"
                />
                <div className="item-details">
                  <p className="item-name">
                    <strong>Name:</strong> {item.price_data?.product_data?.name}
                  </p>
                  <p className="item-description">
                    <strong>Description:</strong> {item.price_data?.product_data?.description}
                  </p>
                  <p className="item-quantity">
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p className="item-price">
                    <strong>Price:</strong> ${item.price_data?.unit_amount / 100}{" "}
                    {item.price_data?.currency.toUpperCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderSummary;
