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
var rxjs_1 = require("rxjs");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var forms_2 = require("@angular/forms");
var UserFinder = /** @class */ (function () {
    function UserFinder(http) {
        this.http = http;
        this.valueChanged = function () { };
        this.findResults = [];
        this.queryField = new forms_1.FormControl();
        this.searchFieldInput = new rxjs_1.Subject();
    }
    UserFinder_1 = UserFinder;
    UserFinder.prototype.ngOnInit = function () {
        var _this = this;
        this.searchFieldInput.asObservable().debounceTime(500)
            .distinctUntilChanged()
            .subscribe(function (data) { return _this.search(data).subscribe(function (response) {
            _this.findResults = response;
        }); });
        //this.queryField.valueChanges
        //    .subscribe(queryField => this.search(queryField)
        //    .subscribe(response => {
        //        this.findResults = response
        //    }));
    };
    UserFinder.prototype.clearSearch = function () {
        this.queryField.setValue("", { emitEvent: false });
    };
    UserFinder.prototype.writeValue = function (val) {
        if (!val)
            this.clearSearch();
        this.selectedUser = val;
    };
    UserFinder.prototype.registerOnChange = function (fn) {
        this.valueChanged = fn;
    };
    UserFinder.prototype.setChangedValue = function (value) {
        this.valueChanged(value);
    };
    UserFinder.prototype.selectUser = function (selectedUser) {
        this.queryField.setValue(selectedUser.fullName, { emitEvent: false });
        this.valueChanged(selectedUser);
        this.findResults = [];
    };
    UserFinder.prototype.onSearchInputChanged = function (product) {
        this.searchFieldInput.next(product);
    };
    UserFinder.prototype.registerOnTouched = function () { };
    UserFinder.prototype.setDisabledState = function () { };
    UserFinder.prototype.search = function (keyword) {
        if (keyword !== "") {
            var params = new http_1.HttpParams();
            params = params.append('keyword', keyword);
            return this.http.get(this.searchUrl, { params: params }).catch(this.errorHandler);
        }
        else {
            this.clearSearch();
        }
    };
    UserFinder.prototype.errorHandler = function (error) {
        // In a real world app, we might use a remote logging infrastructure  
        var errMsg;
        if (error instanceof Response) {
            var body = error.json() || '';
            var err = body || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return rxjs_1.Observable.throw(errMsg);
    };
    var UserFinder_1;
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], UserFinder.prototype, "searchUrl", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], UserFinder.prototype, "valueChanged", void 0);
    UserFinder = UserFinder_1 = __decorate([
        core_1.Component({
            selector: 'user-finder',
            templateUrl: './user-finder.html',
            styleUrls: ['./user-finder.css'],
            providers: [
                {
                    provide: forms_2.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return UserFinder_1; }),
                    multi: true
                }
            ]
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], UserFinder);
    return UserFinder;
}());
exports.UserFinder = UserFinder;
//# sourceMappingURL=user-finder.js.map