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
var announcementFields_1 = require("../../metadata/announcementFields");
var form_data_mapping_1 = require("../../model/form.data.mapping");
var dataDisplayType_1 = require("../../enums/dataDisplayType");
var data_field_control_1 = require("../../model/data.field.control");
var broadcast_service_1 = require("../../services/broadcast.service");
var data_service_1 = require("../../services/data.service");
var loader_service_1 = require("../../loader/loader.service");
var ngx_toastr_1 = require("ngx-toastr");
var router_2 = require("@angular/router");
var apiController_1 = require("../../enums/apiController");
var forms_1 = require("@angular/forms");
var CreateAnnouncement = /** @class */ (function () {
    function CreateAnnouncement(loaderService, dataService, formEvent, router, route, toastr) {
        this.loaderService = loaderService;
        this.dataService = dataService;
        this.formEvent = formEvent;
        this.router = router;
        this.route = route;
        this.toastr = toastr;
        this.formFields = [];
        this.newRecord = {};
        this.isUpdating = false;
        this.controlType = dataDisplayType_1.ControlType;
        this.richTextConfig = {
            editable: true,
            spellcheck: true,
            height: '15rem',
            minHeight: '5rem',
            placeholder: 'Enter text here...',
            translate: 'no',
            defaultParagraphSeparator: 'p',
            defaultFontName: 'Arial',
            customClasses: [
                {
                    name: "quote",
                    class: "quote",
                },
                {
                    name: 'redText',
                    class: 'redText'
                },
                {
                    name: "titleText",
                    class: "titleText",
                    tag: "h1",
                },
            ]
        };
    }
    CreateAnnouncement.prototype.ngOnInit = function () {
        this.formFields = this.getFormFeldsMapping();
        this.loadApplication(this.route.snapshot.params.id);
    };
    CreateAnnouncement.prototype.getFormFeldsMapping = function () {
        var columnMappings = announcementFields_1.NewAnnouncementFields.fields.map(function (o) { return new form_data_mapping_1.FormDataMapping(o.fieldName, o.displayText, o.hidden, !o.dataFieldControl ? null :
            new data_field_control_1.DataFieldControl(o.dataFieldControl.controlName, dataDisplayType_1.ControlType[o.dataFieldControl.controlType], o.dataFieldControl.required, o.dataFieldControl.maxLength, o.dataFieldControl["datasourceUrl"] !== undefined ? o.dataFieldControl["datasourceUrl"] : null)); });
        return columnMappings;
    };
    CreateAnnouncement.prototype.submit = function () {
        var _this = this;
        this.setControlsAsTouched();
        if (!this.form.valid)
            return;
        this.isUpdating = true;
        var formData = new FormData();
        formData.append('data', JSON.stringify(this.newRecord));
        if (this.newRecord.files) {
            for (var i = 0; i < this.newRecord.files.length; i++) {
                formData.append("file" + i, this.newRecord.files[i]);
            }
        }
        this.dataService.postForm(apiController_1.ApiController.Announcement, formData).subscribe(function (data) {
            _this.isUpdating = false;
            _this.router.navigate(['/view-announcement']);
        });
    };
    CreateAnnouncement.prototype.loadApplication = function (applicationId) {
        var _this = this;
        this.dataService.get(apiController_1.ApiController.CustomerApplication, applicationId).subscribe(function (data) {
            _this.newRecord = data;
        });
    };
    CreateAnnouncement.prototype.setControlsAsTouched = function () {
        for (var i in this.form.controls) {
            this.form.controls[i].markAsTouched();
        }
    };
    __decorate([
        core_1.ViewChild(forms_1.NgForm),
        __metadata("design:type", forms_1.NgForm)
    ], CreateAnnouncement.prototype, "form", void 0);
    CreateAnnouncement = __decorate([
        core_1.Component({
            selector: 'create-announcement',
            templateUrl: './create-announcement.html'
        }),
        __metadata("design:paramtypes", [loader_service_1.LoaderService, data_service_1.DataService, broadcast_service_1.BroadcastService,
            router_1.Router, router_2.ActivatedRoute, ngx_toastr_1.ToastrService])
    ], CreateAnnouncement);
    return CreateAnnouncement;
}());
exports.CreateAnnouncement = CreateAnnouncement;
//# sourceMappingURL=create-announcement.js.map