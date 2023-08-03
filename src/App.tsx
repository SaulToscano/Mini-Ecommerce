import { MantineProvider } from '@mantine/core';
import Body from './components/Body';

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Body />
    </MantineProvider>
  );
}