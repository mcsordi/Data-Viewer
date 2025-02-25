import { RouterBrowser } from './shared/routes';
import { ThemeContext } from './contexts/ThemeContext/ThemeContext';
import { DrawerButton } from './contexts/DrawerButton/DrawerButton';
import { FirstEditButton } from './contexts/FirstEditButton/FirstEditButton';

function App() {
  return (
    <ThemeContext>
      <FirstEditButton>
        <DrawerButton visible>
          <RouterBrowser />
        </DrawerButton>
      </FirstEditButton>
    </ThemeContext>
  );
}
export default App;
