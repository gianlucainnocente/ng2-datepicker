var NgDatepickerComponent_1;
import { __decorate } from "tslib";
import { Component, OnInit, Input, OnChanges, SimpleChanges, ElementRef, HostListener, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { startOfMonth, endOfMonth, addMonths, subMonths, setYear, eachDay, getDate, getMonth, getYear, isToday, isSameDay, isSameMonth, isSameYear, format, getDay, subDays, setDay } from 'date-fns';
// Counter for calculating the auto-incrementing field ID
let counter = 0;
/**
 * Internal library helper that helps to check if value is empty
 * @param value
 */
const isNil = (value) => {
    return (typeof value === 'undefined') || (value === null);
};
const ɵ0 = isNil;
let NgDatepickerComponent = NgDatepickerComponent_1 = class NgDatepickerComponent {
    constructor(elementRef) {
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
        this.onTouchedCallback = () => { };
        this.onChangeCallback = () => { };
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    get value() {
        return this.innerValue;
    }
    set value(val) {
        this.innerValue = val;
        this.onChangeCallback(this.innerValue);
    }
    ngOnInit() {
        this.view = 'days';
        this.date = new Date();
        this.setOptions();
        this.initDayNames();
        this.initYears();
        // Check if 'position' property is correct
        if (this.positions.indexOf(this.position) === -1) {
            throw new TypeError(`ng-datepicker: invalid position property value '${this.position}' (expected: ${this.positions.join(', ')})`);
        }
    }
    ngOnChanges(changes) {
        if ('options' in changes) {
            this.setOptions();
            this.initDayNames();
            this.init();
            this.initYears();
        }
    }
    get defaultFieldId() {
        // Only evaluate and increment if required
        const value = `datepicker-${counter++}`;
        Object.defineProperty(this, 'defaultFieldId', { value });
        return value;
    }
    setOptions() {
        const today = new Date(); // this const was added because during my tests, I noticed that at this level this.date is undefined
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
    }
    nextMonth() {
        this.date = addMonths(this.date, 1);
        this.init();
    }
    prevMonth() {
        this.date = subMonths(this.date, 1);
        this.init();
    }
    setDate(i) {
        this.date = this.days[i].date;
        this.value = this.date;
        this.init();
        this.close();
    }
    setYear(i) {
        this.date = setYear(this.date, this.years[i].year);
        this.init();
        this.initYears();
        this.view = 'days';
    }
    /**
     * Checks if specified date is in range of min and max dates
     * @param date
     */
    isDateSelectable(date) {
        if (isNil(this.options)) {
            return true;
        }
        const minDateSet = !isNil(this.options.minDate);
        const maxDateSet = !isNil(this.options.maxDate);
        const timestamp = date.valueOf();
        if (minDateSet && (timestamp < this.options.minDate.valueOf())) {
            return false;
        }
        if (maxDateSet && (timestamp > this.options.maxDate.valueOf())) {
            return false;
        }
        return true;
    }
    init() {
        // this.date may be null after .reset(); fall back to current date.
        const actualDate = this.date || new Date();
        const start = startOfMonth(actualDate);
        const end = endOfMonth(actualDate);
        this.days = eachDay(start, end).map(date => {
            return {
                date: date,
                day: getDate(date),
                month: getMonth(date),
                year: getYear(date),
                inThisMonth: true,
                isToday: isToday(date),
                isSelected: isSameDay(date, this.innerValue) && isSameMonth(date, this.innerValue) && isSameYear(date, this.innerValue),
                isSelectable: this.isDateSelectable(date)
            };
        });
        const tmp = getDay(start) - this.firstCalendarDay;
        const prevDays = tmp < 0 ? 7 - this.firstCalendarDay : tmp;
        for (let i = 1; i <= prevDays; i++) {
            const date = subDays(start, i);
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
    }
    initYears() {
        const range = this.maxYear - this.minYear;
        this.years = Array.from(new Array(range), (x, i) => i + this.minYear).map(year => {
            return { year: year, isThisYear: year === getYear(this.date) };
        });
    }
    initDayNames() {
        this.dayNames = [];
        const start = this.firstCalendarDay;
        for (let i = start; i <= 6 + start; i++) {
            const date = setDay(new Date(), i);
            this.dayNames.push(format(date, this.dayNamesFormat, this.locale));
        }
    }
    toggleView() {
        this.view = this.view === 'days' ? 'years' : 'days';
    }
    toggle() {
        this.isOpened = !this.isOpened;
        if (!this.isOpened && this.view === 'years') {
            this.toggleView();
        }
    }
    close() {
        this.isOpened = false;
        if (this.view === 'years') {
            this.toggleView();
        }
    }
    reset(fireValueChangeEvent = false) {
        this.date = null;
        this.innerValue = null;
        this.init();
        if (fireValueChangeEvent && this.onChangeCallback) {
            this.onChangeCallback(this.innerValue);
        }
    }
    writeValue(val) {
        if (val) {
            this.date = val;
            this.innerValue = val;
            this.init();
            this.displayValue = format(this.innerValue, this.displayFormat, this.locale);
            this.barTitle = format(startOfMonth(val), this.barTitleFormat, this.locale);
        }
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    onBlur(e) {
        if (!this.isOpened) {
            return;
        }
        const input = this.elementRef.nativeElement.querySelector('.ngx-datepicker-input');
        if (input == null) {
            return;
        }
        if (e.target === input || input.contains(e.target)) {
            return;
        }
        const container = this.elementRef.nativeElement.querySelector('.ngx-datepicker-calendar-container');
        if (container && container !== e.target && !container.contains(e.target) && !e.target.classList.contains('year-unit')) {
            this.close();
        }
    }
};
NgDatepickerComponent.ctorParameters = () => [
    { type: ElementRef }
];
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
            { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgDatepickerComponent_1), multi: true }
        ],
        styles: [".ngx-datepicker-position-bottom-left{top:40px;right:0}.ngx-datepicker-position-bottom-right{top:40px;left:0}.ngx-datepicker-position-top-left{bottom:40px;right:0}.ngx-datepicker-position-top-right{bottom:40px;left:0}.ngx-datepicker-container{position:relative}.ngx-datepicker-container .ngx-datepicker-input{padding:5px 10px;font-size:14px;width:200px;outline:0;border:1px solid #dfe3e9}.ngx-datepicker-container .ngx-datepicker-calendar-container{position:absolute;width:300px;background:#fff;box-shadow:0 1px 4px 0 rgba(0,0,0,.08);border:1px solid #dfe3e9;border-radius:4px}.ngx-datepicker-container .ngx-datepicker-calendar-container .topbar-container{width:100%;height:50px;padding:15px;border-bottom:1px solid #dfe3e9;display:flex;justify-content:space-between;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ngx-datepicker-container .ngx-datepicker-calendar-container .topbar-container svg{cursor:pointer}.ngx-datepicker-container .ngx-datepicker-calendar-container .topbar-container svg g{fill:#ced0da}.ngx-datepicker-container .ngx-datepicker-calendar-container .topbar-container .topbar-title{color:#3d495c;font-size:14px;font-weight:600;cursor:pointer}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container{width:100%;height:100%;padding:15px 10px 0;font-size:12px;font-weight:500}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-day-names{color:#a4a9b1;width:100%;display:flex;align-items:center}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-day-names .day-name-unit{width:calc(100% / 7);text-transform:uppercase;text-align:center}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years{padding:15px 0;width:100%;display:inline-block;max-height:275px;overflow:hidden}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit{width:calc(100% / 7);height:40px;display:inline-flex;float:left;align-items:center;justify-content:center;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border-radius:50%;color:#3d495c}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit.is-prev-month,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit.is-prev-month,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit.is-prev-month,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit.is-prev-month{color:#a4a9b1}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit.is-today,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit:hover,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit.is-today,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit:hover,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit.is-today,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit:hover,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit.is-today,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit:hover{background:#a4a9b1;color:#fff}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit.is-selected,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit.is-selected,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit.is-selected,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit.is-selected{background:#1a91eb;color:#fff}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit.is-disabled,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit.is-disabled,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit.is-disabled,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit.is-disabled{cursor:not-allowed;color:#a4a9b1}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit.is-disabled:hover,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit.is-disabled:hover,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit.is-disabled:hover,.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit.is-disabled:hover{background:0 0}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years{height:210px;display:block;padding:0}.ngx-datepicker-container .ngx-datepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit{width:calc(100% / 3);border-radius:10px}"]
    })
], NgDatepickerComponent);
export { NgDatepickerComponent };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZGF0ZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbInNyYy9uZy1kYXRlcGlja2VyL2NvbXBvbmVudC9uZy1kYXRlcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pILE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQ0wsWUFBWSxFQUNaLFVBQVUsRUFDVixTQUFTLEVBQ1QsU0FBUyxFQUNULE9BQU8sRUFDUCxPQUFPLEVBQ1AsT0FBTyxFQUNQLFFBQVEsRUFDUixPQUFPLEVBQ1AsT0FBTyxFQUNQLFNBQVMsRUFDVCxXQUFXLEVBQ1gsVUFBVSxFQUNWLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLE1BQU0sRUFDUCxNQUFNLFVBQVUsQ0FBQztBQTJCbEIseURBQXlEO0FBQ3pELElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztBQUVoQjs7O0dBR0c7QUFDSCxNQUFNLEtBQUssR0FBRyxDQUFDLEtBQStCLEVBQUUsRUFBRTtJQUNoRCxPQUFPLENBQUMsT0FBTyxLQUFLLEtBQUssV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUM7QUFDNUQsQ0FBQyxDQUFDOztBQVVGLElBQWEscUJBQXFCLDZCQUFsQyxNQUFhLHFCQUFxQjtJQW9FaEMsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQWpFMUM7O1dBRUc7UUFDTSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRTFCOztXQUVHO1FBQ00sYUFBUSxHQUFHLEtBQUssQ0FBQztRQUUxQjs7V0FFRztRQUNN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QUUsQ0FBQztTQUNkO0lBQ0gsQ0FBQztDQUNGLENBQUE7O1lBbE9pQyxVQUFVOztBQW5FakM7SUFBUixLQUFLLEVBQUU7c0RBQTRCO0FBSzNCO0lBQVIsS0FBSyxFQUFFO3VEQUFrQjtBQUtqQjtJQUFSLEtBQUssRUFBRTt1REFBa0I7QUFLakI7SUFBUixLQUFLLEVBQUU7dURBQTJCO0FBa1FTO0lBQTNDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO21EQW1CMUM7QUFyU1UscUJBQXFCO0lBUmpDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxlQUFlO1FBQ3pCLCtrSEFBMkM7UUFFM0MsU0FBUyxFQUFFO1lBQ1QsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyx1QkFBcUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7U0FDbEc7O0tBQ0YsQ0FBQztHQUNXLHFCQUFxQixDQXNTakM7U0F0U1kscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgc3RhcnRPZk1vbnRoLFxuICBlbmRPZk1vbnRoLFxuICBhZGRNb250aHMsXG4gIHN1Yk1vbnRocyxcbiAgc2V0WWVhcixcbiAgZWFjaERheSxcbiAgZ2V0RGF0ZSxcbiAgZ2V0TW9udGgsXG4gIGdldFllYXIsXG4gIGlzVG9kYXksXG4gIGlzU2FtZURheSxcbiAgaXNTYW1lTW9udGgsXG4gIGlzU2FtZVllYXIsXG4gIGZvcm1hdCxcbiAgZ2V0RGF5LFxuICBzdWJEYXlzLFxuICBzZXREYXlcbn0gZnJvbSAnZGF0ZS1mbnMnO1xuXG5leHBvcnQgdHlwZSBBZGRDbGFzcyA9IHN0cmluZyB8IHN0cmluZ1tdIHwgeyBbazogc3RyaW5nXTogYm9vbGVhbiB9IHwgbnVsbDtcblxuZXhwb3J0IGludGVyZmFjZSBEYXRlcGlja2VyT3B0aW9ucyB7XG4gIG1pblllYXI/OiBudW1iZXI7IC8vIGRlZmF1bHQ6IGN1cnJlbnQgeWVhciAtIDMwXG4gIG1heFllYXI/OiBudW1iZXI7IC8vIGRlZmF1bHQ6IGN1cnJlbnQgeWVhciArIDMwXG4gIGRpc3BsYXlGb3JtYXQ/OiBzdHJpbmc7IC8vIGRlZmF1bHQ6ICdNTU0gRFssXSBZWVlZJ1xuICBiYXJUaXRsZUZvcm1hdD86IHN0cmluZzsgLy8gZGVmYXVsdDogJ01NTU0gWVlZWSdcbiAgZGF5TmFtZXNGb3JtYXQ/OiBzdHJpbmc7IC8vIGRlZmF1bHQgJ2RkZCdcbiAgYmFyVGl0bGVJZkVtcHR5Pzogc3RyaW5nO1xuICBmaXJzdENhbGVuZGFyRGF5PzogbnVtYmVyOyAvLyAwID0gU3VuZGF5IChkZWZhdWx0KSwgMSA9IE1vbmRheSwgLi5cbiAgbG9jYWxlPzogb2JqZWN0O1xuICBtaW5EYXRlPzogRGF0ZTtcbiAgbWF4RGF0ZT86IERhdGU7XG4gIC8qKiBQbGFjZWhvbGRlciBmb3IgdGhlIGlucHV0IGZpZWxkICovXG4gIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICAvKiogW25nQ2xhc3NdIHRvIGFkZCB0byB0aGUgaW5wdXQgZmllbGQgKi9cbiAgYWRkQ2xhc3M/OiBBZGRDbGFzcztcbiAgLyoqIFtuZ1N0eWxlXSB0byBhZGQgdG8gdGhlIGlucHV0IGZpZWxkICovXG4gIGFkZFN0eWxlPzogeyBbazogc3RyaW5nXTogYW55IH0gfCBudWxsO1xuICAvKiogSUQgdG8gYXNzaWduIHRvIHRoZSBpbnB1dCBmaWVsZCAqL1xuICBmaWVsZElkPzogc3RyaW5nO1xuICAvKiogSWYgZmFsc2UsIGJhclRpdGxlSWZFbXB0eSB3aWxsIGJlIGRpc3JlZ2FyZGVkIGFuZCBhIGRhdGUgd2lsbCBhbHdheXMgYmUgc2hvd24uIERlZmF1bHQ6IHRydWUgKi9cbiAgdXNlRW1wdHlCYXJUaXRsZT86IGJvb2xlYW47XG59XG5cbi8vIENvdW50ZXIgZm9yIGNhbGN1bGF0aW5nIHRoZSBhdXRvLWluY3JlbWVudGluZyBmaWVsZCBJRFxubGV0IGNvdW50ZXIgPSAwO1xuXG4vKipcbiAqIEludGVybmFsIGxpYnJhcnkgaGVscGVyIHRoYXQgaGVscHMgdG8gY2hlY2sgaWYgdmFsdWUgaXMgZW1wdHlcbiAqIEBwYXJhbSB2YWx1ZVxuICovXG5jb25zdCBpc05pbCA9ICh2YWx1ZTogRGF0ZSB8IERhdGVwaWNrZXJPcHRpb25zKSA9PiB7XG4gIHJldHVybiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykgfHwgKHZhbHVlID09PSBudWxsKTtcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLWRhdGVwaWNrZXInLFxuICB0ZW1wbGF0ZVVybDogJ25nLWRhdGVwaWNrZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbmctZGF0ZXBpY2tlci5jb21wb25lbnQuc2FzcyddLFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ0RhdGVwaWNrZXJDb21wb25lbnQpLCBtdWx0aTogdHJ1ZSB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmdEYXRlcGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgb3B0aW9uczogRGF0ZXBpY2tlck9wdGlvbnM7XG5cbiAgLyoqXG4gICAqIERpc2FibGUgZGF0ZXBpY2tlcidzIGlucHV0XG4gICAqL1xuICBASW5wdXQoKSBoZWFkbGVzcyA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBTZXQgZGF0ZXBpY2tlcidzIHZpc2liaWxpdHkgc3RhdGVcbiAgICovXG4gIEBJbnB1dCgpIGlzT3BlbmVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIERhdGVwaWNrZXIgZHJvcGRvd24gcG9zaXRpb25cbiAgICovXG4gIEBJbnB1dCgpIHBvc2l0aW9uID0gJ2JvdHRvbS1yaWdodCc7XG5cbiAgcHJpdmF0ZSBwb3NpdGlvbnMgPSBbJ2JvdHRvbS1sZWZ0JywgJ2JvdHRvbS1yaWdodCcsICd0b3AtbGVmdCcsICd0b3AtcmlnaHQnXTtcblxuICBpbm5lclZhbHVlOiBEYXRlO1xuICBkaXNwbGF5VmFsdWU6IHN0cmluZztcbiAgZGlzcGxheUZvcm1hdDogc3RyaW5nO1xuICBkYXRlOiBEYXRlO1xuICBiYXJUaXRsZTogc3RyaW5nO1xuICBiYXJUaXRsZUZvcm1hdDogc3RyaW5nO1xuICBiYXJUaXRsZUlmRW1wdHk6IHN0cmluZztcbiAgbWluWWVhcjogbnVtYmVyO1xuICBtYXhZZWFyOiBudW1iZXI7XG4gIGZpcnN0Q2FsZW5kYXJEYXk6IG51bWJlcjtcbiAgdmlldzogc3RyaW5nO1xuICB5ZWFyczogeyB5ZWFyOiBudW1iZXI7IGlzVGhpc1llYXI6IGJvb2xlYW4gfVtdO1xuICBkYXlOYW1lczogc3RyaW5nW107XG4gIGRheU5hbWVzRm9ybWF0OiBzdHJpbmc7XG4gIGRheXM6IHtcbiAgICBkYXRlOiBEYXRlO1xuICAgIGRheTogbnVtYmVyO1xuICAgIG1vbnRoOiBudW1iZXI7XG4gICAgeWVhcjogbnVtYmVyO1xuICAgIGluVGhpc01vbnRoOiBib29sZWFuO1xuICAgIGlzVG9kYXk6IGJvb2xlYW47XG4gICAgaXNTZWxlY3RlZDogYm9vbGVhbjtcbiAgICBpc1NlbGVjdGFibGU6IGJvb2xlYW47XG4gIH1bXTtcbiAgbG9jYWxlOiBvYmplY3Q7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIGFkZENsYXNzOiBBZGRDbGFzcztcbiAgYWRkU3R5bGU6IHsgW2s6IHN0cmluZ106IGFueSB9IHwgbnVsbDtcbiAgZmllbGRJZDogc3RyaW5nO1xuICB1c2VFbXB0eUJhclRpdGxlOiBib29sZWFuO1xuICBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gKCkgPT4geyB9O1xuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7IH07XG5cbiAgcHVibGljIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCk6IERhdGUge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsOiBEYXRlKSB7XG4gICAgdGhpcy5pbm5lclZhbHVlID0gdmFsO1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLmlubmVyVmFsdWUpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnZpZXcgPSAnZGF5cyc7XG4gICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKTtcbiAgICB0aGlzLnNldE9wdGlvbnMoKTtcbiAgICB0aGlzLmluaXREYXlOYW1lcygpO1xuICAgIHRoaXMuaW5pdFllYXJzKCk7XG5cbiAgICAvLyBDaGVjayBpZiAncG9zaXRpb24nIHByb3BlcnR5IGlzIGNvcnJlY3RcbiAgICBpZiAodGhpcy5wb3NpdGlvbnMuaW5kZXhPZih0aGlzLnBvc2l0aW9uKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYG5nLWRhdGVwaWNrZXI6IGludmFsaWQgcG9zaXRpb24gcHJvcGVydHkgdmFsdWUgJyR7dGhpcy5wb3NpdGlvbn0nIChleHBlY3RlZDogJHt0aGlzLnBvc2l0aW9ucy5qb2luKCcsICcpfSlgKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCdvcHRpb25zJyBpbiBjaGFuZ2VzKSB7XG4gICAgICB0aGlzLnNldE9wdGlvbnMoKTtcbiAgICAgIHRoaXMuaW5pdERheU5hbWVzKCk7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICAgIHRoaXMuaW5pdFllYXJzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGRlZmF1bHRGaWVsZElkKCk6IHN0cmluZyB7XG4gICAgLy8gT25seSBldmFsdWF0ZSBhbmQgaW5jcmVtZW50IGlmIHJlcXVpcmVkXG4gICAgY29uc3QgdmFsdWUgPSBgZGF0ZXBpY2tlci0ke2NvdW50ZXIrK31gO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnZGVmYXVsdEZpZWxkSWQnLCB7dmFsdWV9KTtcblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHNldE9wdGlvbnMoKTogdm9pZCB7XG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpOyAvLyB0aGlzIGNvbnN0IHdhcyBhZGRlZCBiZWNhdXNlIGR1cmluZyBteSB0ZXN0cywgSSBub3RpY2VkIHRoYXQgYXQgdGhpcyBsZXZlbCB0aGlzLmRhdGUgaXMgdW5kZWZpbmVkXG4gICAgdGhpcy5taW5ZZWFyID0gdGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5taW5ZZWFyIHx8IGdldFllYXIodG9kYXkpIC0gMzA7XG4gICAgdGhpcy5tYXhZZWFyID0gdGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5tYXhZZWFyIHx8IGdldFllYXIodG9kYXkpICsgMzA7XG4gICAgdGhpcy5kaXNwbGF5Rm9ybWF0ID0gdGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5kaXNwbGF5Rm9ybWF0IHx8ICdNTU0gRFssXSBZWVlZJztcbiAgICB0aGlzLmJhclRpdGxlRm9ybWF0ID0gdGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5iYXJUaXRsZUZvcm1hdCB8fCAnTU1NTSBZWVlZJztcbiAgICB0aGlzLmRheU5hbWVzRm9ybWF0ID0gdGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5kYXlOYW1lc0Zvcm1hdCB8fCAnZGRkJztcbiAgICB0aGlzLmJhclRpdGxlSWZFbXB0eSA9IHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuYmFyVGl0bGVJZkVtcHR5IHx8ICdDbGljayB0byBzZWxlY3QgYSBkYXRlJztcbiAgICB0aGlzLmZpcnN0Q2FsZW5kYXJEYXkgPSB0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmZpcnN0Q2FsZW5kYXJEYXkgfHwgMDtcbiAgICB0aGlzLmxvY2FsZSA9IHRoaXMub3B0aW9ucyAmJiB7IGxvY2FsZTogdGhpcy5vcHRpb25zLmxvY2FsZSB9IHx8IHt9O1xuICAgIHRoaXMucGxhY2Vob2xkZXIgPSB0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLnBsYWNlaG9sZGVyIHx8ICcnO1xuICAgIHRoaXMuYWRkQ2xhc3MgPSB0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmFkZENsYXNzIHx8IHt9O1xuICAgIHRoaXMuYWRkU3R5bGUgPSB0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmFkZFN0eWxlIHx8IHt9O1xuICAgIHRoaXMuZmllbGRJZCA9IHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuZmllbGRJZCB8fCB0aGlzLmRlZmF1bHRGaWVsZElkO1xuICAgIHRoaXMudXNlRW1wdHlCYXJUaXRsZSA9IHRoaXMub3B0aW9ucyAmJiAndXNlRW1wdHlCYXJUaXRsZScgaW4gdGhpcy5vcHRpb25zID8gdGhpcy5vcHRpb25zLnVzZUVtcHR5QmFyVGl0bGUgOiB0cnVlO1xuICB9XG5cbiAgbmV4dE1vbnRoKCk6IHZvaWQge1xuICAgIHRoaXMuZGF0ZSA9IGFkZE1vbnRocyh0aGlzLmRhdGUsIDEpO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgcHJldk1vbnRoKCk6IHZvaWQge1xuICAgIHRoaXMuZGF0ZSA9IHN1Yk1vbnRocyh0aGlzLmRhdGUsIDEpO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgc2V0RGF0ZShpOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGUgPSB0aGlzLmRheXNbaV0uZGF0ZTtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5kYXRlO1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIHNldFllYXIoaTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5kYXRlID0gc2V0WWVhcih0aGlzLmRhdGUsIHRoaXMueWVhcnNbaV0ueWVhcik7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5pbml0WWVhcnMoKTtcbiAgICB0aGlzLnZpZXcgPSAnZGF5cyc7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHNwZWNpZmllZCBkYXRlIGlzIGluIHJhbmdlIG9mIG1pbiBhbmQgbWF4IGRhdGVzXG4gICAqIEBwYXJhbSBkYXRlXG4gICAqL1xuICBwcml2YXRlIGlzRGF0ZVNlbGVjdGFibGUoZGF0ZTogRGF0ZSk6IGJvb2xlYW4ge1xuICAgIGlmIChpc05pbCh0aGlzLm9wdGlvbnMpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBtaW5EYXRlU2V0ID0gIWlzTmlsKHRoaXMub3B0aW9ucy5taW5EYXRlKTtcbiAgICBjb25zdCBtYXhEYXRlU2V0ID0gIWlzTmlsKHRoaXMub3B0aW9ucy5tYXhEYXRlKTtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBkYXRlLnZhbHVlT2YoKTtcblxuICAgIGlmIChtaW5EYXRlU2V0ICYmICh0aW1lc3RhbXAgPCB0aGlzLm9wdGlvbnMubWluRGF0ZS52YWx1ZU9mKCkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKG1heERhdGVTZXQgJiYgKHRpbWVzdGFtcCA+IHRoaXMub3B0aW9ucy5tYXhEYXRlLnZhbHVlT2YoKSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgLy8gdGhpcy5kYXRlIG1heSBiZSBudWxsIGFmdGVyIC5yZXNldCgpOyBmYWxsIGJhY2sgdG8gY3VycmVudCBkYXRlLlxuICAgIGNvbnN0IGFjdHVhbERhdGUgPSB0aGlzLmRhdGUgfHwgbmV3IERhdGUoKTtcbiAgICBjb25zdCBzdGFydCA9IHN0YXJ0T2ZNb250aChhY3R1YWxEYXRlKTtcbiAgICBjb25zdCBlbmQgPSBlbmRPZk1vbnRoKGFjdHVhbERhdGUpO1xuXG4gICAgdGhpcy5kYXlzID0gZWFjaERheShzdGFydCwgZW5kKS5tYXAoZGF0ZSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkYXRlOiBkYXRlLFxuICAgICAgICBkYXk6IGdldERhdGUoZGF0ZSksXG4gICAgICAgIG1vbnRoOiBnZXRNb250aChkYXRlKSxcbiAgICAgICAgeWVhcjogZ2V0WWVhcihkYXRlKSxcbiAgICAgICAgaW5UaGlzTW9udGg6IHRydWUsXG4gICAgICAgIGlzVG9kYXk6IGlzVG9kYXkoZGF0ZSksXG4gICAgICAgIGlzU2VsZWN0ZWQ6IGlzU2FtZURheShkYXRlLCB0aGlzLmlubmVyVmFsdWUpICYmIGlzU2FtZU1vbnRoKGRhdGUsIHRoaXMuaW5uZXJWYWx1ZSkgJiYgaXNTYW1lWWVhcihkYXRlLCB0aGlzLmlubmVyVmFsdWUpLFxuICAgICAgICBpc1NlbGVjdGFibGU6IHRoaXMuaXNEYXRlU2VsZWN0YWJsZShkYXRlKVxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHRtcCA9IGdldERheShzdGFydCkgLSB0aGlzLmZpcnN0Q2FsZW5kYXJEYXk7XG4gICAgY29uc3QgcHJldkRheXMgPSB0bXAgPCAwID8gNyAtIHRoaXMuZmlyc3RDYWxlbmRhckRheSA6IHRtcDtcblxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHByZXZEYXlzOyBpKyspIHtcbiAgICAgIGNvbnN0IGRhdGUgPSBzdWJEYXlzKHN0YXJ0LCBpKTtcbiAgICAgIHRoaXMuZGF5cy51bnNoaWZ0KHtcbiAgICAgICAgZGF0ZTogZGF0ZSxcbiAgICAgICAgZGF5OiBnZXREYXRlKGRhdGUpLFxuICAgICAgICBtb250aDogZ2V0TW9udGgoZGF0ZSksXG4gICAgICAgIHllYXI6IGdldFllYXIoZGF0ZSksXG4gICAgICAgIGluVGhpc01vbnRoOiBmYWxzZSxcbiAgICAgICAgaXNUb2RheTogaXNUb2RheShkYXRlKSxcbiAgICAgICAgaXNTZWxlY3RlZDogaXNTYW1lRGF5KGRhdGUsIHRoaXMuaW5uZXJWYWx1ZSkgJiYgaXNTYW1lTW9udGgoZGF0ZSwgdGhpcy5pbm5lclZhbHVlKSAmJiBpc1NhbWVZZWFyKGRhdGUsIHRoaXMuaW5uZXJWYWx1ZSksXG4gICAgICAgIGlzU2VsZWN0YWJsZTogdGhpcy5pc0RhdGVTZWxlY3RhYmxlKGRhdGUpXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IGZvcm1hdCh0aGlzLmlubmVyVmFsdWUsIHRoaXMuZGlzcGxheUZvcm1hdCwgdGhpcy5sb2NhbGUpO1xuICAgICAgdGhpcy5iYXJUaXRsZSA9IGZvcm1hdChzdGFydCwgdGhpcy5iYXJUaXRsZUZvcm1hdCwgdGhpcy5sb2NhbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9ICcnO1xuICAgICAgdGhpcy5iYXJUaXRsZSA9IHRoaXMudXNlRW1wdHlCYXJUaXRsZSA/IHRoaXMuYmFyVGl0bGVJZkVtcHR5IDogZm9ybWF0KHN0YXJ0LCB0aGlzLmJhclRpdGxlRm9ybWF0LCB0aGlzLmxvY2FsZSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdFllYXJzKCk6IHZvaWQge1xuICAgIGNvbnN0IHJhbmdlID0gdGhpcy5tYXhZZWFyIC0gdGhpcy5taW5ZZWFyO1xuICAgIHRoaXMueWVhcnMgPSBBcnJheS5mcm9tKG5ldyBBcnJheShyYW5nZSksICh4LCBpKSA9PiBpICsgdGhpcy5taW5ZZWFyKS5tYXAoeWVhciA9PiB7XG4gICAgICByZXR1cm4geyB5ZWFyOiB5ZWFyLCBpc1RoaXNZZWFyOiB5ZWFyID09PSBnZXRZZWFyKHRoaXMuZGF0ZSkgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGluaXREYXlOYW1lcygpOiB2b2lkIHtcbiAgICB0aGlzLmRheU5hbWVzID0gW107XG4gICAgY29uc3Qgc3RhcnQgPSB0aGlzLmZpcnN0Q2FsZW5kYXJEYXk7XG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDw9IDYgKyBzdGFydDsgaSsrKSB7XG4gICAgICBjb25zdCBkYXRlID0gc2V0RGF5KG5ldyBEYXRlKCksIGkpO1xuICAgICAgdGhpcy5kYXlOYW1lcy5wdXNoKGZvcm1hdChkYXRlLCB0aGlzLmRheU5hbWVzRm9ybWF0LCB0aGlzLmxvY2FsZSkpO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZVZpZXcoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3ID0gdGhpcy52aWV3ID09PSAnZGF5cycgPyAneWVhcnMnIDogJ2RheXMnO1xuICB9XG5cbiAgdG9nZ2xlKCk6IHZvaWQge1xuICAgIHRoaXMuaXNPcGVuZWQgPSAhdGhpcy5pc09wZW5lZDtcblxuICAgIGlmICghdGhpcy5pc09wZW5lZCAmJiB0aGlzLnZpZXcgPT09ICd5ZWFycycpIHtcbiAgICAgIHRoaXMudG9nZ2xlVmlldygpO1xuICAgIH1cbiAgfVxuXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuaXNPcGVuZWQgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLnZpZXcgPT09ICd5ZWFycycpIHtcbiAgICAgIHRoaXMudG9nZ2xlVmlldygpO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0KGZpcmVWYWx1ZUNoYW5nZUV2ZW50ID0gZmFsc2UpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGUgPSBudWxsO1xuICAgIHRoaXMuaW5uZXJWYWx1ZSA9IG51bGw7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgaWYgKGZpcmVWYWx1ZUNoYW5nZUV2ZW50ICYmIHRoaXMub25DaGFuZ2VDYWxsYmFjaykge1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuaW5uZXJWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWw6IERhdGUpIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICB0aGlzLmRhdGUgPSB2YWw7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2YWw7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gZm9ybWF0KHRoaXMuaW5uZXJWYWx1ZSwgdGhpcy5kaXNwbGF5Rm9ybWF0LCB0aGlzLmxvY2FsZSk7XG4gICAgICB0aGlzLmJhclRpdGxlID0gZm9ybWF0KHN0YXJ0T2ZNb250aCh2YWwpLCB0aGlzLmJhclRpdGxlRm9ybWF0LCB0aGlzLmxvY2FsZSk7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKSBvbkJsdXIoZTogTW91c2VFdmVudCkge1xuICAgIGlmICghdGhpcy5pc09wZW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGlucHV0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5neC1kYXRlcGlja2VyLWlucHV0Jyk7XG5cbiAgICBpZiAoaW5wdXQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlLnRhcmdldCA9PT0gaW5wdXQgfHwgaW5wdXQuY29udGFpbnMoPGFueT5lLnRhcmdldCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmd4LWRhdGVwaWNrZXItY2FsZW5kYXItY29udGFpbmVyJyk7XG4gICAgaWYgKGNvbnRhaW5lciAmJiBjb250YWluZXIgIT09IGUudGFyZ2V0ICYmICFjb250YWluZXIuY29udGFpbnMoPGFueT5lLnRhcmdldCkgJiYgISg8YW55PmUudGFyZ2V0KS5jbGFzc0xpc3QuY29udGFpbnMoJ3llYXItdW5pdCcpKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=