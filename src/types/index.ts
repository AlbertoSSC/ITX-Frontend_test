export interface Product {
  id: string;
  brand: string;
  model: string;
  price: string;
  imgUrl: string;
}

export interface ColorOption {
  code: number;
  name: string;
}

export interface StorageOption {
  code: number;
  name: string;
}

export interface ProductOptions {
  colors: ColorOption[];
  storages: StorageOption[];
}

export interface ProductDetail extends Product {
  cpu: string;
  ram: string;
  os: string;
  displayResolution: string;
  battery: string;
  primaryCamera: string[];
  secondaryCmera: string;
  dimentions: string;
  weight: string;
  colors: string[];
  internalMemory: string[];
  options?: ProductOptions;
}

export interface AddToCartPayload {
  id: string;
  colorCode: number;
  storageCode: number;
}

export interface AddToCartResponse {
  count: number;
}

export interface CacheEntry {
  data: Product[] | ProductDetail;
  timestamp: number;
}

export interface CacheStore {
  [key: string]: CacheEntry;
}
