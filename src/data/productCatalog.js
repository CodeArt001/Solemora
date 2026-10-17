import first from "../assets/OIP.svg";
import second from "../assets/OIP2.svg";
import third from "../assets/OIP3.svg";
import fourth from "../assets/OIP4.svg";
import fifth from "../assets/OIP5.svg";
import menBest1 from "../assets/best1.avif";
import menBest2 from "../assets/best.avif";
import menBest3 from "../assets/best3.webp";
import menBest4 from "../assets/best4.avif";
import womenBest1 from "../assets/best.avif";
import studioLift from "../assets/studiolift.jpg";
import softStep from "../assets/softstep.avif";
import auraKnit from "../assets/Aurakit.avif";
import miniDash from "../assets/minidash.avif";
import playground from "../assets/playground.webp";
import tinyTrek from "../assets/kidsImage.jpg";
import colorPop from "../assets/colorpop.webp";

export const bestSellers = [
  { id: 1, name: "Shoe 1", price: 250, image: first, featured: true },
  { id: 2, name: "Shoe 2", price: 150, image: second },
  { id: 3, name: "Shoe 3", price: 280, image: third },
  { id: 4, name: "Shoe 4", price: 230, image: fourth },
  { id: 5, name: "Shoe 5", price: 300, image: fifth },
];

export const menProducts = [
  {
    id: 1,
    name: "Nova Rose",
    price: 190,
    collection: "Signature collection",
    image: menBest1,
  },
  {
    id: 2,
    name: "City Court",
    price: 220,
    collection: "Signature collection",
    image: menBest2,
  },
  {
    id: 3,
    name: "Trail One",
    price: 175,
    collection: "Signature collection",
    image: menBest3,
  },
  {
    id: 4,
    name: "Mono High",
    price: 240,
    collection: "Signature collection",
    image: menBest4,
  },
];

export const womenProducts = [
  {
    id: 1,
    name: "Nova Rose",
    price: 165,
    collection: "Signature collection",
    image: womenBest1,
  },
  {
    id: 2,
    name: "Studio Lift",
    price: 210,
    collection: "Signature collection",
    image: studioLift,
  },
  {
    id: 3,
    name: "Soft Step",
    price: 145,
    collection: "Signature collection",
    image: softStep,
  },
  {
    id: 4,
    name: "Aura Knit",
    price: 180,
    collection: "Signature collection",
    image: auraKnit,
  },
];

export const kidsProducts = [
  {
    id: 1,
    name: "Mini Dash",
    price: 85,
    collection: "Signature collection",
    image: miniDash,
  },
  {
    id: 2,
    name: "Playground",
    price: 75,
    collection: "Signature collection",
    image: playground,
  },
  {
    id: 3,
    name: "Tiny Trek",
    price: 95,
    collection: "Signature collection",
    image: tinyTrek,
  },
  {
    id: 4,
    name: "Color Pop",
    price: 80,
    collection: "Signature collection",
    image: colorPop,
  },
];
