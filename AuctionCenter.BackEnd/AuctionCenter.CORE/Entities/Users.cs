using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionCenter.CORE.Entities
{
   public class Users
    {
        public string Email { get; set; }
        public bool IsActive { get; set; }
        public string Password { get; set; }
    }
}
