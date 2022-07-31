import { render, screen } from '@testing-library/react';
import App from './App';
// getByText can be used search for all elements in the rendered virtual DOM that have a text node with text content matching the given regular expression.
// In line 3 of your code example, this is used to check if the text “learn react” is contained anywhere in the virtual DOM rendered by the <App /> component.
// In line 4, the expect function provided by Jest is used to make an assertion about this text being in the document.
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
