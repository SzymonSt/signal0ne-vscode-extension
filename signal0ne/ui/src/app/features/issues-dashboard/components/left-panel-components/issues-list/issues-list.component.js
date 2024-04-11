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
exports.IssuesListComponent = void 0;
const core_1 = require("@angular/core");
let IssuesListComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-issues-list',
            templateUrl: './issues-list.component.html',
            styleUrls: ['./issues-list.component.scss'],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _issues_decorators;
    let _issues_initializers = [];
    let _issues_extraInitializers = [];
    let _viewIssue_decorators;
    let _viewIssue_initializers = [];
    let _viewIssue_extraInitializers = [];
    let _issuesListContainerElement_decorators;
    let _issuesListContainerElement_initializers = [];
    let _issuesListContainerElement_extraInitializers = [];
    var IssuesListComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _issues_decorators = [(0, core_1.Input)()];
            _viewIssue_decorators = [(0, core_1.Output)()];
            _issuesListContainerElement_decorators = [(0, core_1.ViewChild)('issuesListContainer')];
            __esDecorate(null, null, _issues_decorators, { kind: "field", name: "issues", static: false, private: false, access: { has: obj => "issues" in obj, get: obj => obj.issues, set: (obj, value) => { obj.issues = value; } }, metadata: _metadata }, _issues_initializers, _issues_extraInitializers);
            __esDecorate(null, null, _viewIssue_decorators, { kind: "field", name: "viewIssue", static: false, private: false, access: { has: obj => "viewIssue" in obj, get: obj => obj.viewIssue, set: (obj, value) => { obj.viewIssue = value; } }, metadata: _metadata }, _viewIssue_initializers, _viewIssue_extraInitializers);
            __esDecorate(null, null, _issuesListContainerElement_decorators, { kind: "field", name: "issuesListContainerElement", static: false, private: false, access: { has: obj => "issuesListContainerElement" in obj, get: obj => obj.issuesListContainerElement, set: (obj, value) => { obj.issuesListContainerElement = value; } }, metadata: _metadata }, _issuesListContainerElement_initializers, _issuesListContainerElement_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            IssuesListComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        issues = __runInitializers(this, _issues_initializers, void 0);
        viewIssue = (__runInitializers(this, _issues_extraInitializers), __runInitializers(this, _viewIssue_initializers, new core_1.EventEmitter()));
        issuesListContainerElement = (__runInitializers(this, _viewIssue_extraInitializers), __runInitializers(this, _issuesListContainerElement_initializers, void 0));
        selectedIssueId = __runInitializers(this, _issuesListContainerElement_extraInitializers);
        constructor() { }
        selectIssue(issue) {
            this.selectedIssueId = issue.id;
            this.viewIssue.emit(issue);
        }
        selectIssueKeydown(issue, event) {
            if (event instanceof KeyboardEvent &&
                (event.key === 'Enter' || event.key === ' ')) {
                if (event.key === ' ')
                    event.preventDefault();
                this.selectedIssueId = issue.id;
                this.viewIssue.emit(issue);
            }
        }
    };
    return IssuesListComponent = _classThis;
})();
exports.IssuesListComponent = IssuesListComponent;
//# sourceMappingURL=issues-list.component.js.map