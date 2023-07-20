export function getExecutionTime(func: () => Promise<void>): number {
    const startTime = Date.now();
    func();
    return Date.now() - startTime;
}
