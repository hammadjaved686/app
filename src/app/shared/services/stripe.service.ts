import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
const stripe = require('stripe')('sk_test_51OUsGLACt5FmHWsvUxYHiJC9UZeB6BeSZOzIKVbkUeuWPiellKdLnMNGGDI7VS4dbeYddhBfOYCee9HxJuaPuR9H003HA0UoRH'); // Replace with your Stripe secret key

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  
  private stripePromise = loadStripe('pk_test_51OUsGLACt5FmHWsvwZbcwGbmOs72FaFjGKQoqeCoHT6eoT1j0atO7evnXuoRMjZ8hbx1vUzayoLVxlQlipXnXbew00lRa9DSx6'); // Replace with your publishable key
  paymentType = ''
  constructor() {}
  items: any[] = []
  async initiatePayment(cartItems: any): Promise<void> {
    const stripe = await this.stripePromise;
    if (!stripe) {
      throw new Error('Stripe could not be loaded.');
    }
    // createProduct();
    // createPrice();

    const priceItems = await registerProdcutsToStripe(cartItems)
    // const pIds = await getAllPriceIds();
    console.log('price Items : +-+-+-=_=_ : ', priceItems)
    const { error } = await stripe.redirectToCheckout({
      mode: 'payment',
      successUrl: 'http://localhost:4200/invoice',
      cancelUrl: 'http://localhost:4200/checkout',
      lineItems: priceItems,
    });
  
    if (error) {
      console.error(error);
    }
  }
  
  
}
async function registerProdcutsToStripe(cartItems:any) {
  const createPrices = async () => {
    const priceItems: { price: string; quantity: number }[] = [];
    debugger
    for (const product of cartItems) {
      try {
        const price = await stripe.prices.create({
          currency: 'usd',
          unit_amount: product.price,
          product_data: {
            name: product.title,
          },
        });
  
        product.priceId = price.id
        priceItems.push({price: price.id , quantity: product.quantity})
      } catch (error) {
        console.error('Error creating price:', error);
      }
    }
  
    console.log('Created price IDs:', cartItems);
    return priceItems
  };
 return createPrices()
}
async function getAllPriceIds() {
  try {
    const prices = await stripe.prices.list({
      limit: 100, // Adjust the limit as needed to fetch all prices (100 is the maximum limit per request)
    });

    const priceIds = prices.data.map((price:any) => price.id);
    console.log('Price IDs----------:', priceIds);
    return priceIds;
  } catch (error) {
    console.error('Error fetching prices:', error);
    return [];
  }
}

async function createPrice() {
  try {
    const price = await stripe.prices.create({
      unit_amount: 1000, // Set the amount in the smallest currency unit (e.g., cents for USD)
      currency: 'usd',
      product: 'prod_PJWmKhfCLq9Hig', // Replace with your product ID
    });

    console.log('Created Price ID:', price.id);
    return price.id;
  } catch (error) {
    console.error('Error creating price:', error);
    return null;
  }
}

async function createProduct() {
  try {
    const product = await stripe.products.create({
      name: 'prod_12346', // Replace with your product's name
      description: 'Product Description', // Replace with your product's description
      // Other optional attributes can be added here, such as images, metadata, etc.
    });

    console.log('Created Product ID:', product.id);
    return product.id;
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
  }
}
// {
//   "id": "prod_PJVudhMC5c2kMp",
//   "object": "product",
//   "active": true,
//   "attributes": [],
//   "created": 1704382226,
//   "default_price": null,
//   "description": "Product Description",
//   "features": [],
//   "images": [],
//   "livemode": false,
//   "metadata": {},
//   "name": "prod_12345",
//   "package_dimensions": null,
//   "shippable": null,
//   "statement_descriptor": null,
//   "tax_code": null,
//   "type": "service",
//   "unit_label": null,
//   "updated": 1704382226,
//   "url": null
// }

// {
//   "id": "price_1OUsuBACt5FmHWsvFNAzeWGX",
//   "object": "price",
//   "active": true,
//   "billing_scheme": "per_unit",
//   "created": 1704382343,
//   "currency": "usd",
//   "custom_unit_amount": null,
//   "livemode": false,
//   "lookup_key": null,
//   "metadata": {},
//   "nickname": null,
//   "product": "prod_PJVudhMC5c2kMp",
//   "recurring": null,
//   "tax_behavior": "unspecified",
//   "tiers_mode": null,
//   "transform_quantity": null,
//   "type": "one_time",
//   "unit_amount": 1000,
//   "unit_amount_decimal": "1000"
// }