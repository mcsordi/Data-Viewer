import { RouterBrowser } from './shared/routes';
import { ThemeContext } from './contexts/ThemeContext/ThemeContext';
import { DrawerButton } from './contexts/DrawerButton/DrawerButton';
import { AuthProvider } from './contexts/AuthContext/AuthContext';
import { RemovePhoto } from './contexts/RemovePhoto/RemovePhoto';
import { UserDrawer } from './contexts/EditUserDrawer/UserDrawer';
import { CadasterRoute } from './shared/routes/CadasterRoute';
import { LoginPage } from './layout/pages/LoginPage/LoginPage';

function App() {
  return (
    <AuthProvider>
      <ThemeContext>
        <CadasterRoute />
        <LoginPage>
          <UserDrawer>
            <RemovePhoto>
              <DrawerButton visible>
                <RouterBrowser />
              </DrawerButton>
            </RemovePhoto>
          </UserDrawer>
        </LoginPage>
      </ThemeContext>
    </AuthProvider>
  );
}
export default App;
