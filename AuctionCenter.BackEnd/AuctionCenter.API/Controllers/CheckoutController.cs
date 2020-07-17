using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuctionCenter.CORE.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuctionCenter.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckoutController : ControllerBase
    {
        public CheckoutController()
        {

        }

        [Authorize]
        [HttpPost]
        public IActionResult GetAll([FromBody]CheckoutRequest request)
        {
            return Ok();
        }
    }
}