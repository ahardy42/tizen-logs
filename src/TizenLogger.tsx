import React from 'react';
import { Hook, Console, Decode } from 'console-feed';

export default function TizenLogger ({ focusKey, width, height, corner }: TizenLoggerProps) {

    const [logs, setLogs] = React.useState<any[]>([]);
    const [isActive, setActive] = React.useState<boolean>(false);

    const _handleKeyDown = ({ keyCode }: KeyboardEvent) => {
        switch(keyCode) {
            case focusKey:
                return setActive(true);
            default:
                return;
        }
    }

    React.useEffect(() => {
        Hook(window.console, log => {
            setLogs(logs => [...logs, Decode(log)]);
        });
    }, []);

    React.useEffect(() => {
        if (isActive) {
            window.addEventListener('keydown', _handleKeyDown);
        } else {
            window.removeEventListener('keydown', _handleKeyDown);
        } 
    }, [isActive])

    return (
        <Console logs={logs} />
    );
}