function generateEmailTemplate(otp) {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Navdana OTP Verification</title>
    <!-- Fonts are handled differently for email clients. -->
</head>
<body style="font-family: 'Inter', sans-serif; background-color: #FDF9F8; color: #333333; margin: 0; padding: 0;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
            <td style="padding: 24px; text-align: center;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: auto;">
                    <tr>
                        <td style="background-color: #ffffff; padding: 40px; border-radius: 24px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); text-align: center;">
                            
                            <!-- Header Section -->
                            <h1 style="font-size: 36px; line-height: 40px; font-weight: 700; margin-bottom: 8px;">
                                <span style="font-family: 'Dancing Script', cursive; color: #EC4899;">Navdana</span>
                            </h1>
                            <h2 style="font-size: 18px; line-height: 28px; color: #6B7280; margin-bottom: 24px;">Your One-Time Password</h2>
    
                            <!-- Main Content Section -->
                            <p style="font-size: 16px; line-height: 24px; color: #4B5563; margin: 0 auto 24px auto;">
                                Hi there,
                            </p>
                            <p style="font-size: 16px; line-height: 24px; color: #4B5563; margin: 0 auto 32px auto;">
                                Please use the following code to complete your verification process. This code is valid for 5 minutes.
                            </p>
    
                            <!-- OTP Code Block -->
                            <div style="background-color: #F3F4F6; padding: 24px; border-radius: 16px; border: 2px dashed #D1D5DB; display: inline-block; margin-bottom: 32px;">
                                <span style="font-size: 48px; line-height: 1; font-weight: 900; letter-spacing: 0.1em; color: #EC4899; word-wrap: break-word;">
                                    ${otp}
                                </span>
                            </div>
                            
                            <!-- Footer Information -->
                            <p style="font-size: 12px; line-height: 16px; color: #9CA3AF; margin-top: 16px;">
                                If you did not request this, please ignore this email.
                            </p>
    
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>

  `;
}

module.exports = generateEmailTemplate;
