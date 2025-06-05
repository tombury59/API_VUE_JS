// test/panier.test.js
import { describe, it, expect, vi } from 'vitest';

describe('Tests du panier', () => {
  // Copies des fonctions du composant CartModal pour les tester directement
  const formatPrice = (price) => {
    if (!price) return '0,00 €';
    return parseFloat(price).toFixed(2).replace('.', ',') + ' €';
  };

  const calculateSubtotal = (cartItems) => {
    console.log('Calcul du sous-total pour:', JSON.stringify(cartItems, null, 2));
    const total = cartItems.reduce((total, item) => {
      console.log(`Article: ${item.title}, Prix: ${item.price} €, Quantité: ${item.quantity}`);
      console.log(`Sous-calcul: ${total} + (${item.price} * ${item.quantity}) = ${total + (item.price * item.quantity)}`);
      return total + (item.price * item.quantity);
    }, 0);
    console.log('Sous-total final:', total);
    return total;
  };

  // Données de test pour le panier
  const cartItemsMock = [
    { id: 1, title: 'T-shirt Éco-responsable', price: 29.99, quantity: 2 },
    { id: 2, title: 'Jeans recyclé', price: 59.99, quantity: 1 },
    { id: 3, title: 'Veste durable', price: 79.99, quantity: 3 }
  ];

  // Test du calcul du sous-total
  it('doit calculer correctement le sous-total du panier', () => {
    console.log('--- Test du calcul du sous-total ---');
    const subtotal = calculateSubtotal(cartItemsMock);
    console.log(`Résultat attendu: 359.94, Résultat obtenu: ${subtotal}`);
    // 29.99*2 + 59.99*1 + 79.99*3 = 59.98 + 59.99 + 239.97 = 359.94
    expect(subtotal).toBeCloseTo(359.94);
  });

  // Test du calcul du total avec frais de livraison
  it('doit calculer correctement le total avec frais de livraison', () => {
    console.log('--- Test du total avec frais de livraison ---');
    const shippingCost = 5.99;
    const subtotal = calculateSubtotal(cartItemsMock);
    const totalWithShipping = subtotal + shippingCost;

    console.log(`Sous-total: ${subtotal}`);
    console.log(`Frais de livraison: ${shippingCost}`);
    console.log(`Total avec livraison: ${subtotal} + ${shippingCost} = ${totalWithShipping}`);

    expect(totalWithShipping).toBeCloseTo(365.93); // 359.94 + 5.99
  });

  // Test avec un panier vide
  it('doit retourner 0 pour un panier vide', () => {
    console.log('--- Test avec un panier vide ---');
    const emptyCart = [];
    const subtotal = calculateSubtotal(emptyCart);
    console.log(`Résultat pour panier vide: ${subtotal}`);
    expect(subtotal).toBe(0);
  });

  // Test du formatage des prix
  it('doit formater correctement les prix en euros', () => {
    console.log('--- Test du formatage des prix ---');
    const tests = [29.99, 100, 0, null, undefined];

    tests.forEach(price => {
      const formatted = formatPrice(price);
      console.log(`Formatage de ${price} => "${formatted}"`);
    });

    expect(formatPrice(29.99)).toBe('29,99 €');
    expect(formatPrice(100)).toBe('100,00 €');
    expect(formatPrice(0)).toBe('0,00 €');
    expect(formatPrice(null)).toBe('0,00 €');
    expect(formatPrice(undefined)).toBe('0,00 €');
  });
});
