type LogLevel = 'info' | 'warn' | 'error' | 'success' | 'debug';

interface LogStyles {
    text: string;
    background: string;
    labelBackground: string;
    bold?: boolean;
}

const styles: Record<LogLevel, LogStyles> = {
    info: {
        text: '#FFFFFF',
        background: '#EBF8FF',
        labelBackground: '#4299E1',
        bold: true
    },
    warn: {
        text: '#FFFFFF',
        background: '#FFFAF0',
        labelBackground: '#ED8936',
        bold: true
    },
    error: {
        text: '#FFFFFF',
        background: '#FFF5F5',
        labelBackground: '#F56565',
        bold: true
    },
    success: {
        text: '#FFFFFF',
        background: '#F0FFF4',
        labelBackground: '#48BB78',
        bold: true
    },
    debug: {
        text: '#FFFFFF',
        background: '#FAF5FF',
        labelBackground: '#805AD5'
    }
};

class Logger {
    private isDev: boolean;

    constructor() {
        this.isDev = process.env.NODE_ENV === 'development';
    }

    private formatMessage(level: LogLevel): [string, string, string] {
        const style = styles[level];

        // Label styles (for the level indicator)
        const labelStyles = [
            `color: ${style.text}`,
            `background: ${style.labelBackground}`,
            `padding: 2px 6px`,
            `border-radius: 4px`,
            style.bold ? 'font-weight: bold' : '',
            `text-transform: uppercase`,
        ].join(';');

        // Message background styles
        const messageBackgroundStyles = [
            `color: #000000`,
            `background: ${style.background}`,
            `padding: 2px 6px`,
            `border-radius: 4px`,
            `margin-left: 4px`,
        ].join(';');

        // Reset styles
        const resetStyles = [
            'color: inherit',
            'background: transparent',
            'font-weight: normal',
        ].join(';');

        return [labelStyles, messageBackgroundStyles, resetStyles];
    }

    private log(level: LogLevel, message: string, ...args: any[]): void {
        if (!this.isDev) return;

        const [labelStyles, messageStyles, resetStyles] = this.formatMessage(level);
        const icon = this.getIcon(level);
        const timestamp = new Date().toLocaleTimeString();

        console.log(
            `%c${icon} ${level.toUpperCase()}%c ${message} %c${timestamp}`,
            labelStyles,
            messageStyles,
            resetStyles,
            ...args
        );
    }

    private getIcon(level: LogLevel): string {
        switch (level) {
            case 'info':
                return 'ℹ️';
            case 'warn':
                return '⚠️';
            case 'error':
                return '❌';
            case 'success':
                return '✅';
            case 'debug':
                return '🔍';
            default:
                return '';
        }
    }

    info(message: string, ...args: any[]): void {
        this.log('info', message, ...args);
    }

    warn(message: string, ...args: any[]): void {
        this.log('warn', message, ...args);
    }

    error(message: string, ...args: any[]): void {
        this.log('error', message, ...args);
    }

    success(message: string, ...args: any[]): void {
        this.log('success', message, ...args);
    }

    debug(message: string, ...args: any[]): void {
        this.log('debug', message, ...args);
    }
}

const logger = new Logger();

export default logger;