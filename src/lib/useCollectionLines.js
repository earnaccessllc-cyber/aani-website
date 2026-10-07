import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/api/supabaseClient';
import { COLLECTION_LINES } from '@/lib/collectionData';

async function fetchCollectionLines() {
  const { data, error } = await supabase
    .from('product_lines')
    .select('*, colorways(*)')
    .order('sort_order')
    .order('sort_order', { referencedTable: 'colorways' });
  if (error) throw error;
  return data.map((l) => ({
    id: l.id,
    category: l.category,
    name: l.name,
    subtitle: l.subtitle,
    material: l.material,
    description: l.description,
    price: Number(l.price),
    heroImage: l.hero_image,
    colorways: l.colorways.map(({ id, label, swatch, front, back }) => ({ id, label, swatch, front, back })),
  }));
}

// Reads the catalog from Supabase; shows the bundled list until it loads,
// and keeps showing it if Supabase isn't configured or the request fails.
export function useCollectionLines() {
  const { data } = useQuery({
    queryKey: ['collection-lines'],
    queryFn: fetchCollectionLines,
    enabled: !!supabase,
  });
  return data?.length ? data : COLLECTION_LINES;
}
