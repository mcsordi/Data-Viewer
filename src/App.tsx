import { RouterBrowser } from './shared/routes';
import { ThemeContext } from './contexts/ThemeContext/ThemeContext';
import { DrawerButton } from './contexts/DrawerButton/DrawerButton';
import { AuthProvider } from './contexts/AuthContext/AuthContext';
import { RemovePhoto } from './contexts/RemovePhoto/RemovePhoto';

function App() {
  return (
    <AuthProvider>
      <ThemeContext>
        <RemovePhoto>
          <DrawerButton visible>
            <RouterBrowser />
          </DrawerButton>
        </RemovePhoto>
      </ThemeContext>
    </AuthProvider>
  );
}
export default App;
