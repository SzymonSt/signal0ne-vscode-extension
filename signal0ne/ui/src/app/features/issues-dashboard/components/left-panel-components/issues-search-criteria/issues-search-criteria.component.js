"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssuesSearchCriteriaComponent = void 0;
const core_1 = require("@angular/core");
const IssueType_1 = require("app/shared/enum/IssueType");
const IssueSeverity_1 = require("app/shared/enum/IssueSeverity");
const forms_1 = require("@angular/forms");
const date_range_validator_1 = require("app/shared/validators/date-range.validator");
const Constant_1 = require("app/config/Constant");
let IssuesSearchCriteriaComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-issues-search-criteria',
            templateUrl: './issues-search-criteria.component.html',
            styleUrls: ['./issues-search-criteria.component.scss']
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _containers_decorators;
    let _containers_initializers = [];
    let _containers_extraInitializers = [];
    let _criteriaChanged_decorators;
    let _criteriaChanged_initializers = [];
    let _criteriaChanged_extraInitializers = [];
    var IssuesSearchCriteriaComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _containers_decorators = [(0, core_1.Input)()];
            _criteriaChanged_decorators = [(0, core_1.Output)()];
            __esDecorate(null, null, _containers_decorators, { kind: "field", name: "containers", static: false, private: false, access: { has: obj => "containers" in obj, get: obj => obj.containers, set: (obj, value) => { obj.containers = value; } }, metadata: _metadata }, _containers_initializers, _containers_extraInitializers);
            __esDecorate(null, null, _criteriaChanged_decorators, { kind: "field", name: "criteriaChanged", static: false, private: false, access: { has: obj => "criteriaChanged" in obj, get: obj => obj.criteriaChanged, set: (obj, value) => { obj.criteriaChanged = value; } }, metadata: _metadata }, _criteriaChanged_initializers, _criteriaChanged_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            IssuesSearchCriteriaComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        issueTypeOptions = Object.values(IssueType_1.IssueType);
        severityOptions = Object.values(IssueSeverity_1.IssueSeverity);
        todayDate = new Date();
        searchForm;
        isSubmitted = false;
        containers = __runInitializers(this, _containers_initializers, void 0);
        criteriaChanged = (__runInitializers(this, _containers_extraInitializers), __runInitializers(this, _criteriaChanged_initializers, new core_1.EventEmitter()));
        constructor() {
            __runInitializers(this, _criteriaChanged_extraInitializers);
        }
        ngOnInit() {
            this.initForm();
        }
        submitForm() {
            this.isSubmitted = true;
            this.searchForm.markAsDirty();
            this.searchForm.markAllAsTouched();
            if (this.searchForm.valid) {
                this.criteriaChanged.emit(this.searchForm.value);
            }
        }
        clearForm() {
            this.searchForm.reset();
            this.criteriaChanged.emit(this.searchForm.value);
        }
        initForm() {
            this.searchForm = new forms_1.FormGroup({
                searchString: new forms_1.FormControl(null),
                issueType: new forms_1.FormControl(null),
                issueSeverity: new forms_1.FormControl(null),
                container: new forms_1.FormControl(null),
                startTimestamp: new forms_1.FormControl(null),
                endTimestamp: new forms_1.FormControl(null),
                isResolved: new forms_1.FormControl(null),
                limit: new forms_1.FormControl(Constant_1.Constants.paginationLimit),
                offset: new forms_1.FormControl(0),
            }, { validators: (0, date_range_validator_1.dateRangeValidator)('startTimestamp', 'endTimestamp') });
        }
    };
    return IssuesSearchCriteriaComponent = _classThis;
})();
exports.IssuesSearchCriteriaComponent = IssuesSearchCriteriaComponent;
//# sourceMappingURL=issues-search-criteria.component.js.map