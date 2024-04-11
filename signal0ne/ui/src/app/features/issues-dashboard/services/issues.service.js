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
exports.IssuesService = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const environment_1 = require("environment/environment");
const HttpEncoder_1 = require("app/shared/util/HttpEncoder");
const NormalizeObjectValue_1 = require("app/shared/util/NormalizeObjectValue");
let IssuesService = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var IssuesService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            IssuesService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        httpClient;
        constructor(httpClient) {
            this.httpClient = httpClient;
        }
        getIssuesContainers() {
            return this.httpClient.get(`${environment_1.environment.apiUrl}/user/containers`);
        }
        getIssuesList(searchCriteria, revokeLoader = false) {
            if (searchCriteria) {
                const searchCriteriaClone = { ...searchCriteria };
                if (searchCriteriaClone.startTimestamp) {
                    searchCriteriaClone.startTimestamp = new Date(searchCriteriaClone.startTimestamp).toISOString();
                }
                if (searchCriteriaClone.endTimestamp) {
                    searchCriteriaClone.endTimestamp = new Date(searchCriteriaClone.endTimestamp).toISOString();
                }
                if (searchCriteriaClone.isResolved) {
                    searchCriteriaClone.isResolved = false;
                }
                else {
                    searchCriteriaClone.isResolved = null;
                }
                const params = new http_1.HttpParams({
                    encoder: new HttpEncoder_1.HttpEncoder(),
                    fromObject: { ...(0, NormalizeObjectValue_1.NormalizeObjectValue)(searchCriteriaClone, ['startTimestamp', 'endTimestamp']) }
                });
                return this.httpClient.get(`${environment_1.environment.apiUrl}/user/issues?revokeLoader=${revokeLoader}`, { params });
            }
            else {
                return this.httpClient.get(`${environment_1.environment.apiUrl}/user/issues?revokeLoader=${revokeLoader}`);
            }
        }
        getIssue(issueId) {
            return this.httpClient.get(`${environment_1.environment.apiUrl}/user/issues/${issueId}`);
        }
        reportIssueAnalise(issueId, reportIssueData) {
            return this.httpClient.post(`${environment_1.environment.apiUrl}/user/issues/report`, {
                issueId: issueId,
                shouldDelete: !!reportIssueData.shouldDelete,
                reason: reportIssueData.reason
            });
        }
        rateIssue(issueId, rateIssueData) {
            return this.httpClient.put(`${environment_1.environment.apiUrl}/user/issues/${issueId}/score`, rateIssueData);
        }
        regenerateIssue(issueId) {
            return this.httpClient.put(`${environment_1.environment.apiUrl}/user/issues/${issueId}/regenerate`, {});
        }
        markIssueAsResolved(issueId) {
            return this.httpClient.put(`${environment_1.environment.apiUrl}/user/issues/${issueId}/resolve`, { isResolved: true });
        }
    };
    return IssuesService = _classThis;
})();
exports.IssuesService = IssuesService;
//# sourceMappingURL=issues.service.js.map