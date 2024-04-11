"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueSearchCriteriaDTO = void 0;
const PaginationCriteriaDTO_1 = require("app/shared/interfaces/PaginationCriteriaDTO");
class IssueSearchCriteriaDTO extends PaginationCriteriaDTO_1.PaginationCriteriaDTO {
    searchString;
    container;
    issueType;
    issueSeverity;
    startTimestamp;
    endTimestamp;
    isResolved;
}
exports.IssueSearchCriteriaDTO = IssueSearchCriteriaDTO;
//# sourceMappingURL=IssueSearchCriteriaDTO.js.map