using AuctionCenter.CORE.AppServices.HashingAppService;
using AuctionCenter.CORE.Entities;
using AuctionCenter.CORE.InfrastructureCoupling;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Text;

namespace AuctionCenter.CORE.AppServices
{
    public class UserAppService : IUserAppService
    {
        private IUnitOfWork _unitOfWork;
        private IHashingAppService _hashingAppService;

        public UserAppService(IUnitOfWork unitOfWork, IHashingAppService hashingAppService)
        {
            _unitOfWork = unitOfWork;
            _hashingAppService = hashingAppService;
        }
 
        public bool RegisterUser(string email, string password)
        {
            var users = _unitOfWork.Users.GetFiltered(i => i.Email == email.Trim());
            var user = users.FirstOrDefault();
            if(user == null)
            {
                var newHash = _hashingAppService.HashPassword(password);
                var newUser = new Users
                {
                    Email = email,
                    Password = newHash,
                    IsActive = true
                };
                _unitOfWork.Users.Add(newUser);
                _unitOfWork.Commit();
                return true;
            }
            return false;
        }

        public bool VerifyUser(string email, string password)
        {
            var users = _unitOfWork.Users.GetFiltered(i => i.Email == email.Trim());
            var user = users.FirstOrDefault();
            if (user == null) return false;
            var hashPassword = _hashingAppService.HashPassword(password);
            return user.Password == hashPassword;
        }
    }
}
