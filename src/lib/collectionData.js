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
      "/images/products/9669d9ec3.webp",
    colorways: [
      {
        id: "noir",
        label: "Noir",
        swatch: "#1a1a1a",
        front: "/images/products/c3d34a9e1.webp",
        back:  "/images/products/bf2da8e8b.webp",
      },
      {
        id: "espresso",
        label: "Espresso",
        swatch: "#3b2314",
        front: "/images/products/3898cbe34.webp",
        back:  "/images/products/229662a3c.webp",
      },
      {
        id: "cognac",
        label: "Cognac",
        swatch: "#b5763a",
        front: "/images/products/21859d7af.webp",
        back:  "/images/products/43d013188.webp",
      },
      {
        id: "emerald",
        label: "Emerald",
        swatch: "#2d6a4f",
        front: "/images/products/9669d9ec3.webp",
        back:  "/images/products/51a508ea6.webp",
      },
      {
        id: "stone",
        label: "Stone",
        swatch: "#a09b93",
        front: "/images/products/93cf7b77e.webp",
        back:  "/images/products/e135c8bc0.webp",
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
    price: 298,
    heroImage:
      "/images/products/ddbd6b694.webp",
    colorways: [
      {
        id: "noir",
        label: "Noir",
        swatch: "#1a1a1a",
        front: "/images/products/ddbd6b694.webp",
        back:  "/images/products/bf2da8e8b.webp",
      },
      {
        id: "espresso",
        label: "Espresso",
        swatch: "#3b2314",
        front: "/images/products/c7ed2fe5c.webp",
        back:  "/images/products/229662a3c.webp",
      },
      {
        id: "cognac",
        label: "Cognac",
        swatch: "#b5763a",
        front: "/images/products/3592ad481.webp",
        back:  "/images/products/43d013188.webp",
      },
      {
        id: "emerald",
        label: "Emerald",
        swatch: "#2d6a4f",
        front: "/images/products/830bbee75.webp",
        back:  "/images/products/22ebec32e.webp",
      },
      {
        id: "stone",
        label: "Stone",
        swatch: "#a09b93",
        front: "/images/products/0b02fb579.webp",
        back:  "/images/products/e135c8bc0.webp",
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
