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
exports.IssuesLeftPanelComponent = void 0;
const core_1 = require("@angular/core");
const IssueSearchCriteriaDTO_1 = require("app/shared/interfaces/IssueSearchCriteriaDTO");
const Constant_1 = require("app/config/Constant");
let IssuesLeftPanelComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-issues-left-panel',
            templateUrl: './issues-left-panel.component.html',
            styleUrls: ['./issues-left-panel.component.scss']
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _containers_decorators;
    let _containers_initializers = [];
    let _containers_extraInitializers = [];
    let _issues_decorators;
    let _issues_initializers = [];
    let _issues_extraInitializers = [];
    let _max_decorators;
    let _max_initializers = [];
    let _max_extraInitializers = [];
    let _internalPage_decorators;
    let _internalPage_initializers = [];
    let _internalPage_extraInitializers = [];
    let _isSidebarHidden_decorators;
    let _isSidebarHidden_initializers = [];
    let _isSidebarHidden_extraInitializers = [];
    let _criteriaChanged_decorators;
    let _criteriaChanged_initializers = [];
    let _criteriaChanged_extraInitializers = [];
    let _viewIssue_decorators;
    let _viewIssue_initializers = [];
    let _viewIssue_extraInitializers = [];
    let _toggleSidebarVisibility_decorators;
    let _toggleSidebarVisibility_initializers = [];
    let _toggleSidebarVisibility_extraInitializers = [];
    var IssuesLeftPanelComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _containers_decorators = [(0, core_1.Input)()];
            _issues_decorators = [(0, core_1.Input)()];
            _max_decorators = [(0, core_1.Input)()];
            _internalPage_decorators = [(0, core_1.Input)()];
            _isSidebarHidden_decorators = [(0, core_1.Input)()];
            _criteriaChanged_decorators = [(0, core_1.Output)()];
            _viewIssue_decorators = [(0, core_1.Output)()];
            _toggleSidebarVisibility_decorators = [(0, core_1.Output)()];
            __esDecorate(null, null, _containers_decorators, { kind: "field", name: "containers", static: false, private: false, access: { has: obj => "containers" in obj, get: obj => obj.containers, set: (obj, value) => { obj.containers = value; } }, metadata: _metadata }, _containers_initializers, _containers_extraInitializers);
            __esDecorate(null, null, _issues_decorators, { kind: "field", name: "issues", static: false, private: false, access: { has: obj => "issues" in obj, get: obj => obj.issues, set: (obj, value) => { obj.issues = value; } }, metadata: _metadata }, _issues_initializers, _issues_extraInitializers);
            __esDecorate(null, null, _max_decorators, { kind: "field", name: "max", static: false, private: false, access: { has: obj => "max" in obj, get: obj => obj.max, set: (obj, value) => { obj.max = value; } }, metadata: _metadata }, _max_initializers, _max_extraInitializers);
            __esDecorate(null, null, _internalPage_decorators, { kind: "field", name: "internalPage", static: false, private: false, access: { has: obj => "internalPage" in obj, get: obj => obj.internalPage, set: (obj, value) => { obj.internalPage = value; } }, metadata: _metadata }, _internalPage_initializers, _internalPage_extraInitializers);
            __esDecorate(null, null, _isSidebarHidden_decorators, { kind: "field", name: "isSidebarHidden", static: false, private: false, access: { has: obj => "isSidebarHidden" in obj, get: obj => obj.isSidebarHidden, set: (obj, value) => { obj.isSidebarHidden = value; } }, metadata: _metadata }, _isSidebarHidden_initializers, _isSidebarHidden_extraInitializers);
            __esDecorate(null, null, _criteriaChanged_decorators, { kind: "field", name: "criteriaChanged", static: false, private: false, access: { has: obj => "criteriaChanged" in obj, get: obj => obj.criteriaChanged, set: (obj, value) => { obj.criteriaChanged = value; } }, metadata: _metadata }, _criteriaChanged_initializers, _criteriaChanged_extraInitializers);
            __esDecorate(null, null, _viewIssue_decorators, { kind: "field", name: "viewIssue", static: false, private: false, access: { has: obj => "viewIssue" in obj, get: obj => obj.viewIssue, set: (obj, value) => { obj.viewIssue = value; } }, metadata: _metadata }, _viewIssue_initializers, _viewIssue_extraInitializers);
            __esDecorate(null, null, _toggleSidebarVisibility_decorators, { kind: "field", name: "toggleSidebarVisibility", static: false, private: false, access: { has: obj => "toggleSidebarVisibility" in obj, get: obj => obj.toggleSidebarVisibility, set: (obj, value) => { obj.toggleSidebarVisibility = value; } }, metadata: _metadata }, _toggleSidebarVisibility_initializers, _toggleSidebarVisibility_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            IssuesLeftPanelComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        containers = __runInitializers(this, _containers_initializers, void 0);
        issues = (__runInitializers(this, _containers_extraInitializers), __runInitializers(this, _issues_initializers, void 0));
        max = (__runInitializers(this, _issues_extraInitializers), __runInitializers(this, _max_initializers, void 0));
        internalPage = (__runInitializers(this, _max_extraInitializers), __runInitializers(this, _internalPage_initializers, 1));
        isSidebarHidden = (__runInitializers(this, _internalPage_extraInitializers), __runInitializers(this, _isSidebarHidden_initializers, void 0));
        pageSize = (__runInitializers(this, _isSidebarHidden_extraInitializers), Constant_1.Constants.paginationLimit);
        criteriaChanged = __runInitializers(this, _criteriaChanged_initializers, new core_1.EventEmitter());
        viewIssue = (__runInitializers(this, _criteriaChanged_extraInitializers), __runInitializers(this, _viewIssue_initializers, new core_1.EventEmitter()));
        toggleSidebarVisibility = (__runInitializers(this, _viewIssue_extraInitializers), __runInitializers(this, _toggleSidebarVisibility_initializers, new core_1.EventEmitter()));
        criteria = (__runInitializers(this, _toggleSidebarVisibility_extraInitializers), new IssueSearchCriteriaDTO_1.IssueSearchCriteriaDTO());
        constructor() {
        }
        onPageChanged(event) {
            const newPage = event.page;
            const newPageIndex = newPage - 1;
            this.criteria = {
                ...this.criteria,
                limit: this.pageSize,
                offset: newPageIndex ? this.pageSize * newPageIndex : 0
            };
            this.criteriaChanged.emit(this.criteria);
        }
        onCriteriaChange(newCriteria) {
            this.criteria = {
                ...this.criteria,
                ...newCriteria
            };
            this.criteriaChanged.emit(this.criteria);
        }
        toggleSidebarHidden() {
            this.toggleSidebarVisibility.emit(!this.isSidebarHidden);
        }
    };
    return IssuesLeftPanelComponent = _classThis;
})();
exports.IssuesLeftPanelComponent = IssuesLeftPanelComponent;
//# sourceMappingURL=issues-left-panel.component.js.map