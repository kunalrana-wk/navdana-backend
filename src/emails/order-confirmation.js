function orderConfirmationTemplate(order) {
  // Calculate totals in case backend doesn’t
  const itemsPrice = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxPrice = order.prices?.taxPrice || 0;
  const shippingPrice = order.prices?.shippingPrice || 0;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
    <!-- Header -->
    <div style="background: #000; color: #fff; padding: 20px; text-align: center;">
      <h1 style="margin: 0;">Order Confirmation</h1>
      <p style="margin: 5px 0;">Thank you for shopping with us!</p>
    </div>

    <!-- Order Details -->
    <div style="padding: 20px;">
      <h2 style="margin-top: 0;">Hi ${order.shippingAddress.fullName},</h2>
      <p>Your order <b>#${order._id}</b> has been placed successfully.</p>

      <h3>Order Summary</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Product</th>
            <th style="text-align: center; padding: 8px; border-bottom: 1px solid #ddd;">Qty</th>
            <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${order.items
            .map(
              (item) => `
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
              <td style="padding: 8px; text-align: center; border-bottom: 1px solid #ddd;">${item.quantity}</td>
              <td style="padding: 8px; text-align: right; border-bottom: 1px solid #ddd;">₹${item.price * item.quantity}</td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>

      <!-- Prices -->
      <div style="margin-top: 20px;">
        <p><b>Items Price:</b> ₹${itemsPrice}</p>
        <p><b>Tax:</b> ₹${taxPrice}</p>
        <p><b>Shipping:</b> ₹${shippingPrice}</p>
        <h3>Total: ₹${totalPrice}</h3>
      </div>

      <!-- Shipping -->
      <div style="margin-top: 20px;">
        <h3>Shipping Address</h3>
        <p>
          ${order.shippingAddress.fullName}<br/>
          ${order.shippingAddress.address}, ${order.shippingAddress.city}<br/>
          ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}<br/>
          Phone: ${order.shippingAddress.phone}
        </p>
      </div>

      <!-- Payment -->
      <div style="margin-top: 20px;">
        <h3>Payment Method</h3>
        <p>${order.paymentMethod}</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #f8f8f8; padding: 15px; text-align: center; font-size: 14px; color: #555;">
      <p>If you have any questions, contact our support team.</p>
      <p>© ${new Date().getFullYear()} Your Store. All rights reserved.</p>
    </div>
  </div>
  `;
}
