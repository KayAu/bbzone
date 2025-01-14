﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BroadbandZone_Data
{
    public partial class Communication
    {
        public int UnreadMessages { get; set; }
    }
    public partial class CustomerDocument
    {
        public bool? Deleted { get; set; }
    }

    public partial class CustomerApplication
    {
        public string Category { get; set; }
        public string PackageName { get; set; }
        public bool ShowEForm { get; set; }
        public bool AllowEdit { get; set; }
        public string Status { get; set; }
        public bool CommIsConfigured { get; set; }
        public string AgentEmail { get; set; }
    }

    public partial class AnnouncementDocument
    {
        public bool? Deleted { get; set; }
    }
    public partial class RegistrationDocument
    {
        public bool? Deleted { get; set; }
    }

    public partial class Registration
    {
        public string Password { get; set; }
    }

    public partial class AdminUser
    {
        public string Password { get; set; }
    }

    public partial class Withdrawal
    {
        public bool WithdrawAll { get; set; }
        public bool AllowEdit { get; set; }
        public bool AllowTerminate { get; set; }
        public decimal? TotalAmountToDeduct { get; set; }
        public decimal? TotalSelectedAmount { get; set; }
    }
    public partial class GetWithdrawalById_Result
    {
        public List<WithdrawalItem> WithdrawalItems { get; set; }
    }
}
