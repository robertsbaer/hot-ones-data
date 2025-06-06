const allSeasonSauces = {
    1: [
      { name: "Texas Pete Original Hot Sauce", scoville: 747 },
      { name: "Cholula Original Hot Sauce", scoville: 3600 },
      { name: "El Yucateco Caribbean Hot Sauce", scoville: 5790 },
      { name: "Lottie's Traditional Barbados Yellow Hot Pepper Sauce", scoville: 15000 },
      { name: "Pain Is Good Batch #218 Louisiana Style Hot Sauce", scoville: 13000 },
      { name: "Pain 100% Hot Sauce", scoville: 40600 },
      { name: "Blair's Original Death Sauce with Chipotle", scoville: 30000 },
      { name: "Dave's Gourmet Temporary Insanity Hot Sauce", scoville: 57000 },
      { name: "Dave's Gourmet Insanity Hot Sauce", scoville: 180000 },
      { name: "Mad Dog 357 Hot Sauce", scoville: 357000 }
    ],
    2: [
      { name: "Huy Fong Sriracha Sauce", scoville: 2200 },
      { name: "Tapatío Hot Sauce", scoville: 3000 },
      { name: "El Yucateco Chile Habanero Hot Sauce", scoville: 5790 },
      { name: "Pain Is Good Batch #218 Louisiana Style Hot Sauce", scoville: 13000 },
      { name: "Hot Ones Fiery Chipotle Hot Sauce", scoville: 15600 },
      { name: "High River Sauces Rogue Hot Sauce", scoville: 34000 },
      { name: "Pain 100% Hot Sauce", scoville: 40600 },
      { name: "Da' Bomb Beyond Insanity Hot Sauce", scoville: 135600 },
      { name: "Mad Dog 357 Hot Sauce", scoville: 357000 },
      { name: "Blair's Mega Death Sauce", scoville: 550000 }
    ],
    3: [
      { name: "Huy Fong Sriracha Sauce", scoville: 2200 },
      { name: "Tabasco Sauce", scoville: 4000 },
      { name: "El Yucateco Chile Habanero Hot Sauce", scoville: 5790 },
      { name: "Queen Majesty Red Habanero and Black Coffee Hot Sauce", scoville: 14000 },
      { name: "Hot Ones Fiery Chipotle Hot Sauce", scoville: 15600 },
      { name: "Bravado Spice Company Ghost Pepper and Blueberry Hot Sauce", scoville: 28000 },
      { name: "Zombie Apocalypse Ghost Chili Sauce", scoville: 100000 },
      { name: "Da' Bomb Beyond Insanity Hot Sauce", scoville: 135600 },
      { name: "Mad Dog 357 Hot Sauce", scoville: 357000 },
      { name: "Blair's Mega Death Sauce", scoville: 550000 }
    ],
    4: [
      { name: "Valentina Black Label Hot Sauce", scoville: 2100 },
      { name: "Crystal Hot Sauce", scoville: 3000 },
      { name: "Secret Aardvark Habanero Hot Sauce", scoville: 5000 },
      { name: "Queen Majesty Scotch Bonnet and Ginger Hot Sauce", scoville: 9000 },
      { name: "Hot Ones Fiery Chipotle Hot Sauce", scoville: 15600 },
      { name: "Dirty Dick’s Hot Pepper Sauce With a Tropical Twist", scoville: 21000 },
      { name: "Zombie Apocalypse Ghost Chili Sauce", scoville: 100000 },
      { name: "Da' Bomb Beyond Insanity Hot Sauce", scoville: 135600 },
      { name: "Blair's Mega Death Sauce", scoville: 550000 },
      { name: "Hot Ones The Last Dab Hot Sauce", scoville: 1000000 }
    ],
    5: [
      { name: "Humble House Ancho & Morita Hot Sauce", scoville: 450 },
      { name: "Original Louisiana Hot Sauce", scoville: 550 },
      { name: "Small Axe Peppers The Bronx Greenmarket Hot Sauce", scoville: 5500 },
      { name: "Hot Ones Fiery Chipotle Hot Sauce", scoville: 15600 },
      { name: "Adoboloco Hawaiian Hot Sauce Hamajang Kiawe Smoked Ghost Pepper", scoville: 32000 },
      { name: "Karma Sauce Extreme Karma Hot Sauce", scoville: 56000 },
      { name: "Dawson's Original Hot Sauce", scoville: 82000 },
      { name: "Da' Bomb Beyond Insanity Hot Sauce", scoville: 135600 },
      { name: "Mad Dog 357 Hot Sauce - 25th Anniversary Edition", scoville: 1000000 },
      { name: "Hot Ones The Last Dab Hot Sauce", scoville: 2000000 }
    ],
    6: [
      { name: "Howler Monkey Original Hot Sauce", scoville: 600 },
      { name: "Heartbeat Hot Sauce Red Habanero Hot Sauce", scoville: 4000 },
      { name: "Pirate's Lantern Pepper Sauce", scoville: 7500 },
      { name: "Torchbearer Son of Zombie Wing Sauce", scoville: 24000 },
      { name: "Hot Ones Los Calientes Hot Sauce", scoville: 36000 },
      { name: "Bravado Spice Company Black Garlic Carolina Reaper Hot Sauce", scoville: 71000 },
      { name: "Bunsters Black Label Hot Sauce", scoville: 99000 },
      { name: "Da' Bomb Beyond Insanity Hot Sauce", scoville: 135600 },
      { name: "Hellfire Fiery Fool Hot Sauce", scoville: 550000 },
      { name: "Hot Ones The Last Dab Reduxx", scoville: 2000000 }
    ],
    7: [
      { name: "Hot Ones The Classic Hot Sauce", scoville: 1800 },
      { name: "Humble House Guajillo & Red Jalapeno Hot Sauce", scoville: 2100 },
      { name: "Butterfly Bakery of Vermont Maple Wood Smoked Onion Hot Sauce", scoville: 7900 },
      { name: "Small Axe Peppers Habanero Mango Hot Sauce", scoville: 22500 },
      { name: "Hot Ones Los Calientes Hot Sauce", scoville: 36000 },
      { name: "Clark and Hopkins Assam Hot Sauce", scoville: 55000 },
      { name: "Culley's Fire Water Hot Sauce", scoville: 112000 },
      { name: "Da' Bomb Beyond Insanity Hot Sauce", scoville: 135600 },
      { name: "Burns & McCoy Exhorresco Hot Sauce", scoville: 625000 },
      { name: "Hot Ones The Last Dab Reduxx", scoville: 2000000 }
    ],
    8: [
      { name: "Hot Ones The Classic Hot Sauce", scoville: 1800 },
      { name: "Angry Goat Hippy Dippy Green Hot Sauce", scoville: 2300 },
      { name: "Paddy O's Potion Hot Sauce", scoville: 8800 },
      { name: "High River Sauces Cheeba Gold Hot Sauce", scoville: 25300 },
      { name: "Hot Ones Los Calientes Hot Sauce", scoville: 36000 },
      { name: "Adoboloco Kolohe Kid Hot Sauce", scoville: 61000 },
      { name: "Torchbearer Garlic Reaper Hot Sauce", scoville: 116000 },
      { name: "Da' Bomb Beyond Insanity Hot Sauce", scoville: 135600 },
      { name: "Hellfire Fear This! Hot Sauce", scoville: 679000 },
      { name: "Hot Ones The Last Dab Reduxx", scoville: 2000000 }
    ],
    9: [
      { name: "Hot Ones The Classic Hot Sauce", scoville: 1800 },
      { name: "Sauce Bae Skinny Habanero Hot Sauce", scoville: 2500 },
      { name: "Shaquanda's Hot Pepper Sauce", scoville: 10100 },
      { name: "Lucky Dog Year of The Dog Thai Chile Pineapple Hot Sauce", scoville: 29800 },
      { name: "Hot Ones Los Calientes Hot Sauce", scoville: 36000 },
      { name: "Hellfire Detroit Habanero Hot Sauce", scoville: 66000 },
      { name: "Wiltshire Chilli Farm Trinidad Scorpion Hot Sauce", scoville: 104000 },
      { name: "Da' Bomb Beyond Insanity Hot Sauce", scoville: 135600 },
      { name: "Puckerbutt Chocolate Plague Hot Sauce", scoville: 690000 },
      { name: "Hot Ones The Last Dab Reduxx", scoville: 2000000 }
    ],
    10: [
      { name: "Hot Ones The Classic Hot Sauce", scoville: 1800 },
      { name: "Small Axe Peppers The Chicago Red Hot Jalapeno Hot Sauce", scoville: 2800 },
      { name: "Heartbeat Pineapple Habanero Hot Sauce", scoville: 12200 },
      { name: "Hot Ones Los Calientes Hot Sauce", scoville: 36000 },
      { name: "Torchbearer Headless Horseradish Hot Sauce", scoville: 52000 },
      { name: "Adoboloco Fiya! Fiya! Hot Sauce", scoville: 77000 },
      { name: "Bravado Spice Company Aka Miso Ghost-Reaper Hot Sauce", scoville: 116000 },
      { name: "Da' Bomb Beyond Insanity Hot Sauce", scoville: 135600 },
      { name: "Karma Sauce Burn After Eating Hot Sauce", scoville: 669000 },
      { name: "Hot Ones The Last Dab XXX Hot Sauce", scoville: 2000000 }
    ],
    11: [
      { name: "Hot Ones The Classic Hot Sauce", scoville: 1800 },
      { name: "Cantina Royal Tamaulipeka Hot Sauce", scoville: 4200 },
      { name: "Fiji Fire Native Bongo Chilli Hot Sauce", scoville: 14300 },
      { name: "Double Take Salsa Co. Scotch Bonnet Mustard Hot Sauce", scoville: 37000 },
      { name: "Hot Ones Los Calientes Rojo Hot Sauce", scoville: 49000 },
      { name: "Seed Ranch Flavor Co. Hot Thai Green Hot Sauce", scoville: 74000 },
      { name: "Pepper North Stargazer Hot Sauce", scoville: 118000 },
      { name: "Da' Bomb Beyond Insanity Hot Sauce", scoville: 135600 },
      { name: "Dingo Sauce Co. Widow Maker Hot Sauce", scoville: 682000 },
      { name: "Hot Ones The Last Dab XXX Hot Sauce", scoville: 2000000 }
    ],
    12: [
      { name: "Hot Ones The Classic Garlic Fresno Hot Sauce", scoville: 1700 },
      { name: "Steel City Sauce Co Jade Jaguar Hot Sauce", scoville: 3600 },
      { name: "Fresno Sauce Company Chipotle & Habanero Hot Sauce", scoville: 12400 },
      { name: "Hotter Than El Ghost Sauce", scoville: 39000 },
      { name: "Hot Ones Los Calientes Rojo Hot Sauce", scoville: 49000 },
      { name: "Seafire Gourmet Reaper Hot Sauce", scoville: 72000 },
      { name: "Volcanic Peppers Thor's Hammer Super Hot Sauce", scoville: 121000 },
      { name: "Da' Bomb Beyond Insanity Hot Sauce", scoville: 135600 },
      { name: "Chile Monoloco Pierde Almas Hot Sauce", scoville: 665000 },
      { name: "Hot Ones The Last Dab XXX Hot Sauce", scoville: 2000000 }
    ],
    13: [
      { name: "Hot Ones The Classic Garlic Fresno Hot Sauce", scoville: 1700 },
      { name: "Dawson’s Shawarma Sauce", scoville: 4200 },
      { name: "Shaquanda’s West Indian Curry Hot Sauce", scoville: 14000 },
      { name: "Angry Goat Pepper Co. Goat Rider Hot Sauce", scoville: 43500 },
      { name: "Hot Ones Los Calientes Rojo Hot Sauce", scoville: 49000 },
      { name: "Heartbeat Hot Sauce Scorpion Hot Sauce", scoville: 66000 },
      { name: "Hellfire Detroit Bourbon Habanero Ghost Hot Sauce", scoville: 89000 },
      { name: "Da' Bomb Beyond Insanity Hot Sauce", scoville: 135600 },
      { name: "Puckerbutt Pepper Company Chipotle Express Hot Sauce", scoville: 669000 },
      { name: "Hot Ones The Last Dab Apollo Hot Sauce", scoville: 2500000 }
    ],
    14: [
      { name: "Hot Ones The Classic Hot Sauce", scoville: 1800 },
      { name: "Hot N Saucy Garlic N Pepperoncini Hot Sauce", scoville: 3900 },
      { name: "Mark's Barbados Style Hot Sauce", scoville: 15500 },
      { name: "Hellfire Devil's Blend Hot Sauce", scoville: 42000 },
      { name: "Hot Ones Los Calientes Rojo Hot Sauce", scoville: 49000 },
      { name: "High River Sauces Tears of the Sun Private Reserve Hot Sauce", scoville: 69000 },
      { name: "Torchbearer Sauces Honey Badger Hot Sauce", scoville: 99000 },
      { name: "Da' Bomb Beyond Insanity Hot Sauce", scoville: 135600 },
      { name: "Hot Ones Eye of the Scorpion Hot Sauce", scoville: 676000 },
      { name: "Hot Ones The Last Dab Apollo Hot Sauce", scoville: 2500000 }
    ],
    15: [
      { name: "Hot Ones The Classic Hot Sauce", scoville: 1800 },
      { name: "Savir Foods Jala Pepa Hot Sauce", scoville: 4000 },
      { name: "Cantina Royal Tomasa Spicy Habanero & Manzano Chile Hot Sauce", scoville: 18000 },
      { name: "Hot Ones Los Calientes Barbacoa Hot Sauce", scoville: 33000 },
      { name: "The Original Goat Ginger Goat Hot Sauce", scoville: 55000 },
      { name: "High Desert Sauce Co. Tikk-Hot Masala Hot Sauce", scoville: 72000 },
      { name: "Hotter Than El Love Burns Hot Sauce", scoville: 101000 },
      { name: "Da' Bomb Beyond Insanity Hot Sauce", scoville: 135600 },
      { name: "Karma Sauce Scorpion Disco Hot Sauce", scoville: 649000 },
      { name: "Hot Ones The Last Dab Apollo Hot Sauce", scoville: 2500000 }
    ],
    16: [
      { name: "Hot Ones The Classic Hot Sauce", scoville: 1700 },
      { name: "Yellowbird Bliss & Vinegar Hot Sauce", scoville: 6200 },
      { name: "Hoff & Pepper Hoff's House Sauce Hot Sauce", scoville: 14500 },
      { name: "Hot Ones Los Calientes Verde Hot Sauce", scoville: 36000 },
      { name: "Hot Heads Official Revolutionary Hot Sauce", scoville: 57000 },
      { name: "Señor Lechuga .718 Hot Sauce", scoville: 67000 },
      { name: "Chile Lengua De Fuego Bhutila Fire Hot Sauce", scoville: 118000 },
      { name: "Da' Bomb Beyond Insanity Hot Sauce", scoville: 135600 },
      { name: "Hellfire Hot Sauce Kranked Hot Sauce", scoville: 699000 },
      { name: "Hot Ones The Last Dab Apollo Hot Sauce", scoville: 2500000 }
    ],
    17: [
      { name: "Hot Ones The Classic Hot Sauce", scoville: 1800 },
      { name: "Dawson's Cedar Smoked Garlic Hot Sauce", scoville: 7000 },
      { name: "Clark & Hopkins Calabria Hot Sauce", scoville: 15700 },
      { name: "Angry Goat Pepper Co. The Phoenix Hot Sauce", scoville: 39000 },
      { name: "Hot Ones Los Calientes Rojo Hot Sauce", scoville: 49000 },
      { name: "Queen Majesty Cocoa Ghost Hot Sauce", scoville: 71000 },
      { name: "13 Angry Scorpions Jekyll & Hyde Scorpion Chipotle Hot Sauce", scoville: 109000 },
      { name: "Da' Bomb Beyond Insanity Hot Sauce", scoville: 135600 },
      { name: "Puckerbutt Pepper Company Extra Mean Green Hot Sauce", scoville: 702000 },
      { name: "Hot Ones The Last Dab Apollo Hot Sauce", scoville: 2500000 }
    ],
    18: [
      { name: "Hot Ones The Classic Garlic Fresno Hot Sauce", scoville: 1800 },
      { name: "Adoboloco Island Wings Hot Sauce", scoville: 5500 },
      { name: "Burns & McCoy Mezcaline Oaxacan Hot Sauce", scoville: 16600 },
      { name: "Hot Ones Los Calientes Verde Hot Sauce", scoville: 36000 },
      { name: "Sauce Leopard The Seventh Reaper Hot Sauce", scoville: 59000 },
      { name: "Hot N Saucy Collards N Ghost Hot Sauce", scoville: 70000 },
      { name: "Halogi Hot Sauce Tyrfing's Curse Hot Sauce", scoville: 99000 },
      { name: "Da' Bomb Beyond Insanity Hot Sauce", scoville: 135600 },
      { name: "Dingo Sauce Co. Psycho Hot Sauce", scoville: 666000 },
      { name: "Hot Ones The Last Dab Apollo Hot Sauce", scoville: 2500000 }
    ],
    19: [
      { name: "Hot Ones The Classic Chilli Maple Hot Sauce", scoville: 1800 },
      { name: "Sinai Gourmet Tropiqanté Hot Sauce", scoville: 4000 },
      { name: "Piko Peppers Piko Riko Hot Sauce", scoville: 15500 },
      { name: "Hot Ones Los Calientes Barbacoa Hot Sauce", scoville: 33000 },
      { name: "Fly By Jing Sichuan Gold Hot Sauce", scoville: 46000 },
      { name: "Chile Lengua De Fuego Turmeric Bomb Hot Sauce", scoville: 69000 },
      { name: "Karma Sauce Cosmic Disco Hot Sauce", scoville: 103000 },
      { name: "Da' Bomb Beyond Insanity Hot Sauce", scoville: 135600 },
      { name: "Puckerbutt Pepper Company Unique Garlique Hot Sauce", scoville: 642000 },
      { name: "Hot Ones The Last Dab Apollo Hot Sauce", scoville: 2500000 }
    ],
    20: [
      { name: "Hot Ones The Classic Chilli Maple Hot Sauce", scoville: 1600 },
      { name: "Shaquanda's Banjee Ranch Hot Sauce", scoville: 6200 },
      { name: "The Donis Cadejo Hot Sauce", scoville: 15000 },
      { name: "Hot Ones Los Calientes Verde Hot Sauce", scoville: 36000 },
      { name: "Brooklyn Delhi Ghost Pepper Hot Sauce", scoville: 39000 },
      { name: "Torchbearer Sauces Mushroom Mayhem Hot Sauce", scoville: 68000 },
      { name: "Angry Goat Dreams of Calypso Hot Sauce", scoville: 101000 },
      { name: "Da' Bomb Beyond Insanity Hot Sauce", scoville: 135600 },
      { name: "Butterfly Bakery of Vermont Taco Vibes Only Hot Sauce", scoville: 638000 },
      { name: "Hot Ones The Last Dab Apollo Hot Sauce", scoville: 2500000 }
    ],
    21: [
      { name: "Hot Ones The Classic Chilli Maple Hot Sauce", scoville: 1600 },
      { name: "La Pimenterie Green Curry Hot Sauce", scoville: 6000 },
      { name: "The Crabby Shack Zesty Lemon Pepper Hot Sauce", scoville: 15500 },
      { name: "Chile Lengua de Fuego Chicho-Ghost Hot Sauce", scoville: 36500 },
      { name: "Hot Ones Los Calientes Rojo Hot Sauce", scoville: 49000 },
      { name: "The Spicy Shark Mako Snake Hot Sauce", scoville: 71000 },
      { name: "Adoboloco Jalapeño Chico Hot Sauce", scoville: 103000 },
      { name: "Da' Bomb Beyond Insanity Hot Sauce", scoville: 135600 },
      { name: "Alchemy Peppers Watermelon Ghost Hot Sauce", scoville: 641000 },
      { name: "Hot Ones The Last Dab Apollo Hot Sauce", scoville: 2500000 }
    ],
    22: [
      { name: "Hot Ones Original Buffalo Hot Sauce", scoville: 1800 },
      { name: "Angry Goat Blistered Shishito & Garlic Hot Sauce", scoville: 5800 },
      { name: "Pisqueya Spicy Sweet Passion Fruit Hot Sauce", scoville: 16000 },
      { name: "Hot Ones Los Calientes Barbacoa Hot Sauce", scoville: 33000 },
      { name: "Djablo Filipino Hot Sauce with a Punch", scoville: 55000 },
      { name: "Marshall's Haute Sauce Whiskey Smoked Ghost Hot Sauce", scoville: 71000 },
      { name: "Ginger Goat Tropic Star Hot Sauce", scoville: 110000 },
      { name: "Da' Bomb Beyond Insanity Hot Sauce", scoville: 135600 },
      { name: "Dawson's Zuzu's 7-Pot Hot Sauce", scoville: 620000 },
      { name: "Hot Ones The Last Dab Xperience Hot Sauce", scoville: 2693000 }
    ],
    23: [
      { name: "Hot Ones Original Buffalo Hot Sauce", scoville: 1800 },
      { name: "Sam Sa'House Smokey J Jalapeno Hot Sauce", scoville: 6000 },
      { name: "Funky's Hot Sauce Factory Stellar Fuzz Hot Sauce", scoville: 19000 },
      { name: "Hot Ones Los Calientes Verde Hot Sauce", scoville: 34000 },
      { name: "Good Heat Queso Sin Queso Hot Sauce", scoville: 52000 },
      { name: "Cantina Royal Morita Bourbon Maple Reaper Hot Sauce", scoville: 73000 },
      { name: "La Pimenterie The Forbidden Fruit Hot Sauce", scoville: 124000 },
      { name: "Da' Bomb Beyond Insanity Hot Sauce", scoville: 135600 },
      { name: "Chile Monoloco Matasanos Hot Sauce", scoville: 680000 },
      { name: "Hot Ones The Last Dab Xperience Hot Sauce", scoville: 2693000 }
    ],
    24: [
      { name: "Hot Ones The Classic Garlic Fresno Hot Sauce", scoville: 1700 },
      { name: "Double Comfort Seeing Double Hot Sauce", scoville: 6200 },
      { name: "Mark's Fermented Kimchi Hot Sauce", scoville: 18000 },
      { name: "Hot Ones Los Calientes Barbacoa Hot Sauce", scoville: 33000 },
      { name: "Fat Cat Chairman Meow's Revenge Hot Sauce", scoville: 54000 },
      { name: "Il Mig Onima Hot Sauce", scoville: 71000 },
      { name: "Black Eyed Susan Spice Co. Red Flag Hot Sauce", scoville: 126000 },
      { name: "Da' Bomb Beyond Insanity Hot Sauce", scoville: 135600 },
      { name: "High River Sauces Peppers Up Hot Sauce", scoville: 700000 },
      { name: "Hot Ones The Last Dab Xperience Hot Sauce", scoville: 2693000 }
    ],
    25: [
      { name: "Hot Ones The Classic Hot Sauce", scoville: 1800 },
      { name: "Little Dick's Ghost Pepper Pear Hot Sauce", scoville: 6900 },
      { name: "Neil's Real Deal Smoked Onion Hot Sauce", scoville: 17000 },
      { name: "Hot Ones Los Calientes Verde Hot Sauce", scoville: 36000 },
      { name: "Dawson's Apple Caraway Hot Sauce", scoville: 52000 },
      { name: "Pepper North Jerk & Scotch Bonnet Hot Sauce", scoville: 71000 },
      { name: "The Pepper Ninja Ninja Napalm Hot Sauce", scoville: 133000 },
      { name: "Da' Bomb Beyond Insanity Hot Sauce", scoville: 135600 },
      { name: "Fresno Sauce Arbol Scorpion Hot Sauce", scoville: 820000 },
      { name: "Hot Ones The Last Dab Xperience Hot Sauce", scoville: 2693000 }
    ],
    26: [
      { name: "Señor Lechuga 0.006 Hot Sauce", scoville: 1200 },
      { name: "Karma Sauce Lift Off Hot Sauce", scoville: 5600 },
      { name: "Hot Ones Pickled Garlic Sriracha Hot Sauce", scoville: 18000 },
      { name: "Elotes Loco Fire Edition Hot Sauce", scoville: 26500 },
      { name: "Hot Ones Los Calientes Rojo Hot Sauce", scoville: 39000 },
      { name: "Piko Peppers Volkano Hot Sauce", scoville: 76000 },
      { name: "Butterfly Bakery Hot House Hot Sauce", scoville: 131000 },
      { name: "Da' Bomb Beyond Insanity Hot Sauce", scoville: 135600 },
      { name: "Queen Majesty Sicilian Scorpion Hot Sauce", scoville: 816000 },
      { name: "Hot Ones The Last Dab Xperience Hot Sauce", scoville: 2693000 }
    ],
    27: [
      { name: "Shaquanda's Hot Tropic", scoville: 1400 },
      { name: "Seed Ranch Flavor Co’s Just Wingin' It", scoville: 5700 },
      { name: "Hot Ones Pickled Garlic Sriracha", scoville: 18000 },
      { name: "Alchemy Peppers’ Mango Serrano Hops", scoville: 27000 },
      { name: "Hook & Arrow’s Spicier Sauerkraut & Mustard", scoville: 51000},
      { name: "Hot Ones Tropical Amarillo", scoville: 69000  },
      { name: "Smokin’ Ed Aprichot", scoville: 104000 },
      { name: "Da Bomb Beyond Insanity", scoville: 135600 },
      { name: "Torchbearer Sauces’ Sucker Punch", scoville: 690000 },
      { name: "Hot Ones The Last Dab Xperience", scoville: 2693000 }
    ]
  };

  export default allSeasonSauces;