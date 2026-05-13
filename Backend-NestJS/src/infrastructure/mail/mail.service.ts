import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

interface BookingsEmail {
  tourTitle: string;
  userName: string;
  travelDate: Date;
  paxCount: number;
  amount: number;
}

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: process.env.MAIL_PORT === '587',
      family: 4,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    } as nodemailer.TransportOptions);
  }

  /**
   * INQUIRY ALERT: GENERIC REMINDER ONLY
   */
  async sendInquiryAlert(unreadCount: number = 1) {
    try {
      await this.transporter.sendMail({
        from: `"Tourvista Alerts" <${process.env.MAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `🔔 Unread Messages Alert`,
        html: `
          <div style="font-family: sans-serif; text-align: center; padding: 40px; border: 1px solid #e2e8f0; border-radius: 2rem;">
            <div style="font-size: 48px; margin-bottom: 20px;">✉️</div>
            <h2 style="color: #1e293b;">You have ${unreadCount} new unread messages</h2>
            <p style="color: #64748b;">Please log in to your Admin Dashboard to view and respond to the latest customer inquiries.</p>
            <a href="https://tourvistatours.com/dashboard/admin/community-center/inquiries" 
               style="display: inline-block; margin-top: 20px; padding: 12px 24px; background: #0ea5e9; color: white; border-radius: 12px; text-decoration: none; font-weight: bold;">
               Go to Dashboard
            </a>
          </div>
        `,
      });
    } catch (error: any) {
      this.logger.error(
        `Inquiry alert failed'', ${error.message}`,
        error.stack,
      );
    }
  }

  /**
   * BOOKING NOTIFICATION: FULL DETAILS
   */
  async sendBookingDetail(bookingData: BookingsEmail) {
    try {
      await this.transporter.sendMail({
        from: `"Tourvista Bookings" <${process.env.MAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `🎒 New Booking: ${bookingData.tourTitle}`,
        html: `
          <div style="font-family: sans-serif; border: 1px solid #e2e8f0; border-radius: 1.5rem; overflow: hidden;">
            <div style="background: #10b981; color: white; padding: 20px; text-align: center;">
              <h2 style="margin: 0;">Reservation Confirmed!</h2>
            </div>
            <div style="padding: 30px;">
              <h3 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">Booking Details</h3>
              <p><strong>Customer:</strong> ${bookingData.userName}</p>
              <p><strong>Tour:</strong> ${bookingData.tourTitle}</p>
              <p><strong>Date:</strong> ${new Date(bookingData.travelDate).toLocaleDateString()}</p>
              <p><strong>Guests:</strong> ${bookingData.paxCount}</p>
              <div style="margin-top: 20px; padding: 15px; background: #ecfdf5; border-radius: 10px; border: 1px solid #d1fae5;">
                <p style="margin: 0; color: #065f46; font-weight: bold;">Total Paid: $${bookingData.amount}</p>
              </div>
            </div>
          </div>
        `,
      });
    } catch (error: any) {
      this.logger.error(
        `Booking notification failed: ${error.message}`,
        error.stack,
      );
    }
  }
}
