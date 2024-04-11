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
exports.IssuesDashboardComponent = void 0;
const core_1 = require("@angular/core");
const rxjs_interop_1 = require("@angular/core/rxjs-interop");
const IssueSearchCriteriaDTO_1 = require("app/shared/interfaces/IssueSearchCriteriaDTO");
const RateIssueDTO_1 = require("app/shared/interfaces/RateIssueDTO");
let IssuesDashboardComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-issues-dashboard',
            templateUrl: './issues-dashboard.component.html',
            styleUrls: ['./issues-dashboard.component.scss']
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var IssuesDashboardComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            IssuesDashboardComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        issuesService;
        authStateService;
        containers;
        issues;
        activeIssue;
        max;
        activePage = 1;
        isSidebarHidden = false;
        lastSearchCriteria = new IssueSearchCriteriaDTO_1.IssueSearchCriteriaDTO();
        issuesContainersRefreshInterval;
        constructor(issuesService, authStateService) {
            this.issuesService = issuesService;
            this.authStateService = authStateService;
            this.getIssuesContainers();
            this.authStateService.isLoggedIn$.pipe((0, rxjs_interop_1.takeUntilDestroyed)()).subscribe(isLoggedIn => {
                if (isLoggedIn) {
                    this.subscribeIssuesContainers();
                }
                else {
                    this.clearIssuesContainersSubscription();
                }
            });
        }
        ngOnInit() {
            this.searchIssues(this.lastSearchCriteria);
        }
        searchIssues(searchCriteria, revokeLoader = false) {
            if (searchCriteria) {
                this.activePage = searchCriteria.offset ? searchCriteria.offset * searchCriteria.limit : 1;
                this.lastSearchCriteria = {
                    ...searchCriteria
                };
            }
            this.issuesService.getIssuesList(this.lastSearchCriteria, revokeLoader).subscribe((res) => {
                this.issues = res.issues;
                this.max = res.max;
            });
        }
        viewIssue(issue) {
            this.issuesService.getIssue(issue.id).subscribe((response) => {
                this.activeIssue = response;
            });
        }
        scoreSelected(score) {
            this.issuesService.rateIssue(this.activeIssue.id, new RateIssueDTO_1.RateIssueDTO(score)).subscribe();
        }
        markIssueAsResolved() {
            this.issuesService.markIssueAsResolved(this.activeIssue.id).subscribe(res => {
                this.activeIssue.isResolved = true;
            });
        }
        regenerateIssue() {
            this.clearIssuesContainersSubscription();
            this.issuesService.regenerateIssue(this.activeIssue.id).subscribe(regeneratedIssue => {
                this.activeIssue = regeneratedIssue;
                this.subscribeIssuesContainers();
            }, () => {
                this.subscribeIssuesContainers();
            });
        }
        getIssuesContainers() {
            this.issuesService.getIssuesContainers().subscribe((containers) => {
                this.containers = containers;
            });
        }
        subscribeIssuesContainers() {
            this.clearIssuesContainersSubscription();
            this.issuesContainersRefreshInterval = setInterval(() => {
                this.searchIssues(this.lastSearchCriteria, true);
            }, 15000);
        }
        clearIssuesContainersSubscription() {
            if (this.issuesContainersRefreshInterval) {
                clearInterval(this.issuesContainersRefreshInterval);
                this.issuesContainersRefreshInterval = null;
            }
        }
    };
    return IssuesDashboardComponent = _classThis;
})();
exports.IssuesDashboardComponent = IssuesDashboardComponent;
//# sourceMappingURL=issues-dashboard.component.js.map