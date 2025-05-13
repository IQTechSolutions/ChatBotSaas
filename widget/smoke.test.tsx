import { render, screen, fireEvent } from '@testing-library/react';
import Launcher from '../src/components/Launcher';

test('opens and closes chat panel', () => {
    render(<Launcher />);
    const button = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(button);
    expect(screen.getByText(/ChatBot \(MVP\)/i)).toBeInTheDocument();
    fireEvent.click(button); // close
    expect(screen.queryByText(/ChatBot \(MVP\)/i)).not.toBeInTheDocument();
});