import { COLLECTION_LINES } from '@/lib/collectionData';

// The catalog lives in collectionData.js. The bag and the server-side checkout
// read the same file, so what a customer sees is always what they are charged.
// (It used to be fetched from Supabase on every page view, which added a
// network round trip before products could change.)
export function useCollectionLines() {
  return COLLECTION_LINES;
}
