import { useState } from 'react';
import MessageList, { ChatMsg } from './MessageList';
import ChatInput from './ChatInput';
import './MessageList.css';
import './ChatInput.css';

const Logo = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7v10l10 5 10-5V7z" />
    </svg>
);


type Props = { onClose: () => void };

export default function ChatPanel({ onClose }: Props) {
    const [messages, setMessages] = useState<ChatMsg[]>([]);

    const collapsed = messages.length === 0;  

    const addUserMsg = (text: string) => {
        const userMsg: ChatMsg = {
            id: crypto.randomUUID(),
            from: 'user',
            text,
        };
        const botMsg: ChatMsg = {
            id: crypto.randomUUID(),
            from: 'bot',
            text: '🤖 (bot placeholder) Thanks for your message!',
        };
        setMessages(prev => [...prev, userMsg, botMsg]);
    };

    return (
        <div style={panelStyle(collapsed)}>
            <header style={headerStyle}>
                <div style={brandWrap}>
                    <Logo />                                {/* or: <img src={logo} alt="" /> */}
                    <span style={{ marginLeft: 8 }}>ChatBot MVP</span>
                </div>
                <button onClick={onClose} style={closeBtn}>×</button>
            </header>

            {!collapsed && <MessageList messages={messages} />}

            <ChatInput onSend={addUserMsg} />
        </div>
    );
}

/* ---- inline styles (same as before) ---- */
const panelStyle = (collapsed: boolean): React.CSSProperties => ({
    position: 'fixed',
    bottom: '100px',
    right: '1.5rem',
    width: '320px',
    /* height grows only after first message */
    maxHeight: collapsed ? 'auto' : '70vh',
    borderRadius: '12px',
    background: '#fff',
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'max-height 250ms ease',
});

const headerStyle: React.CSSProperties = {
    padding: '0.75rem 1rem',
    borderBottom: '1px solid #e5e7eb',
    fontWeight: 600,
    display: 'flex',
    justifyContent: 'space-between',
    background: 'var(--bot-primary-color, #2563eb)',
    color: '#fff',
};

const closeBtn: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: 20,
    cursor: 'pointer',
};

const brandWrap: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600,
    fontSize: 14,
};