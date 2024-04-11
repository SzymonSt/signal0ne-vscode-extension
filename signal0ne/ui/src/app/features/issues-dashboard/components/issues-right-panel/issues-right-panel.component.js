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
exports.IssuesRightPanelComponent = void 0;
const core_1 = require("@angular/core");
let IssuesRightPanelComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-issues-right-panel',
            templateUrl: './issues-right-panel.component.html',
            styleUrls: ['./issues-right-panel.component.scss']
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _activeIssue_decorators;
    let _activeIssue_initializers = [];
    let _activeIssue_extraInitializers = [];
    let _scoreSelected_decorators;
    let _scoreSelected_initializers = [];
    let _scoreSelected_extraInitializers = [];
    let _markIssueAsResolved_decorators;
    let _markIssueAsResolved_initializers = [];
    let _markIssueAsResolved_extraInitializers = [];
    let _regenerateIssue_decorators;
    let _regenerateIssue_initializers = [];
    let _regenerateIssue_extraInitializers = [];
    var IssuesRightPanelComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _activeIssue_decorators = [(0, core_1.Input)()];
            _scoreSelected_decorators = [(0, core_1.Output)()];
            _markIssueAsResolved_decorators = [(0, core_1.Output)()];
            _regenerateIssue_decorators = [(0, core_1.Output)()];
            __esDecorate(null, null, _activeIssue_decorators, { kind: "field", name: "activeIssue", static: false, private: false, access: { has: obj => "activeIssue" in obj, get: obj => obj.activeIssue, set: (obj, value) => { obj.activeIssue = value; } }, metadata: _metadata }, _activeIssue_initializers, _activeIssue_extraInitializers);
            __esDecorate(null, null, _scoreSelected_decorators, { kind: "field", name: "scoreSelected", static: false, private: false, access: { has: obj => "scoreSelected" in obj, get: obj => obj.scoreSelected, set: (obj, value) => { obj.scoreSelected = value; } }, metadata: _metadata }, _scoreSelected_initializers, _scoreSelected_extraInitializers);
            __esDecorate(null, null, _markIssueAsResolved_decorators, { kind: "field", name: "markIssueAsResolved", static: false, private: false, access: { has: obj => "markIssueAsResolved" in obj, get: obj => obj.markIssueAsResolved, set: (obj, value) => { obj.markIssueAsResolved = value; } }, metadata: _metadata }, _markIssueAsResolved_initializers, _markIssueAsResolved_extraInitializers);
            __esDecorate(null, null, _regenerateIssue_decorators, { kind: "field", name: "regenerateIssue", static: false, private: false, access: { has: obj => "regenerateIssue" in obj, get: obj => obj.regenerateIssue, set: (obj, value) => { obj.regenerateIssue = value; } }, metadata: _metadata }, _regenerateIssue_initializers, _regenerateIssue_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            IssuesRightPanelComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        activeIssue = __runInitializers(this, _activeIssue_initializers, void 0);
        scoreSelected = (__runInitializers(this, _activeIssue_extraInitializers), __runInitializers(this, _scoreSelected_initializers, new core_1.EventEmitter()));
        markIssueAsResolved = (__runInitializers(this, _scoreSelected_extraInitializers), __runInitializers(this, _markIssueAsResolved_initializers, new core_1.EventEmitter()));
        regenerateIssue = (__runInitializers(this, _markIssueAsResolved_extraInitializers), __runInitializers(this, _regenerateIssue_initializers, new core_1.EventEmitter()));
        constructor() {
            __runInitializers(this, _regenerateIssue_extraInitializers);
        }
    };
    return IssuesRightPanelComponent = _classThis;
})();
exports.IssuesRightPanelComponent = IssuesRightPanelComponent;
//# sourceMappingURL=issues-right-panel.component.js.map