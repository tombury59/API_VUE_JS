export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const response = await fetch('http://185.98.138.168:8080/products');
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Erreur côté backend' });
    }
    const data = await response.json();
    const product = data.find(p => String(p.id) === String(id));
    if (!product) {
      return res.status(404).json({ error: 'Produit introuvable' });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error('Erreur proxy API :', err);
    res.status(500).json({ error: 'Erreur serveur Vercel' });
  }
}