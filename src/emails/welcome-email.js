module.exports = function welcomeEmailTemplate(firstName) {
  return `
    <!DOCTYPE html>
    <html>
    <body style="font-family:Arial,sans-serif;background:#f6f6f6;padding:20px;">
      <div style="max-width:600px;margin:auto;background:#fff;padding:20px;border-radius:10px;">
        <h2>🎉 Welcome, ${firstName}!</h2>
        <p>
          We’re excited to have you onboard. Your account has been created successfully!
        </p>
        <p>
          Explore amazing products, enjoy exclusive discounts, and track your orders seamlessly.
        </p>
        <a href="http://localhost:3000/dashboard" 
           style="display:inline-block;margin-top:20px;padding:12px 20px;background:#4CAF50;color:#fff;text-decoration:none;border-radius:6px;">
           Go to Dashboard
        </a>
        <p style="margin-top:20px;font-size:12px;color:#777;">
          © ${new Date().getFullYear()} Our Store. All rights reserved.
        </p>
      </div>
    </body>
    </html>
  `;
};
