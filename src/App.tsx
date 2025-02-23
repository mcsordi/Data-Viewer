import { RouterBrowser } from './shared/routes';
import { ThemeContext } from './contexts/ThemeContext/ThemeContext';
import { DrawerButton } from './contexts/DrawerButton/DrawerButton';

function App() {
  return (
    <ThemeContext>
      <DrawerButton visible>
        <RouterBrowser />
      </DrawerButton>
    </ThemeContext>
  );
}
export default App;
