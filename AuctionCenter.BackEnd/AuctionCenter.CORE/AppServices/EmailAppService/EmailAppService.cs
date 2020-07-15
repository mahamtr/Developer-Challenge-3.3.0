using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionCenter.CORE.AppServices.EmailAppService
{
    public class EmailAppService : IEmailAppService
    {
        private IConfiguration _config;

        public EmailAppService(IConfiguration config)
        {
            _config = config;
        }
        private async void sendEmail()
        {
            var apiKey = Environment.GetEnvironmentVariable("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");
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("test@example.com", "Example User");
            var subject = "Sending with SendGrid is Fun";
            var to = new EmailAddress("test@example.com", "Example User");
            var plainTextContent = "and easy to do anywhere, even with C#";
            var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }
        public async void SendPurchase(string email)
        {
            throw new NotImplementedException();
        }

        public async void SendWelcomeEmail(string email)
        {
            var apiKey = _config["email:apikey"];
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("noreply@AuctionCenter.com", "AuctionCenter");
            var subject = "Sending with SendGrid is Fun";
            var to = new EmailAddress(email);
            var plainTextContent = "and easy to do anywhere, even with C#";
            var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }
    }
}
