//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BroadbandZone_Data
{
    using System;
    
    public partial class AuthenticatedUser
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Fullname { get; set; }
        public string Role { get; set; }
        public Nullable<bool> IsAuthenticated { get; set; }
        public Nullable<bool> IsImpersonated { get; set; }
        public bool IsAdmin { get; set; }
        public Nullable<int> AgentId { get; set; }
        public bool HasFullControl { get; set; }
    }
}
