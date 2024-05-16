import * as vscode from 'vscode';

export interface CodeAsContextResponseBody {
  error?: string;
  message: string;
  newCode: string;
}

export interface CodeContext {
  code?: string;
  lang?: string;
}

export interface Issue {
  ContainerId: string;
  ContainerName: string;
  Id: string;
  IsResolved: boolean;
  Logs: string[];
  LogSummary: string;
  PredictedSolutionsSources: string[];
  PredictedSolutionsSummary: string;
  Score: number;
  Severity: string;
  TimeStamp: Date;
  Title: string;
  UserId: string;
  ViewCount: number;
}

export interface IssuesResponseBody {
  issues: {
    containerName: string;
    id: string;
    isResolved: boolean;
    severity: string; //TODO: add more specific values
    timestamp: string;
    title: string;
  }[];
  max: number;
}

export interface IssueTreeDataNode extends vscode.TreeItem {
  parent?: IssueTreeDataNode;
  type: 'empty' | 'environment' | 'issue';
}
