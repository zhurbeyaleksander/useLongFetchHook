export declare const useHelperPromiseFunc: (longFetchSeconds?: number) => {
    status: {
        isLoading: boolean;
        data: undefined;
        error: undefined;
    };
    longFetchHelper: (promise: Promise<any>) => void;
    secondsFromStart: number;
    isLongFetch: boolean;
};
