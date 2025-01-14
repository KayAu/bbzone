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
var router_1 = require("@angular/router");
var data_service_1 = require("../../services/data.service");
var loader_service_1 = require("../../loader/loader.service");
var PatientDetails = /** @class */ (function () {
    function PatientDetails(loaderService, dataService, route) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.route = route;
        this.patientKey = this.route.snapshot.params.patientkey;
    }
    PatientDetails.prototype.ngOnInit = function () {
        this.loadPDTSummary();
    };
    PatientDetails.prototype.loadPDTSummary = function () {
        var _this = this;
        this.dataService.getListData("Patient/GetPatientDetails/" + this.patientKey).subscribe(function (data) {
            _this.pdt = data;
        });
    };
    PatientDetails = __decorate([
        core_1.Component({
            selector: 'patient-details',
            templateUrl: './patient-details.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService, router_1.ActivatedRoute])
    ], PatientDetails);
    return PatientDetails;
}());
exports.PatientDetails = PatientDetails;
//# sourceMappingURL=patient-details.js.map