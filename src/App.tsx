import { RouterBrowser } from './shared/routes';
import { ThemeContext } from './contexts/ThemeContext/ThemeContext';
import { DrawerButton } from './contexts/DrawerButton/DrawerButton';
import { AuthProvider } from './contexts/AuthContext/AuthContext';
import { RemovePhoto } from './contexts/RemovePhoto/RemovePhoto';
import { UserDrawer } from './contexts/EditUserDrawer/UserDrawer';

function App() {
  return (
    <AuthProvider>
      <UserDrawer>
        <ThemeContext>
          <RemovePhoto>
            <DrawerButton visible>
              <RouterBrowser />
            </DrawerButton>
          </RemovePhoto>
        </ThemeContext>
      </UserDrawer>
    </AuthProvider>
  );
}
export default App;
