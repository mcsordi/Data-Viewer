import { RouterBrowser } from './shared/routes';
import { ThemeContext } from './contexts/ThemeContext/ThemeContext';
import { DrawerButton } from './contexts/DrawerButton/DrawerButton';
import { AuthProvider } from './contexts/AuthContext/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ThemeContext>
        <DrawerButton visible>
          <RouterBrowser />
        </DrawerButton>
      </ThemeContext>
    </AuthProvider>
  );
}
export default App;
