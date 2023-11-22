declare function handleSaveButton(editor: any): void;
declare function handleSampleError(error: any): void;
declare namespace exportPdfConfig {
    function fileName(): string;
}
declare namespace appData {
    const users: {
        id: string;
        name: string;
    }[];
    const userId: string;
    const commentThreads: never[];
}
