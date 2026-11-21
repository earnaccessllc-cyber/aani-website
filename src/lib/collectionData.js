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
      "/images/products/35e30c314.webp",
    colorways: [
      {
        id: "noir",
        label: "Noir",
        swatch: "#1a1a1a",
        front: "/images/products/6391fa4b6.webp",
        back:  "/images/products/454c303d2.webp",
      },
      {
        id: "espresso",
        label: "Espresso",
        swatch: "#3b2314",
        front: "/images/products/2fbe1623b.webp",
        back:  "/images/products/ffbe37b78.webp",
      },
      {
        id: "cognac",
        label: "Cognac",
        swatch: "#b5763a",
        front: "/images/products/ead411a5e.webp",
        back:  "/images/products/87c0f736b.webp",
      },
      {
        id: "emerald",
        label: "Emerald",
        swatch: "#2d6a4f",
        front: "/images/products/35e30c314.webp",
        back:  "/images/products/b28bc4808.webp",
      },
      {
        id: "stone",
        label: "Stone",
        swatch: "#a09b93",
        front: "/images/products/e219b8db3.webp",
        back:  "/images/products/5c741d127.webp",
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
      "/images/products/e028e5558.webp",
    colorways: [
      {
        id: "noir",
        label: "Noir",
        swatch: "#1a1a1a",
        front: "/images/products/e028e5558.webp",
        back:  "/images/products/454c303d2.webp",
      },
      {
        id: "espresso",
        label: "Espresso",
        swatch: "#3b2314",
        front: "/images/products/b72eb58ef.webp",
        back:  "/images/products/ffbe37b78.webp",
      },
      {
        id: "cognac",
        label: "Cognac",
        swatch: "#b5763a",
        front: "/images/products/3da1c2da4.webp",
        back:  "/images/products/87c0f736b.webp",
      },
      {
        id: "emerald",
        label: "Emerald",
        swatch: "#2d6a4f",
        front: "/images/products/45aa40838.webp",
        back:  "/images/products/19d3d5bf5.webp",
      },
      {
        id: "stone",
        label: "Stone",
        swatch: "#a09b93",
        front: "/images/products/03a4701f4.webp",
        back:  "/images/products/5c741d127.webp",
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
      "/images/products/f3e6b8748.webp",
    colorways: [
      {
        id: "fog",
        label: "Vienna Fog",
        swatch: "#819298",
        front: "/images/products/f3e6b8748.webp",
      },
      {
        id: "cobalt-blue",
        label: "Cobalt Blue",
        swatch: "#3e6696",
        front: "/images/products/c19c49087.webp",
      },
      {
        id: "vienna-tan",
        label: "Vienna Tan",
        swatch: "#844f34",
        front: "/images/products/e9b84c590.webp",
      },
      {
        id: "vienna-navy",
        label: "Vienna Navy",
        swatch: "#34414c",
        front: "/images/products/da1c36a11.webp",
      },
      {
        id: "vienna-olive",
        label: "Vienna Olive",
        swatch: "#56594a",
        front: "/images/products/2a667b6e9.webp",
      },
      {
        id: "vienna-brown",
        label: "Vienna Brown",
        swatch: "#594f49",
        front: "/images/products/a177c333f.webp",
      },
    ],
  },
];
