import type {
  Product,
  ProductDetail,
  AddToCartPayload,
  AddToCartResponse,
  CacheEntry,
  CacheStore,
} from "@/types";

const API_URL = "https://itx-frontend-test.onrender.com";
const CACHE_TTL = 60 * 60 * 1000;
const CACHE_KEY = "mobileStoreCache";
const CART_COUNT_KEY = "cartCount";

const getCache = (): CacheStore => {
  const cached = localStorage.getItem(CACHE_KEY);
  return cached ? JSON.parse(cached) : {};
};

const setCache = (cache: CacheStore): void => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
};

const saveToCache = (key: string, data: Product[] | ProductDetail): void => {
  const cache = getCache();
  const entry: CacheEntry = {
    data,
    timestamp: Date.now(),
  };
  cache[key] = entry;
  setCache(cache);
};

const getFromCache = (key: string): Product[] | ProductDetail | null => {
  const cache = getCache();
  const entry = cache[key];

  if (!entry) return null;

  const isExpired = Date.now() - entry.timestamp > CACHE_TTL;

  if (isExpired) {
    delete cache[key];
    setCache(cache);
    return null;
  }

  return entry.data;
};

export const getProducts = async (): Promise<Product[]> => {
  const cached = getFromCache("products");
  if (cached) {
    return cached as Product[];
  }

  const response = await fetch(`${API_URL}/api/product`);
  const data: Product[] = await response.json();

  saveToCache("products", data);
  return data;
};

export const getProductById = async (id: string): Promise<ProductDetail> => {
  const cacheKey = `product_${id}`;
  const cached = getFromCache(cacheKey);
  if (cached) {
    return cached as ProductDetail;
  }

  const response = await fetch(`${API_URL}/api/product/${id}`);
  const data: ProductDetail = await response.json();

  saveToCache(cacheKey, data);
  return data;
};

export const addToCart = async (
  payload: AddToCartPayload,
): Promise<AddToCartResponse> => {
  const response = await fetch(`${API_URL}/api/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data: AddToCartResponse = await response.json();

  localStorage.setItem(CART_COUNT_KEY, String(data.count));

  return data;
};

export const getCartCount = (): number => {
  const count = localStorage.getItem(CART_COUNT_KEY);
  return count ? parseInt(count, 10) : 0;
};
