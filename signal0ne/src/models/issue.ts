export interface Issue{
    Id: string;
	UserId: string;
	ContainerName: string;
	ContainerId: string;
	Score: number;
	Severity: string;
	Logs: string[];
	Title: string;
	IsResolved: boolean;
	TimeStamp: Date;
	LogSummary: string;
	PredictedSolutionsSummary: string;
	PredictedSolutionsSources : string[];
	ViewCount: number;
}
