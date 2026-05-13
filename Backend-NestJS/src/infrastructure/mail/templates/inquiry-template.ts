export const getInquiryTemplate = (unreadCount: number) => `
  <div style="font-family: 'Helvetica', sans-serif; background-color: #f9fafb; padding: 50px 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #e5e7eb;">
      <div style="background: #0ea5e9; padding: 30px; text-align: center;">
        <span style="font-size: 40px;">✉️</span>
      </div>
      <div style="padding: 40px; text-align: center;">
        <h2 style="color: #111827; margin-bottom: 16px;">New Inquiries Waiting</h2>
        <p style="color: #4b5563; font-size: 16px; line-height: 24px;">
          You have <strong>${unreadCount}</strong> new unread messages in your community center.
        </p>
        <a href="https://tourvistatours.com/dashboard/admin" 
           style="display: inline-block; margin-top: 30px; padding: 14px 28px; background-color: #0ea5e9; color: #ffffff; border-radius: 10px; text-decoration: none; font-weight: 600;">
           Open Admin Center
        </a>
      </div>
    </div>
  </div>
`;
