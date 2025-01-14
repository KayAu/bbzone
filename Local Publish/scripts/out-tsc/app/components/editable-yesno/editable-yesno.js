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
var forms_1 = require("@angular/forms");
var EditableYesNo = /** @class */ (function () {
    function EditableYesNo(el) {
        this.el = el;
        this.valueChanged = function () { };
        this.disabled = false;
    }
    EditableYesNo_1 = EditableYesNo;
    Object.defineProperty(EditableYesNo.prototype, "inEditMode", {
        set: function (editing) {
            this.onEdit = editing;
        },
        enumerable: true,
        configurable: true
    });
    EditableYesNo.prototype.clear = function () {
        this.currentValue = null;
        this.valueChanged(null);
    };
    EditableYesNo.prototype.writeValue = function (val) {
        this.currentValue = val;
    };
    EditableYesNo.prototype.registerOnChange = function (fn) {
        this.valueChanged = fn;
    };
    EditableYesNo.prototype.setChangedValue = function (value) {
        this.valueChanged(value);
    };
    EditableYesNo.prototype.registerOnTouched = function () { };
    EditableYesNo.prototype.setDisabledState = function () { };
    var EditableYesNo_1;
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], EditableYesNo.prototype, "valueChanged", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EditableYesNo.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], EditableYesNo.prototype, "disabled", void 0);
    __decorate([
        core_1.Input("onEdit"),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], EditableYesNo.prototype, "inEditMode", null);
    EditableYesNo = EditableYesNo_1 = __decorate([
        core_1.Component({
            selector: 'editable-yesno',
            templateUrl: './editable-yesno.html',
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return EditableYesNo_1; }),
                    multi: true
                }
            ]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], EditableYesNo);
    return EditableYesNo;
}());
exports.EditableYesNo = EditableYesNo;
//# sourceMappingURL=editable-yesno.js.map