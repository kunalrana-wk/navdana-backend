function generateEmailTemplate(otp) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f7;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #fff;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
      }
      h1 {
        color: #4CAF50;
      }
      p {
        font-size: 16px;
        line-height: 1.5;
      }
      .otp {
        display: inline-block;
        margin: 20px 0;
        padding: 15px 25px;
        font-size: 24px;
        font-weight: bold;
        color: #fff;
        background-color: #4CAF50;
        border-radius: 6px;
        letter-spacing: 3px;
      }
      .footer {
        font-size: 12px;
        color: #777;
        margin-top: 30px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Email Verification</h1>
      <p>Hi there,</p>
      <p>Thank you for registering. Please use the following OTP to verify your email address:</p>
      <div class="otp">${otp}</div>
      <p>This OTP is valid for the next 10 minutes. Do not share it with anyone.</p>
      <p>Thanks,<br/>The Team</p>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
}

module.exports = generateEmailTemplate;
