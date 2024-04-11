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
exports.IssuesDashboardModule = void 0;
const core_1 = require("@angular/core");
const tooltip_1 = require("@angular/material/tooltip");
const core_2 = require("@ngx-translate/core");
const common_1 = require("@angular/common");
const angular_svg_icon_1 = require("angular-svg-icon");
const report_issue_analysis_component_1 = require("app/features/issues-dashboard/components/right-panel-components/report-issue-analysis/report-issue-analysis.component");
const SharedModule_1 = require("app/shared/SharedModule");
const issues_dashboard_component_1 = require("app/features/issues-dashboard/containers/issues-dashboard/issues-dashboard.component");
const issues_dashboard_routing_module_1 = require("app/features/issues-dashboard/issues-dashboard-routing.module");
const issues_search_criteria_component_1 = require("app/features/issues-dashboard/components/left-panel-components/issues-search-criteria/issues-search-criteria.component");
const issues_right_panel_component_1 = require("app/features/issues-dashboard/components/issues-right-panel/issues-right-panel.component");
const issues_left_panel_component_1 = require("app/features/issues-dashboard/components/issues-left-panel/issues-left-panel.component");
const issues_list_component_1 = require("app/features/issues-dashboard/components/left-panel-components/issues-list/issues-list.component");
const ng_select_1 = require("@ng-select/ng-select");
const forms_1 = require("@angular/forms");
const ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
const datepicker_1 = require("ngx-bootstrap/datepicker");
const issue_cell_component_1 = require("app/features/issues-dashboard/components/left-panel-components/issue-cell/issue-cell.component");
const pagination_1 = require("ngx-bootstrap/pagination");
const solutions_chat_component_1 = require("app/features/issues-dashboard/components/right-panel-components/chat/solutions-chat.component");
const solutions_list_component_1 = require("app/features/issues-dashboard/components/right-panel-components/solutions-list/solutions-list.component");
const ngx_markdown_1 = require("ngx-markdown");
let IssuesDashboardModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [
                issues_dashboard_component_1.IssuesDashboardComponent,
                issues_search_criteria_component_1.IssuesSearchCriteriaComponent,
                issues_right_panel_component_1.IssuesRightPanelComponent,
                issues_left_panel_component_1.IssuesLeftPanelComponent,
                issues_list_component_1.IssuesListComponent,
                issue_cell_component_1.IssueCellComponent,
                solutions_chat_component_1.SolutionsChatComponent,
                solutions_list_component_1.SolutionsListComponent,
                report_issue_analysis_component_1.ReportIssueAnalysisComponent
            ],
            imports: [
                common_1.CommonModule,
                core_2.TranslateModule,
                SharedModule_1.SharedModule,
                issues_dashboard_routing_module_1.IssuesDashboardRoutingModule,
                ng_select_1.NgSelectModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                ng_bootstrap_1.NgbModule,
                datepicker_1.BsDatepickerModule,
                pagination_1.PaginationModule,
                ngx_markdown_1.MarkdownModule.forRoot(),
                tooltip_1.MatTooltipModule,
                angular_svg_icon_1.SvgIconComponent
            ],
            exports: []
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var IssuesDashboardModule = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            IssuesDashboardModule = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return IssuesDashboardModule = _classThis;
})();
exports.IssuesDashboardModule = IssuesDashboardModule;
//# sourceMappingURL=issues-dashboard.module.js.map