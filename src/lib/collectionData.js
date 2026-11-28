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
      "/images/products/d6e03a8f1.webp",
    colorways: [
      {
        id: "noir",
        label: "Noir",
        swatch: "#1a1a1a",
        front: "/images/products/95b24d5f6-v2.webp",
        back:  "/images/products/ba589baef-v2.webp",
      },
      {
        id: "espresso",
        label: "Espresso",
        swatch: "#3b2314",
        front: "/images/products/7c0c46de0-v2.webp",
        back:  "/images/products/23c56172f-v2.webp",
      },
      {
        id: "cognac",
        label: "Cognac",
        swatch: "#b5763a",
        front: "/images/products/99a62b6f4-v2.webp",
        back:  "/images/products/0f34927a6-v2.webp",
      },
      {
        id: "emerald",
        label: "Emerald",
        swatch: "#3f7a45",
        front: "/images/products/d6e03a8f1.webp",
      },
      {
        id: "stone",
        label: "Stone",
        swatch: "#8a9fa3",
        front: "/images/products/c2d71e5a4.webp",
        back:  "/images/products/d9e08b3f6.webp",
      },
      {
        id: "cobalt",
        label: "Cobalt Blue",
        swatch: "#174789",
        front: "/images/products/f8a25d1c7.webp",
        back:  "/images/products/a93b6e2d5.webp",
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
      "/images/products/216044cf5.webp",
    colorways: [
      {
        id: "noir",
        label: "Noir",
        swatch: "#1a1a1a",
        front: "/images/products/216044cf5.webp",
        back:  "/images/products/ba589baef-v2.webp",
      },
      {
        id: "espresso",
        label: "Espresso",
        swatch: "#3b2314",
        front: "/images/products/74ed2f359.webp",
        back:  "/images/products/23c56172f-v2.webp",
      },
      {
        id: "cognac",
        label: "Cognac",
        swatch: "#b5763a",
        front: "/images/products/835bf3540.webp",
        back:  "/images/products/0f34927a6-v2.webp",
      },
      {
        id: "emerald",
        label: "Emerald",
        swatch: "#2d6a4f",
        front: "/images/products/6caf9e7d2.webp",
        back:  "/images/products/5a78d83b9.webp",
      },
      {
        id: "stone",
        label: "Stone",
        swatch: "#a09b93",
        front: "/images/products/1e6d26e8c.webp",
        back:  "/images/products/528e27e9e.webp",
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
      "/images/products/e05146857.webp",
    colorways: [
      {
        id: "fog",
        label: "Vienna Fog",
        swatch: "#819298",
        front: "/images/products/e05146857.webp",
      back: "/images/products/adb4c986f.webp",
      bottom: "/images/products/7a0ed2d82.webp",
      },
      {
        id: "cobalt-blue",
        label: "Cobalt Blue",
        swatch: "#3e6696",
        front: "/images/products/c54196418.webp",
      back: "/images/products/f421f14a8.webp",
      bottom: "/images/products/84ea8e166.webp",
      },
      {
        id: "vienna-tan",
        label: "Vienna Tan",
        swatch: "#844f34",
        front: "/images/products/44d543912.webp",
      back: "/images/products/e0969ea7d.webp",
      bottom: "/images/products/b244acf87.webp",
      },
      {
        id: "vienna-navy",
        label: "Vienna Navy",
        swatch: "#34414c",
        front: "/images/products/eed01b200.webp",
      back: "/images/products/ade015231.webp",
      bottom: "/images/products/8a44ad2b9.webp",
      },
      {
        id: "vienna-olive",
        label: "Vienna Olive",
        swatch: "#56594a",
        front: "/images/products/d886415c0.webp",
      back: "/images/products/2aa5090a1.webp",
      bottom: "/images/products/996d62ad3.webp",
      },
      {
        id: "vienna-brown",
        label: "Vienna Brown",
        swatch: "#594f49",
        front: "/images/products/07e0b15dd.webp",
      back: "/images/products/799dcfa2c.webp",
      bottom: "/images/products/25570071d.webp",
      },
      {
        id: "vienna-black",
        label: "Vienna Black",
        swatch: "#1c1c1e",
        front: "/images/products/9ce31363d.webp",
      back: "/images/products/0b8b00c9f.webp",
      bottom: "/images/products/030426e21.webp",
      },
      {
        id: "kelly-green",
        label: "Kelly Green",
        swatch: "#1e803e",
        front: "/images/products/ef3760cfc.webp",
        back: "/images/products/76a34201e.webp",
        bottom: "/images/products/b2680f969.webp",
      },
    ],
  },
];
