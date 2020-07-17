using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuctionCenter.CORE.AppServices.SaleItemsAppService;
using AuctionCenter.CORE.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuctionCenter.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleItemsController : ControllerBase
    {
        private ISaleItemsAppService _saleItemsAppService;

        public SaleItemsController(ISaleItemsAppService saleItemsAppService)
        {
            _saleItemsAppService = saleItemsAppService;
        }
        [Authorize]
        [Route("getAll")]
        [HttpGet]
        public IActionResult GetAll([FromQuery]SaleItemsRequest request)
        {
            return Ok(_saleItemsAppService.GetAllSaleItems());
        }

        [Authorize]
        [Route("getByCategory")]
        [HttpGet]
        public IActionResult GetByCategory([FromQuery]SaleItemsRequest request)
        {
            return Ok(_saleItemsAppService.GetSaleItemsByCategory(request.Category));
        }

    }
}