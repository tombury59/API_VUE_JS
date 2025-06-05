// Fonction pour décoder un JWT (sans vérification de signature)
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

// Supprime le compte de l'utilisateur authentifié
export async function deleteMyAccount() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Utilisateur non authentifié');

  const payload = parseJwt(token);
  if (!payload || !payload.id) throw new Error('Token invalide');

  const userId = payload.id;

  const response = await fetch(`http://185.98.138.168:8080/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la suppression du compte');
  }

  // Déconnexion locale après suppression
  localStorage.removeItem('token');
  localStorage.removeItem('cart');
  return true;
}