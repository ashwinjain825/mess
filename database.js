// IIITDM Kurnool - Mess Menu Data extracted from Mess Menu Comparison PDF
// Days: monday, tuesday, wednesday, thursday, friday, saturday, sunday
// Each day contains Mess A and Mess B menus organized by meal sections.

const messMenu = {
  monday: {
    A: {
      breakfast: [
        "Masala Dosa",
        "Sambar",
        "Groundnut Chutney",
        "Sprouts, Egg / Banana",
        "Oats",
        "BBJ",
        "TCM & Nutritious Powder"
      ],
      lunch: [
        "Chappathi",
        "Gutti Vankaya (Brinjal) Masala Curry",
        "Gongura Pappu",
        "Carrot & Beans Dry",
        "White Rice",
        "Tomato Pickle",
        "Curd, Pappad",
        "Veg Salad"
      ],
      snacks: [
        "Punugulu With Chutney",
        "TCM & Nutritious Powder"
      ],
      dinner: [
        "Chicken Dum Biriyani",
        "Kadai Paneer, Veg Pulao",
        "Chappathi",
        "Chicken Serva",
        "Veg Raitha",
        "Mysore Pak Or Bread Halwa"
      ]
    },
    B: {
      breakfast: [
        "Aloo Paratha",
        "Vermicilli Poha",
        "Mint Chutney",
        "Sprouts",
        "1 Boiled Egg / 1 Banana",
        "Bread (6 slices)",
        "Butter",
        "Mixed Fruit Jam",
        "Chocos",
        "Tea/Coffee 1 pouch milk (100ml) with Milk Malt"
      ],
      lunch: [
        "Chapathi",
        "Rajma Masala",
        "Channa Dal Tadka",
        "Mix Veg Sambar",
        "Rice",
        "Pickle",
        "Curd (1 cup)",
        "Sugar",
        "Beetroot",
        "Veg Salad",
        "Papad"
      ],
      snacks: [
        "Pasta + Tomato Sauce",
        "Tea/Coffee 1 pouch milk (100ml) with Milk Malt"
      ],
      dinner: [
        "Chicken Dum Biryani (150 gms)",
        "Paneer Biryani (80 gram)",
        "Serva",
        "Bundi Raitha",
        "Salad",
        "Kulfi"
      ]
    }
  },
  tuesday: {
    A: {
      breakfast: [
        "Pesaratttu Dosa",
        "Semiya Kitchadi",
        "Sambar, Groundnut Chutney",
        "Sprouts, Egg / Banana",
        "Ragi Malt",
        "BBJ",
        "TCM & Nutritious Powder"
      ],
      lunch: [
        "Butter Chappathi",
        "Seasonal Green Leaves Curry",
        "Yellow Cucumber Sambar",
        "Bindy+Peanut Fry",
        "White Rice",
        "Gongura Chutney",
        "Curd, Fryums",
        "Veg Salad"
      ],
      snacks: [
        "Onion Samosa (2pc)",
        "TCM & Nutritious Powder"
      ],
      dinner: [
        "White Rice",
        "Tomoto Fried Rice",
        "Coconut Chutney",
        "Sambar, Curd",
        "Set Dosa",
        "Banana 1 nos"
      ]
    },
    B: {
      breakfast: [
        "Idli Vada",
        "Sprouts",
        "Coconut Chutney",
        "Sambar",
        "1 Boiled Egg / 1 Banana",
        "Bread (6 slices)",
        "Butter",
        "Mixed Fruit Jam",
        "Chocos",
        "Tea/Coffee 1 pouch milk (100ml) with Milk Malt"
      ],
      lunch: [
        "Bhature",
        "Chole Chana Masala",
        "Bottal Gourd Dal",
        "Sambar",
        "Bhindi Peanut Fry",
        "Rice",
        "Pickle",
        "Curd (1 cup)",
        "Sugar",
        "Beetroot",
        "Veg Salad",
        "Papad"
      ],
      snacks: [
        "Papadi Chat 2pcs + Curd + Sweet Chutney",
        "Tea/Coffee 1 pouch milk (100ml) with Milk Malt"
      ],
      dinner: [
        "Paneer Fried Rice & Plain Rice",
        "Dal Makhni",
        "Sank Gourd",
        "Curd",
        "Roti",
        "Salad",
        "Mixed Fruit"
      ]
    }
  },
  wednesday: {
    A: {
      breakfast: [
        "Poori, Aloo Kuruma",
        "Pulihora / Lemon Rice",
        "Coconut Chutney",
        "Sprouts, Egg / Banana",
        "Corn Flakes",
        "BBJ",
        "TCM & Nutritious Powder"
      ],
      lunch: [
        "Chaapthi",
        "Tomato Dal",
        "Seasonal Drumstick Sambar",
        "Kadai Veg / Egg Curry",
        "White Rice",
        "Mango Pickle",
        "Curd, Pappad",
        "Veg Salad"
      ],
      snacks: [
        "Mirchi Bajji",
        "Chilli, Tomato Sauce",
        "TCM & Nutritious Powder"
      ],
      dinner: [
        "White Rice",
        "Jeera Fried Rice",
        "Soya Curry",
        "Sambar, Curd",
        "Chappathi",
        "Seasonal Fruits"
      ]
    },
    B: {
      breakfast: [
        "Dosa",
        "Groundnut Chutney",
        "Sambar",
        "Sprouts",
        "1 Boiled Egg / 1 Banana",
        "Bread (6 slices)",
        "Butter",
        "Mixed Fruit Jam",
        "Cornflakes",
        "Tea/Coffee 1 pouch milk (100ml) with Milk Malt"
      ],
      lunch: [
        "Chapathi",
        "Mixed Dal",
        "Matar Peas Curry",
        "Rice",
        "Pickle",
        "Curd (1 cup)",
        "Sugar",
        "Beetroot",
        "Veg Salad",
        "Papad"
      ],
      snacks: [
        "Samosa 1pc + Chutney",
        "Tea/Coffee 1 pouch milk (100ml) with Milk Malt"
      ],
      dinner: [
        "Tomato Rice & Plain Rice",
        "Palak Dal",
        "Malai Kofta",
        "Curd",
        "Roti",
        "Salad",
        "Mixed Fruit",
        "Rasam"
      ]
    }
  },
  thursday: {
    A: {
      breakfast: [
        "Pongal",
        "Vada, Sambar",
        "Coconut Chutney",
        "Sprouts, Egg / Banana",
        "Ragi Malt",
        "BBJ",
        "TCM & Nutritious Powder"
      ],
      lunch: [
        "Chaapathi",
        "Mix Veg Sambar",
        "Aloo Curry",
        "Bitter Gourd Fry",
        "White Rice",
        "Dondakaya Pachadi",
        "Curd, Fryums",
        "Veg Salad"
      ],
      snacks: [
        "Onion Pakodo",
        "TCM & Nutritious Powder"
      ],
      dinner: [
        "White Rice",
        "Veg Pulao",
        "Soya Curry",
        "Sambar, Curd",
        "Chappathi",
        "Kulfi"
      ]
    },
    B: {
      breakfast: [
        "Moong Dal Uttapam",
        "Mysore Bonda",
        "Ground Chutney",
        "Sambar",
        "1 Boiled Egg / 1 Banana",
        "Bread (6 slices)",
        "Butter",
        "Mixed Fruit Jam",
        "Chocos",
        "Tea/Coffee 1 pouch milk (100ml) with Milk Malt"
      ],
      lunch: [
        "Methi Poori",
        "Arhar Dal",
        "Aloo Masala Dry",
        "Sambar",
        "Rice",
        "Pickle",
        "Curd (1 cup)",
        "Sugar",
        "Beetroot",
        "Veg Salad",
        "Papad"
      ],
      snacks: [
        "Noodles + Tomato Sauce",
        "Tea/Coffee 1 pouch milk (100ml) with Milk Malt"
      ],
      dinner: [
        "Veg Pulao & Plain Rice",
        "Chicken Curry (150 gms of chicken) & Butter Paneer (80 gms of paneer)",
        "Curd",
        "Roti",
        "Salad",
        "Kheer"
      ]
    }
  },
  friday: {
    A: {
      breakfast: [
        "Onion Dosa",
        "Mixed Fruits",
        "Sambar, Coconut Chutney",
        "Sprouts, Egg / Banana",
        "Oats",
        "BBJ",
        "TCM & Nutritious Powder"
      ],
      lunch: [
        "Butter Chappathi",
        "Drumstick Curry",
        "Dal Taduka",
        "Dondakaya Fry",
        "White Rice",
        "Gongura Chutney",
        "Curd, Pappad",
        "Veg Salad"
      ],
      snacks: [
        "Chenna (Boiled with Masala)",
        "TCM & Nutritious Powder"
      ],
      dinner: [
        "White Rice",
        "Tamarind Rice",
        "Egg Masala / Soya Curry",
        "Sambar, Curd",
        "Chappathi",
        "Banana 1 nos"
      ]
    },
    B: {
      breakfast: [
        "Kachori",
        "Aloo Sbji",
        "Poha",
        "Sprouts",
        "1 Boiled Egg / 1 Banana",
        "Bread (6 slices)",
        "Butter",
        "Mixed Fruit Jam",
        "Cornflakes",
        "Tea/Coffee 1 pouch milk (100ml) with Milk Malt"
      ],
      lunch: [
        "Chapathi",
        "Dal Tadka",
        "Chicken Curry (150 gms of chicken) & Butter Paneer (80 gms of paneer)",
        "Rice",
        "Pickle",
        "Curd (1 cup)",
        "Sugar",
        "Beetroot",
        "Veg Salad",
        "Papad"
      ],
      snacks: [
        "Veg Cutlet 2pc with Chutney",
        "Tea/Coffee 1 pouch milk (100ml) with Milk Malt"
      ],
      dinner: [
        "Jeera Fried Rice & Plain Rice",
        "Thotakura Dal",
        "Soyabean Curry",
        "Curd",
        "Roti",
        "Salad",
        "Mixed Fruit",
        "Rasam"
      ]
    }
  },
  saturday: {
    A: {
      breakfast: [
        "Idli + Vada",
        "Sambar",
        "Groundnut Chutney",
        "Sprouts, Egg / Banana",
        "Ragi Malt",
        "BBJ",
        "TCM & Nutritious Powder"
      ],
      lunch: [
        "Chappathi",
        "Chicken Fry / Paneer Fry",
        "Seasonal Pappu",
        "White Rice",
        "Mango Pickle",
        "Curd, Fryums",
        "Veg Salad"
      ],
      snacks: [
        "Samosa (Big 1)",
        "TCM & Nutritious Powder"
      ],
      dinner: [
        "White Rice",
        "Paneer Fry Rice",
        "Dal Taduka",
        "Seasonal Gummadikayi (Pumpkin)",
        "Chappathi, Veg Raitha",
        "Seasonal Fruits"
      ]
    },
    B: {
      breakfast: [
        "Veg Sandwich",
        "Green Chutney + Tomato Sauce",
        "Sprouts",
        "1 Boiled Egg / 1 Banana",
        "Bread (6 slices)",
        "Butter",
        "Mixed Fruit Jam",
        "Chocos",
        "Tea/Coffee 1 pouch milk (100ml) with Milk Malt"
      ],
      lunch: [
        "Chapathi",
        "Dal Makhani",
        "Gobi Masala",
        "Rice",
        "Pickle",
        "Curd (1 cup)",
        "Sugar",
        "Beetroot",
        "Veg Salad",
        "Papad"
      ],
      snacks: [
        "Bread Pakoda 1 nos",
        "Tea/Coffee 1 pouch milk (100ml) with Milk Malt"
      ],
      dinner: [
        "Tamrind Rice & Plain Rice",
        "Chicken Curry (150 gms of chicken) & Kadai Paneer (80 gms of paneer)",
        "Bundi Raitha",
        "Chapathi",
        "Salad",
        "Suji Halwa"
      ]
    }
  },
  sunday: {
    A: {
      breakfast: [
        "Mixed Fruits",
        "Uggani + Mirchi Bajji",
        "Sprouts, Egg / Banana",
        "Corn Flakes",
        "BBJ",
        "TCM & Nutritious Powder"
      ],
      lunch: [
        "Chappathi",
        "Seasonal (Hysolath) Anopakaya Curry",
        "Ladies Finger Gravy",
        "Gobi 65",
        "White Rice",
        "Gongura Chutney",
        "Curd, Pappad",
        "Veg Salad"
      ],
      snacks: [
        "Pani Poori (6 Pieces)",
        "TCM & Nutritious Powder"
      ],
      dinner: [
        "White Rice",
        "Veg Pulao, Poori",
        "Aloo Kuruma",
        "Beetroot Fry",
        "Curd",
        "Carrot Halwa"
      ]
    },
    B: {
      breakfast: [
        "Adai",
        "Coconut Chutney",
        "Sprouts",
        "1 Boiled Egg / 1 Banana",
        "Bread (6 slices)",
        "Butter",
        "Mixed Fruit Jam",
        "Cornflakes",
        "Tea/Coffee 1 pouch milk (100ml) with Milk Malt"
      ],
      lunch: [
        "Chapathi",
        "Kadi Pakoda",
        "Lauki Chana Dal",
        "Cabbage and Beans Dry",
        "Rice",
        "Pickle",
        "Curd (1 cup)",
        "Sugar",
        "Beetroot",
        "Veg Salad",
        "Papad"
      ],
      snacks: [
        "Boiled White Channa",
        "Tea/Coffee 1 pouch milk (100ml) with Milk Malt"
      ],
      dinner: [
        "Jeera Fried Rice + Plain Rice",
        "Dal",
        "Sev Tomato Curry",
        "Curd",
        "Roti",
        "Salad",
        "Jalebi (2pcs) / Semiya Kheer",
        "Rasam"
      ]
    }
  }
};

// Meal schedule timings (start and end times in 24h HH:MM format)
const mealSchedule = {
  weekday: [
    { id: "breakfast", name: "Breakfast", start: "07:30", end: "09:00", displayTime: "7:30 AM – 9:00 AM" },
    { id: "lunch",     name: "Lunch",     start: "12:30", end: "14:00", displayTime: "12:30 PM – 2:00 PM" },
    { id: "snacks",    name: "Snacks",    start: "17:00", end: "18:00", displayTime: "5:00 PM – 6:00 PM" },
    { id: "dinner",    name: "Dinner",    start: "19:30", end: "21:00", displayTime: "7:30 PM – 9:00 PM" }
  ],
  weekend: [
    { id: "breakfast", name: "Breakfast", start: "07:30", end: "09:30", displayTime: "7:30 AM – 9:30 AM" },
    { id: "lunch",     name: "Lunch",     start: "12:30", end: "14:30", displayTime: "12:30 PM – 2:30 PM" },
    { id: "snacks",    name: "Snacks",    start: "17:00", end: "18:00", displayTime: "5:00 PM – 6:00 PM" },
    { id: "dinner",    name: "Dinner",    start: "19:30", end: "21:30", displayTime: "7:30 PM – 9:30 PM" }
  ]
};
