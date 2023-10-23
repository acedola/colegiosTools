jsx;
import { useRouter } from 'next/router';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Realiza una solicitud al servidor para invalidar el token JWT y destruir la sesión
      await fetch('/api/logout', {
        method: 'POST'
        // Agrega cualquier encabezado o cuerpo de solicitud necesario, como el token JWT
      });

      // Realiza acciones adicionales después de cerrar sesión
      // Por ejemplo, redirigir al usuario a la página de inicio de sesión
      router.push('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return <button onClick={handleLogout}>Cerrar sesión</button>;
};

export default LogoutButton;
