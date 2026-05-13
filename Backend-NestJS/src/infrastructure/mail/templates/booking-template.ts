export const getBookingTemplate = (data: any) => `
  <div style="font-family: 'Helvetica', sans-serif; background-color: #f0fdf4; padding: 50px 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #dcfce7; overflow: hidden;">
      <div style="background: #10b981; padding: 20px; text-align: center; color: white;">
        <h2 style="margin: 0;">🎒 New Reservation!</h2>
      </div>
      <div style="padding: 30px;">
        <p style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Booking Details</p>
        <h3 style="color: #111827; border-bottom: 1px solid #f3f4f6; padding-bottom: 15px;">${data.tourTitle}</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr><td style="padding: 8px 0; color: #6b7280;">Customer</td><td style="text-align: right; font-weight: 600;">${data.userName}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Travel Date</td><td style="text-align: right; font-weight: 600;">${new Date(data.travelDate).toLocaleDateString()}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Guests</td><td style="text-align: right; font-weight: 600;">${data.paxCount}</td></tr>
        </table>
        <div style="margin-top: 30px; padding: 20px; background: #f0fdf4; border-radius: 12px; text-align: center;">
          <span style="color: #15803d; font-size: 20px; font-weight: 700;">Total Paid: $${data.amount}</span>
        </div>
      </div>
    </div>
  </div>
`;
