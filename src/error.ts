enum Severity {
    Info = 1,
    Warning = 2,
    Error = 3,
}

export type NotificationFunc = (short: string, long?: string, rv?: any) => any;
export type NotificationFuncSeverity = (
    severity: Severity,
    short: string,
    long?: string,
    rv?: any
) => any;

export interface Notifier {
    infoLog: NotificationFunc;
    warningLog: NotificationFunc;
    errorLog: NotificationFunc;
}

export enum LogError {
    LogShort = 1,
    LogLong = 2,
    LogBoth = 3,
    LogNeither = 0,
}

let log_level: LogError = LogError.LogShort;

export interface LogWhat {
    [Severity.Info]: boolean;
    [Severity.Warning]: boolean;
    [Severity.Error]: boolean;
}

let log_what: LogWhat = {
    [Severity.Info]: true,
    [Severity.Warning]: true,
    [Severity.Error]: true,
};

export function setErrorLogLevel(log_error: LogError, _log_what?: LogWhat) {
    log_level = log_error;
    if (_log_what) {
        log_what[Severity.Info] = _log_what[Severity.Info];
        log_what[Severity.Warning] = _log_what[Severity.Warning];
        log_what[Severity.Error] = _log_what[Severity.Error];
    }
}

export function severityLog<T>(
    severity: Severity,
    short: string,
    long?: any,
    ret_val?: T
) {
    if (!log_what[severity]) return ret_val;

    let prefix = Severity[severity];
    if (!prefix) prefix = "???";
    prefix += "> ";

    if (short && log_level & LogError.LogShort) {
        console.log(prefix + short);
    }
    if (long && log_level & LogError.LogLong) {
        console.log(prefix + long);
    }
    return ret_val;
}

export function errorLog<T>(
    short_error: string,
    long_error?: any,
    ret_val?: T
) {
    return severityLog(Severity.Error, short_error, long_error, ret_val);
}

class ConsoleLogger implements Notifier {
    infoLog(short: string, long?: any, ret_val?: any) {
        return severityLog(Severity.Info, short, long, ret_val);
    }
    warningLog(short: string, long?: any, ret_val?: any) {
        return severityLog(Severity.Warning, short, long, ret_val);
    }
    errorLog(short: string, long?: any, ret_val?: any) {
        return severityLog(Severity.Error, short, long, ret_val);
    }
}

export let console_logger = new ConsoleLogger();
