"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var loader_service_1 = require("src/app/loader/loader.service");
var data_service_1 = require("src/app/services/data.service");
var router_1 = require("@angular/router");
var apiController_1 = require("src/app/enums/apiController");
var ngx_toastr_1 = require("ngx-toastr");
var forms_1 = require("@angular/forms");
var multiple_checkbox_1 = require("src/app/components/multiple-checkbox/multiple-checkbox");
var product_options_1 = require("src/app/components/product-options/product-options");
var agent_commission_table_1 = require("src/app/components/agent-commission-table/agent-commission-table");
var rxjs_1 = require("rxjs");
var AgentComission = /** @class */ (function () {
    function AgentComission(loaderService, dataService, toastr, router) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.toastr = toastr;
        this.router = router;
        this.isUpdating = false;
        this.commissionSettings = [];
        this.agentCommissions = [];
        this.appsWithoutCommission = [];
        this.selectedTab = 1;
        this.allowCommConfig = true;
        this.noAgentsReturned = false;
    }
    AgentComission.prototype.ngOnInit = function () {
        this.loadAppWithoutCommissionSet();
    };
    AgentComission.prototype.loadAppWithoutCommissionSet = function () {
        var _this = this;
        this.dataService.get(apiController_1.ApiController.Commission + "/GetAppWithoutCommissionSet").subscribe(function (results) {
            _this.appsWithoutCommission = results;
        });
    };
    AgentComission.prototype.loadCategories = function () {
        var _this = this;
        this.multipleCheckboxes.removeSelection();
        rxjs_1.forkJoin([this.dataService.get(apiController_1.ApiController.Commission + "/GetMyAgentsForCommissionSetting", this.selectedProduct),
            this.dataService.get(apiController_1.ApiController.Commission + "/GetCommissionSettings", this.selectedProduct)])
            .subscribe(function (results) {
            _this.loadAgents(results[0]);
            _this.commissionSettings = results[1];
        });
    };
    AgentComission.prototype.loadAgents = function (data) {
        this.myAgents = data.displayData;
        this.allowCommConfig = data.allowCommConfig;
        this.noAgentsReturned = this.myAgents.length === 0;
    };
    AgentComission.prototype.loadAgentCommissions = function () {
        this.agentCommissionTable.loadMyAgentsCommission(this.selectedProduct);
    };
    AgentComission.prototype.create = function () {
        var _this = this;
        // this.formEvent.notify(new FormSubmit(this.form, 'dataForm'));
        this.setControlsAsTouched();
        if (!this.form.valid)
            return;
        this.isUpdating = true;
        var newRecord = { agents: this.selectedAgents, commissionSettings: this.commissionSettings };
        this.dataService.add(apiController_1.ApiController.Commission, newRecord).subscribe(function (data) {
            _this.toastr.success('The record is updated into the system successfully', 'Record Updated', { positionClass: 'toast-bottom-full-width' });
            _this.isUpdating = false;
            _this.resetForm();
            _this.loadAppWithoutCommissionSet();
        });
    };
    AgentComission.prototype.resetForm = function () {
        this.commissionSettings = [];
        this.multipleCheckboxes.removeSelection();
        this.productOptions.clearSelection();
        this.setControlsAsUnouched();
    };
    AgentComission.prototype.editAgentCommission = function (categoryId) {
        console.log(categoryId);
    };
    AgentComission.prototype.setControlsAsTouched = function () {
        for (var i in this.form.controls) {
            this.form.controls[i].markAsTouched();
        }
    };
    AgentComission.prototype.setControlsAsUnouched = function () {
        for (var i in this.form.controls) {
            this.form.controls[i].markAsTouched();
        }
    };
    __decorate([
        core_1.ViewChild(forms_1.NgForm),
        __metadata("design:type", forms_1.NgForm)
    ], AgentComission.prototype, "form", void 0);
    __decorate([
        core_1.ViewChild(multiple_checkbox_1.MultipleCheckboxes),
        __metadata("design:type", multiple_checkbox_1.MultipleCheckboxes)
    ], AgentComission.prototype, "multipleCheckboxes", void 0);
    __decorate([
        core_1.ViewChild(product_options_1.ProductOptions),
        __metadata("design:type", product_options_1.ProductOptions)
    ], AgentComission.prototype, "productOptions", void 0);
    __decorate([
        core_1.ViewChild(agent_commission_table_1.AgentCommissionTable),
        __metadata("design:type", agent_commission_table_1.AgentCommissionTable)
    ], AgentComission.prototype, "agentCommissionTable", void 0);
    AgentComission = __decorate([
        core_1.Component({
            selector: 'agent-comission',
            templateUrl: './agent-comission.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService, ngx_toastr_1.ToastrService, router_1.Router])
    ], AgentComission);
    return AgentComission;
}());
exports.AgentComission = AgentComission;
//# sourceMappingURL=agent-comission.js.map