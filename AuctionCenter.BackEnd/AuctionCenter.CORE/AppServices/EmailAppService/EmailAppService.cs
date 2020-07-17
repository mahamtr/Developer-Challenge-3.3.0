using AuctionCenter.CORE.Entities;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

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
        public async void SendPurchaseEmail(string email,List<SaleItems> items)
        {
            var subject = "Thanks for your purchase, the following items will be shipped to you:";
            var plainTextContent = "Hi " + email + " we are glad about your purchase";
            var htmlContent = "<strong>Hi " + email + " we are glad about your purchase</strong>";
            var itemNumer = 1;
            var to = new EmailAddress(email);
            foreach (var item in items)
            {
                var address = await GetAddressByZipCode(item);
                var city = address.places.FirstOrDefault().PlaceName;
                var country = address.Country;
                var lat = address.places.FirstOrDefault().latitude;
                var lon = address.places.FirstOrDefault().longitude;

                plainTextContent += $"\n Item #{itemNumer} : {item.ItemName} ships from {city},{country},{item.ZipCode} with coordinates lat:{lat} lon:{lon}";
                htmlContent += $"<br/><p>Item #{itemNumer} : {item.ItemName} ships from {city},{country},{item.ZipCode} with coordinates lat:{lat} lon:{lon}</p>";
                itemNumer += 1;
            }
            sendEmail(to, subject, plainTextContent, htmlContent);

        }

        private static async Task<ZipToAddressResponse> GetAddressByZipCode(SaleItems item)
        {
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync("http://api.zippopotam.us/us/" + item.ZipCode);
                string responseBody = await response.Content.ReadAsStringAsync();
                var result = JsonConvert.DeserializeObject<ZipToAddressResponse>(responseBody);
                return result;
            }
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
