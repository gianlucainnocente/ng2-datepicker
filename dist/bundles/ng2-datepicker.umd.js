(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms'), require('date-fns')) :
    typeof define === 'function' && define.amd ? define('ng2-datepicker', ['exports', '@angular/core', '@angular/common', '@angular/forms', 'date-fns'], factory) :
    (global = global || self, factory(global['ng2-datepicker'] = {}, global.ng.core, global.ng.common, global.ng.forms, global.dateFns));
}(this, (function (exports, core, common, forms, dateFns) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [0, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { if (o[n]) i[n] = function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; }; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator];
        return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    // Counter for calculating the auto-incrementing field ID
    var counter = 0;
    /**
     * Internal library helper that helps to check if value is empty
     * @param value
     */
    var isNil = function (value) {
        return (typeof value === 'undefined') || (value === null);
    };
    var ɵ0 = isNil;
    var NgDatepickerComponent = /** @class */ (function () {
        function NgDatepickerComponent(elementRef) {
            this.elementRef = elementRef;
            /**
             * Disable datepicker's input
             */
            this.headless = false;
            /**
             * Set datepicker's visibility state
             */
            this.isOpened = false;
            /**
             * Datepicker dropdown position
             */
            this.position = 'bottom-right';
            this.positions = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
            this.onTouchedCallback = function () { };
            this.onChangeCallback = function () { };
        }
        NgDatepickerComponent_1 = NgDatepickerComponent;
        NgDatepickerComponent.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
        };
        Object.defineProperty(NgDatepickerComponent.prototype, "value", {
            get: function () {
                return this.innerValue;
            },
            set: function (val) {
                this.innerValue = val;
                this.onChangeCallback(this.innerValue);
            },
            enumerable: true,
            configurable: true
        });
        NgDatepickerComponent.prototype.ngOnInit = function () {
            this.view = 'days';
            this.date = new Date();
            this.setOptions();
            this.initDayNames();
            this.initYears();
            // Check if 'position' property is correct
            if (this.positions.indexOf(this.position) === -1) {
                throw new TypeError("ng-datepicker: invalid position property value '" + this.position + "' (expected: " + this.positions.join(', ') + ")");
            }
        };
        NgDatepickerComponent.prototype.ngOnChanges = function (changes) {
            if ('options' in changes) {
                this.setOptions();
                this.initDayNames();
                this.init();
                this.initYears();
            }
        };
        Object.defineProperty(NgDatepickerComponent.prototype, "defaultFieldId", {
            get: function () {
                // Only evaluate and increment if required
                var value = "datepicker-" + counter++;
                Object.defineProperty(this, 'defaultFieldId', { value: value });
                return value;
            },
            enumerable: true,
            configurable: true
        });
        NgDatepickerComponent.prototype.setOptions = function () {
            var today = new Date(); // this const was added because during my tests, I noticed that at this level this.date is undefined
            this.minYear = this.options && this.options.minYear || dateFns.getYear(today) - 30;
            this.maxYear = this.options && this.options.maxYear || dateFns.getYear(today) + 30;
            this.displayFormat = this.options && this.options.displayFormat || 'MMM D[,] YYYY';
            this.barTitleFormat = this.options && this.options.barTitleFormat || 'MMMM YYYY';
            this.dayNamesFormat = this.options && this.options.dayNamesFormat || 'ddd';
            this.barTitleIfEmpty = this.options && this.options.barTitleIfEmpty || 'Click to select a date';
            this.firstCalendarDay = this.options && this.options.firstCalendarDay || 0;
            this.locale = this.options && { locale: this.options.locale } || {};
            this.placeholder = this.options && this.options.placeholder || '';
            this.addClass = this.options && this.options.addClass || {};
            this.addStyle = this.options && this.options.addStyle || {};
            this.fieldId = this.options && this.options.fieldId || this.defaultFieldId;
            this.useEmptyBarTitle = this.options && 'useEmptyBarTitle' in this.options ? this.options.useEmptyBarTitle : true;
        };
        NgDatepickerComponent.prototype.nextMonth = function () {
            this.date = dateFns.addMonths(this.date, 1);
            this.init();
        };
        NgDatepickerComponent.prototype.prevMonth = function () {
            this.date = dateFns.subMonths(this.date, 1);
            this.init();
        };
        NgDatepickerComponent.prototype.setDate = function (i) {
            this.date = this.days[i].date;
            this.value = this.date;
            this.init();
            this.close();
        };
        NgDatepickerComponent.prototype.setYear = function (i) {
            this.date = dateFns.setYear(this.date, this.years[i].year);
            this.init();
            this.initYears();
            this.view = 'days';
        };
        /**
         * Checks if specified date is in range of min and max dates
         * @param date
         */
        NgDatepickerComponent.prototype.isDateSelectable = function (date) {
            if (isNil(this.options)) {
                return true;
            }
            var minDateSet = !isNil(this.options.minDate);
            var maxDateSet = !isNil(this.options.maxDate);
            var timestamp = date.valueOf();
            if (minDateSet && (timestamp < this.options.minDate.valueOf())) {
                return false;
            }
            if (maxDateSet && (timestamp > this.options.maxDate.valueOf())) {
                return false;
            }
            return true;
        };
        NgDatepickerComponent.prototype.init = function () {
            var _this = this;
            // this.date may be null after .reset(); fall back to current date.
            var actualDate = this.date || new Date();
            var start = dateFns.startOfMonth(actualDate);
            var end = dateFns.endOfMonth(actualDate);
            this.days = dateFns.eachDay(start, end).map(function (date) {
                return {
                    date: date,
                    day: dateFns.getDate(date),
                    month: dateFns.getMonth(date),
                    year: dateFns.getYear(date),
                    inThisMonth: true,
                    isToday: dateFns.isToday(date),
                    isSelected: dateFns.isSameDay(date, _this.innerValue) && dateFns.isSameMonth(date, _this.innerValue) && dateFns.isSameYear(date, _this.innerValue),
                    isSelectable: _this.isDateSelectable(date)
                };
            });
            var tmp = dateFns.getDay(start) - this.firstCalendarDay;
            var prevDays = tmp < 0 ? 7 - this.firstCalendarDay : tmp;
            for (var i = 1; i <= prevDays; i++) {
                var date = dateFns.subDays(start, i);
                this.days.unshift({
                    date: date,
                    day: dateFns.getDate(date),
                    month: dateFns.getMonth(date),
                    year: dateFns.getYear(date),
                    inThisMonth: false,
                    isToday: dateFns.isToday(date),
                    isSelected: dateFns.isSameDay(date, this.innerValue) && dateFns.isSameMonth(date, this.innerValue) && dateFns.isSameYear(date, this.innerValue),
                    isSelectable: this.isDateSelectable(date)
                });
            }
            if (this.innerValue) {
                this.displayValue = dateFns.format(this.innerValue, this.displayFormat, this.locale);
                this.barTitle = dateFns.format(start, this.barTitleFormat, this.locale);
            }
            else {
                this.displayValue = '';
                this.barTitle = this.useEmptyBarTitle ? this.barTitleIfEmpty : dateFns.format(start, this.barTitleFormat, this.locale);
            }
        };
        NgDatepickerComponent.prototype.initYears = function () {
            var _this = this;
            var range = this.maxYear - this.minYear;
            this.years = Array.from(new Array(range), function (x, i) { return i + _this.minYear; }).map(function (year) {
                return { year: year, isThisYear: year === dateFns.getYear(_this.date) };
            });
        };
        NgDatepickerComponent.prototype.initDayNames = function () {
            this.dayNames = [];
            var start = this.firstCalendarDay;
            for (var i = start; i <= 6 + start; i++) {
                var date = dateFns.setDay(new Date(), i);
                this.dayNames.push(dateFns.format(date, this.dayNamesFormat, this.locale));
            }
        };
        NgDatepickerComponent.prototype.toggleView = function () {
            this.view = this.view === 'days' ? 'years' : 'days';
        };
        NgDatepickerComponent.prototype.toggle = function () {
            this.isOpened = !this.isOpened;
            if (!this.isOpened && this.view === 'years') {
                this.toggleView();
            }
        };
        NgDatepickerComponent.prototype.close = function () {
            this.isOpened = false;
            if (this.view === 'years') {
                this.toggleView();
            }
        };
        NgDatepickerComponent.prototype.reset = function (fireValueChangeEvent) {
            if (fireValueChangeEvent === void 0) { fireValueChangeEvent = false; }
            this.date = null;
            this.innerValue = null;
            this.init();
            if (fireValueChangeEvent && this.onChangeCallback) {
                this.onChangeCallback(this.innerValue);
            }
        };
        NgDatepickerComponent.prototype.writeValue = function (val) {
            if (val) {
                this.date = val;
                this.innerValue = val;
                this.init();
                this.displayValue = dateFns.format(this.innerValue, this.displayFormat, this.locale);
                this.barTitle = dateFns.format(dateFns.startOfMonth(val), this.barTitleFormat, this.locale);
            }
        };
        NgDatepickerComponent.prototype.registerOnChange = function (fn) {
            this.onChangeCallback = fn;
        };
        NgDatepickerComponent.prototype.registerOnTouched = function (fn) {
            this.onTouchedCallback = fn;
        };
        NgDatepickerComponent.prototype.onBlur = function (e) {
            if (!this.isOpened) {
                return;
            }
            var input = this.elementRef.nativeElement.querySelector('.ngx-datepicker-input');
            if (input == null) {
                return;
            }
            if (e.target === input || input.contains(e.target)) {
                return;
            }
            var container = this.elementRef.nativeElement.querySelector('.ngx-datepicker-calendar-container');
            if (container && container !== e.target && !container.contains(e.target) && !e.target.classList.contains('year-unit')) {
                this.close();
            }
        };
        var NgDatepickerComponent_1;
        NgDatepickerComponent.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input()
        ], NgDatepickerComponent.prototype, "options", void 0);
        __decorate([
            core.Input()
        ], NgDatepickerComponent.prototype, "headless", void 0);
        __decorate([
            core.Input()
        ], NgDatepickerComponent.prototype, "isOpened", void 0);
        __decorate([
            core.Input()
        ], NgDatepickerComponent.prototype, "position", void 0);
        __decorate([
            core.HostListener('document:click', ['$event'])
        ], NgDatepickerComponent.prototype, "onBlur", null);
        NgDatepickerComponent = NgDatepickerComponent_1 = __decorate([
            core.Component({
                selector: 'ng-datepicker',
                template: "<div class=\"ngx-datepicker-container\">\n  <input type=\"text\" *ngIf=\"!headless\" class=\"ngx-datepicker-input\" [(ngModel)]=\"displayValue\" readonly [placeholder]=\"placeholder\"\n    [ngClass]=\"addClass\" [ngStyle]=\"addStyle\" [id]=\"fieldId\" [disabled]=\"disabled\" (click)=\"toggle()\" />\n  <ng-content></ng-content>\n  <div class=\"ngx-datepicker-calendar-container ngx-datepicker-position-{{position}}\" *ngIf=\"isOpened\">\n    <div class=\"topbar-container\">\n      <svg width=\"7px\" height=\"10px\" viewBox=\"0 0 7 10\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n        (click)=\"prevMonth()\">\n        <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n          <g transform=\"translate(-923.000000, -1882.000000)\" fill=\"#CED0DA\">\n            <g transform=\"translate(80.000000, 1361.000000)\">\n              <g transform=\"translate(0.000000, 430.000000)\">\n                <g transform=\"translate(825.000000, 0.000000)\">\n                  <g transform=\"translate(0.000000, 72.000000)\">\n                    <g transform=\"translate(18.000000, 15.000000)\">\n                      <polygon id=\"Back\" points=\"6.015 4 0 9.013 6.015 14.025\"></polygon>\n                    </g>\n                  </g>\n                </g>\n              </g>\n            </g>\n          </g>\n        </g>\n      </svg>\n      <span class=\"topbar-title\" (click)=\"toggleView()\">{{ barTitle }}</span>\n      <svg width=\"7px\" height=\"10px\" viewBox=\"0 0 6 10\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n        (click)=\"nextMonth()\">\n        <g id=\"Source-Sans---UI-Elements-Kit\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n          <g id=\"White-Layout\" transform=\"translate(-1182.000000, -1882.000000)\" fill=\"#CED0DA\">\n            <g id=\"Dropdowns-&amp;-Selector\" transform=\"translate(80.000000, 1361.000000)\">\n              <g id=\"Dropdowns\" transform=\"translate(0.000000, 430.000000)\">\n                <g id=\"Calendar\" transform=\"translate(825.000000, 0.000000)\">\n                  <g transform=\"translate(0.000000, 72.000000)\" id=\"Top-Bar-Nav\">\n                    <g transform=\"translate(18.000000, 15.000000)\">\n                      <polygon id=\"Forward\" transform=\"translate(262.007500, 9.012500) scale(-1, 1) translate(-262.007500, -9.012500) \" points=\"265.015 4 259 9.013 265.015 14.025\"></polygon>\n                    </g>\n                  </g>\n                </g>\n              </g>\n            </g>\n          </g>\n        </g>\n      </svg>\n    </div>\n    <div class=\"main-calendar-container\" *ngIf=\"view === 'days'\">\n      <div class=\"main-calendar-day-names\">\n        <span class=\"day-name-unit\" *ngFor=\"let name of dayNames\">{{ name }}</span>\n      </div>\n      <div class=\"main-calendar-days\">\n        <span class=\"day-unit\" *ngFor=\"let day of days; let i = index;\" [ngClass]=\"{ 'is-prev-month': !day.inThisMonth, 'is-today': day.isToday, 'is-selected': day.isSelected, 'is-disabled': !day.isSelectable }\"\n          (click)=\"day.isSelectable && setDate(i)\">\n          {{ day.day }}\n        </span>\n      </div>\n    </div>\n    <div class=\"main-calendar-container\" *ngIf=\"view === 'years'\">\n      <div class=\"main-calendar-years\" >\n        <span class=\"year-unit\" *ngFor=\"let year of years; let i = index;\" [ngClass]=\"{ 'is-selected': year.isThisYear }\" (click)=\"setYear(i)\">{{ year.year }}</span>\n      </div>\n    </div>\n  </div>\n</div>\n",
                providers: [
                    { provide: forms.NG_VALUE_ACCESSOR, useExisting: core.forwardRef(function () { return NgDatepickerComponent_1; }), multi: true }
                ],
                styles: [".ngx-datepicker-position-bottom-left{top:40px;right:0}.ngx-datepicker-position-bottom-right{top:40px;left:0}.ngx-datepicker-position-top-left{bottom:40px;right:0}.ngx-datepicker-position-top-right{bottom:40px;left:0}.ngx-datepicker-container{position:relative}.ngx-datepicker-container .ngx-datepicker-input{padding:5px 10px;font-size:14px;width:200px;outline:0;border:1px solid #dfe3e9}.ngx-datepicker-container .ngx-datepicker-calendar-container{position:absolute;width:300px;background:#fff;box-shadow:0 1px 4px 0 rgba(0,0,0,.08);border:1px solid #dfe3e9;border-radius:4px}.ngx-datepicker-container .ngx-datepicker-calendar-container .topbar-container{width:100%;height:50px;padding:15px;border-bottom:1px solid #dfe3e9;display:flex;justify-content:space-between;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ngx-datepicker-container .ngx-datepicker-calendar-container .topbar-container svg{cursor:pointer}.ngx-datepicker-container .ngx-datepicker-calendar-container .topbar-container svg g{fill:#ced0da}.ngx-datepicker-container .ngx-datepicker-calendar-container .topbar-container .topbar-title{color:#3d495c;font-size:14px;font-weight:600;cursor:pointer}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container{width:100%;height:100%;padding:15px 10px 0;font-size:12px;font-weight:500}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-day-names{color:#a4a9b1;width:100%;display:flex;align-items:center}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-day-names .day-name-unit{width:calc(100% / 7);text-transform:uppercase;text-align:center}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years{padding:15px 0;width:100%;display:inline-block;max-height:275px;overflow:hidden}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit{width:calc(100% / 7);height:40px;display:inline-flex;float:left;align-items:center;justify-content:center;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border-radius:50%;color:#3d495c}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit.is-prev-month,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit.is-prev-month,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit.is-prev-month,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit.is-prev-month{color:#a4a9b1}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit.is-today,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit:hover,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit.is-today,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit:hover,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit.is-today,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit:hover,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit.is-today,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit:hover{background:#a4a9b1;color:#fff}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit.is-selected,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit.is-selected,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit.is-selected,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit.is-selected{background:#1a91eb;color:#fff}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit.is-disabled,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit.is-disabled,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit.is-disabled,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit.is-disabled{cursor:not-allowed;color:#a4a9b1}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit.is-disabled:hover,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit.is-disabled:hover,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit.is-disabled:hover,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit.is-disabled:hover{background:0 0}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years{height:210px;display:block;padding:0}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit{width:calc(100% / 3);border-radius:10px}"]
            })
        ], NgDatepickerComponent);
        return NgDatepickerComponent;
    }());

    var NgDatepickerModule = /** @class */ (function () {
        function NgDatepickerModule() {
        }
        NgDatepickerModule = __decorate([
            core.NgModule({
                declarations: [NgDatepickerComponent],
                imports: [common.CommonModule, forms.FormsModule],
                exports: [NgDatepickerComponent, common.CommonModule, forms.FormsModule]
            })
        ], NgDatepickerModule);
        return NgDatepickerModule;
    }());

    exports.NgDatepickerComponent = NgDatepickerComponent;
    exports.NgDatepickerModule = NgDatepickerModule;
    exports.ɵ0 = ɵ0;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng2-datepicker.umd.js.map
