﻿using BroadbandZone_App.Helper;
using BroadbandZone_Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;

namespace BroadbandZone_App.WebApi
{
    [Authorize]
    public class CommunicationController : ApiController
    {
        private AuthenticatedUser currentUser;
        public CommunicationController()
        {
            currentUser = UserIdentityHelper.GetLoginAccountFromToken((ClaimsIdentity)this.User.Identity);
        }
        // GET api/<controller>/5
        public IHttpActionResult Get(int id)
        {
            try
            {
                using (var db = new BroadbandZoneEntities(true))
                {
                    var communications = db.Communications.Where(c => c.ApplicationId == id).ToList();

                    // get total messages unread
                    var unreadMessages = db.GetUnreadMessagesCount(id, currentUser.IsAdmin).FirstOrDefault().Value;

                    return Ok(new {Communications = communications, UnreadMessages = unreadMessages });
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        // POST api/<controller>
        public IHttpActionResult Post([FromBody]Communication newRecord)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    newRecord.MsgRead = false;
                    newRecord.Role = currentUser.IsAdmin ? "AD" : "AG";
                    newRecord.SetDateAndAuthor(currentUser.Fullname, "CreatedBy", "CreatedOn");
                    db.Communications.Add(newRecord);
                    db.SaveChanges();
                    return Ok(newRecord);
                }
            }
            catch (Exception ex)
            {
                ExceptionUtility.LogError(ex, $"{this.GetType().Name}.{(new System.Diagnostics.StackTrace()).GetFrame(0).GetMethod().Name}");
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        public IHttpActionResult Put(int id)
        {
            try
            {
                using (var db = new BroadbandZoneEntities())
                {
                    db.UpdateMessagesToRead(id, currentUser.IsAdmin);
                    return Ok();
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