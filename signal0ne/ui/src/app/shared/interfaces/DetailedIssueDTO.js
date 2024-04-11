"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailedIssueDTO = void 0;
const IssueDTO_1 = require("app/shared/interfaces/IssueDTO");
class DetailedIssueDTO extends IssueDTO_1.IssueDTO {
    logSummary;
    userId;
    logs;
    score;
    predictedSolutionsSummary;
    issuePredictedSolutionsSources;
}
exports.DetailedIssueDTO = DetailedIssueDTO;
//# sourceMappingURL=DetailedIssueDTO.js.map