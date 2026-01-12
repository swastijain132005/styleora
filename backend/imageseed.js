import cloudinary from "./cloudconfig.js";

const imagesByCategory = {
  men: {
    tshirts: [
        "https://images.unsplash.com/photo-1521498542256-5aeb47ba2b36?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D"
      
    ],
    shirts:[
        "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVucyUyMHNoaXJ0fGVufDB8fDB8fHww",
        "https://plus.unsplash.com/premium_photo-1683140431958-31505d0fd1ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVucyUyMHNoaXJ0fGVufDB8fDB8fHww",
        "https://plus.unsplash.com/premium_photo-1661627681947-4431c8c97659?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1595255958792-2740eb409d4e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fG1lbnMlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D",

    ],
    jeans: [
     "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVucyUyMGplYW5zfGVufDB8fDB8fHww",
     "https://images.unsplash.com/photo-1608366558876-185ea88608eb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVucyUyMGplYW5zfGVufDB8fDB8fHww",
    ],
    trousers:[
        "https://images.unsplash.com/photo-1552904219-f4b87efe8792?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVucyUyMHRyb3VzZXJzfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1648301558657-b55db298200a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1lbnMlMjB0cm91c2Vyc3xlbnwwfHwwfHx8MA%3D%3D",
    ],
    jackets:[
        "https://images.unsplash.com/photo-1595255958792-2740eb409d4e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fG1lbnMlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D"],
        hoodies:[
            "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVucyUyMHNoaXJ0fGVufDB8fDB8fHww",
            "https://plus.unsplash.com/premium_photo-1683140431958-31505d0fd1ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVucyUyMHNoaXJ0fGVufDB8fDB8fHww",
            "https://plus.unsplash.com/premium_photo-1661627681947-4431c8c97659?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1595255958792-2740eb409d4e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fG1lbnMlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D",

        ],
        sweatshirts:[
            "https://images.unsplash.com/photo-1521498542256-5aeb47ba2b36?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D"
        ],
        kurtas:[
            "https://images.unsplash.com/photo-1727835523545-70ee992b5763?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a3VydGF8ZW58MHx8MHx8fDA%3D",
            "https://plus.unsplash.com/premium_photo-1691030256214-dc57034ec935?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a3VydGF8ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1744551358303-46edae8b374b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a3VydGF8ZW58MHx8MHx8fDA%3D",


        ],
        shorts:[
"https://images.unsplash.com/photo-1617951907145-53f6eb87a3a3?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
"",
"https://images.unsplash.com/photo-1617951907145-53f6eb87a3a3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVucyUyMHNob3J0c3xlbnwwfHwwfHx8MA%3D%3D"
        ],
        trackPants:[
            "https://images.unsplash.com/photo-1595255958792-2740eb409d4e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fG1lbnMlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D",]

  },

  women: {
    dresses: [
      "https://images.unsplash.com/photo-1633077705107-8f53a004218f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjBkcmVzc2VzfGVufDB8fDB8fHww",
      "https://plus.unsplash.com/premium_photo-1676236306466-25ba882070b3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d29tZW4lMjBkcmVzc2VzfGVufDB8fDB8fHww",
      "https://plus.unsplash.com/premium_photo-1664367340650-920512b12005?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHdvbWVuJTIwZHJlc3Nlc3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1753192105348-3b263840b73b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdvbWVuJTIwZHJlc3Nlc3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1753192108400-7e73fb581d69?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHdvbWVuJTIwZHJlc3Nlc3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1753192104212-14f586962222?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdvbWVuJTIwZHJlc3Nlc3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1528812969535-4bcefc071532?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d29tZW4lMjBkcmVzc2VzfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1640923160720-35dddb6348ab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29tZW4lMjBkcmVzc2VzfGVufDB8fDB8fHww"

    ],
    tops: [
      "https://images.unsplash.com/photo-1530981785497-a62037228fe9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjB0b3BzfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9wc3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1603217192097-13c306522271?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG9wc3xlbnwwfHwwfHx8MA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1664478180158-6bcc5527661f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9wc3xlbnwwfHwwfHx8MA%3D%3D",



    ],
    kurtis:[
      "https://images.unsplash.com/photo-1745313452052-0e4e341f326c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a3VydGlzfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1708534419572-6e6614a53ca1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a3VydGlzfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1667665970124-2273c6ef3489?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a3VydGlzfGVufDB8fDB8fHww"],
      sarees:[
        "https://plus.unsplash.com/premium_photo-1682092039530-584ae1d9da7f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FyZWV8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2FyZWV8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1679006831648-7c9ea12e5807?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2FyZWV8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1641699862936-be9f49b1c38d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2FyZWV8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1618901185975-d59f7091bcfe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FyZWV8ZW58MHx8MHx8fDA%3D",
        "https://plus.unsplash.com/premium_photo-1682096159299-5e8a6d5d442b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNhcmVlfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1615886753866-79396abc446e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNhcmVlfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1610030469668-8e9f641aaf27?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNhcmVlfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1610030469839-f909584b43f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNhcmVlfGVufDB8fDB8fHww",
        "https://images.unsplash.com/flagged/photo-1551854716-8b811be39e7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNhcmVlfGVufDB8fDB8fHww",


      ],
      jeans:[
        "https://plus.unsplash.com/premium_photo-1665664652383-2308d742943c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2lybHMlMjBqZWFuc3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1661978955233-817f19f44d82?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGdpcmxzJTIwamVhbnN8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1634848742654-bff320130b54?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdpcmxzJTIwamVhbnN8ZW58MHx8MHx8fDA%3D"
      ],
      

  },

  unisex: {
    hoodies: [
      "https://images.unsplash.com/photo-1680292783974-a9a336c10366?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG9vZGllc3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1618333845076-890b5baf8ffe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG9vZGllc3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1512977141980-8cc662e38a0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhvb2RpZXN8ZW58MHx8MHx8fDA%3D",

    ],
    sweatshirts:[
      "https://images.unsplash.com/photo-1521498542256-5aeb47ba2b36?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D"

    ],
    

  }
};

const uploadCategoryImages = async () => {
  try {
    for (const category in imagesByCategory) {
      for (const subCategory in imagesByCategory[category]) {
        for (const url of imagesByCategory[category][subCategory]) {

          const res = await cloudinary.uploader.upload(url, {
            folder: `styleora/${category}/${subCategory}`,
            resource_type: "image"
          });

          console.log(
            `Uploaded → ${category}/${subCategory}:`,
            res.secure_url
          );
        }
      }
    }

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

uploadCategoryImages();
