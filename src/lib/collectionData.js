// A colorway without a `back` photo simply shows no Front/Back toggle.
// To mark a color sold out, add `soldOut: true` to that colorway. The product
// page then shows "Sold Out", checkout refuses it, and Google is told it is
// out of stock. Remove the line (or set it to false) when it is back.
export const COLLECTION_LINES = [
  {
    id: "intrecciato",
    category: "woven",
    name: "The Trellara Portfolio Clutch",
    subtitle: "Woven Leather",
    material: "Hand-woven calfskin, trellara technique",
    description:
      "Constructed entirely by hand using the signature trellara weaving technique, each portfolio clutch requires between 48 and 72 hours of meticulous handwork. The supple calfskin strips are woven by hand, creating a structure that is simultaneously architectural and yielding.",
    price: 298,
    heroImage:
      "/images/products/38ed542b2.webp",
    colorways: [
      {
        id: "noir",
        label: "Noir",
        swatch: "#1a1a1a",
        front: "/images/products/fb72d4114.webp",
        back:  "/images/products/1c82a00eb.webp",
      },
      {
        id: "espresso",
        label: "Espresso",
        swatch: "#3b2314",
        front: "/images/products/751ee8d10.webp",
        back:  "/images/products/43b6275b5.webp",
      },
      {
        id: "cognac",
        label: "Cognac",
        swatch: "#b5763a",
        front: "/images/products/e326729ed.webp",
        back:  "/images/products/3f9b87136.webp",
      },
      {
        id: "emerald",
        label: "Emerald",
        swatch: "#2d6a4f",
        front: "/images/products/38ed542b2.webp",
        back:  "/images/products/fcd6fca28.webp",
      },
      {
        id: "stone",
        label: "Stone",
        swatch: "#a09b93",
        front: "/images/products/d82a35349.webp",
        back:  "/images/products/be28797f8.webp",
      },
    ],
  },
  {
    id: "liscio",
    category: "smooth",
    name: "The Liscio Clutch",
    subtitle: "Smooth Leather",
    material: "Full-grain smooth calfskin",
    description:
      "The Liscio presents the purest expression of the leather itself — full-grain calfskin selected for its natural grain and hand-finished to a subtle burnished luster. Its clean lines and oversized leather-covered dome button allow the material to speak without interruption.",
    price: 248,
    heroImage:
      "/images/products/a8d1751e5.webp",
    colorways: [
      {
        id: "noir",
        label: "Noir",
        swatch: "#1a1a1a",
        front: "/images/products/a8d1751e5.webp",
        back:  "/images/products/1c82a00eb.webp",
      },
      {
        id: "espresso",
        label: "Espresso",
        swatch: "#3b2314",
        front: "/images/products/30cb7c7c6.webp",
        back:  "/images/products/43b6275b5.webp",
      },
      {
        id: "cognac",
        label: "Cognac",
        swatch: "#b5763a",
        front: "/images/products/028bf6aae.webp",
        back:  "/images/products/3f9b87136.webp",
      },
      {
        id: "emerald",
        label: "Emerald",
        swatch: "#2d6a4f",
        front: "/images/products/602c73c66.webp",
        back:  "/images/products/edbd64533.webp",
      },
      {
        id: "stone",
        label: "Stone",
        swatch: "#a09b93",
        front: "/images/products/8a0332b03.webp",
        back:  "/images/products/be28797f8.webp",
      },
    ],
  },
  {
    id: "trellara-flap",
    category: "woven",
    name: "The Trellara Flap Clutch",
    subtitle: "Woven Leather",
    material: "Hand-woven Italian leather, trellara technique",
    description:
      "A hand-woven flap clutch in the signature trellara technique. Soft leather piping frames the flap, which closes over an oversized leather-covered dome button. Inside, a leather-lined zip pocket carries the debossed AANI mark. Measures 17.5 in wide, 6 in high and 5 in deep.",
    price: 472,
    heroImage:
      "/images/products/abb0b7257.webp",
    colorways: [
      {
        id: "fog",
        label: "Vienna Fog",
        swatch: "#819298",
        front: "/images/products/abb0b7257.webp",
      },
      {
        id: "cobalt-blue",
        label: "Cobalt Blue",
        swatch: "#3e6696",
        front: "/images/products/a31e17ae6.webp",
      },
      {
        id: "vienna-tan",
        label: "Vienna Tan",
        swatch: "#844f34",
        front: "/images/products/2fd019e35.webp",
      },
      {
        id: "vienna-navy",
        label: "Vienna Navy",
        swatch: "#34414c",
        front: "/images/products/3305c634f.webp",
      },
      {
        id: "vienna-olive",
        label: "Vienna Olive",
        swatch: "#56594a",
        front: "/images/products/648475f0f.webp",
      },
      {
        id: "vienna-brown",
        label: "Vienna Brown",
        swatch: "#594f49",
        front: "/images/products/4c73c2703.webp",
      },
    ],
  },
];
