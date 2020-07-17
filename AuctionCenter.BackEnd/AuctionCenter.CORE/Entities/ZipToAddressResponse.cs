using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionCenter.CORE.Entities
{
    public class ZipToAddressResponse
    {
        [JsonProperty(PropertyName = "post code")]
        public string PostCode { get; set; }
        [JsonProperty(PropertyName = "country")]
        public string Country { get; set; }
        public List<Place> places { get; set; }

    }

    public class Place
    {
        [JsonProperty(PropertyName = "place name")]

        public string PlaceName { get; set; }
        public string longitude { get; set; }
        public string state { get; set; }
        public string latitude { get; set; }

    }
}
