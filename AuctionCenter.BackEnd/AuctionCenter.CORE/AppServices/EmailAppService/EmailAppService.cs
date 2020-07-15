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
        private async void sendEmail(EmailAddress to, string subject, string plainTextContent,string htmlContent)
        {
            var apiKey = _config["email:apikey"];
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("maai.ham@catelsa.hn", "Maai Ham Auction Center");
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);

        }
        public async void SendPurchase(string email)
        {
            throw new NotImplementedException();
        }

        public async void SendWelcomeEmail(string email)
        {
            var subject = "Welcome to Auction Center";
            var to = new EmailAddress(email);
            var plainTextContent = "Hi " + email + " we are glad to have you in our new Auction Center App";
            var htmlContent = "<strong>Hi " + email + " we are glad to have you in our new Auction Center App</strong>";
            sendEmail(to, subject, plainTextContent, htmlContent);
        }
    }
}
