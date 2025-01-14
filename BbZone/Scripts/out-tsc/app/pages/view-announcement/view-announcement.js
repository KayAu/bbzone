"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var tablerow_data_mapping_1 = require("src/app/model/tablerow.data.mapping");
var loader_service_1 = require("src/app/loader/loader.service");
var data_service_1 = require("src/app/services/data.service");
var dataDisplayType_1 = require("src/app/enums/dataDisplayType");
var listEvent_1 = require("src/app/interfaces/listEvent");
var apiController_1 = require("src/app/enums/apiController");
var announcementFields_1 = require("src/app/metadata/announcementFields");
var search_params_1 = require("src/app/model/search-params");
var ngx_toastr_1 = require("ngx-toastr");
var ViewAnnouncement = /** @class */ (function (_super) {
    __extends(ViewAnnouncement, _super);
    function ViewAnnouncement(loaderService, dataService, toastr) {
        var _this = _super.call(this, loaderService, dataService, "", false) || this;
        _this.loaderService = loaderService;
        _this.dataService = dataService;
        _this.toastr = toastr;
        _this.dataRowMapper = [];
        _this.searchFields = [];
        _this.displayType = dataDisplayType_1.DataDisplayType;
        _this.searchParams = new search_params_1.StatusAndKeywordParams(null, null);
        return _this;
    }
    ViewAnnouncement.prototype.ngOnInit = function () {
        this.dataRowMapper = this.getTablerowDataMapping();
        this.keyField = this.dataRowMapper.find(function (d) { return d.keyField === true; }).fieldName;
        this.controllerName = apiController_1.ApiController.Announcement;
    };
    ViewAnnouncement.prototype.getTablerowDataMapping = function () {
        var columnMappings = announcementFields_1.ViewAnnouncementColumns.fields.map(function (o) { return new tablerow_data_mapping_1.TablerowDataMapping(o.fieldName, o.headerText, dataDisplayType_1.DataDisplayType[o.displayType], o.keyField, o.colWidth); });
        return columnMappings;
    };
    ViewAnnouncement.prototype.clearFilter = function () {
        this.searchParams = new search_params_1.StatusAndKeywordParams(null, null);
        this.reloadData();
    };
    ViewAnnouncement.prototype.sendEmail = function (anncId) {
        var _this = this;
        this.dataService.get(apiController_1.ApiController.Announcement + "/EmailAgents/" + anncId).subscribe(function (data) {
            _this.toastr.success('The emails is broadcasted successfully', 'Annoucement email sent', { positionClass: 'toast-bottom-full-width' });
        });
    };
    ViewAnnouncement = __decorate([
        core_1.Component({
            selector: 'view-announcement',
            templateUrl: './view-announcement.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService, ngx_toastr_1.ToastrService])
    ], ViewAnnouncement);
    return ViewAnnouncement;
}(listEvent_1.ListEvent));
exports.ViewAnnouncement = ViewAnnouncement;
//# sourceMappingURL=view-announcement.js.map