﻿using BroadbandZone_App.Enums;
using BroadbandZone_App.Helper;
using BroadbandZone_App.Models;
using BroadbandZone_Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Web;
using System.Web.Http;
using DropdownItem = BroadbandZone_App.Models.DropdownItem;

namespace BroadbandZone_App.WebApi
{
    //[Authorize]
    public class DropdownController : ApiController
    {
        //private AuthenticatedUser currentUser;
        //public DropdownController()
        //{
        //    currentUser = UserIdentityHelper.GetLoginAccountFromToken((ClaimsIdentity)this.User.Identity);
        //}

        [Route("api/Dropdown/GetDocStatus")]
        // GET api/<controller>
        public IHttpActionResult GetDocStatus()
        {
            try
            {
                List<DropdownItem> dropdownItems = new List<DropdownItem>();
                dropdownItems.Add(new DropdownItem { Key = "true", Value = "Yes" });
                dropdownItems.Add(new DropdownItem { Key = "false", Value = "No" });
                return Ok(dropdownItems);
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Route("api/Dropdown/GetProductsWithImage")]
        // GET api/<controller>
        public IHttpActionResult GetProductsWithImage()
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    var results = db.Products.Where(pc => pc.IsActive == true).ToList();
                    List<ProductOption> dropdownItems = results.Select(r => new ProductOption
                                                                                {
                                                                                    ProductId = r.ProductId.ToString(),
                                                                                    ProductName = r.ProductName,
                                                                                    ProductImgPath = $"/images/{r.ProductName}.png",
                                                                                    ImageExisted = File.Exists(HttpContext.Current.Server.MapPath($"/images/{r.ProductName}.png"))
                                                                                }).ToList();
                    
                    return Ok(dropdownItems);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Route("api/Dropdown/GetProducts")]
        // GET api/<controller>
        public IHttpActionResult GetProducts()
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    List<DropdownItem> dropdownItems = db.Products.Where(pc => pc.IsActive == true)
                                                                           .Select(r => new DropdownItem { Key = r.ProductId.ToString(), Value = r.ProductName }).ToList();

                    return Ok(dropdownItems);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Route("api/Dropdown/GetCategories")]
        public IHttpActionResult GetCategories()
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    List<DropdownItem> dropdownItems = db.ProductCategories.Where(pc => pc.IsActive == true)
                                                                         .Select(r => new DropdownItem
                                                                         {
                                                                             Key = r.CategoryId.ToString(),
                                                                             Value = r.Category,
                                                                             ParentId = r.Product.ProductId.ToString()
                                                                         }).ToList();

                    return Ok(dropdownItems);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Route("api/Dropdown/GetProductPackages")]
        public IHttpActionResult GetProductPackages()
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    List<DropdownItem> dropdownItems = db.ProductPackages.Where(pc => pc.IsActive == true)
                                                                         .Select(r => new DropdownItem { Key = r.ProdPkgId.ToString(),
                                                                                                         Value = r.PackageName,
                                                                                                         ParentId = r.ProductCategory.CategoryId.ToString() }).ToList();

                    return Ok(dropdownItems);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Route("api/Dropdown/GetCategoriesByProduct/{id}")]
        public IHttpActionResult GetCategoriesByProduct(int id)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    List<DropdownItem> dropdownItems = db.ProductCategories.Where(pc => pc.IsActive == true && pc.ProductId == id)
                                                                         .Select(r => new DropdownItem
                                                                         {
                                                                             Key = r.CategoryId.ToString(),
                                                                             Value = r.Category,
                                                                             ParentId = id.ToString()
                                                                         }).ToList();

                    return Ok(dropdownItems);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Route("api/Dropdown/GetPackagesByCategory/{id}")]
        public IHttpActionResult GetPackagesByCategory(int id)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    List<DropdownItem> dropdownItems = db.ProductPackages.Where(pc => pc.IsActive == true && pc.CategoryId == id)
                                                                         .Select(r => new DropdownItem
                                                                         {
                                                                             Key = r.ProdPkgId.ToString(),
                                                                             Value = r.Description,
                                                                             ParentId = r.ProductCategory.CategoryId.ToString()
                                                                         }).ToList();

                    return Ok(dropdownItems);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Route("api/Dropdown/GetStates")]
        public IHttpActionResult GetStates()
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    string[] states = { "Johor",
                                        "Kedah",
                                        "Kelantan",
                                        "Kuala Lumpur",
                                        "Labuan",
                                        "Melaka",
                                        "Negeri Sembilan",
                                        "Pahang",
                                        "Perak",
                                        "Perlis",
                                        "Pulau Pinang",
                                        "Putrajaya",
                                        "Sabah",
                                        "Sarawak",
                                        "Selangor",
                                        "Terengganu"
                                        };
                    List<DropdownItem> dropdownItems = states .Select(r => new DropdownItem { Key = r, Value = r }).ToList();
                    return Ok(dropdownItems);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Authorize]
        [Route("api/Dropdown/GetAgents")]
        public IHttpActionResult GetAgents()
        {
            try
            {
                AuthenticatedUser  currentUser = UserIdentityHelper.GetLoginAccountFromToken((ClaimsIdentity)this.User.Identity);
                using (var db = new BroadbandZoneEntities())
                {
                    var agentId = !currentUser.IsAdmin ? currentUser.AgentId : null;
                    List <DropdownItem> dropdownItems = db.GetMyEntireTeam(agentId).Select(r => new DropdownItem { Key = r.UserLogin, Value = r.UserLogin })
                                                                                    .OrderBy(r=>r.Value)
                                                                                    .ToList();
                    return Ok(dropdownItems);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Route("api/Dropdown/GetStatus")]
        public IHttpActionResult GetStatus()
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    List<DropdownItem> dropdownItems = db.ApplicationStatus.Select(r => new DropdownItem { Key = r.AppStatusId.ToString(), Value = r.Status }).ToList();
                    return Ok(dropdownItems);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Route("api/Dropdown/GetResidentialType")]
        public IHttpActionResult GetResidentialType()
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    List<DropdownItem> dropdownItems = db.GetDropdownItems(DropdownField.ResidentialType.ToString()).Select(i => new DropdownItem { Key = i.Item, Value = i.Item }).ToList();
                    return Ok(dropdownItems);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }
        
       [Route("api/Dropdown/GetCommissionStatus")]
        public IHttpActionResult GetCommissionStatus()
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    List<DropdownItem> dropdownItems = db.GetDropdownItems(DropdownField.CommissionStatus.ToString()).Select(i => new DropdownItem { Key = i.Item, Value = i.Item }).ToList();
                    return Ok(dropdownItems);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Route("api/Dropdown/GetCategoryType")]
        public IHttpActionResult GetCategoryType()
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    List<DropdownItem> dropdownItems = db.GetDropdownItems(DropdownField.CategoryType.ToString()).Select(i => new DropdownItem { Key = i.Item, Value = i.Item }).ToList();
                    return Ok(dropdownItems);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Route("api/Dropdown/GetWithdrawalStatus")]
        public IHttpActionResult GetWithdrwalStatus()
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    var withdrawalStatuses = Enum.GetValues(typeof(WithdrawalStatus)).Cast<WithdrawalStatus>();
                    List<DropdownItem> dropdownItems = withdrawalStatuses.Where(s=> s != WithdrawalStatus.Terminated)
                                                                         .Select(i => new DropdownItem { Key = i.ToString(), Value = i.ToString()}).ToList();
                    return Ok(dropdownItems);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        
        [Route("api/Dropdown/GetAgentPocketFlow")]
        public IHttpActionResult GetAgentPocketFlow()
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {

                    List<DropdownItem> dropdownItems = new List<DropdownItem>();
                    dropdownItems.Add(new DropdownItem { Key = "In", Value = "In (Incentives)" });
                    dropdownItems.Add(new DropdownItem { Key = "Out", Value = "Out (Charges)" });
                    return Ok(dropdownItems);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Route("api/Dropdown/GetBanks")]
        public IHttpActionResult GetBanks()
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    //string[] banks = {  "Affin Bank Berhad",
                    //                    "Alliance Bank Malaysia Berhad",
                    //                    "AmBank (M) Berhad",
                    //                    "BNP Paribas Malaysia Berhad",
                    //                    "Bangkok Bank Berhad",
                    //                    "Bank of America Malaysia Berhad",
                    //                    "Bank of China (Malaysia) Berhad",
                    //                    "CIMB Bank Berhad",
                    //                    "China Construction Bank (Malaysia) Berhad",
                    //                    "Citibank Berhad",
                    //                    "Deutsche Bank (Malaysia) Berhad",
                    //                    "HSBC Bank Malaysia Berhad",
                    //                    "Hong Leong Bank Berhad",
                    //                    "India International Bank (Malaysia) Berhad",
                    //                    "Industrial and Commercial Bank of China (Malaysia) Berhad",
                    //                    "J.P. Morgan Chase Bank Berhad",
                    //                    "MUFG Bank (Malaysia) Berhad",
                    //                    "Malayan Banking Berhad",
                    //                    "Mizuho Bank (Malaysia) Berhad",
                    //                    "OCBC Bank (Malaysia) Berhad",
                    //                    "Public Bank Berhad",
                    //                    "RHB Bank Berhad",
                    //                    "Standard Chartered Bank Malaysia Berhad",
                    //                    "Sumitomo Mitsui Banking Corporation Malaysia Berhad",
                    //                    "The Bank of Nova Scotia Berhad",
                    //                    "United Overseas Bank (Malaysia) Bhd."
                    //                    };
                    List<DropdownItem> dropdownItems = db.Banks.Select(b => new DropdownItem { Key = b.BankName, Value = b.BankName }).ToList();
                    return Ok(dropdownItems);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }
    }


}