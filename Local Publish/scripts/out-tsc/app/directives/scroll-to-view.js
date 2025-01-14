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
var ScrollToView = /** @class */ (function () {
    function ScrollToView(el) {
        this.el = el;
    }
    Object.defineProperty(ScrollToView.prototype, "scrollToView", {
        set: function (itemNo) {
            if (itemNo >= 0) {
                this.el.nativeElement.querySelector('.myClass').scrollIntoView({ behavior: "smooth" });
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], ScrollToView.prototype, "scrollToView", null);
    ScrollToView = __decorate([
        core_1.Directive({
            selector: '[scrollToView]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], ScrollToView);
    return ScrollToView;
}());
exports.ScrollToView = ScrollToView;
//# sourceMappingURL=scroll-to-view.js.map