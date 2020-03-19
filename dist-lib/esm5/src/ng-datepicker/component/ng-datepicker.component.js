import { __decorate } from "tslib";
import { Component, OnInit, Input, OnChanges, SimpleChanges, ElementRef, HostListener, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { startOfMonth, endOfMonth, addMonths, subMonths, setYear, eachDay, getDate, getMonth, getYear, isToday, isSameDay, isSameMonth, isSameYear, format, getDay, subDays, setDay } from 'date-fns';
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
        this.minYear = this.options && this.options.minYear || getYear(today) - 30;
        this.maxYear = this.options && this.options.maxYear || getYear(today) + 30;
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
        this.date = addMonths(this.date, 1);
        this.init();
    };
    NgDatepickerComponent.prototype.prevMonth = function () {
        this.date = subMonths(this.date, 1);
        this.init();
    };
    NgDatepickerComponent.prototype.setDate = function (i) {
        this.date = this.days[i].date;
        this.value = this.date;
        this.init();
        this.close();
    };
    NgDatepickerComponent.prototype.setYear = function (i) {
        this.date = setYear(this.date, this.years[i].year);
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
        var start = startOfMonth(actualDate);
        var end = endOfMonth(actualDate);
        this.days = eachDay(start, end).map(function (date) {
            return {
                date: date,
                day: getDate(date),
                month: getMonth(date),
                year: getYear(date),
                inThisMonth: true,
                isToday: isToday(date),
                isSelected: isSameDay(date, _this.innerValue) && isSameMonth(date, _this.innerValue) && isSameYear(date, _this.innerValue),
                isSelectable: _this.isDateSelectable(date)
            };
        });
        var tmp = getDay(start) - this.firstCalendarDay;
        var prevDays = tmp < 0 ? 7 - this.firstCalendarDay : tmp;
        for (var i = 1; i <= prevDays; i++) {
            var date = subDays(start, i);
            this.days.unshift({
                date: date,
                day: getDate(date),
                month: getMonth(date),
                year: getYear(date),
                inThisMonth: false,
                isToday: isToday(date),
                isSelected: isSameDay(date, this.innerValue) && isSameMonth(date, this.innerValue) && isSameYear(date, this.innerValue),
                isSelectable: this.isDateSelectable(date)
            });
        }
        if (this.innerValue) {
            this.displayValue = format(this.innerValue, this.displayFormat, this.locale);
            this.barTitle = format(start, this.barTitleFormat, this.locale);
        }
        else {
            this.displayValue = '';
            this.barTitle = this.useEmptyBarTitle ? this.barTitleIfEmpty : format(start, this.barTitleFormat, this.locale);
        }
    };
    NgDatepickerComponent.prototype.initYears = function () {
        var _this = this;
        var range = this.maxYear - this.minYear;
        this.years = Array.from(new Array(range), function (x, i) { return i + _this.minYear; }).map(function (year) {
            return { year: year, isThisYear: year === getYear(_this.date) };
        });
    };
    NgDatepickerComponent.prototype.initDayNames = function () {
        this.dayNames = [];
        var start = this.firstCalendarDay;
        for (var i = start; i <= 6 + start; i++) {
            var date = setDay(new Date(), i);
            this.dayNames.push(format(date, this.dayNamesFormat, this.locale));
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
            this.displayValue = format(this.innerValue, this.displayFormat, this.locale);
            this.barTitle = format(startOfMonth(val), this.barTitleFormat, this.locale);
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
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], NgDatepickerComponent.prototype, "options", void 0);
    __decorate([
        Input()
    ], NgDatepickerComponent.prototype, "headless", void 0);
    __decorate([
        Input()
    ], NgDatepickerComponent.prototype, "isOpened", void 0);
    __decorate([
        Input()
    ], NgDatepickerComponent.prototype, "position", void 0);
    __decorate([
        HostListener('document:click', ['$event'])
    ], NgDatepickerComponent.prototype, "onBlur", null);
    NgDatepickerComponent = NgDatepickerComponent_1 = __decorate([
        Component({
            selector: 'ng-datepicker',
            template: "<div class=\"ngx-datepicker-container\">\n  <input type=\"text\" *ngIf=\"!headless\" class=\"ngx-datepicker-input\" [(ngModel)]=\"displayValue\" readonly [placeholder]=\"placeholder\"\n    [ngClass]=\"addClass\" [ngStyle]=\"addStyle\" [id]=\"fieldId\" [disabled]=\"disabled\" (click)=\"toggle()\" />\n  <ng-content></ng-content>\n  <div class=\"ngx-datepicker-calendar-container ngx-datepicker-position-{{position}}\" *ngIf=\"isOpened\">\n    <div class=\"topbar-container\">\n      <svg width=\"7px\" height=\"10px\" viewBox=\"0 0 7 10\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n        (click)=\"prevMonth()\">\n        <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n          <g transform=\"translate(-923.000000, -1882.000000)\" fill=\"#CED0DA\">\n            <g transform=\"translate(80.000000, 1361.000000)\">\n              <g transform=\"translate(0.000000, 430.000000)\">\n                <g transform=\"translate(825.000000, 0.000000)\">\n                  <g transform=\"translate(0.000000, 72.000000)\">\n                    <g transform=\"translate(18.000000, 15.000000)\">\n                      <polygon id=\"Back\" points=\"6.015 4 0 9.013 6.015 14.025\"></polygon>\n                    </g>\n                  </g>\n                </g>\n              </g>\n            </g>\n          </g>\n        </g>\n      </svg>\n      <span class=\"topbar-title\" (click)=\"toggleView()\">{{ barTitle }}</span>\n      <svg width=\"7px\" height=\"10px\" viewBox=\"0 0 6 10\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n        (click)=\"nextMonth()\">\n        <g id=\"Source-Sans---UI-Elements-Kit\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n          <g id=\"White-Layout\" transform=\"translate(-1182.000000, -1882.000000)\" fill=\"#CED0DA\">\n            <g id=\"Dropdowns-&amp;-Selector\" transform=\"translate(80.000000, 1361.000000)\">\n              <g id=\"Dropdowns\" transform=\"translate(0.000000, 430.000000)\">\n                <g id=\"Calendar\" transform=\"translate(825.000000, 0.000000)\">\n                  <g transform=\"translate(0.000000, 72.000000)\" id=\"Top-Bar-Nav\">\n                    <g transform=\"translate(18.000000, 15.000000)\">\n                      <polygon id=\"Forward\" transform=\"translate(262.007500, 9.012500) scale(-1, 1) translate(-262.007500, -9.012500) \" points=\"265.015 4 259 9.013 265.015 14.025\"></polygon>\n                    </g>\n                  </g>\n                </g>\n              </g>\n            </g>\n          </g>\n        </g>\n      </svg>\n    </div>\n    <div class=\"main-calendar-container\" *ngIf=\"view === 'days'\">\n      <div class=\"main-calendar-day-names\">\n        <span class=\"day-name-unit\" *ngFor=\"let name of dayNames\">{{ name }}</span>\n      </div>\n      <div class=\"main-calendar-days\">\n        <span class=\"day-unit\" *ngFor=\"let day of days; let i = index;\" [ngClass]=\"{ 'is-prev-month': !day.inThisMonth, 'is-today': day.isToday, 'is-selected': day.isSelected, 'is-disabled': !day.isSelectable }\"\n          (click)=\"day.isSelectable && setDate(i)\">\n          {{ day.day }}\n        </span>\n      </div>\n    </div>\n    <div class=\"main-calendar-container\" *ngIf=\"view === 'years'\">\n      <div class=\"main-calendar-years\" >\n        <span class=\"year-unit\" *ngFor=\"let year of years; let i = index;\" [ngClass]=\"{ 'is-selected': year.isThisYear }\" (click)=\"setYear(i)\">{{ year.year }}</span>\n      </div>\n    </div>\n  </div>\n</div>\n",
            providers: [
                { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(function () { return NgDatepickerComponent_1; }), multi: true }
            ],
            styles: [".ngx-datepicker-position-bottom-left{top:40px;right:0}.ngx-datepicker-position-bottom-right{top:40px;left:0}.ngx-datepicker-position-top-left{bottom:40px;right:0}.ngx-datepicker-position-top-right{bottom:40px;left:0}.ngx-datepicker-container{position:relative}.ngx-datepicker-container .ngx-datepicker-input{padding:5px 10px;font-size:14px;width:200px;outline:0;border:1px solid #dfe3e9}.ngx-datepicker-container .ngx-datepicker-calendar-container{position:absolute;width:300px;background:#fff;box-shadow:0 1px 4px 0 rgba(0,0,0,.08);border:1px solid #dfe3e9;border-radius:4px}.ngx-datepicker-container .ngx-datepicker-calendar-container .topbar-container{width:100%;height:50px;padding:15px;border-bottom:1px solid #dfe3e9;display:flex;justify-content:space-between;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ngx-datepicker-container .ngx-datepicker-calendar-container .topbar-container svg{cursor:pointer}.ngx-datepicker-container .ngx-datepicker-calendar-container .topbar-container svg g{fill:#ced0da}.ngx-datepicker-container .ngx-datepicker-calendar-container .topbar-container .topbar-title{color:#3d495c;font-size:14px;font-weight:600;cursor:pointer}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container{width:100%;height:100%;padding:15px 10px 0;font-size:12px;font-weight:500}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-day-names{color:#a4a9b1;width:100%;display:flex;align-items:center}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-day-names .day-name-unit{width:calc(100% / 7);text-transform:uppercase;text-align:center}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years{padding:15px 0;width:100%;display:inline-block;max-height:275px;overflow:hidden}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit{width:calc(100% / 7);height:40px;display:inline-flex;float:left;align-items:center;justify-content:center;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border-radius:50%;color:#3d495c}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit.is-prev-month,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit.is-prev-month,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit.is-prev-month,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit.is-prev-month{color:#a4a9b1}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit.is-today,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit:hover,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit.is-today,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit:hover,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit.is-today,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit:hover,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit.is-today,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit:hover{background:#a4a9b1;color:#fff}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit.is-selected,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit.is-selected,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit.is-selected,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit.is-selected{background:#1a91eb;color:#fff}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit.is-disabled,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit.is-disabled,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit.is-disabled,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit.is-disabled{cursor:not-allowed;color:#a4a9b1}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit.is-disabled:hover,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit.is-disabled:hover,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit.is-disabled:hover,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit.is-disabled:hover{background:0 0}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years{height:210px;display:block;padding:0}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit{width:calc(100% / 3);border-radius:10px}"]
        })
    ], NgDatepickerComponent);
    return NgDatepickerComponent;
}());
export { NgDatepickerComponent };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZGF0ZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbInNyYy9uZy1kYXRlcGlja2VyL2NvbXBvbmVudC9uZy1kYXRlcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekgsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFDTCxZQUFZLEVBQ1osVUFBVSxFQUNWLFNBQVMsRUFDVCxTQUFTLEVBQ1QsT0FBTyxFQUNQLE9BQU8sRUFDUCxPQUFPLEVBQ1AsUUFBUSxFQUNSLE9BQU8sRUFDUCxPQUFPLEVBQ1AsU0FBUyxFQUNULFdBQVcsRUFDWCxVQUFVLEVBQ1YsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsTUFBTSxFQUNQLE1BQU0sVUFBVSxDQUFDO0FBMkJsQix5REFBeUQ7QUFDekQsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBRWhCOzs7R0FHRztBQUNILElBQU0sS0FBSyxHQUFHLFVBQUMsS0FBK0I7SUFDNUMsT0FBTyxDQUFDLE9BQU8sS0FBSyxLQUFLLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDO0FBQzVELENBQUMsQ0FBQzs7QUFVRjtJQW9FRSwrQkFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQWpFMUM7O1dBRUc7UUFDTSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRTFCOztXQUVHO1FBQ00sYUFBUSxHQUFHLEtBQUssQ0FBQztRQUUxQjs7V0FFRztRQUNNLGFBQVEsR0FBRyxjQUFjLENBQUM7UUFFM0IsY0FBUyxHQUFHLENBQUMs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QUFDLFNBQVMsQ0FBQyxRQUFRLENBQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQU8sQ0FBQyxDQUFDLE1BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ2pJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNkO0lBQ0gsQ0FBQzs7O2dCQWpPK0IsVUFBVTs7SUFuRWpDO1FBQVIsS0FBSyxFQUFFOzBEQUE0QjtJQUszQjtRQUFSLEtBQUssRUFBRTsyREFBa0I7SUFLakI7UUFBUixLQUFLLEVBQUU7MkRBQWtCO0lBS2pCO1FBQVIsS0FBSyxFQUFFOzJEQUEyQjtJQWtRUztRQUEzQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzt1REFtQjFDO0lBclNVLHFCQUFxQjtRQVJqQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsZUFBZTtZQUN6Qiwra0hBQTJDO1lBRTNDLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSx1QkFBcUIsRUFBckIsQ0FBcUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7YUFDbEc7O1NBQ0YsQ0FBQztPQUNXLHFCQUFxQixDQXNTakM7SUFBRCw0QkFBQztDQUFBLEFBdFNELElBc1NDO1NBdFNZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIHN0YXJ0T2ZNb250aCxcbiAgZW5kT2ZNb250aCxcbiAgYWRkTW9udGhzLFxuICBzdWJNb250aHMsXG4gIHNldFllYXIsXG4gIGVhY2hEYXksXG4gIGdldERhdGUsXG4gIGdldE1vbnRoLFxuICBnZXRZZWFyLFxuICBpc1RvZGF5LFxuICBpc1NhbWVEYXksXG4gIGlzU2FtZU1vbnRoLFxuICBpc1NhbWVZZWFyLFxuICBmb3JtYXQsXG4gIGdldERheSxcbiAgc3ViRGF5cyxcbiAgc2V0RGF5XG59IGZyb20gJ2RhdGUtZm5zJztcblxuZXhwb3J0IHR5cGUgQWRkQ2xhc3MgPSBzdHJpbmcgfCBzdHJpbmdbXSB8IHsgW2s6IHN0cmluZ106IGJvb2xlYW4gfSB8IG51bGw7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0ZXBpY2tlck9wdGlvbnMge1xuICBtaW5ZZWFyPzogbnVtYmVyOyAvLyBkZWZhdWx0OiBjdXJyZW50IHllYXIgLSAzMFxuICBtYXhZZWFyPzogbnVtYmVyOyAvLyBkZWZhdWx0OiBjdXJyZW50IHllYXIgKyAzMFxuICBkaXNwbGF5Rm9ybWF0Pzogc3RyaW5nOyAvLyBkZWZhdWx0OiAnTU1NIERbLF0gWVlZWSdcbiAgYmFyVGl0bGVGb3JtYXQ/OiBzdHJpbmc7IC8vIGRlZmF1bHQ6ICdNTU1NIFlZWVknXG4gIGRheU5hbWVzRm9ybWF0Pzogc3RyaW5nOyAvLyBkZWZhdWx0ICdkZGQnXG4gIGJhclRpdGxlSWZFbXB0eT86IHN0cmluZztcbiAgZmlyc3RDYWxlbmRhckRheT86IG51bWJlcjsgLy8gMCA9IFN1bmRheSAoZGVmYXVsdCksIDEgPSBNb25kYXksIC4uXG4gIGxvY2FsZT86IG9iamVjdDtcbiAgbWluRGF0ZT86IERhdGU7XG4gIG1heERhdGU/OiBEYXRlO1xuICAvKiogUGxhY2Vob2xkZXIgZm9yIHRoZSBpbnB1dCBmaWVsZCAqL1xuICBwbGFjZWhvbGRlcj86IHN0cmluZztcbiAgLyoqIFtuZ0NsYXNzXSB0byBhZGQgdG8gdGhlIGlucHV0IGZpZWxkICovXG4gIGFkZENsYXNzPzogQWRkQ2xhc3M7XG4gIC8qKiBbbmdTdHlsZV0gdG8gYWRkIHRvIHRoZSBpbnB1dCBmaWVsZCAqL1xuICBhZGRTdHlsZT86IHsgW2s6IHN0cmluZ106IGFueSB9IHwgbnVsbDtcbiAgLyoqIElEIHRvIGFzc2lnbiB0byB0aGUgaW5wdXQgZmllbGQgKi9cbiAgZmllbGRJZD86IHN0cmluZztcbiAgLyoqIElmIGZhbHNlLCBiYXJUaXRsZUlmRW1wdHkgd2lsbCBiZSBkaXNyZWdhcmRlZCBhbmQgYSBkYXRlIHdpbGwgYWx3YXlzIGJlIHNob3duLiBEZWZhdWx0OiB0cnVlICovXG4gIHVzZUVtcHR5QmFyVGl0bGU/OiBib29sZWFuO1xufVxuXG4vLyBDb3VudGVyIGZvciBjYWxjdWxhdGluZyB0aGUgYXV0by1pbmNyZW1lbnRpbmcgZmllbGQgSURcbmxldCBjb3VudGVyID0gMDtcblxuLyoqXG4gKiBJbnRlcm5hbCBsaWJyYXJ5IGhlbHBlciB0aGF0IGhlbHBzIHRvIGNoZWNrIGlmIHZhbHVlIGlzIGVtcHR5XG4gKiBAcGFyYW0gdmFsdWVcbiAqL1xuY29uc3QgaXNOaWwgPSAodmFsdWU6IERhdGUgfCBEYXRlcGlja2VyT3B0aW9ucykgPT4ge1xuICByZXR1cm4gKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHx8ICh2YWx1ZSA9PT0gbnVsbCk7XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1kYXRlcGlja2VyJyxcbiAgdGVtcGxhdGVVcmw6ICduZy1kYXRlcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ25nLWRhdGVwaWNrZXIuY29tcG9uZW50LnNhc3MnXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUiwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdEYXRlcGlja2VyQ29tcG9uZW50KSwgbXVsdGk6IHRydWUgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nRGF0ZXBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIG9wdGlvbnM6IERhdGVwaWNrZXJPcHRpb25zO1xuXG4gIC8qKlxuICAgKiBEaXNhYmxlIGRhdGVwaWNrZXIncyBpbnB1dFxuICAgKi9cbiAgQElucHV0KCkgaGVhZGxlc3MgPSBmYWxzZTtcblxuICAvKipcbiAgICogU2V0IGRhdGVwaWNrZXIncyB2aXNpYmlsaXR5IHN0YXRlXG4gICAqL1xuICBASW5wdXQoKSBpc09wZW5lZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBEYXRlcGlja2VyIGRyb3Bkb3duIHBvc2l0aW9uXG4gICAqL1xuICBASW5wdXQoKSBwb3NpdGlvbiA9ICdib3R0b20tcmlnaHQnO1xuXG4gIHByaXZhdGUgcG9zaXRpb25zID0gWydib3R0b20tbGVmdCcsICdib3R0b20tcmlnaHQnLCAndG9wLWxlZnQnLCAndG9wLXJpZ2h0J107XG5cbiAgaW5uZXJWYWx1ZTogRGF0ZTtcbiAgZGlzcGxheVZhbHVlOiBzdHJpbmc7XG4gIGRpc3BsYXlGb3JtYXQ6IHN0cmluZztcbiAgZGF0ZTogRGF0ZTtcbiAgYmFyVGl0bGU6IHN0cmluZztcbiAgYmFyVGl0bGVGb3JtYXQ6IHN0cmluZztcbiAgYmFyVGl0bGVJZkVtcHR5OiBzdHJpbmc7XG4gIG1pblllYXI6IG51bWJlcjtcbiAgbWF4WWVhcjogbnVtYmVyO1xuICBmaXJzdENhbGVuZGFyRGF5OiBudW1iZXI7XG4gIHZpZXc6IHN0cmluZztcbiAgeWVhcnM6IHsgeWVhcjogbnVtYmVyOyBpc1RoaXNZZWFyOiBib29sZWFuIH1bXTtcbiAgZGF5TmFtZXM6IHN0cmluZ1tdO1xuICBkYXlOYW1lc0Zvcm1hdDogc3RyaW5nO1xuICBkYXlzOiB7XG4gICAgZGF0ZTogRGF0ZTtcbiAgICBkYXk6IG51bWJlcjtcbiAgICBtb250aDogbnVtYmVyO1xuICAgIHllYXI6IG51bWJlcjtcbiAgICBpblRoaXNNb250aDogYm9vbGVhbjtcbiAgICBpc1RvZGF5OiBib29sZWFuO1xuICAgIGlzU2VsZWN0ZWQ6IGJvb2xlYW47XG4gICAgaXNTZWxlY3RhYmxlOiBib29sZWFuO1xuICB9W107XG4gIGxvY2FsZTogb2JqZWN0O1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICBhZGRDbGFzczogQWRkQ2xhc3M7XG4gIGFkZFN0eWxlOiB7IFtrOiBzdHJpbmddOiBhbnkgfSB8IG51bGw7XG4gIGZpZWxkSWQ6IHN0cmluZztcbiAgdXNlRW1wdHlCYXJUaXRsZTogYm9vbGVhbjtcbiAgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9ICgpID0+IHsgfTtcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gKCkgPT4geyB9O1xuXG4gIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpOiBEYXRlIHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbDogRGF0ZSkge1xuICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHZhbDtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5pbm5lclZhbHVlKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy52aWV3ID0gJ2RheXMnO1xuICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgdGhpcy5zZXRPcHRpb25zKCk7XG4gICAgdGhpcy5pbml0RGF5TmFtZXMoKTtcbiAgICB0aGlzLmluaXRZZWFycygpO1xuXG4gICAgLy8gQ2hlY2sgaWYgJ3Bvc2l0aW9uJyBwcm9wZXJ0eSBpcyBjb3JyZWN0XG4gICAgaWYgKHRoaXMucG9zaXRpb25zLmluZGV4T2YodGhpcy5wb3NpdGlvbikgPT09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBuZy1kYXRlcGlja2VyOiBpbnZhbGlkIHBvc2l0aW9uIHByb3BlcnR5IHZhbHVlICcke3RoaXMucG9zaXRpb259JyAoZXhwZWN0ZWQ6ICR7dGhpcy5wb3NpdGlvbnMuam9pbignLCAnKX0pYCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICgnb3B0aW9ucycgaW4gY2hhbmdlcykge1xuICAgICAgdGhpcy5zZXRPcHRpb25zKCk7XG4gICAgICB0aGlzLmluaXREYXlOYW1lcygpO1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgICB0aGlzLmluaXRZZWFycygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBkZWZhdWx0RmllbGRJZCgpOiBzdHJpbmcge1xuICAgIC8vIE9ubHkgZXZhbHVhdGUgYW5kIGluY3JlbWVudCBpZiByZXF1aXJlZFxuICAgIGNvbnN0IHZhbHVlID0gYGRhdGVwaWNrZXItJHtjb3VudGVyKyt9YDtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2RlZmF1bHRGaWVsZElkJywge3ZhbHVlfSk7XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBzZXRPcHRpb25zKCk6IHZvaWQge1xuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTsgLy8gdGhpcyBjb25zdCB3YXMgYWRkZWQgYmVjYXVzZSBkdXJpbmcgbXkgdGVzdHMsIEkgbm90aWNlZCB0aGF0IGF0IHRoaXMgbGV2ZWwgdGhpcy5kYXRlIGlzIHVuZGVmaW5lZFxuICAgIHRoaXMubWluWWVhciA9IHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMubWluWWVhciB8fCBnZXRZZWFyKHRvZGF5KSAtIDMwO1xuICAgIHRoaXMubWF4WWVhciA9IHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMubWF4WWVhciB8fCBnZXRZZWFyKHRvZGF5KSArIDMwO1xuICAgIHRoaXMuZGlzcGxheUZvcm1hdCA9IHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuZGlzcGxheUZvcm1hdCB8fCAnTU1NIERbLF0gWVlZWSc7XG4gICAgdGhpcy5iYXJUaXRsZUZvcm1hdCA9IHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuYmFyVGl0bGVGb3JtYXQgfHwgJ01NTU0gWVlZWSc7XG4gICAgdGhpcy5kYXlOYW1lc0Zvcm1hdCA9IHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuZGF5TmFtZXNGb3JtYXQgfHwgJ2RkZCc7XG4gICAgdGhpcy5iYXJUaXRsZUlmRW1wdHkgPSB0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmJhclRpdGxlSWZFbXB0eSB8fCAnQ2xpY2sgdG8gc2VsZWN0IGEgZGF0ZSc7XG4gICAgdGhpcy5maXJzdENhbGVuZGFyRGF5ID0gdGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5maXJzdENhbGVuZGFyRGF5IHx8IDA7XG4gICAgdGhpcy5sb2NhbGUgPSB0aGlzLm9wdGlvbnMgJiYgeyBsb2NhbGU6IHRoaXMub3B0aW9ucy5sb2NhbGUgfSB8fCB7fTtcbiAgICB0aGlzLnBsYWNlaG9sZGVyID0gdGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5wbGFjZWhvbGRlciB8fCAnJztcbiAgICB0aGlzLmFkZENsYXNzID0gdGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5hZGRDbGFzcyB8fCB7fTtcbiAgICB0aGlzLmFkZFN0eWxlID0gdGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5hZGRTdHlsZSB8fCB7fTtcbiAgICB0aGlzLmZpZWxkSWQgPSB0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmZpZWxkSWQgfHwgdGhpcy5kZWZhdWx0RmllbGRJZDtcbiAgICB0aGlzLnVzZUVtcHR5QmFyVGl0bGUgPSB0aGlzLm9wdGlvbnMgJiYgJ3VzZUVtcHR5QmFyVGl0bGUnIGluIHRoaXMub3B0aW9ucyA/IHRoaXMub3B0aW9ucy51c2VFbXB0eUJhclRpdGxlIDogdHJ1ZTtcbiAgfVxuXG4gIG5leHRNb250aCgpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGUgPSBhZGRNb250aHModGhpcy5kYXRlLCAxKTtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHByZXZNb250aCgpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGUgPSBzdWJNb250aHModGhpcy5kYXRlLCAxKTtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHNldERhdGUoaTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5kYXRlID0gdGhpcy5kYXlzW2ldLmRhdGU7XG4gICAgdGhpcy52YWx1ZSA9IHRoaXMuZGF0ZTtcbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBzZXRZZWFyKGk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZGF0ZSA9IHNldFllYXIodGhpcy5kYXRlLCB0aGlzLnllYXJzW2ldLnllYXIpO1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMuaW5pdFllYXJzKCk7XG4gICAgdGhpcy52aWV3ID0gJ2RheXMnO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBzcGVjaWZpZWQgZGF0ZSBpcyBpbiByYW5nZSBvZiBtaW4gYW5kIG1heCBkYXRlc1xuICAgKiBAcGFyYW0gZGF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBpc0RhdGVTZWxlY3RhYmxlKGRhdGU6IERhdGUpOiBib29sZWFuIHtcbiAgICBpZiAoaXNOaWwodGhpcy5vcHRpb25zKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3QgbWluRGF0ZVNldCA9ICFpc05pbCh0aGlzLm9wdGlvbnMubWluRGF0ZSk7XG4gICAgY29uc3QgbWF4RGF0ZVNldCA9ICFpc05pbCh0aGlzLm9wdGlvbnMubWF4RGF0ZSk7XG4gICAgY29uc3QgdGltZXN0YW1wID0gZGF0ZS52YWx1ZU9mKCk7XG5cbiAgICBpZiAobWluRGF0ZVNldCAmJiAodGltZXN0YW1wIDwgdGhpcy5vcHRpb25zLm1pbkRhdGUudmFsdWVPZigpKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChtYXhEYXRlU2V0ICYmICh0aW1lc3RhbXAgPiB0aGlzLm9wdGlvbnMubWF4RGF0ZS52YWx1ZU9mKCkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIC8vIHRoaXMuZGF0ZSBtYXkgYmUgbnVsbCBhZnRlciAucmVzZXQoKTsgZmFsbCBiYWNrIHRvIGN1cnJlbnQgZGF0ZS5cbiAgICBjb25zdCBhY3R1YWxEYXRlID0gdGhpcy5kYXRlIHx8IG5ldyBEYXRlKCk7XG4gICAgY29uc3Qgc3RhcnQgPSBzdGFydE9mTW9udGgoYWN0dWFsRGF0ZSk7XG4gICAgY29uc3QgZW5kID0gZW5kT2ZNb250aChhY3R1YWxEYXRlKTtcblxuICAgIHRoaXMuZGF5cyA9IGVhY2hEYXkoc3RhcnQsIGVuZCkubWFwKGRhdGUgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGF0ZTogZGF0ZSxcbiAgICAgICAgZGF5OiBnZXREYXRlKGRhdGUpLFxuICAgICAgICBtb250aDogZ2V0TW9udGgoZGF0ZSksXG4gICAgICAgIHllYXI6IGdldFllYXIoZGF0ZSksXG4gICAgICAgIGluVGhpc01vbnRoOiB0cnVlLFxuICAgICAgICBpc1RvZGF5OiBpc1RvZGF5KGRhdGUpLFxuICAgICAgICBpc1NlbGVjdGVkOiBpc1NhbWVEYXkoZGF0ZSwgdGhpcy5pbm5lclZhbHVlKSAmJiBpc1NhbWVNb250aChkYXRlLCB0aGlzLmlubmVyVmFsdWUpICYmIGlzU2FtZVllYXIoZGF0ZSwgdGhpcy5pbm5lclZhbHVlKSxcbiAgICAgICAgaXNTZWxlY3RhYmxlOiB0aGlzLmlzRGF0ZVNlbGVjdGFibGUoZGF0ZSlcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICBjb25zdCB0bXAgPSBnZXREYXkoc3RhcnQpIC0gdGhpcy5maXJzdENhbGVuZGFyRGF5O1xuICAgIGNvbnN0IHByZXZEYXlzID0gdG1wIDwgMCA/IDcgLSB0aGlzLmZpcnN0Q2FsZW5kYXJEYXkgOiB0bXA7XG5cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBwcmV2RGF5czsgaSsrKSB7XG4gICAgICBjb25zdCBkYXRlID0gc3ViRGF5cyhzdGFydCwgaSk7XG4gICAgICB0aGlzLmRheXMudW5zaGlmdCh7XG4gICAgICAgIGRhdGU6IGRhdGUsXG4gICAgICAgIGRheTogZ2V0RGF0ZShkYXRlKSxcbiAgICAgICAgbW9udGg6IGdldE1vbnRoKGRhdGUpLFxuICAgICAgICB5ZWFyOiBnZXRZZWFyKGRhdGUpLFxuICAgICAgICBpblRoaXNNb250aDogZmFsc2UsXG4gICAgICAgIGlzVG9kYXk6IGlzVG9kYXkoZGF0ZSksXG4gICAgICAgIGlzU2VsZWN0ZWQ6IGlzU2FtZURheShkYXRlLCB0aGlzLmlubmVyVmFsdWUpICYmIGlzU2FtZU1vbnRoKGRhdGUsIHRoaXMuaW5uZXJWYWx1ZSkgJiYgaXNTYW1lWWVhcihkYXRlLCB0aGlzLmlubmVyVmFsdWUpLFxuICAgICAgICBpc1NlbGVjdGFibGU6IHRoaXMuaXNEYXRlU2VsZWN0YWJsZShkYXRlKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSBmb3JtYXQodGhpcy5pbm5lclZhbHVlLCB0aGlzLmRpc3BsYXlGb3JtYXQsIHRoaXMubG9jYWxlKTtcbiAgICAgIHRoaXMuYmFyVGl0bGUgPSBmb3JtYXQoc3RhcnQsIHRoaXMuYmFyVGl0bGVGb3JtYXQsIHRoaXMubG9jYWxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSAnJztcbiAgICAgIHRoaXMuYmFyVGl0bGUgPSB0aGlzLnVzZUVtcHR5QmFyVGl0bGUgPyB0aGlzLmJhclRpdGxlSWZFbXB0eSA6IGZvcm1hdChzdGFydCwgdGhpcy5iYXJUaXRsZUZvcm1hdCwgdGhpcy5sb2NhbGUpO1xuICAgIH1cbiAgfVxuXG4gIGluaXRZZWFycygpOiB2b2lkIHtcbiAgICBjb25zdCByYW5nZSA9IHRoaXMubWF4WWVhciAtIHRoaXMubWluWWVhcjtcbiAgICB0aGlzLnllYXJzID0gQXJyYXkuZnJvbShuZXcgQXJyYXkocmFuZ2UpLCAoeCwgaSkgPT4gaSArIHRoaXMubWluWWVhcikubWFwKHllYXIgPT4ge1xuICAgICAgcmV0dXJuIHsgeWVhcjogeWVhciwgaXNUaGlzWWVhcjogeWVhciA9PT0gZ2V0WWVhcih0aGlzLmRhdGUpIH07XG4gICAgfSk7XG4gIH1cblxuICBpbml0RGF5TmFtZXMoKTogdm9pZCB7XG4gICAgdGhpcy5kYXlOYW1lcyA9IFtdO1xuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5maXJzdENhbGVuZGFyRGF5O1xuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8PSA2ICsgc3RhcnQ7IGkrKykge1xuICAgICAgY29uc3QgZGF0ZSA9IHNldERheShuZXcgRGF0ZSgpLCBpKTtcbiAgICAgIHRoaXMuZGF5TmFtZXMucHVzaChmb3JtYXQoZGF0ZSwgdGhpcy5kYXlOYW1lc0Zvcm1hdCwgdGhpcy5sb2NhbGUpKTtcbiAgICB9XG4gIH1cblxuICB0b2dnbGVWaWV3KCk6IHZvaWQge1xuICAgIHRoaXMudmlldyA9IHRoaXMudmlldyA9PT0gJ2RheXMnID8gJ3llYXJzJyA6ICdkYXlzJztcbiAgfVxuXG4gIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICB0aGlzLmlzT3BlbmVkID0gIXRoaXMuaXNPcGVuZWQ7XG5cbiAgICBpZiAoIXRoaXMuaXNPcGVuZWQgJiYgdGhpcy52aWV3ID09PSAneWVhcnMnKSB7XG4gICAgICB0aGlzLnRvZ2dsZVZpZXcoKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLmlzT3BlbmVkID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy52aWV3ID09PSAneWVhcnMnKSB7XG4gICAgICB0aGlzLnRvZ2dsZVZpZXcoKTtcbiAgICB9XG4gIH1cblxuICByZXNldChmaXJlVmFsdWVDaGFuZ2VFdmVudCA9IGZhbHNlKTogdm9pZCB7XG4gICAgdGhpcy5kYXRlID0gbnVsbDtcbiAgICB0aGlzLmlubmVyVmFsdWUgPSBudWxsO1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIGlmIChmaXJlVmFsdWVDaGFuZ2VFdmVudCAmJiB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2spIHtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLmlubmVyVmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsOiBEYXRlKSB7XG4gICAgaWYgKHZhbCkge1xuICAgICAgdGhpcy5kYXRlID0gdmFsO1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdmFsO1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IGZvcm1hdCh0aGlzLmlubmVyVmFsdWUsIHRoaXMuZGlzcGxheUZvcm1hdCwgdGhpcy5sb2NhbGUpO1xuICAgICAgdGhpcy5iYXJUaXRsZSA9IGZvcm1hdChzdGFydE9mTW9udGgodmFsKSwgdGhpcy5iYXJUaXRsZUZvcm1hdCwgdGhpcy5sb2NhbGUpO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSkgb25CbHVyKGU6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuaXNPcGVuZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpbnB1dCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZ3gtZGF0ZXBpY2tlci1pbnB1dCcpO1xuXG4gICAgaWYgKGlucHV0ID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZS50YXJnZXQgPT09IGlucHV0IHx8IGlucHV0LmNvbnRhaW5zKDxhbnk+ZS50YXJnZXQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5neC1kYXRlcGlja2VyLWNhbGVuZGFyLWNvbnRhaW5lcicpO1xuICAgIGlmIChjb250YWluZXIgJiYgY29udGFpbmVyICE9PSBlLnRhcmdldCAmJiAhY29udGFpbmVyLmNvbnRhaW5zKDxhbnk+ZS50YXJnZXQpICYmICEoPGFueT5lLnRhcmdldCkuY2xhc3NMaXN0LmNvbnRhaW5zKCd5ZWFyLXVuaXQnKSkge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxufVxuIl19