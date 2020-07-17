using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AuctionCenter.CORE.AppServices.CheckoutAppService;
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
        private ICheckoutAppService _checkOutAppService;

        public CheckoutController(ICheckoutAppService checkoutAppService)
        {
            _checkOutAppService = checkoutAppService;
        }

        [Authorize]
        [HttpPost]
        public IActionResult GetAll([FromBody]CheckoutRequest request)
        {
        
            return Ok(_checkOutAppService.Checkout(request.Email,request.Items));
        }
    }
}