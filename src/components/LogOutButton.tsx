import { destroyCookie } from 'nookies';

// Función para eliminar el token de las cookies
const logout = () => {
  // Eliminar la cookie de token
  destroyCookie(null, 'token');

  // Realizar cualquier otra acción necesaria después del logout
  // por ejemplo, redirigir al usuario a la página de inicio de sesión
  // o mostrar un mensaje de éxito de logout
};

// Ejemplo de uso en un componente
const LogoutButton = () => {
  return <button onClick={logout}>Cerrar sesión</button>;
};
