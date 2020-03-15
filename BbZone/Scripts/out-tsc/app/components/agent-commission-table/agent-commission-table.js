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
var data_service_1 = require("../../services/data.service");
var loader_service_1 = require("../../loader/loader.service");
var apiController_1 = require("src/app/enums/apiController");
var AgentCommissionTable = /** @class */ (function () {
    //@Input()
    //set dataItems(data: any[]) {
    //    this.dataSource = data;
    //    if (Array.isArray(this.dataColumns) && !this.dataColumns.length)
    //        this.setColumnNames();
    //}
    function AgentCommissionTable(loaderService, dataService) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.dataSource = [];
        this.dataColumns = [];
        this.commissionSettings = [];
        this.editedRecord = {};
        this.hideColumns = [];
        this.rowItemClicked = new core_1.EventEmitter();
    }
    AgentCommissionTable.prototype.loadData = function (productId) {
        var _this = this;
        this.productId = productId;
        this.dataService.get(apiController_1.ApiController.Commission + "/GetMyAgentCommission", productId).subscribe(function (results) {
            _this.dataSource = results;
            _this.setColumnNames();
        });
    };
    AgentCommissionTable.prototype.getRowData = function (row) {
        return Object.values(row);
    };
    AgentCommissionTable.prototype.editRow = function (rowIndex) {
        var _this = this;
        this.dataService.getAll(apiController_1.ApiController.Commission + "/GetAgentCommissionSettings/" + this.dataSource[rowIndex].agentId + "/" + this.productId).subscribe(function (results) {
            _this.hideEditingRow();
            _this.dataSource[rowIndex].onEdit = true;
            _this.commissionSettings = results;
        });
    };
    AgentCommissionTable.prototype.updateRow = function (rowIndex) {
        var _this = this;
        this.dataService.update(apiController_1.ApiController.Commission, this.dataSource[rowIndex].agentId, this.commissionSettings).subscribe(function (data) {
            var propertyNames = Object.keys(_this.dataSource[rowIndex]);
            for (var itemNo = 0; itemNo < _this.commissionSettings.length; itemNo++) {
                var propertyName = propertyNames[itemNo + 2];
                _this.dataSource[rowIndex][propertyName] = _this.commissionSettings[itemNo].agentCommissionPer;
            }
            _this.dataSource[rowIndex].onEdit = false;
        });
    };
    AgentCommissionTable.prototype.cancelEdit = function (rowIndex) {
        this.dataSource[rowIndex].onEdit = false;
        this.commissionSettings = [];
    };
    AgentCommissionTable.prototype.hideEditingRow = function () {
        this.dataSource.forEach(function (element, index, array) {
            array[index].onEdit = false;
        });
    };
    AgentCommissionTable.prototype.setColumnNames = function () {
        var _this = this;
        if (this.dataSource.length === 0)
            return;
        var dataKeys = Object.keys(this.dataSource[0]);
        // get columns which are not visible only
        dataKeys = dataKeys.filter(function (key, index) { return !_this.hideColumns.includes(index); });
        this.dataColumns = dataKeys;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AgentCommissionTable.prototype, "itemKey", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], AgentCommissionTable.prototype, "hideColumns", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], AgentCommissionTable.prototype, "rowItemClicked", void 0);
    AgentCommissionTable = __decorate([
        core_1.Component({
            selector: 'agent-commission-table',
            templateUrl: './agent-commission-table.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService])
    ], AgentCommissionTable);
    return AgentCommissionTable;
}());
exports.AgentCommissionTable = AgentCommissionTable;
//# sourceMappingURL=agent-commission-table.js.map