export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }
  try {
    const response = await fetch('http://185.98.138.168:8080/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'Erreur lors de la création du compte' });
    }
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur lors de la création du compte' });
  }
}