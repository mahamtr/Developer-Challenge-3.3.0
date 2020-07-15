using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AuctionCenter.CORE.Entities
{
    public class UserRequestInfo
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(16, ErrorMessage = "The password must be between 8 and 16 chars long", MinimumLength = 8)]
        public string Password { get; set; }
    }
}
