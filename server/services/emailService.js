const winston = require('winston');

// Email service functions
// In production, you would integrate with a real email service like SendGrid, AWS SES, etc.

const sendWelcomeEmail = async (email, name) => {
  try {
    // Simulate email sending
    winston.info(`Welcome email sent to ${email} for user ${name}`);
    
    // In production, you would use:
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send({
    //   to: email,
    //   from: process.env.EMAIL_FROM,
    //   subject: 'Welcome to CRMONCE!',
    //   html: `<h1>Welcome ${name}!</h1><p>Thank you for joining CRMONCE...</p>`
    // });
    
    return { success: true, message: 'Welcome email sent successfully' };
  } catch (error) {
    winston.error('Error sending welcome email:', error);
    throw error;
  }
};

const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    
    // Simulate email sending
    winston.info(`Password reset email sent to ${email} with token: ${resetToken}`);
    
    // In production, you would use:
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send({
    //   to: email,
    //   from: process.env.EMAIL_FROM,
    //   subject: 'Password Reset Request - CRMONCE',
    //   html: `
    //     <h1>Password Reset Request</h1>
    //     <p>You requested a password reset. Click the link below to reset your password:</p>
    //     <a href="${resetUrl}">Reset Password</a>
    //     <p>This link will expire in 1 hour.</p>
    //     <p>If you didn't request this, please ignore this email.</p>
    //   `
    // });
    
    return { success: true, message: 'Password reset email sent successfully' };
  } catch (error) {
    winston.error('Error sending password reset email:', error);
    throw error;
  }
};

const sendLeadNotificationEmail = async (email, name, company, interest, requirements) => {
  try {
    // Simulate email sending
    winston.info(`Lead notification email sent to ${email} for ${name} from ${company}`);
    
    // In production, you would use:
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send({
    //   to: email,
    //   from: process.env.EMAIL_FROM,
    //   subject: 'Thank you for your interest in CRMONCE!',
    //   html: `
    //     <h1>Thank you ${name}!</h1>
    //     <p>We've received your inquiry about ${interest}.</p>
    //     <p>Our team will review your requirements and contact you within 24 hours.</p>
    //     <p>Company: ${company}</p>
    //     <p>Requirements: ${requirements || 'Not specified'}</p>
    //     <p>Best regards,<br>The CRMONCE Team</p>
    //   `
    // });
    
    return { success: true, message: 'Lead notification email sent successfully' };
  } catch (error) {
    winston.error('Error sending lead notification email:', error);
    throw error;
  }
};

const sendAdminLeadNotification = async (leadData) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@crmonce.com';
    
    // Simulate email sending
    winston.info(`Admin lead notification sent to ${adminEmail} for lead: ${leadData.email}`);
    
    // In production, you would use:
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send({
    //   to: adminEmail,
    //   from: process.env.EMAIL_FROM,
    //   subject: 'New Lead Generated - CRMONCE',
    //   html: `
    //     <h1>New Lead Generated</h1>
    //     <p><strong>Name:</strong> ${leadData.name}</p>
    //     <p><strong>Email:</strong> ${leadData.email}</p>
    //     <p><strong>Company:</strong> ${leadData.company}</p>
    //     <p><strong>Interest:</strong> ${leadData.interest}</p>
    //     <p><strong>Requirements:</strong> ${leadData.requirements || 'Not specified'}</p>
    //     <p><strong>Source:</strong> ${leadData.source}</p>
    //     <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
    //   `
    // });
    
    return { success: true, message: 'Admin lead notification sent successfully' };
  } catch (error) {
    winston.error('Error sending admin lead notification:', error);
    throw error;
  }
};

const sendAppointmentConfirmationEmail = async (email, name, date, time, timezone, type) => {
  try {
    // Simulate email sending
    winston.info(`Appointment confirmation email sent to ${email} for ${name} on ${date} at ${time} ${timezone}`);
    
    // In production, you would use:
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send({
    //   to: email,
    //   from: process.env.EMAIL_FROM,
    //   subject: 'Appointment Confirmed - CRMONCE',
    //   html: `
    //     <h1>Appointment Confirmed</h1>
    //     <p>Dear ${name},</p>
    //     <p>Your appointment has been successfully scheduled:</p>
    //     <ul>
    //       <li><strong>Type:</strong> ${type}</li>
    //       <li><strong>Date:</strong> ${date}</li>
    //       <li><strong>Time:</strong> ${time} ${timezone}</li>
    //     </ul>
    //     <p>You will receive a calendar invitation shortly.</p>
    //     <p>If you need to reschedule, please contact us at least 24 hours in advance.</p>
    //     <p>Best regards,<br>The CRMONCE Team</p>
    //   `
    // });
    
    return { success: true, message: 'Appointment confirmation email sent successfully' };
  } catch (error) {
    winston.error('Error sending appointment confirmation email:', error);
    throw error;
  }
};

const sendFileUploadNotification = async (email, name, files, leadId) => {
  try {
    // Simulate email sending
    winston.info(`File upload notification sent to ${email} for ${name} with ${files.length} files`);
    
    // In production, you would use:
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send({
    //   to: email,
    //   from: process.env.EMAIL_FROM,
    //   subject: 'Files Received - CRMONCE',
    //   html: `
    //     <h1>Files Received</h1>
    //     <p>Dear ${name},</p>
    //     <p>We have received your uploaded files:</p>
    //     <ul>
    //       ${files.map(file => `<li>${file.name} (${file.size} bytes)</li>`).join('')}
    //     </ul>
    //     <p>Our team will review these files and get back to you within 24 hours.</p>
    //     <p>Best regards,<br>The CRMONCE Team</p>
    //   `
    // });
    
    return { success: true, message: 'File upload notification sent successfully' };
  } catch (error) {
    winston.error('Error sending file upload notification:', error);
    throw error;
  }
};

module.exports = {
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendLeadNotificationEmail,
  sendAdminLeadNotification,
  sendAppointmentConfirmationEmail,
  sendFileUploadNotification
}; 