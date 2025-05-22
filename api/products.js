export default async function handler(req, res) {
  try {
    const response = await fetch('http://185.98.138.168:8080/products');
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Erreur côté backend' });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Erreur proxy API :', err);
    res.status(500).json({ error: 'Erreur serveur Vercel' });
  }
}
