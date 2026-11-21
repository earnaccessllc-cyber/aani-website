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
      "/images/products/4ed11e18a.webp",
    colorways: [
      {
        id: "noir",
        label: "Noir",
        swatch: "#1a1a1a",
        front: "/images/products/9764fe941.webp",
        back:  "/images/products/aed052b39.webp",
      },
      {
        id: "espresso",
        label: "Espresso",
        swatch: "#3b2314",
        front: "/images/products/c2f68d7ee.webp",
        back:  "/images/products/7663b6951.webp",
      },
      {
        id: "cognac",
        label: "Cognac",
        swatch: "#b5763a",
        front: "/images/products/2a0779d7c.webp",
        back:  "/images/products/7dd9dd1e0.webp",
      },
      {
        id: "emerald",
        label: "Emerald",
        swatch: "#2d6a4f",
        front: "/images/products/4ed11e18a.webp",
        back:  "/images/products/5ffeb0423.webp",
      },
      {
        id: "stone",
        label: "Stone",
        swatch: "#a09b93",
        front: "/images/products/3d35b6cfc.webp",
        back:  "/images/products/9e0aa543c.webp",
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
      "/images/products/c952e86b3.webp",
    colorways: [
      {
        id: "noir",
        label: "Noir",
        swatch: "#1a1a1a",
        front: "/images/products/c952e86b3.webp",
        back:  "/images/products/aed052b39.webp",
      },
      {
        id: "espresso",
        label: "Espresso",
        swatch: "#3b2314",
        front: "/images/products/2f8862f9a.webp",
        back:  "/images/products/7663b6951.webp",
      },
      {
        id: "cognac",
        label: "Cognac",
        swatch: "#b5763a",
        front: "/images/products/4cf815ffc.webp",
        back:  "/images/products/7dd9dd1e0.webp",
      },
      {
        id: "emerald",
        label: "Emerald",
        swatch: "#2d6a4f",
        front: "/images/products/eac8772e1.webp",
        back:  "/images/products/481c0a64a.webp",
      },
      {
        id: "stone",
        label: "Stone",
        swatch: "#a09b93",
        front: "/images/products/a344d5d6f.webp",
        back:  "/images/products/9e0aa543c.webp",
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
      "/images/products/47412bfe0.webp",
    colorways: [
      {
        id: "fog",
        label: "Vienna Fog",
        swatch: "#819298",
        front: "/images/products/47412bfe0.webp",
      },
      {
        id: "cobalt-blue",
        label: "Cobalt Blue",
        swatch: "#3e6696",
        front: "/images/products/e766bcc7b.webp",
      },
      {
        id: "vienna-tan",
        label: "Vienna Tan",
        swatch: "#844f34",
        front: "/images/products/d22f3d516.webp",
      },
      {
        id: "vienna-navy",
        label: "Vienna Navy",
        swatch: "#34414c",
        front: "/images/products/a52e594de.webp",
      },
      {
        id: "vienna-olive",
        label: "Vienna Olive",
        swatch: "#56594a",
        front: "/images/products/c38813ccd.webp",
      },
      {
        id: "vienna-brown",
        label: "Vienna Brown",
        swatch: "#594f49",
        front: "/images/products/ecabe3c45.webp",
      },
    ],
  },
];
