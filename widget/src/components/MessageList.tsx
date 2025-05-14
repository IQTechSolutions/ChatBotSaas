import { useEffect, useRef } from 'react';
import BotAvatar from './BotAvatar';
import UserAvatar from './UserAvatar';
import formatTime from '../utils/formatTime';

export type ChatMsg = {
    id: string;
    from: 'user' | 'bot';
    text: string;
    ts: number;                
};

interface Props {
    messages: ChatMsg[];
}

export default function MessageList({ messages }: Props) {
    const bottomRef = useRef<HTMLDivElement>(null);

    // auto‑scroll when a new message arrives
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="iq-msg-list">
            {messages.map(m => (
                <div key={m.id} className={`iq-msg ${m.from}`}>
                    {m.from === 'bot' ? <BotAvatar /> : <UserAvatar />}
                    <div className="bubble">
                        {m.text}
                        <time>{formatTime(m.ts)}</time>
                    </div>
                </div>
            ))}
            <div ref={bottomRef} />
        </div>
    );
}