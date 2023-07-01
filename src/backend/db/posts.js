import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:
      "I follow👣 my heart💖 … and it usually leads me to the airport✈️",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    profile:"https://th.bing.com/th/id/OIP.wru1Ma53OxoRC9DLsCo3TwHaE8?w=271&h=181&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    story:"https://th.bing.com/th/id/OIP.9xJ09k9msfKmRtD56K2k6wAAAA?w=187&h=333&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    feed:"https://th.bing.com/th/id/OIP.2m-xxJ0yGON2HlGg11HosAHaNK?w=187&h=333&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    tags:["#travel","#lifeStyle","#travelfreak"]
  },
  {
    _id: uuid(),
    content:
      "So much fun🐚, so much adventure🤠. So little time 🎓😎",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "shubhamsoni",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    profile:"https://th.bing.com/th/id/OIP.1OxHm0-YJ86HSsNFBf3kOAHaHa?w=164&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    story:"https://th.bing.com/th/id/OIP.qzo20py-jLuSYn3ZSBS5LQHaD8?pid=ImgDet&w=191&h=101&c=7&dpr=1.5",
    feed:"https://th.bing.com/th/id/OIP.huUratWXqZRuuDHqVIROigHaMb?w=193&h=323&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    tags:["#Work","#Study","#Achieve", "#learnMore"]
  },
  {
    _id: uuid(),
    content:
      "Every Sunset🌇 is an oppurtunity to reset☮️ ",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "Naksh",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    profile:"https://th.bing.com/th/id/OIP.pQktO-tEBqV5H-heSAJMVAHaHa?w=195&h=195&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    story:"https://th.bing.com/th/id/OIP.lCofFgN4IpjHFcL2jD_HmAHaJJ?w=165&h=204&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    feed:"https://th.bing.com/th/id/OIP.L96B8-BvFMllcofwmeJEsgHaMb?w=192&h=323&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    tags:["#Sunset","#lifeStyle","#peace"]
  },
  {
    _id: uuid(),
    content:
      "Life🐚 is a combination of magic🪄 and pasta🍝",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "Akshara",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    profile:"https://th.bing.com/th/id/OIP.rHonqEQFdzqgiVpHdLI8JgHaHa?w=217&h=217&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    story:"https://www.bing.com/th/id/OGC.add94b2ebe932da67c08111076eef359?pid=1.7&rurl=https%3a%2f%2fmedia.tenor.com%2fimages%2fadd94b2ebe932da67c08111076eef359%2ftenor.gif&ehk=umexpkpOfy5e%2b07WUXy1gRVGvI1VZOSaW3%2foSzaBfvY%3d",
    feed:"https://th.bing.com/th/id/OIP.U1y4E5eWahMLxmOx5NJ5JQHaNL?w=187&h=333&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    tags:["#foodie","#magic","#pasta"]
  },
  {
    _id: uuid(),
    content:
      "One good thing about music🎶, when it hits you, you feel no pain🈺.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "Benny",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    profile:"https://th.bing.com/th/id/OIP.1OxHm0-YJ86HSsNFBf3kOAHaHa?w=164&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    story:"https://th.bing.com/th/id/OIP.j5J3h8GOK7b4LkD_Go_NxgHaJg?w=158&h=204&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    feed:"https://th.bing.com/th/id/OIP.Yapt0CVh6C8vF-fVzve0eQHaNK?w=187&h=333&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    tags:["#Music","#Peace","#heals"]
  },
  {
    _id: uuid(),
    content:
      "History📜 will be kind to me for I to intend to write✍️ it",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "Ananya",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    profile:"https://th.bing.com/th/id/OIP.p-Spk7NbFmY1kpNqyAINIAHaHs?w=199&h=206&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    story:"https://www.bing.com/th/id/OGC.26d9c752e5d040ec5ed378d3bde86050?pid=1.7&rurl=https%3a%2f%2fmedia1.tenor.com%2fimages%2f26d9c752e5d040ec5ed378d3bde86050%2ftenor.gif%3fitemid%3d13668644&ehk=MApi%2bLnZuBHZ3juknbc4nMzXkiwaGEbqkERveotY5uQ%3d",
    feed:"https://th.bing.com/th/id/OIP.mec--5APqLO9SAi5mlWeHAHaNK?w=187&h=333&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    tags:["#History","#Write","#Coffee" ,"#fresh"]
  },
];